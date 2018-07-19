import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from '../services/portal.service';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatPaginator, MatSort
} from '@angular/material';
import { tileLayer, latLng, circle, polygon, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';

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
  noPrevData = true;
  noNextData = false;
  streetNames = null;
  agencyList: Object;
  ministryList: Object;
  lang = this.lang;
  langId = localStorage.getItem('langID');
  languageId = this.languageId;
  recordTable = null;
  // letters = this.genCharArray('a', 'z');
  ministry: any = '';
  letter: any = '';
  custom: any;
  bounto;
  // allMarkers: any = [];
  markers: Layer[] = [];

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
  route = L.polyline([[ 101.741834,3.081827],[ 101.741807,3.082012],[ 101.741794,3.08221],[ 101.741738,3.083809],[ 101.741723,3.084906],[ 101.741723,3.084907],[ 101.741711,3.085749],[ 101.741651,3.086318],[ 101.741521,3.086954],[ 101.741301,3.088004],[ 101.740145,3.091723],[ 101.739996,3.092204],[ 101.739529,3.093657],[ 101.738819,3.096002]]);

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private topnavservice: TopnavService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {

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
      }

      this.letter = '';
      this.keyword = '';
      this.ministry = '';
      this.pageCount = 1;
      this.mymap.setView([3.108097, 101.730555], 15);
      this.popup.remove();

    }); }

  ngOnInit() {
    this.getStreetNamesData();
    this.getDefaultMap();
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getDefaultMap() {
    this.mymap = L.map('dirmap').setView([3.108097, 101.730555], 15);      
    console.log(this.route.getBounds());
    this.mymap.fitBounds(this.route.getBounds(), {
      // padding: L.point(24, 24),
      maxZoom: 15,
      animate: true
    });
    
    L.marker([3.109500, 101.732733]).addTo(this.mymap);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicmVkemEiLCJhIjoiY2pmcGZxNzRrMjYzbzMwcG83bGRxY2FtZyJ9.uMHQpYc0Pvjl4us27nHH8w'
    }).addTo(this.mymap);
  }

  getStreetNamesData() {
      this.portalservice.getStreetNames().subscribe(
        // this.http.get(this.dataUrl).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function () {
            this.streetNames = data;


            if (this.streetNames.length > 0) {
              console.log(this.streetNames)
              // this.dataSource.data = this.recordList.list;
              // this.seqPageNum = this.recordList.pageNumber;
              // this.seqPageSize = this.recordList.pageSize;
              // this.totalRec = this.recordList.totalElements;
              // this.recordTable = this.recordList.agencyList;
              // this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;

              this.showNoData = false;
            } else {
              this.recordTable = [];
              this.showNoData = true;
            }
          }).bind(this));
          // this.loading = false;
        }, err => {
          // this.loading = false;
        });


  }

}
