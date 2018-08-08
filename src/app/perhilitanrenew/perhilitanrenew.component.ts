import { Component, OnInit, Inject, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { ProtectedService } from '../services/protected.service';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TopnavService } from '../header/topnav/topnav.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {
  Ng4FilesService,
  Ng4FilesConfig,
  Ng4FilesStatus,
  Ng4FilesSelected
} from '../ng4-files';
import { environment } from '../../environments/environment';
import { setConstantValue } from '../../../node_modules/typescript';
import { stringify } from 'querystring';
import { ValidateService } from '../common/validate.service';

@Component({
  selector: 'gosg-perhilitanrenew',
  templateUrl: './perhilitanrenew.component.html',
  styleUrls: ['./perhilitanrenew.component.css']
})
export class PerhilitanrenewComponent implements OnInit, OnDestroy {

  uid: any;
  lang = this.lang;
  langID: any;
  private subscriptionLang: ISubscription;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  namaPemohon: FormControl;
  icPemohon: FormControl;
  phonePemohon: FormControl;
  emailPemohon: FormControl;
  add1: FormControl;
  add2: FormControl;
  add3: FormControl;
  poskodPemohon: FormControl;
  daerahPemohon: FormControl;
  negeriPemohon: FormControl;
    
  warganegara: FormControl;
  typeIC: FormControl;
  icpassport: FormControl;
  namaPemilik: FormControl;
  phonePemilik: FormControl;
  jobType: FormControl;
  jobGroup: FormControl;
  addPemilik: FormControl;
  poskodPemilik: FormControl;
  daerahPemilik: FormControl;
  negeriPemilik: FormControl;

  mailingAdd: FormControl;
  mailingPoskod: FormControl;
  mailingDaerah: FormControl;
  mailingNegeri: FormControl;
  copyAdd: FormControl;

  companyType: FormControl;
  jenisMilikan: FormControl;
  registerType: FormControl;
  registerNo: FormControl;
  companyName: FormControl;
  companyAdd: FormControl;
  companyPoskod: FormControl;
  companyDaerah: FormControl;
  companyNegeri: FormControl;
  companyPhone: FormControl;
  companyFax: FormControl;
  copyAddPemilik: FormControl;

  lsnActivity: FormControl;
  businessCat: FormControl;
  file1: FormControl;
  file2: FormControl;
  dispBase641: FormControl;
  dispBase642: FormControl;
  agreement: FormControl;

  public nationality: any;
  public listjic: any;
  public listOccupation: any;
  public listGroupOcc: any;
  public listdaerahT: any;
  public listdaerahSurat: any;
  public listdaerahCompany: any;
  public listStateT: any;
  public listStateSurat: any;
  public listStateComp: any;
  public listJenisMilikan: any;
  public listRegComp: any;
  public listbusiness: any;
  public listcatbuss: any;
  public dbposkod: any;
  public dbdaerah: any;
  public dbnegeri: any;

  public selectedWarganegara: any;
  public selectedTypeIC = 1;
  public selectedPoskodT: any;
  public selectedPoskodSurat: any;
  public selectedPoskodComp: any;
  public selectedOccupation: any;
  public cityT: any;
  public citySurat: any;
  public poskodIdT: any;
  public poskodIdMailing: any;
  public stateCompany: any;
  public selectedFile1: any;
  public selectedFile2: any;

  public maskPostcode: any;
  public maskIC: any;
  public maskPhone: any;

  flagHantar = true;
  flag2 = true;
  flag3 = true;
  flag4 = true;
  flag5 = true;

