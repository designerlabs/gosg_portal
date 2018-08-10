import { Component, OnInit, Injectable, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatPaginator,
        MatSort } from '@angular/material';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../header/topnav/topnav.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule
} from '@angular/material';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import { tileLayer, latLng, circle, polygon, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';
import { SharedService } from '../common/shared.service';
import { PortalService } from '../services/portal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'gosg-schoolsearch',
  templateUrl: './schoolsearch.component.html',
  styleUrls: ['./schoolsearch.component.css']
})
export class SchoolsearchComponent implements OnInit {

  lang = this.lang;
  langID: any;
  complete: boolean;
  dataAppSchool = null;
  recordData = null;
  showNoData = false;

  public valSchoolCat: any;
  public listState: any;
  public listPPD: any;
  public listKhas = [{id: "all", text: "Semua"},{id: "1", text: "Ada"},{id: "0", text: "Tiada"}]
  public listTypeS: any;
  public noOfSc = 0;
  public setLat: any;
  public setLong: any;
  public showDetails = false;

  searchForm: FormGroup;
  public optSelect: FormControl;
  public state: FormControl;
  public typeSchool: FormControl;
  public ppd: FormControl;
  public speacialEd: FormControl;
  public schoolname: FormControl;
  public jenisCarian: FormControl;
  public searchString: string;

  mymap;
  marker;
  markerGroup;
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

  constructor(

    private sharedService: SharedService,
    private portalservice: PortalService,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    private toastr: ToastrService,
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
    this.jenisCarian = new FormControl();

    this.searchForm = new FormGroup({

      optSelect: this.optSelect,
      state: this.state,
      typeSchool: this.typeSchool,
      ppd: this.ppd,
      speacialEd: this.speacialEd,
      schoolname: this.schoolname,
      jenisCarian: this.jenisCarian
    });

    this.searchForm.get('optSelect').setValue(1);
    this.searchForm.get('jenisCarian').setValue(1);
    this.valSchoolCat = 1;
    this.searchForm.get('ppd').disable();
    this.searchForm.get('speacialEd').disable();
    this.getListState();
    this.getDefaultMap();
  }

  getDataSchool(){

    let valSchool = this.searchForm.get('optSelect').value;
    let valState = this.searchForm.get('state').value;
    let valPPD = this.searchForm.get('ppd').value;
    let valKhas = this.searchForm.get('speacialEd').value;
    let valTypeS = this.searchForm.get('typeSchool').value;

    if(valSchool == 1){
      valTypeS = '';
    }

    this.sharedService.getListSchool('school/search',valSchool,valState,valPPD,valKhas,valTypeS).subscribe(
    data => {

    //  this.sharedService.errorHandling(data, (function () {       
        this.dataAppSchool = data;
        this.recordData = this.dataAppSchool.schoolResourceList;
        this.noOfSc = this.recordData.length;        
        this.showNoData = false;

        if(this.recordData.length > 0){          

          this.setLat = this.recordData[0].latitude;
          this.setLong = this.recordData[0].longitude;
          
          this.markerGroup = L.layerGroup();              
          
          for (let i = 0; i <= this.recordData.length - 1; i++) {
      
            this.addMarker(
              parseFloat(this.malformedDataHandler(this.recordData[i].latitude)),
              parseFloat(this.malformedDataHandler(this.recordData[i].longitude)),
              this.recordData[i].namaSekolah,
              this.recordData[i].alamat,
              this.recordData[i].telNo,
              this.recordData[i].bandar,
              this.recordData[i].negeri
            );
          }

          this.markerGroup.addTo(this.mymap);
          
        }

        else{
          this.markerGroup.clearLayers();
          this.mymap.setView([4.8142568, 108.5806004], 6.2);
          this.showNoData = true;
        }
    //  }).bind(this));
    },
    error => {
      this.showNoData = true;
      //this.toastr.error(JSON.parse(error._body).statusDesc, '');
      // this.loading = false;
    });
  }

