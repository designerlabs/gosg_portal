import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator, 
        MatSort } from '@angular/material';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../header/topnav/topnav.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import { ProtectedService } from '../services/protected.service';
import { tileLayer, latLng, circle, polygon, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';
import { SharedService } from '../common/shared.service';
import { PortalService } from '../services/portal.service';

@Component({
  selector: 'gosg-schoolsearch',
  templateUrl: './schoolsearch.component.html',
  styleUrls: ['./schoolsearch.component.css']
})
export class SchoolsearchComponent implements OnInit {

  lang = this.lang;
  langID: any;
  complete: boolean;
  param = "";
  dataApp = null;
  recordData = null;
  dataAppPage: any;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  showNoData = false;
  
  public showDetails = false;

  searchForm: FormGroup;  
  public optSelect: FormControl;
  public state: FormControl;  
  public typeSchool: FormControl;
  public ppd: FormControl;  
  public speacialEd: FormControl;
  public schoolname: FormControl;

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

  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  private urlFaq: string = this.config.urlFaq;
  // dataSource = new MatTableDataSource<object>(this.recordData);

  constructor(
    private protectedService: ProtectedService,
    private sharedService: SharedService,
    private portalservice: PortalService,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private topnavservice: TopnavService,) {

    this.lang = translate.currentLang;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langID = 1;
            });
        }

        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langID = 2;
            });
        }

        if(this.topnavservice.flagLang){
          //this.subscription = this.getFaq(this.langID);
        }

    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
   // this.subscription.unsubscribe();
  }

  ngOnInit() {

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    this.optSelect = new FormControl();
    this.state = new FormControl();
    this.typeSchool = new FormControl();
    this.ppd = new FormControl();
    this.speacialEd = new FormControl();
    this.schoolname = new FormControl();

    this.searchForm = new FormGroup({   

      optSelect: this.optSelect,
      state: this.state,
      typeSchool: this.typeSchool,    
      ppd: this.ppd,
      speacialEd: this.speacialEd,
      schoolname: this.schoolname
    });
    
    this.getDefaultMap();
  }

  getDataAppList(page, size){

    this.portalservice.readPortal('agency/language/' + this.langID, page, size).subscribe(
    data => {
      // this.dataApp = data;
      // this.dataAppPage = data;
      // this.noNextData = data.pageNumber === data.totalPages;
      // this.showNoData = false;

      this.dataApp = data;
      this.recordData = this.dataApp.agencyList;
      this.dataAppPage = this.dataApp;
      this.noNextData = this.dataApp.pageNumber === this.dataApp.totalPages;
      this.showNoData = false;

      if(this.dataApp.length == 0){
        this.showNoData = true;
      }
    });
  }

  pageChange(event){
    this.getDataAppList(this.pageCount, event.value);
    this.pageSize = event.value;
  }

  paginatorL(page){
    this.getDataAppList(page-1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages){
    this.noPrevData = page >= 1 ? false : true;
    let pageInc = page+1;
    this.noNextData = pageInc === totalPages;
    this.getDataAppList(page+1, this.pageSize);
  }

  searchApp(formValues: any){

    this.showDetails = true;
    this.getDataAppList(this.pageCount, this.pageSize);
  }

  getDefaultMap() {
    this.mymap = L.map('dirmap').setView([4.8142568, 108.5806004], 6.2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 15,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicmVkemEiLCJhIjoiY2pmcGZxNzRrMjYzbzMwcG83bGRxY2FtZyJ9.uMHQpYc0Pvjl4us27nHH8w'
    }).addTo(this.mymap);
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  checkReqValues() {

    let reqVal = [];
    let nullPointers:any = [];
   
    reqVal =  ["optSelect","state","ppd","speacialEd"];
    

    for (var reqData of reqVal) {
      let elem = this.searchForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }
      
    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  resetSearch(){
    
    this.mymap.setView([4.8142568, 108.5806004], 6.2);
    this.searchForm.get('optSelect').setValue(null);
    this.searchForm.get('state').setValue(null);
    this.searchForm.get('typeSchool').setValue(null);
    this.searchForm.get('ppd').setValue(null);
    this.searchForm.get('speacialEd').setValue(null);
    this.showDetails = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }

  goToMarkerPoint(dLat, dLong, dName, dAddress, dEmail, dFax, dPhone) {
    if (dLat && dLong) {
      this.mymap.setView([dLat, dLong], 13);

      this.popup = L.popup()
        .setLatLng([dLat, dLong])
        .setContent(`
        <div class='row'>
          <div class='col-md-12'>
            <h4>${dName}
              <h4>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-home' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${dAddress}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-map-marker' style='font-size: 1.2em; margin-top: 85%'></i>
          </div>
          <div class='col-md-10'>
            <p>${dLat},${dLong}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-phone' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${dPhone}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-fax' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${dFax}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-envelope' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${dEmail}</p>
          </div>
        </div>
        `)
        .openOn(this.mymap);

    } else
      console.log('latlong are NULL')
  }

}
