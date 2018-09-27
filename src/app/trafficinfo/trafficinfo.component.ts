import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from '../services/portal.service';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatPaginator, MatSort
} from '@angular/material';
import { tileLayer, latLng, circle, polygon, marker, icon, Layer, polyline } from 'leaflet';
import * as L from 'leaflet';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';
import { NavService } from '../header/nav/nav.service';

@Component({
  selector: 'gosg-trafficinfo',
  templateUrl: './trafficinfo.component.html',
  styleUrls: ['./trafficinfo.component.css']
})
export class TrafficinfoComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscriptionLang: ISubscription;

  dataAlpha = [];
  keyword: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  pageSize = 10;
  pageCount = 1;
  totalRec = 0;
  loading = false;
  noPrevData = true;
  noNextData = false;
  allStreetNames:any;
  streetName:any;
  streetNames = [];
  streetFlows = null;
  gotPrediction:boolean;
  predictionData:any = [];
  selStreetName:any;
  current:any;
  after1hr:any;
  after2hr:any;
  after3hr:any;
  lang = this.lang;
  langId = localStorage.getItem('langID');
  languageId = this.languageId;
  recordTable = null;
  id;
  custom: any;
  rp;
  isActiveList: boolean = false;

  showNoData = false

  step = 0;

  mymap;
  marker;
  popup = L.popup();
  defaultIcon = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41], // size of the icon
    shadowSize: [40, 41], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor: [12, 0] // point from which the popup should open relative to the iconAnchor
  });
  dsvcCode: number;
  agcCode: number;
  // route = L.polyline([[ 101.741834,3.081827],[ 101.741807,3.082012],[ 101.741794,3.08221],[ 101.741738,3.083809],[ 101.741723,3.084906],[ 101.741723,3.084907],[ 101.741711,3.085749],[ 101.741651,3.086318],[ 101.741521,3.086954],[ 101.741301,3.088004],[ 101.740145,3.091723],[ 101.739996,3.092204],[ 101.739529,3.093657],[ 101.738819,3.096002]], {color: 'red'}).addTo(this.mymap);

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private topnavservice: TopnavService,
    private navService: NavService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.navService.restricted = false;
    this.loading = true;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // this.sharedService.errorHandling(event, (function(){
      const myLang = this.translate.currentLang;
      if (myLang === 'en') {
        this.lang = 'en';
        this.languageId = 1;
        if (this.popup.isPopupOpen)
          this.popup.closePopup()
      }
      if (myLang === 'ms') {
        this.lang = 'ms';
        this.languageId = 2;
        if (this.popup.isPopupOpen)
          this.popup.closePopup()
      }

      if (this.topnavservice.flagLang) {
        this.getTrafficFlowData(this.languageId);
      }

      this.keyword = '';
      this.pageCount = 1;
      this.mymap.flyTo([3.141589, 101.674284], 13);
      this.popup.remove();
      this.loading = false;

    }); }

  ngOnInit() {

    // AGENCY & DSERVICE CODE FOR VALIDATION
    // let sub = this.route.queryParams.subscribe((params: Params) => {
    //   this.dsvcCode = parseInt(params.service);
    //   this.agcCode = parseInt(params.agency);
    // });

    // this.triggerDserviceValidation(this.dsvcCode);

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.gotPrediction = false;
    this.getDefaultMap();
    // this.getStreetNamesData();
    this.getTrafficFlowData(this.languageId);
    this.id = setInterval(() => {
      this.getTrafficFlowData(this.languageId);
    }, 300000);
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    if (this.id) {
      clearInterval(this.id);
    }
  }

  getDefaultMap() {
    this.mymap = L.map('dirmap').setView([3.141589, 101.674284], 13);

    L.tileLayer('https://tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 17,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicmVkemEiLCJhIjoiY2pmcGZxNzRrMjYzbzMwcG83bGRxY2FtZyJ9.uMHQpYc0Pvjl4us27nHH8w'
    }).addTo(this.mymap);

    // this.rp = L.polyline(this.PLJlnMaarof, {color: 'red'}).addTo(this.mymap);
    // this.mymap.fitBounds(this.rp.getBounds());

  }

  getTrafficFlowData(lng) {
      this.loading = true;
      this.portalservice.getTrafficFlows(lng).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function () {
            this.streetFlows = data;

            if (this.streetFlows.records.length > 0) {

              this.streetFlows.records.forEach(el => {

                // console.log(this.allStreetNames)
                if(el.street) {
                  el.jam = this.str2arr(el.jam);

                  this.streetNames.push({ 'name': el.street, 'latlng': el.jam[0] });

                  this.rp = L.polyline(el.jam, {color: this.getLevelColor(el.level), weight: 5, opacity: 0.6 }).addTo(this.mymap);

                  this.rp.on('click', this.middleMan, this);

                  this.rp.on('mouseover', function(e) {
                    this.popup = L.popup().setLatLng(el.jam[0])
                                  .setContent(`${el.street}`)
                                  .openOn(this._map)
                                  // .on('click', this.test, this);
                  });

                  this.popup.on('click', this.test, this);
                }
              });
              this.totalRec = this.streetFlows.params.recordsFound;

              this.showNoData = false;
            } else {
              this.recordTable = [];
              this.showNoData = true;
            }
          }).bind(this));
          this.loading = false;
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;

        });
  }

  test() {
    alert('test');
  }

  middleMan(e) {
    // console.log(e);
    let currColor = e.target.options.color;
    let sName = e.target.popup._content;
    let sLatLng = [e.latlng.lat,e.latlng.lng ];
    this.getTrafficPredictionData(sName, currColor, sLatLng, this.languageId);
  }

  getTrafficPredictionData(sn, ltlg?, currClr?, lng?) {

    let trafficDetails = {
      "status": null,
      "color": null
    };
    
    if(sn != "undefined") {
      this.showNoData = false;
      this.loading = true;
      this.portalservice.getTrafficPrediction(sn,lng).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function () {
            this.streetPrediction = data;

            if (this.streetPrediction) {

              this.streetName = null;
              this.streetName = sn;
              this.gotPrediction = true;
              this.selStreetName = sn;
              this.predictionData = [];

              trafficDetails.status = this.streetPrediction.current;
              trafficDetails.color = currClr;
              this.predictionData.push(trafficDetails);

                this.streetPrediction.traffic.forEach(el => {

                  trafficDetails = {
                    "status": null,
                    "color": null
                  };

                  trafficDetails.status = el;
                  trafficDetails.color = this.getLevelColorByName(el);
                  
                  this.predictionData.push(trafficDetails)

                });

              this.mymap.flyTo(ltlg, 15);
              this.popup = L.popup().setLatLng(ltlg)
                            .setContent(this.streetName)
                            .openOn(this.mymap);
                          }
              this.popup.on('click', this.middleMan, this);
          }).bind(this));
          this.loading = false;
          this.isActiveList = false;
        }, err => {
          this.gotPrediction = false;
          this.showNoData = true;
          this.loading = false;
          this.toastr.error(JSON.parse(err._body).statusDesc, '');
          this.isActiveList = false;

        });
      } else {
        this.gotPrediction = false;
        this.showNoData = true;
        this.isActiveList = false;
      }

  }

  str2arr(obj) {
    obj = JSON.parse(obj);
    obj.forEach(elJam => {
      [elJam[0], elJam[1]] = [elJam[1], elJam[0]]
    });

    return obj;
  }

  getLevelColor(lvl) {
    let color;
    switch (lvl) {
      case 1:
        color = "green"
        break;
      case 2:
        color = "yellow"
        break;
      case 3:
        color = "red"
        break;
      case 4:
        color = "black"
        break;

      default:
        break;
    }
    return color;
  }

  getLevelColorByName(lvl) {
    let color;
    switch (lvl) {
      case 'Light Traffic':
        color = "green"
        break;
      case 'Moderate Traffic':
        color = "yellow"
        break;
      case 'Heavy Traffic':
        color = "red"
        break;
      case 'Bumper to Bumper':
        color = "black"
        break;
      case 'Unexpected Bumper to Bumper':
        color = "black"
        break;

      default:
        break;
    }
    return color;
  }

  triggerDserviceValidation(dsvcCode) {
    let sub;
    this.loading = true;

    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.portalservice.validateDserviceByRefCode(dsvcCode))
      .subscribe(resValidation => {

        if(!resValidation.valid) {
          this.toastr.error('Invalid Service!', '');
          this.router.navigate(['404']);

          this.loading = false;
        } else {
          localStorage.setItem('dserviceCode', dsvcCode);
          this.loading = false;
        }
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;

      });
  }

}