  getSchoolByName(){
    let valSchoolName = this.searchForm.get('schoolname').value;
    
    this.sharedService.getListSchoolByName('school/search',valSchoolName).subscribe(
    data => {

      //this.sharedService.errorHandling(data, (function () {       
        this.dataAppSchool = data;
        this.recordData = this.dataAppSchool.schoolResourceList;
        this.noOfSc = this.recordData.length;
        this.showNoData = false;

        if(this.recordData.length > 0){

          this.setLat = this.recordData[0].latitude;
          this.setLong = this.recordData[0].longitude;

          this.markerGroup = L.layerGroup();
          
          for (let i = 0; i <= this.recordData.length - 1; i++) {
      
            this.addMarker(
              parseFloat(this.malformedDataHandler(this.recordData[i].latitude)),
              parseFloat(this.malformedDataHandler(this.recordData[i].longitude)),
              this.recordData[i].namaSekolah,
              this.recordData[i].alamat,
              this.recordData[i].telNo,
              this.recordData[i].bandar,
              this.recordData[i].negeri
            );
          }

          this.markerGroup.addTo(this.mymap);
        }

        else{
          this.markerGroup.clearLayers();
          this.mymap.setView([4.8142568, 108.5806004], 6.2);
          this.showNoData = true;
        }
      //}).bind(this));
    },
    error => {
      this.showNoData = true;
      //this.toastr.error(JSON.parse(error._body).statusDesc, '');
      // this.loading = false;
    });
  }

  searchApp(formValues: any){

    this.showDetails = true;
    if(this.searchForm.controls.jenisCarian.value == 1){
      this.getDataSchool();
    }

    else{
      this.getSchoolByName();
    }
  }

  getTypeSchool(val){

    this.valSchoolCat = val.optSelect;

    if(this.searchForm.get('state').value == "" || this.searchForm.get('state').value == null){
      this.searchForm.get('typeSchool').disable();
    }

    else{
      this.getPPD(this.searchForm.get('state').value,this.searchForm.get('optSelect').value);
    }
  }

