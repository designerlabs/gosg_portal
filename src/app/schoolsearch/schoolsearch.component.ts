import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../header/topnav/topnav.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';

import { ProtectedService } from '../services/protected.service';
import { tileLayer, latLng, circle, polygon, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';

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
  dataApp: any;
  dataAppPage: any;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  showNoData = false;

  public kp: any;
  public name: any;
  public summon: any;
  public ammount: any;
  public showDetails = false;
  public varSelect: any;

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

  constructor(
    private protectedService: ProtectedService,
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
    
    this.getDataAppList(this.pageCount, this.pageSize);

  }

  getDataAppList(page, size){

    this.protectedService.getDataApp(page, size, this.param).subscribe(
    data => {
      this.dataApp = data.list;
      this.dataAppPage = data;
      this.noNextData = data.pageNumber === data.totalPages;
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

    this.kp = "971020085921";
    this.name = "MUHAMMAD ISYRAF RAZIQ B YUSOF";
    this.summon =  "1";
    this.ammount = "300";

    this.getDefaultMap();
  }

  getDefaultMap() {
    this.mymap = L.map('dirmap').setView([5.8142568, 108.5806004], 5.2);
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

  getSelection(e){ //when change selection
    this.varSelect = e.value;
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

}