  constructor(
    private activatedRoute:ActivatedRoute,
    @Inject(APP_CONFIG) private config: AppConfig,
    private router: Router,
    private http: Http, 
    private translate: TranslateService, 
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private _formBuilder: FormBuilder,
    private topnavservice: TopnavService,
    private validateService:ValidateService,
    private ng4FilesService: Ng4FilesService, 
  ) { 

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
   
    this.maskPostcode = this.validateService.getMask().postcode;
    this.maskIC = this.validateService.getMask().icno2;
    this.maskPhone = this.validateService.getMask().telephone;
   

    // this.firstFormGroup = this._formBuilder.group({
    //   namaPemohon: [''],
    //   icPemohon: [''],
    //   phonePemohon: [''],
    //   emailPemohon: [''],
    //   add1: [''],
    //   add2: [''],
    //   add3: [''],
    //   poskodPemohon: [''],
    //   daerahPemohon: [''],
    //   negeriPemohon: ['']
    // });

    this.firstFormGroup = this._formBuilder.group({
      namaPemohon: new FormControl(),
      icPemohon: new FormControl(),
      phonePemohon: new FormControl(),
      emailPemohon: new FormControl(),
      add1: new FormControl(),
      add2: new FormControl(),
      add3: new FormControl(),
      poskodPemohon: new FormControl(),
      daerahPemohon: new FormControl(),
      negeriPemohon: new FormControl(),
    });

    this.secondFormGroup = this._formBuilder.group({
      warganegara: new FormControl(),
      typeIC: new FormControl(),
      icpassport: new FormControl(),
      namaPemilik: new FormControl(),
      phonePemilik: new FormControl(),
      jobType: new FormControl(),
      jobGroup: new FormControl(),
      addPemilik: new FormControl(),
      poskodPemilik: new FormControl(),
      daerahPemilik: new FormControl(),
      negeriPemilik: new FormControl()
    });

    this.thirdFormGroup = this._formBuilder.group({
      mailingAdd: new FormControl(),
      mailingPoskod: new FormControl(),
      mailingDaerah: new FormControl(),
      mailingNegeri: new FormControl(),
      copyAdd: new FormControl()
    });

    this.fourthFormGroup = this._formBuilder.group({
      companyType: new FormControl(),
      jenisMilikan: new FormControl(),
      registerType: new FormControl(),
      registerNo: new FormControl(),
      companyName: new FormControl(),
      companyAdd: new FormControl(),
      companyPoskod: new FormControl(),
      companyDaerah: new FormControl(),
      companyNegeri: new FormControl(),
      companyPhone: new FormControl(),
      companyFax: new FormControl(),
      copyAddPemilik: new FormControl()
    });

    this.fifthFormGroup = this._formBuilder.group({
      lsnActivity: new FormControl(),
      businessCat: new FormControl(),
      file1: new FormControl(),
      file2: new FormControl(),
      agreement: new FormControl(),
      dispBase641: new FormControl(),
      dispBase642: new FormControl()
    });

    this.getNationality(this.langID);
    this.getJIC(this.langID);
    this.getOccupation(this.langID);
    this.getGroupOcc(this.langID);
    this.getJenisMilikan(this.langID);
    this.getListRegComp(this.langID);
    this.getListBusiness(this.langID);
    this.getUserData();

    this.secondFormGroup.get('warganegara').setValue(1);
    this.selectedWarganegara = 1;
    this.secondFormGroup.get('typeIC').setValue(1);
    this.fourthFormGroup.get('companyType').setValue(3);
    this.fifthFormGroup.get('agreement').setValue(false);
  }