  getListState(){
    this.sharedService.getSchoolApi('school/statelist','',this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listState = data['stateList'];

      }).bind(this));
    },
    error => {
    });
  }

  getPPD(valState,valOptSc){

    this.sharedService.getSchoolApi('school/ppd/'+valOptSc+'/'+valState,'',this.langID).subscribe(
    data => {

      this.listPPD = [];
      this.listTypeS = [];
      this.sharedService.errorHandling(data, (function(){
        let arrayPPD = data['ppdList'];
        let arrayTyepeS = data['schoolTypeList'];

        let a = { id: "all", text: "Semua"};
        this.listPPD.push(a);
        this.listTypeS.push(a);

        for (let i = 0; i < arrayPPD.length; i++) {
          let b = { id: arrayPPD[i], text: arrayPPD[i]};
          this.listPPD.push(b); //new list for ppd;
        }

        for (let i = 0; i < arrayTyepeS.length; i++) {
          let b = { id: arrayTyepeS[i], text: arrayTyepeS[i]};
          this.listTypeS.push(b); // new list for school type;
        }

        this.searchForm.get('ppd').enable();
        this.searchForm.get('speacialEd').enable();
        this.searchForm.get('ppd').setValue('all');
        this.searchForm.get('speacialEd').setValue('all');
        this.searchForm.get('typeSchool').enable();
        this.searchForm.get('typeSchool').setValue('all');
        this.checkReqValues();

      }).bind(this));
    },
    error => {
    });
  }

  convertPK(val){
    if(val == true)
      val = "Ada";
    else
      val = "Tiada";

    return val;
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

  checkReqValues() {

    let reqVal = [];
    let nullPointers:any = [];

    if(this.searchForm.controls.jenisCarian.value == 1){
      if(this.valSchoolCat == 1){
        reqVal =  ["optSelect","state","ppd","speacialEd"];
      }
      else{
        reqVal =  ["optSelect","state","typeSchool", "ppd","speacialEd"];
      }
    }

    else{
      reqVal =  ["schoolname"];
    }

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
    this.mymap.removeLayer(this.markerGroup);
    this.mymap.setView([4.8142568, 108.5806004], 6.2);
    this.searchForm.get('jenisCarian').setValue(1);
    this.valSchoolCat = 1;
    this.searchForm.get('optSelect').setValue(1);
    this.searchForm.get('state').setValue(null);
    this.searchForm.get('typeSchool').setValue(null);
    this.searchForm.get('ppd').setValue(null);
    this.searchForm.get('speacialEd').setValue(null);
    this.showDetails = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }

  addMarker(lat, long, nameS, addressS, phone, city, state) {
   
    if (!isNaN(lat)) {
      if (lat !== "NaN") {
        this.mymap.setView([this.setLat, this.setLong], 8); // add y N

        this.marker = L.marker([lat, long], { icon: this.defaultIcon })
        .bindPopup(`
          <div class='row'>
            <div class='col-md-12'>
              <h5>${nameS}<h5>
            </div>
            <div class='col-md-2'>
              <i class='fa fa-home' style='font-size: 1.2em; margin-top: 0px;'></i>
            </div>
            <div class='col-md-10'>
              <p style='font-size: 1em; margin-top: 0px; margin-bottom: 0px;'>${addressS}, ${city}, ${state}</p>
            </div>
            <div class='col-md-2'>
              <i class='fa fa-phone' style='font-size: 1.2em; margin-top: 0px;'></i>
            </div>
            <div class='col-md-10'>
              <p style='margin-top: 0px; margin-bottom: 0px;'>${phone}</p>
            </div>
            <div class='col-md-2'>
              <i class='fa fa-map-marker' style='font-size: 1.2em; margin-top: 0px;'></i>
            </div>
            <div class='col-md-10'>
              <p style='font-size: 1em; margin-top: 0px; margin-bottom: 0px;'>Geolokasi: ${lat},${long} 
              (dapatkan arah menggunakan <a href='https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&hl=ms'
              target='_blank'>Google Maps</a>
              atau buka aplikasi <a href='https://hub.grab.com/ul/' target='_blank'>Grab</a>)</p>
            </div>
          </div>`)
          // .setLatLng([agcLat,agcLong])
        .addTo(this.markerGroup);
   
      }
    }
  }

  goTo(lat, long, nameS, addressS, phone, city, state) {
    if (lat && long) {
      this.mymap.setView([lat, long], 24);

      this.popup = L.popup()
        .setLatLng([lat, long])
        .setContent(`
        <div class='row'>
          <div class='col-md-12'>
            <h5>${nameS}<h5>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-home' style='font-size: 1.2em; margin-top: 0px;'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em; margin-top: 0px; margin-bottom: 0px;'>${addressS}, ${city}, ${state}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-phone' style='font-size: 1.2em; margin-top: 0:'></i>
          </div>
          <div class='col-md-10'>
            <p style='margin-top: 0px; margin-bottom: 0px;'>${phone}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-map-marker' style='font-size: 1.2em; margin-top: 0px;'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em; margin-top: 0px; margin-bottom: 0px;'>Geolokasi: ${lat},${long} 
            (dapatkan arah menggunakan <a href='https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&hl=ms'
            target='_blank'>Google Maps</a>
             atau buka aplikasi <a href='https://hub.grab.com/ul/' target='_blank'>Grab</a>)</p>
          </div>
        </div>
        `)
        .openOn(this.mymap);

    } else{

    }
  }

  malformedDataHandler(data) {
    let tData;

    if (!data || data === 'undefined' || data == "")
      tData = "0.0"
    else
      tData = data;

    return tData
  }

}
