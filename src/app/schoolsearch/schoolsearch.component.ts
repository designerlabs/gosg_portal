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
// import 'esri-leaflet';
import { SharedService } from '../common/shared.service';
import { PortalService } from '../services/portal.service';
import { ToastrService } from 'ngx-toastr';
import { NavService } from '../header/nav/nav.service';

export interface DialogData {
  dataschool;
}

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
  recordData2 = null;
  showNoData = false;
  loading = false;

  public valSchoolCat: any;
  public listLevel: any;
  public listState: any;
  // public listPPD: any; // to remove
  public listAgent: any;
  public listAgent2 = {};
  public listKhas = [{id: "all", text: "Semua"},{id: "Y", text: "Ada"},{id: "N", text: "Tiada"}]
  public listTypeS: any;
  public listTypeS2 = {};
  public noOfSc = 0;
  public setLat: any;
  public setLong: any;
  public showDetails = false;
  public charCarian: any;
  public prevLvl = [];
  public prevAgnt = [];

  searchForm: FormGroup;
  public optSelect: FormControl;
  public state: FormControl;
  public typeSchool: FormControl;
  // public ppd: FormControl; //to remove
  public agent: FormControl;
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
    private navService: NavService,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig,
    public dialog: MatDialog,
    private topnavservice: TopnavService,) {

      
    this.navService.restricted = false;
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
    window.scrollTo(0, 0);

    console.log("school: "+this.navService.restricted);

    this.optSelect = new FormControl();
    this.state = new FormControl();
    this.typeSchool = new FormControl();
    // this.ppd = new FormControl(); //to remove
    this.agent = new FormControl();
    this.speacialEd = new FormControl();
    this.schoolname = new FormControl();
    this.jenisCarian = new FormControl();

    this.searchForm = new FormGroup({

      optSelect: this.optSelect,
      state: this.state,
      typeSchool: this.typeSchool,
      // ppd: this.ppd,//to remove
      agent: this.agent,
      speacialEd: this.speacialEd,
      schoolname: this.schoolname,
      jenisCarian: this.jenisCarian
    });

    this.getSchoolLevel();
    // this.searchForm.get('optSelect').setValue(1);
    this.searchForm.get('jenisCarian').setValue(1);
    this.valSchoolCat = 4; //peringkat 4 : prasekolah;
    // this.searchForm.get('ppd').disable(); //to remove
    this.searchForm.get('agent').disable();
    this.searchForm.get('typeSchool').disable();
    this.searchForm.get('speacialEd').disable();
    this.getListState();
    this.getDefaultMap();

    document.getElementById("boxCarian").focus();
  }

  getSchoolLevel(){
    this.loading = true;
    this.sharedService.getSchoolLevel('school/level','').subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listLevel = data['list'];

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }

  getAgent(level){
    this.valSchoolCat = level; 
    this.loading = true;
    this.sharedService.getSchoolAgent('school/agent',level).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
          this.listAgent = data['list'];
          this.searchForm.get('agent').enable();
          if(level == 1 || level == 5){
            this.searchForm.get('speacialEd').disable();
          }else{
            this.searchForm.get('speacialEd').enable();
            this.searchForm.get('speacialEd').setValue('all');
          }

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.loading = false;
    });

  }

  getAgentNType(level, agent){
    
    if(!this.prevLvl.includes(level) && this.listAgent2[level] == undefined){
      this.loading = true;
      this.prevLvl.push(level);
      this.sharedService.getSchoolAgent('school/agent',level).subscribe(
      data => {

        this.sharedService.errorHandling(data, (function(){
            this.listAgent2[level] = data['list'];
            for(let a = 0; a < this.listAgent2[level].length; a++){
              if(!this.prevAgnt.includes(agent) && !this.listAgent2[level][a]['stype']){
                this.prevAgnt.push(agent);
                this.sharedService.getSchoolType('school/type',level, agent).subscribe(
                data => {
                  this.sharedService.errorHandling(data, (function(){
                    this.listAgent2[level][a]['stype'] = data['list'];

                    this.recordData2 = this.recordData; // start to populate result table
                        
                  }).bind(this));
                  this.loading = false;
                },
                error => {
                  this.loading = false;
                });
              }//end if
            }//end for

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
    }else if(this.listAgent2[level] != undefined) {
      for(let a = 0; a < this.listAgent2[level].length; a++){
        // if((this.listAgent2[level][a].ejenP == agent) && !this.listAgent2[level][a]['stype']){
        if(!this.prevAgnt.includes(agent) && !this.listAgent2[level][a]['stype']){
          this.prevAgnt.push(agent);
          this.sharedService.getSchoolType('school/type',level, agent).subscribe(
          data => {
            this.sharedService.errorHandling(data, (function(){
              this.listAgent2[level][a]['stype'] = data['list'];
                  
            }).bind(this));
            this.loading = false;
          },
          error => {
            this.loading = false;
          });
        }//end if
      }//end for
    }
    
  }

  getDataSchool(){

    this.loading = true;
    let valSchool = this.searchForm.get('optSelect').value;//level
    let valState = this.searchForm.get('state').value;//state
    // let valPPD = this.searchForm.get('ppd').value; //to remove
    let valAgent = this.searchForm.get('agent').value;//agent
    let valKhas = this.searchForm.get('speacialEd').value;//pendidikan kahs
    let valTypeS = this.searchForm.get('typeSchool').value;//jenis sekolah

    if(valSchool == 1){
      valTypeS = '';
    }

//     http://10.1.70.148:8080/service/school/list?level={level_id}&agent={ejenP}&type={jenis_id}&special=Y/N
// http://10.1.70.148:8080/service/school/list?level=1&agent=18&type=48&special=Y/N


    this.sharedService.getListSchool('school/list',valSchool,valState,valAgent,valKhas,valTypeS).subscribe(
    data => {

    //  this.sharedService.errorHandling(data, (function () { 
      if(data['list']){  
        this.dataAppSchool = data;
        this.recordData = this.dataAppSchool.list;
        this.noOfSc = this.recordData.length;        
        this.showNoData = false;
        
        if(this.recordData.length > 0){          

          this.setLat = this.recordData[0].latitude;
          this.setLong = this.recordData[0].longitude;

          if(this.markerGroup){
            this.mymap.removeLayer(this.markerGroup);   
          }
          
          this.markerGroup = L.layerGroup();   
  
          for (let i = 0; i <= this.recordData.length - 1; i++) {

            this.getAgentNType(this.recordData[i].peringkat, this.recordData[i].ejenp);
      
            this.addMarker(
              parseFloat(this.malformedDataHandler(this.recordData[i].koordinat_xy)),
              parseFloat(this.malformedDataHandler(this.recordData[i].koordinat_xx)),
              this.recordData[i].nama_institusi,
              this.recordData[i].alamat_surat1,
              this.recordData[i].no_telefon,
              this.recordData[i].bandar_surat,
              this.recordData[i].state_desc
            );
          }

          this.mymap.addLayer(this.markerGroup);
          //this.markerGroup.addTo(this.mymap);      
        }

        else{
          
          if(this.markerGroup){
            this.mymap.removeLayer(this.markerGroup);   
          }
          this.mymap.setView([4.8142568, 108.5806004], 6.2);
          this.showNoData = true;
        }
        this.loading = false;
      }else{
        this.showNoData = true;
        this.charCarian = 0;
        this.loading = false;
      }
    //  }).bind(this));
    },
    error => {
      this.showNoData = true;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      this.loading = false;
    });
  }

  getSchoolByName(){
    let valSchoolName = this.searchForm.get('schoolname').value;
    this.loading = true;

    this.sharedService.getListSchoolByName('school/search',valSchoolName).subscribe(
    data => {
        
      //this.sharedService.errorHandling(data, (function () {    
      if(data['list']){   
        this.dataAppSchool = data;
        this.recordData = this.dataAppSchool.list;
        this.noOfSc = this.recordData.length;
        this.showNoData = false;
        
        if(this.recordData.length > 0){

          this.setLat = this.recordData[0].koordinat_xy;
          this.setLong = this.recordData[0].koordinat_xx;

          if(this.markerGroup){
            this.mymap.removeLayer(this.markerGroup);   
          }
          
          this.markerGroup = L.layerGroup();  
          
          for (let i = 0; i <= this.recordData.length - 1; i++) {

            this.getAgentNType(this.recordData[i].peringkat, this.recordData[i].ejenp);
      
            this.addMarker(
              parseFloat(this.malformedDataHandler(this.recordData[i].koordinat_xy)),
              parseFloat(this.malformedDataHandler(this.recordData[i].koordinat_xx)),
              this.recordData[i].nama_institusi,
              this.recordData[i].alamat_surat1,
              this.recordData[i].no_telefon,
              this.recordData[i].bandar_surat,
              this.recordData[i].state_desc
            );
          }

          this.mymap.addLayer(this.markerGroup);
          //this.markerGroup.addTo(this.mymap);
        }

        else{
          if(this.markerGroup){
            this.mymap.removeLayer(this.markerGroup);   
          }
          this.mymap.setView([4.8142568, 108.5806004], 6.2);
          this.showNoData = true;
        }
        this.loading = false;
      }else{
        this.showNoData = true;
        this.charCarian = 0;
        this.loading = false;
      }
      //}).bind(this));
    },
    error => {
      this.showNoData = true;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      this.loading = false;
    });
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
          // .addTo(this.markerGroup);
       this.markerGroup.addLayer(this.marker);
      }
    }
  }

  goTo(lat, long, nameS, addressS, phone, city, state) {
    if (lat && long) {

      // this.mymap.setZoom(20,{
      //   "animate": true,
      //   "pan": {
      //     "duration": 1
      //   }
      // });
      // this.mymap.panTo([lat, long], { animate: true, easeLinearity: .20, duration: 2 });   
      //this.mymap.flyTo([dLat, dLong], 13);
      this.mymap.flyTo([lat, long], 16);       
      //this.mymap.setView([lat, long], 24);  
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

        document.getElementById("dataTable").focus();

    } else{

    }
  }

  searchApp(){

    this.popup.remove();
    this.charCarian = undefined;
    this.showDetails = true;
    if(this.searchForm.controls.jenisCarian.value == 1){
      this.getDataSchool();
    }

    else{
      this.getSchoolByName();
    }
    //document.getElementById("boxHasil").focus();
  }         

  getTypeSchool(val){

    this.valSchoolCat = val.optSelect;

    if(this.searchForm.get('agent').value == "" || this.searchForm.get('agent').value == null){
      this.searchForm.get('typeSchool').disable();
    }else{
      if(val.optSelect == 4){
        this.searchForm.get('typeSchool').disable();
      }else{
        this.getSType(this.searchForm.get('optSelect').value, this.searchForm.get('agent').value);
      }
    }

  }

  getSType(level, agent){ // to get school type
    this.loading = true;
    this.sharedService.getSchoolType('school/type',level, agent).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        
        this.listTypeS = data['list'];
        this.searchForm.get('typeSchool').enable();

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
    
  }

  getListState(){
    this.loading = true;
    this.sharedService.getSchoolApi('school/state','',this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        
        this.listState = data['list'];

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }

  // getPPD(valState,valOptSc){

  //   this.loading = true;
  //   this.sharedService.getSchoolApi('school/ppd/'+valOptSc+'/'+valState,'',this.langID).subscribe(
  //   data => {

  //     this.listPPD = [];
  //     this.listTypeS = [];
  //     this.sharedService.errorHandling(data, (function(){
  //       let arrayPPD = data['ppdList'];
  //       let arrayTyepeS = data['schoolTypeList'];

  //       let a = { id: "all", text: "Semua"};
  //       this.listPPD.push(a);
  //       this.listTypeS.push(a);

  //       for (let i = 0; i < arrayPPD.length; i++) {
  //         let b = { id: arrayPPD[i], text: arrayPPD[i]};
  //         this.listPPD.push(b); //new list for ppd;
  //       }

  //       for (let i = 0; i < arrayTyepeS.length; i++) {
  //         let b = { id: arrayTyepeS[i], text: arrayTyepeS[i]};
  //         this.listTypeS.push(b); // new list for school type;
  //       }

  //       this.searchForm.get('ppd').enable();
  //       this.searchForm.get('speacialEd').enable();
  //       this.searchForm.get('ppd').setValue('all');
  //       this.searchForm.get('speacialEd').setValue('all');
  //       this.searchForm.get('typeSchool').enable();
  //       this.searchForm.get('typeSchool').setValue('all');
  //       this.checkReqValues();

  //     }).bind(this));
  //     this.loading = false;
  //   },
  //   error => {
  //     this.loading = false;
  //   });
  // }

  convertPK(val){
    if(val == 'Y')
      val = "Ada";
    else
      val = "Tiada";

    return val;
  }

  convertPeringkat(val){
    for(let idx = 0; idx < this.listLevel.length; idx++){
      if(this.listLevel[idx].peringkat == val){
        return this.listLevel[idx]['level_'+this.lang];
      }
    }
  }

  convertAgent(level,val){
    if(level != null || val != null){
      for(let idx = 0; idx < this.listAgent2[level].length; idx++){
        if(this.listAgent2[level][idx].ejenP == val){
          return this.listAgent2[level][idx].ejenPelaksana;
        }
      }
    }else{
      return 'Tidak Berkenaan';
    }
    
  }

  convertSType(level, agent, val){
    for(let idx = 0; idx < this.listAgent2[level].length; idx++){
      if(this.listAgent2[level][idx].ejenP == agent){
        
        for(let idx2 = 0; idx2 < this.listAgent2[level][idx].stype.length; idx2++){
          if(this.listAgent2[level][idx].stype[idx2].jenis_id == val){
            return this.listAgent2[level][idx].stype[idx2].jenis_edu;
          }
        }
      }
    }
  }

  phoneFormat(val){
    if(val != null){
      return (!val.startsWith('0')) ? '0'+val : val;
    }else{
      return 'Tidak Berkenaan';
    }
  }

  getDefaultMap() {
    // var esri = require('esri-leaflet'); 
    this.mymap = L.map('dirmap').setView([4.8142568, 108.5806004], 6);
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 16,
      id: 'osm.streets', 
      accessToken: 'pk.eyJ1IjoicmVkemEiLCJhIjoiY2pmcGZxNzRrMjYzbzMwcG83bGRxY2FtZyJ9.uMHQpYc0Pvjl4us27nHH8w'
    }).addTo(this.mymap);

    // let a = L.esri.basemapLayer('Imagery');
		// //let a = esri.basemapLayer('Imagery', {maxZoom : 16});
    // this.mymap.addLayer(a);

    // const esriLayer = L.esri.basemapLayer('Streets');
    // this.mymap.addLayer(esriLayer);
    // L.esri.basemapLayer('Streets').addTo(this.mymap);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(this.mymap);
  }

  checkReqValues() {

    let reqVal = [];
    let nullPointers:any = [];
    
    if(this.searchForm.controls.jenisCarian.value == 1){
      if(this.valSchoolCat == 4){
        // reqVal =  ["optSelect","state","agent","speacialEd"];
        reqVal =  ["optSelect","agent","speacialEd"];
      }
      else if(this.valSchoolCat == 5 || this.valSchoolCat == 1){
        // reqVal =  ["optSelect","state","typeSchool", "agent","speacialEd"];
        reqVal =  ["optSelect","typeSchool", "agent"];
      }else{
        reqVal =  ["optSelect","typeSchool", "agent","speacialEd"];
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
    
    if(this.markerGroup){
      this.mymap.removeLayer(this.markerGroup); 
    } 
    this.mymap.setView([4.8142568, 108.5806004], 6.2);
    //this.searchForm.get('jenisCarian').setValue(1);
    this.valSchoolCat = 4; //peringkat 4 : prasekolah
    this.searchForm.get('optSelect').setValue(1);
    this.searchForm.get('state').setValue(null);
    this.searchForm.get('typeSchool').setValue(null);
    // this.searchForm.get('ppd').setValue(null); //to remove
    this.searchForm.get('agent').setValue(null);
    this.searchForm.get('speacialEd').setValue(null);
    this.searchForm.get('schoolname').setValue('');
    this.showDetails = false;
  }

  resetData(){
    this.recordData2 = null;
    this.prevLvl = [];
    this.prevAgnt = [];
    this.listAgent2 = {};
    this.listTypeS2 = {};
  }

  resetMethod(event) {
    this.resetSearch();
  }

  /** function to prevent special characters in input field - used in (keypress) */
  preventSpecialChar(e){   
    var k = e.charCode;
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  newRecord(value){

    this.popup.remove();
    var array = [];
    var headers = [];
    $('#dataTable th').each(function(index, item) {
        headers[index] = $(item).html();
    });
    $('#dataTable tr').has('td').each(function() {
        var arrayItem = {};
        $('td', $(this)).each(function(index, item) {
            arrayItem[headers[index]] = $(item).html();
        });
        array.push(arrayItem);
    });

    if(this.markerGroup){
      this.mymap.removeLayer(this.markerGroup);   
    }
    
    this.markerGroup = L.layerGroup();  

    if(value.length == 0){
      this.charCarian = 0;
    }

    else{
      this.charCarian = array.length
    }
    
    for (let i = 0; i <= array.length - 1; i++) {      
      this.addMarker(
        parseFloat(this.malformedDataHandler(array[i]['Lat'])),
        parseFloat(this.malformedDataHandler(array[i]['Long'])),
        array[i]['Nama Sekolah'],
        array[i]['Alamat'],
        array[i]['No. Telefon'],
        array[i]['Bandar'],
        array[i]['Negeri']
      );

    }
  
    this.mymap.addLayer(this.markerGroup);
    //$('html, body').animate({scrollTop:$('#petaHasilCarian').position().top}, 'slow');
    document.getElementById("myInput").focus();
    //console.log(JSON.stringify(array));
  }
  
  malformedDataHandler(data) {
    let tData;

    if (!data || data === 'undefined' || data == "")
      tData = "0.0"
    else
      tData = data;

    return tData
  }

  view(val){     
    let selectedData = val;

    selectedData['ejenp_desc'] = this.convertAgent(val.peringkat, val.ejenp);
    selectedData['jenis_desc'] = this.convertSType(val.peringkat, val.ejenp, val.jenis);
    selectedData['no_faks'] = this.phoneFormat(val.no_faks);
    selectedData['no_telefon'] = this.phoneFormat(val.no_telefon);
    selectedData['peringkat_desc'] = this.convertPeringkat(val.peringkat);
    selectedData['prasekolah_desc'] = this.convertPK(val.prasekolah);
    selectedData['pkhas'] = this.convertPK(val.pkhas);
  
    this.dialog.open(SchoolPopupDialog, {
      // data: {
      //   familyinfo: val
      // }
      data: {
        dataschool: val
      }
    });
  }

}

@Component({
  selector: 'school-addinfo',
  templateUrl: './school-addinfo.html',
  styleUrls: ['./school-addinfo.css']
})

export class SchoolPopupDialog {

  constructor(
    public dialogRef: MatDialogRef<SchoolPopupDialog>,
    private translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick() {
      this.dialogRef.close();
    }
}