  getUserData(){
    if(!environment.staging){
      //this.getPerPostCodeFlag = false;
      this.protectedService.getUser().subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          console.log(data);
          if(data.user){
            
            let phone = data.user.address.permanentAddressHomePhoneNo.split('*')[1];

            this.firstFormGroup.get('namaPemohon').setValue(data.user.fullName);
            this.firstFormGroup.get('icPemohon').setValue(data.user.identificationNo);
            this.firstFormGroup.get('phonePemohon').setValue(phone);
            this.firstFormGroup.get('emailPemohon').setValue(data.user.email);
            this.firstFormGroup.get('add1').setValue(data.user.address.permanentAddress1);
            this.firstFormGroup.get('poskodPemohon').setValue(data.user.address.permanentAddressPostcode.postCode);
            this.firstFormGroup.get('daerahPemohon').setValue(data.user.address.permanentAddressCity.cityName);
            this.firstFormGroup.get('negeriPemohon').setValue(data.user.address.permanentAddressState.stateName);

            this.dbposkod = data.user.address.permanentAddressPostcode.postcodeId;
            this.dbdaerah = data.user.address.permanentAddressCity.cityId;
            this.dbnegeri = data.user.address.permanentAddressState.stateId;

            // this.protectedService.getProfile(data.user.pid).subscribe(
            // data => {
            //   this.sharedService.errorHandling(data, (function(){
                                
            //   }).bind(this));
            // },
            // error => {
            // });
          }else{
          }
        }).bind(this));

      },
      error => {
          location.href = this.config.urlUAP +'uapsso/Logout';
          //location.href = this.config.urlUAP+'portal/index';
      });
    }

    else{ //need to be deleted Noraini for local only
      

      let data = {
        "user": {
          "userId": 116,
          "pid": "700101712555",
          "identificationNo": "700101712555",
          "passportNo": "",
          "fullName": "ZAKARIA BIN MOHD NOR",
          "email": "zakariatestgosg@yopmail.com",
          "mobilePhoneNo": "1-684*123-1231 2312",
          "agencyForwardUrl": "https://www.mimos.my",
          "address": {
            "addressId": 247,
            "addressType": null,
            "permanentAddress1": "no 123, jln kambingg 1",
            "permanentAddress2": "",
            "permanentAddress3": "",
            "correspondingAddress1": "no 123, jln kambingg 1",
            "correspondingAddress2": "",
            "correspondingAddress3": "",
            "permanentAddressCountry": {
              "countryId": 152,
              "countryCode": "MY",
              "countryName": "Malaysia",
              "countryDialCode": "60"
            },
            "permanentAddressState": {
              "stateId": 25,
              "stateName": "Sarawak",
              "country": {
                "countryId": 152,
                "countryCode": "MY",
                "countryName": "Malaysia",
                "countryDialCode": "60"
              }
            },
            "permanentAddressCity": {
              "cityId": 375,
              "cityName": "Simunjan",
              "cityCode": "1340",
              "state": {
                "stateId": 25,
                "stateName": "Sarawak",
                "country": {
                  "countryId": 152,
                  "countryCode": "MY",
                  "countryName": "Malaysia",
                  "countryDialCode": "60"
                }
              }
            },
            "permanentAddressPostcode": {
              "postcodeId": 2679,
              "postCode": "94809",
              "city": {
                "cityId": 375,
                "cityName": "Simunjan",
                "cityCode": "1340",
                "state": {
                  "stateId": 25,
                  "stateName": "Sarawak",
                  "country": {
                    "countryId": 152,
                    "countryCode": "MY",
                    "countryName": "Malaysia",
                    "countryDialCode": "60"
                  }
                }
              }
            },
            "permanentAddressHomePhoneNo": "60*019-2939 3939"
          }
        }
      }

      let phone = data.user.address.permanentAddressHomePhoneNo.split('*')[1];

      this.firstFormGroup.get('namaPemohon').setValue(data.user.fullName);
      this.firstFormGroup.get('icPemohon').setValue(data.user.identificationNo);
      this.firstFormGroup.get('phonePemohon').setValue(phone);
      this.firstFormGroup.get('emailPemohon').setValue(data.user.email);
      this.firstFormGroup.get('add1').setValue(data.user.address.permanentAddress1);
      this.firstFormGroup.get('poskodPemohon').setValue(data.user.address.permanentAddressPostcode.postCode);
      this.firstFormGroup.get('daerahPemohon').setValue(data.user.address.permanentAddressCity.cityName);
      this.firstFormGroup.get('negeriPemohon').setValue(data.user.address.permanentAddressState.stateName);

      this.dbposkod = data.user.address.permanentAddressPostcode.postcodeId;
      this.dbdaerah = data.user.address.permanentAddressCity.cityId;
      this.dbnegeri = data.user.address.permanentAddressState.stateId;
    }
  }

  getNationality(lang){
    this.protectedService.getProtected('perhilitan/dropdown/nationality',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.nationality = data.perhilitanNationalityResourceList;     

      }).bind(this));
    },
    error => {            
    });
  }

  getJIC(lang){
    this.protectedService.getProtected('perhilitan/dropdown/ictype/1',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listjic = data.dropdownResourceList;     
      }).bind(this));
    },
    error => {
    });
  }

  getOccupation(lang){
    this.protectedService.getProtected('perhilitan/dropdown/job',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listOccupation = data.perhilitanJobTypeResourceList;     

      }).bind(this));
    },
    error => {            
    });
  }

  getGroupOcc(lang){

    this.protectedService.getProtected('perhilitan/dropdown/job/workgroup/1',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listGroupOcc = data.dropdownResourceList;     

      }).bind(this));
    },
    error => {            
    });
  }

  getJenisMilikan(lang){
    this.protectedService.getProtected('perhilitan/jenispemilikan',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listJenisMilikan = data.perhilitanJenisPemilikanResourceList;     

      }).bind(this));
    },
    error => {            
    });
  }

  getListRegComp(lang){
    this.protectedService.getProtected('perhilitan/dropdown/regtype',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listRegComp = data.perhilitanRegisterTypeResourceList;     

      }).bind(this));
    },
    error => {            
    });
  }

  getListBusiness(lang){

    this.protectedService.getProtected('perhilitan/business',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listbusiness = data.perhilitanBusinessCategoryResourceList;     

      }).bind(this));
    },
    error => {            
    });
  }

  getDetailIC(lang, formValue: any){

    if(formValue.icpassport.length > 5){

      this.flag2 = true; 
      this.flag3 = true; 

      this.protectedService.getProtected('perhilitan/searchnokp/'+formValue.icpassport,lang).subscribe(
      data => {

        this.sharedService.errorHandling(data, (function(){
          console.log(data);    
          if(data.noKpResourceList[0].nama != ""){
            this.secondFormGroup.get('namaPemilik').setValue(data.noKpResourceList[0].nama);
            this.secondFormGroup.get('phonePemilik').setValue(data.noKpResourceList[0].notel);
            this.secondFormGroup.get('jobType').setValue(parseInt(data.noKpResourceList[0].pekerjaan));
            this.secondFormGroup.get('jobGroup').setValue(parseInt(data.noKpResourceList[0].kumpulanpekerjaan));
            this.secondFormGroup.get('addPemilik').setValue(data.noKpResourceList[0].alamat);
            this.secondFormGroup.get('poskodPemilik').setValue(data.noKpResourceList[0].poskod);
            
            this.thirdFormGroup.get('mailingAdd').setValue(data.noKpResourceList[0].alamatsurat);
            this.thirdFormGroup.get('mailingPoskod').setValue(data.noKpResourceList[0].poskodsurat);        
            
            this.selectedPoskodT = data.noKpResourceList[0].poskod;
            this.selectedPoskodSurat = data.noKpResourceList[0].poskodsurat;
            this.selectedOccupation = parseInt(data.noKpResourceList[0].pekerjaan);
            this.cityT = data.noKpResourceList[0].postcodeid;
            this.citySurat = data.noKpResourceList[0].postcodeidsurat;
          
            this.checkposkod(1, this.selectedPoskodT);
            this.checkposkod(2, this.selectedPoskodSurat);
            
            this.secondFormGroup.get('namaPemilik').disable();
            this.secondFormGroup.get('addPemilik').disable();
            this.secondFormGroup.get('poskodPemilik').disable();
            this.secondFormGroup.get('daerahPemilik').disable();
            this.secondFormGroup.get('negeriPemilik').disable();

          }

          else{
            this.resetForm23();
          }

        }).bind(this));
      },
      error => {
      });
    }

    else{
      this.resetForm23();
    }

  }

  resetForm23(){
    
    this.secondFormGroup.get('namaPemilik').setValue('');
    this.secondFormGroup.get('phonePemilik').setValue('');
    this.secondFormGroup.get('jobType').setValue(1);
    this.secondFormGroup.get('jobGroup').setValue('');
    this.secondFormGroup.get('addPemilik').setValue('');
    this.secondFormGroup.get('poskodPemilik').setValue('');
    this.secondFormGroup.get('daerahPemilik').setValue('');
    this.secondFormGroup.get('negeriPemilik').setValue('');

    this.thirdFormGroup.get('mailingAdd').setValue('');
    this.thirdFormGroup.get('mailingPoskod').setValue('');        
    this.thirdFormGroup.get('mailingDaerah').setValue('');
    this.thirdFormGroup.get('mailingNegeri').setValue('');

    this.secondFormGroup.get('namaPemilik').enable();
    this.secondFormGroup.get('addPemilik').enable();
    this.secondFormGroup.get('poskodPemilik').enable();
    this.secondFormGroup.get('daerahPemilik').enable();
    this.secondFormGroup.get('negeriPemilik').enable();

    this.checkReqValues2();
  }

  checkReqValues2() {
    let reqVal: any;

    if(this.selectedOccupation == 1 || this.secondFormGroup.get('jobType').value == 1){
      reqVal = ["icpassport", 
                "namaPemilik", 
                "phonePemilik", 
                "jobType", 
                "jobGroup",
                "addPemilik","poskodPemilik","daerahPemilik","negeriPemilik"];
    }
    else{
      reqVal = ["icpassport", 
                "namaPemilik", 
                "phonePemilik", 
                "jobType", 
                "addPemilik","poskodPemilik","daerahPemilik","negeriPemilik"];
    }

    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.secondFormGroup.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.flag2 = true;
    } else {
      this.flag2 = false;
    }

  }

  checkReqValues3(){
    let reqVal: any;

    reqVal = ["mailingAdd",
              "mailingPoskod",
              "mailingDaerah",
              "mailingNegeri"];
    

    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.thirdFormGroup.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.flag3 = true;
    } else {
      this.flag3 = false;
    }
  }

  checkReqValues4(){
    let reqVal: any;

    reqVal = ["companyType",
              "registerType",
              "registerNo",
              "companyName",
              "companyAdd",
              "companyPoskod",
              "companyDaerah",
              "companyNegeri",
              "companyPhone"];
    
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.fourthFormGroup.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.flag4 = true;
    } else {
      this.flag4 = false;
    }
  }

  checkReqValues5() {

    let reqVal: any = ["lsnActivity", "businessCat", "file1", "file2"];
    let nullPointers: any = [];

    for (var reqData of reqVal) {
      let elem = this.fifthFormGroup.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.flag5 = true;
    } else {
      this.flag5 = false;
    }
  }

  checkWarganegara(formValue: any){

    this.selectedWarganegara = formValue.warganegara;

    if(formValue.warganegara == 1){
      this.secondFormGroup.get('typeIC').setValue(1);
    }

    else{
      this.secondFormGroup.get('typeIC').setValue(0);
    }
  }

  checkTypeIc(formValue: any){

    this.selectedTypeIC = formValue.typeIC;

    if(this.selectedTypeIC == 1){
      this.selectedTypeIC = 1;
    }

    else{
      this.selectedTypeIC = 0;
    }
  }

  checkOccupation(formValue: any){
    this.selectedOccupation = formValue.jobType;

    if(formValue.jobType != 1){
      this.secondFormGroup.get('jobGroup').setValue(null);
      this.secondFormGroup.get('jobGroup').disable();
    }

    else{
      this.secondFormGroup.get('jobGroup').enable();
    }
   
    this.checkReqValues2();
  }

  checkposkod(val, valP){

    let valPoskod: any;

    this.secondFormGroup.get('negeriPemilik').disable();
    this.thirdFormGroup.get('mailingNegeri').disable();
    this.fourthFormGroup.get('companyNegeri').disable();
   
    if(typeof(valP) == "object"){
      if(val == 1){
        this.secondFormGroup.get('daerahPemilik').setValue('');  
        this.secondFormGroup.get('negeriPemilik').setValue('');  
        valPoskod = valP.poskodPemilik;
      }

      else if (val == 2){
        this.thirdFormGroup.get('mailingDaerah').setValue('');     
        this.thirdFormGroup.get('mailingNegeri').setValue('');              
        valPoskod = valP.mailingPoskod;
      }

      else{
        this.fourthFormGroup.get('companyDaerah').setValue('');     
        this.fourthFormGroup.get('companyNegeri').setValue('');    
        valPoskod = valP.companyPoskod;
      }
    }

    else{
      if(val == 1)
        valPoskod = this.selectedPoskodT;

      else if (val == 2)
        valPoskod = this.selectedPoskodSurat;

      else
        valPoskod = this.selectedPoskodComp;
    }
  
    this.protectedService.getProtected('perhilitan/poskod/'+valPoskod,this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){

        if(val == 1){ // alamat tetap
          this.listdaerahT = data.postcodeResourceList;  

          if(this.listdaerahT.length == 1){      
            this.poskodIdT = this.listdaerahT[0].postcodeId;
            this.secondFormGroup.get('daerahPemilik').setValue(this.listdaerahT[0].postcodeId);  
            this.secondFormGroup.get('negeriPemilik').setValue(this.listdaerahT[0].state);          
          }

          else{ //when city more than one
            for (let i = 0; i < this.listdaerahT.length; i++) { 

              if(this.cityT != undefined && this.cityT == this.listdaerahT[i].postcodeId){                
                this.poskodIdT = this.listdaerahT[i].postcodeId;
                this.secondFormGroup.get('daerahPemilik').setValue(this.listdaerahT[i].postcodeId);
                this.secondFormGroup.get('negeriPemilik').setValue(this.listdaerahT[i].state);              
              }
            }                   
          }

          this.checkReqValues2();
        }

        else if(val == 2){ // surat menyurat
          this.listdaerahSurat = data.postcodeResourceList;   

          if(this.listdaerahSurat.length == 1){
            this.poskodIdMailing = this.listdaerahSurat[0].postcodeId;
            this.thirdFormGroup.get('mailingDaerah').setValue(this.listdaerahSurat[0].postcodeId);     
            this.thirdFormGroup.get('mailingNegeri').setValue(this.listdaerahSurat[0].state); 
          }

          else{ //when city more than one
            for (let i = 0; i < this.listdaerahSurat.length; i++) { 

              if(this.citySurat != undefined && this.citySurat == this.listdaerahSurat[i].postcodeId){               
                this.poskodIdMailing = this.listdaerahSurat[i].postcodeId;
                this.thirdFormGroup.get('mailingDaerah').setValue(this.listdaerahSurat[i].postcodeId);     
                this.thirdFormGroup.get('mailingNegeri').setValue(this.listdaerahSurat[i].state); 
              }
            }  
          }

          this.checkReqValues3();
        }

        else{ // company
          this.listdaerahCompany = data.postcodeResourceList;   

          if(this.listdaerahCompany.length == 1){

            this.stateCompany = this.listdaerahCompany[0].formValue;
            this.fourthFormGroup.get('companyDaerah').setValue(this.listdaerahCompany[0].postcodeId);     
            this.fourthFormGroup.get('companyNegeri').setValue(this.listdaerahCompany[0].state);       
          }

          else{ //when city more than one
         
          }

          this.checkReqValues4();
        }

      }).bind(this));
    },
    error => {            
    });    
  }

  checkState(val, formValues){
     
    if(val == 1){
      formValues = formValues.daerahPemilik;
  
      for (let i = 0; i < this.listdaerahT.length; i++) { 
        if(formValues == this.listdaerahT[i].postcodeId){
          this.poskodIdT = this.listdaerahT[i].postcodeId;
          this.secondFormGroup.get('negeriPemilik').setValue(this.listdaerahT[i].state); 
        }
      } 
    } 
    
    else if(val == 2){
      formValues = formValues.mailingDaerah;

      for (let i = 0; i < this.listdaerahSurat.length; i++) { 
        if(formValues == this.listdaerahSurat[i].postcodeId){
          this.poskodIdMailing = this.listdaerahSurat[i].postcodeId;
          this.thirdFormGroup.get('mailingNegeri').setValue(this.listdaerahSurat[i].state); 
        }
      } 
    }

    else{
      formValues = formValues.companyDaerah;

      for (let i = 0; i < this.listdaerahCompany.length; i++) { 
        if(formValues == this.listdaerahCompany[i].postcodeId){
          this.stateCompany = this.listdaerahCompany[i].formValue;
          this.fourthFormGroup.get('companyNegeri').setValue(this.listdaerahCompany[i].state); 
        }
      } 
    }
    
  }

  changeBuss(formValue: any){
    this.protectedService.getProtected('perhilitan/activity/catbusiness/ref/'+formValue.lsnActivity,this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listcatbuss = data.perhilitanBusinessCategoryResourceList;     
        this.checkReqValues5();

      }).bind(this));
    },
    error => {            
    });
  }

  clickCopyAdd(){

    let chkboxCopyAdd = this.thirdFormGroup.get('copyAdd').value;

    if(chkboxCopyAdd == true){

      this.selectedPoskodSurat = this.secondFormGroup.get('poskodPemilik').value;            
      this.thirdFormGroup.get('mailingAdd').setValue(this.secondFormGroup.get('addPemilik').value);     
      this.thirdFormGroup.get('mailingPoskod').setValue(this.secondFormGroup.get('poskodPemilik').value);   
      this.checkposkod(2, this.secondFormGroup.get('poskodPemilik').value);       
    }

    else{

      this.thirdFormGroup.get('mailingAdd').setValue('');     
      this.thirdFormGroup.get('mailingPoskod').setValue('');     
      this.thirdFormGroup.get('mailingDaerah').setValue('');  
      this.thirdFormGroup.get('mailingNegeri').setValue('');        
    }

    this.checkReqValues3();
  }

  clickCopyAddPemilik(){

    let chkboxCopyAdd = this.fourthFormGroup.get('copyAddPemilik').value;

    if(chkboxCopyAdd == true){
      
      this.selectedPoskodComp = this.secondFormGroup.get('poskodPemilik').value;   
      this.fourthFormGroup.get('companyAdd').setValue(this.secondFormGroup.get('addPemilik').value);     
      this.fourthFormGroup.get('companyPoskod').setValue(this.secondFormGroup.get('poskodPemilik').value);   
      this.checkposkod(3, this.secondFormGroup.get('poskodPemilik').value);       
    }

    else{

      this.fourthFormGroup.get('companyAdd').setValue('');     
      this.fourthFormGroup.get('companyPoskod').setValue('');     
      this.fourthFormGroup.get('companyDaerah').setValue('');  
      this.fourthFormGroup.get('companyNegeri').setValue('');        
    }

    this.checkReqValues3();
  }

  uploadFile1(selectedFiles: Ng4FilesSelected, lan): void {    
   
    let nameFile1 = selectedFiles.files[0].name;  
    let sizeFile = selectedFiles.files[0].size;
    let extFile = selectedFiles.files[0].name.split('.')[1];
  
    this.selectedFile1 = [];
    this.selectedFile1.push(selectedFiles);
    this.fifthFormGroup.controls.file1.setValue(nameFile1);

    if(extFile.toLowerCase() != 'pdf'){
      this.toastr.error('Fail format PDF sahaja yang dibenarkan.');
      this.fifthFormGroup.controls.file1.setValue(null);
      this.fifthFormGroup.controls.dispBase641.setValue(null);
    }

    else{
      if(sizeFile >  1048576){ //1048576
        this.toastr.error('Fail tidak boleh melebihi 2MB');
        this.fifthFormGroup.controls.file1.setValue(null);
        this.fifthFormGroup.controls.dispBase641.setValue(null);
      }
    }

    this.changeBase641(this.selectedFile1);         
    this.checkReqValues5(); 
  
  }

  uploadFile2(selectedFiles: Ng4FilesSelected, lan): void {    

    let nameFile1 = selectedFiles.files[0].name;
    let sizeFile = selectedFiles.files[0].size;
    let extFile = selectedFiles.files[0].name.split('.')[1];

    this.selectedFile2 = [];
    this.selectedFile2.push(selectedFiles);
    this.fifthFormGroup.controls.file2.setValue(nameFile1);

    if(extFile.toLowerCase() != 'pdf'){
      this.toastr.error('Fail format PDF sahaja yang dibenarkan.');
      this.fifthFormGroup.controls.file2.setValue(null);
      this.fifthFormGroup.controls.dispBase642.setValue(null);
    }

    else{
      if(sizeFile >  1048576){ //1048576
        this.toastr.error('Fail tidak boleh melebihi 2MB');
        this.fifthFormGroup.controls.file2.setValue(null);
        this.fifthFormGroup.controls.dispBase642.setValue(null);
      }
    }

    this.changeBase642(this.selectedFile2);
    this.checkReqValues5();
  }

  changeBase641(inputValue: any): void {
    var file:File = inputValue[0].files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      let base641 = myReader.result;
      let splitB64 = base641.split('data:application/pdf;base64,')[1];          
      this.fifthFormGroup.get('dispBase641').setValue(splitB64);
    }
    myReader.readAsDataURL(file);
  }

  changeBase642(inputValue: any): void {
    var file:File = inputValue[0].files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      let base642 = myReader.result;
      let splitB64 = base642.split('data:application/pdf;base64,')[1];          
      this.fifthFormGroup.get('dispBase642').setValue(splitB64);
    }
    myReader.readAsDataURL(file);
  }

  clickHantar(){
    let clickSubmit = this.fifthFormGroup.get('agreement');

    if(clickSubmit.value == true){
      this.flagHantar = true;
    }else{
      this.flagHantar = false;
    }
  }

  draft(){
   
    // let formData: FormData = new FormData();
    // for (let file of this.selectedFile1) {
    //   formData.append('roc', file.files[0], file.files[0].name);
    // }
    // for (let file of this.selectedFile2) {
    //   formData.append('pbt', file.files[0], file.files[0].name);
    // }
  
    let body = {
      "licensePasscode": "",
      "licenseNo": "",
      "userFullname": null,
      "userAddress": "",
      "userPostcode": "",
      "userPostcodeId":"",
      "userMailingPostcodeId":"",
      "userMailingAddress": "",
      "userMailingPostcode": "",
      "userIcNo": null,
      "userEmail": null,
      "userApplicationType": "Apply",
      "userPhoneNo": "",
      "userFaxNo": "",
      "userCompanyName": "",
      "userCompanyAddress": "",
      "userCompanyPostcode": "",
      "userCompanyPhoneNo": "",
      "userCompanyFaxNo": "",
      "userCompanyRegNo": "",
      "userCompanyDistrict": "",
      "attachFileRoc": "",
      "extFileRoc": "",
      "attachFilePbt": "",
      "extFilePbt": "",
      "attachFileIc": "",
      "extFileIc": "",
      "userApplyStatus": "",
      "userLicenseNoStatus": "",
      "userLicenseRenewStatus": "",
      "userLicenseCronRenewStatus": "",
      "nationality": {
        "nationalityId": null
      },
      "icType": {
        "icTypeId": null,
        "nationality": {
          "nationalityId": null,
        }
      },
      "jobType": {
        "jobTypeId": null,
      },
      "workgroup": {
        "workGroupId": null,
        "jobType": {
          "jobTypeId": null
        }
      },
      "businessType": {
        "businessTypeId": null
      },
      "registerType": {
        "registerTypeId": null
      },
      "state": {
        "stateId": null
      },
      "activity": {
        "activityId": null
      },
      "businessCategory": {
        "businessCategoryId": null
      },
      "isDraft": null,
      "cronStatus": false
    }

    body.licensePasscode = "";
    body.licenseNo = "";
    body.userFullname = this.secondFormGroup.get('namaPemilik').value;
    body.userAddress = this.secondFormGroup.get('addPemilik').value;
    body.userPostcode = this.secondFormGroup.get('poskodPemilik').value; 
    body.userPostcodeId = this.poskodIdT; 
    body.userMailingPostcodeId = this.poskodIdMailing;    
    body.userMailingAddress = this.thirdFormGroup.get('mailingAdd').value;
    body.userMailingPostcode = this.thirdFormGroup.get('mailingPoskod').value;
    body.userIcNo = this.secondFormGroup.get('icpassport').value;
    body.userEmail = this.firstFormGroup.get('emailPemohon').value;
    body.userApplicationType = "Draft";
    body.userPhoneNo = this.secondFormGroup.get('phonePemilik').value;
    body.userFaxNo = "";
    body.userCompanyName = this.fourthFormGroup.get('companyName').value;
    body.userCompanyAddress = this.fourthFormGroup.get('companyAdd').value;
    body.userCompanyPostcode = this.fourthFormGroup.get('companyPoskod').value;
    body.userCompanyPhoneNo = this.fourthFormGroup.get('companyPhone').value;
    body.userCompanyFaxNo = this.fourthFormGroup.get('companyFax').value;
    body.userCompanyRegNo = this.fourthFormGroup.get('registerNo').value;
    body.userCompanyDistrict = this.fourthFormGroup.get('companyDaerah').value; 
    body.attachFileRoc = this.fifthFormGroup.get('dispBase641').value;
    body.extFileRoc = this.selectedFile1[0].files[0].name.split('.')[1];
    body.attachFilePbt = this.fifthFormGroup.get('dispBase642').value;
    body.extFilePbt = this.selectedFile2[0].files[0].name.split('.')[1];
    body.attachFileIc = "";  
    body.extFileIc = "";
    body.userApplyStatus = "";
    body.userLicenseNoStatus = "";
    body.userLicenseRenewStatus = "";
    body.userLicenseCronRenewStatus = "";
    body.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
    body.icType.icTypeId = this.secondFormGroup.get('typeIC').value; 
    body.icType.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
    body.jobType.jobTypeId = this.secondFormGroup.get('jobGroup').value;
    body.workgroup.workGroupId = this.secondFormGroup.get('jobType').value; 
    body.workgroup.jobType.jobTypeId = this.secondFormGroup.get('jobType').value; 
    body.businessType.businessTypeId = this.fourthFormGroup.get('companyType').value; 
    body.registerType.registerTypeId = this.fourthFormGroup.get('registerType').value; 
    body.state.stateId = this.stateCompany;
    body.activity.activityId = this.fifthFormGroup.get('lsnActivity').value; 
    body.businessCategory.businessCategoryId = this.fifthFormGroup.get('businessCat').value;
    body.isDraft = "True";
    body.cronStatus = false;
    
    // Add Media file upload Service
   
    console.log(JSON.stringify(body));
    
    this.protectedService.create(body,'perhilitan/draft/save',this.langID).subscribe(
    data => {
      this.sharedService.errorHandling(data, (function () {
        this.toastr.success(this.translate.instant('Permohonan Baru Lesen Peniaga/Taksidermi berjaya disimpan sebagai draft'), '');
        console.log("SUBMITTED");
        console.log(data);
        //this.router.navigate(['media/upload']);
      }).bind(this));
      //this.loading = false;
    },
    error => {
      //this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
    });
    
  }  

  submit(){

    let body = {
      "licensePasscode": "",
      "licenseNo": "",
      "userFullname": null,
      "userAddress": "",
      "userPostcode": "",
      "userPostcodeId":"",
      "userMailingPostcodeId":"",
      "userMailingAddress": "",
      "userMailingPostcode": "",
      "userIcNo": null,
      "userEmail": null,
      "userApplicationType": "Apply",
      "userPhoneNo": "",
      "userFaxNo": "",
      "userCompanyName": "",
      "userCompanyAddress": "",
      "userCompanyPostcode": "",
      "userCompanyPhoneNo": "",
      "userCompanyFaxNo": "",
      "userCompanyRegNo": "",
      "userCompanyDistrict": "",
      "attachFileRoc": "",
      "extFileRoc": "",
      "attachFilePbt": "",
      "extFilePbt": "",
      "attachFileIc": "",
      "extFileIc": "",
      "userApplyStatus": "",
      "userLicenseNoStatus": "",
      "userLicenseRenewStatus": "",
      "userLicenseCronRenewStatus": "",
      "nationality": {
        "nationalityId": null
      },
      "icType": {
        "icTypeId": null,
        "nationality": {
          "nationalityId": null,
        }
      },
      "jobType": {
        "jobTypeId": null,
      },
      "workgroup": {
        "workGroupId": null,
        "jobType": {
          "jobTypeId": null
        }
      },
      "businessType": {
        "businessTypeId": null
      },
      "registerType": {
        "registerTypeId": null
      },
      "state": {
        "stateId": null
      },
      "activity": {
        "activityId": null
      },
      "businessCategory": {
        "businessCategoryId": null
      },
      "isDraft": null,
      "cronStatus": false
    }

    body.licensePasscode = "";
    body.licenseNo = "";
    body.userFullname = this.secondFormGroup.get('namaPemilik').value;
    body.userAddress = this.secondFormGroup.get('addPemilik').value;
    body.userPostcode = this.secondFormGroup.get('poskodPemilik').value; 
    body.userPostcodeId = this.poskodIdT; 
    body.userMailingPostcodeId = this.poskodIdMailing;    
    body.userMailingAddress = this.thirdFormGroup.get('mailingAdd').value;
    body.userMailingPostcode = this.thirdFormGroup.get('mailingPoskod').value;
    body.userIcNo = this.secondFormGroup.get('icpassport').value;
    body.userEmail = this.firstFormGroup.get('emailPemohon').value;
    body.userApplicationType = "Apply";
    body.userPhoneNo = this.secondFormGroup.get('phonePemilik').value;
    body.userFaxNo = "";
    body.userCompanyName = this.fourthFormGroup.get('companyName').value;
    body.userCompanyAddress = this.fourthFormGroup.get('companyAdd').value;
    body.userCompanyPostcode = this.fourthFormGroup.get('companyPoskod').value;
    body.userCompanyPhoneNo = this.fourthFormGroup.get('companyPhone').value;
    body.userCompanyFaxNo = this.fourthFormGroup.get('companyFax').value;
    body.userCompanyRegNo = this.fourthFormGroup.get('registerNo').value;
    body.userCompanyDistrict = this.fourthFormGroup.get('companyDaerah').value; 
    body.attachFileRoc = this.fifthFormGroup.get('dispBase641').value;
    body.extFileRoc = this.selectedFile1[0].files[0].name.split('.')[1];
    body.attachFilePbt = this.fifthFormGroup.get('dispBase642').value;
    body.extFilePbt = this.selectedFile2[0].files[0].name.split('.')[1];
    body.attachFileIc = "";  
    body.extFileIc = "";
    body.userApplyStatus = "";
    body.userLicenseNoStatus = "";
    body.userLicenseRenewStatus = "";
    body.userLicenseCronRenewStatus = "";
    body.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
    body.icType.icTypeId = this.secondFormGroup.get('typeIC').value; 
    body.icType.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
    body.jobType.jobTypeId = this.secondFormGroup.get('jobGroup').value;
    body.workgroup.workGroupId = this.secondFormGroup.get('jobType').value; 
    body.workgroup.jobType.jobTypeId = this.secondFormGroup.get('jobType').value; 
    body.businessType.businessTypeId = this.fourthFormGroup.get('companyType').value; 
    body.registerType.registerTypeId = this.fourthFormGroup.get('registerType').value; 
    body.state.stateId = this.stateCompany;
    body.activity.activityId = this.fifthFormGroup.get('lsnActivity').value; 
    body.businessCategory.businessCategoryId = this.fifthFormGroup.get('businessCat').value;
    body.isDraft = "True";
    body.cronStatus = false;
    
    // Add Media file upload Service
   
    console.log(JSON.stringify(body));
    
    this.protectedService.create(body,'perhilitan/draft/save',this.langID).subscribe(
    data => {
      this.sharedService.errorHandling(data, (function () {
        this.toastr.success(this.translate.instant('Permohonan Baru Lesen Peniaga/Taksidermi berjaya dihantar'), '');
        //this.router.navigate(['media/upload']);
      }).bind(this));
      //this.loading = false;
    },
    error => {
      //this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
    });
  }

}