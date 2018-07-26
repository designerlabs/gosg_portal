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

@Component({
  selector: 'gosg-perhilitan',
  templateUrl: './perhilitan.component.html',
  styleUrls: ['./perhilitan.component.css']
})
export class PerhilitanComponent implements OnInit, OnDestroy {

  uid: any;
  lang = this.lang;
  langID: any;
  private subscriptionLang: ISubscription;

  isLinear = false;
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
  agreement: FormControl;

  public nationality: any;
  public listjic: any;
  public listOccupation: any;
  public listGroupOcc: any;
  public listdaerah: any;
  public listRegComp: any;
  public listbusiness: any;
  public listcatbuss: any;
  public dbposkod: any;
  public dbdaerah: any;
  public dbnegeri: any;

  public selectedWarganegara: any;
  public selectedPoskod: any;
  public selectedOccupation: any;

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
      agreement: new FormControl()
    });

    this.getNationality(this.langID);
    this.getJIC(this.langID);
    this.getOccupation(this.langID);
    this.getGroupOcc(this.langID);
    this.getListRegComp(this.langID);
    this.getListBusiness(this.langID);
    this.getUserData();

    this.secondFormGroup.get('warganegara').setValue(1);
    this.selectedWarganegara = 1;
    this.secondFormGroup.get('typeIC').setValue(1);
    this.fifthFormGroup.get('agreement').setValue(false);
  }

  uploadFile1(selectedFiles: Ng4FilesSelected, lan): void {    

    console.log(selectedFiles.files.length);

    let nameFile1 = selectedFiles.files[0].name;
    console.log(nameFile1);

    this.fifthFormGroup.controls.file1.setValue(nameFile1);
    this.checkReqValues5();
    // let mFileSize = this.chkUploadFile.maxSize;
    
    // let fileExtn = selectedFiles.files[0].name.split('.')[1];
    // let chkFileExtn = this.resFileExtn.filter(fData => fData === fileExtn.toLowerCase());
    // if (selectedFiles.status === Ng4FilesStatus.STATUS_SUCCESS) {      
    //   if (selectedFiles.files.length > 0 && mFileSize) {        
    //     if (selectedFiles.files[0].size <= mFileSize) {
    //       // Check File extn  
    //       if (chkFileExtn.length > 0){
   
    //         this.mediaFileUpForm.controls.mediaFileEn.setValue(this.selectedFilesEn);
    
    //        }else {
    //         this.toastr.error('File Extension not match');
    //        }    
    //     }else{
    //       this.toastr.error('File Size Exceed maximum file size');
    //     }
    //   }      
    // }
  }

  uploadFile2(selectedFiles: Ng4FilesSelected, lan): void {    

    console.log(selectedFiles.files.length);

    let nameFile1 = selectedFiles.files[0].name;
    console.log(nameFile1);

    this.fifthFormGroup.controls.file2.setValue(nameFile1);
    this.checkReqValues5();
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
          this.secondFormGroup.get('daerahPemilik').setValue(data.noKpResourceList[0].daerah);
          this.secondFormGroup.get('negeriPemilik').setValue(data.noKpResourceList[0].negeri);

          this.thirdFormGroup.get('mailingAdd').setValue(data.noKpResourceList[0].alamatsurat);
          this.thirdFormGroup.get('mailingPoskod').setValue(data.noKpResourceList[0].poskodsurat);        
          this.thirdFormGroup.get('mailingDaerah').setValue(data.noKpResourceList[0].poskodsurat);
          this.thirdFormGroup.get('mailingNegeri').setValue(data.noKpResourceList[0].poskodsurat);

          this.selectedPoskod = data.noKpResourceList[0].poskodsurat;
          this.selectedOccupation = parseInt(data.noKpResourceList[0].pekerjaan);
          this.checkposkod('','');

          this.secondFormGroup.get('namaPemilik').disable();
          this.secondFormGroup.get('addPemilik').disable();
          this.secondFormGroup.get('poskodPemilik').disable();
          this.secondFormGroup.get('daerahPemilik').disable();
          this.secondFormGroup.get('negeriPemilik').disable();

          this.flag2 = false;   
        }

        else{
          this.flag2 = true; 

          this.secondFormGroup.get('namaPemilik').setValue(data.noKpResourceList[0].nama);
          this.secondFormGroup.get('phonePemilik').setValue(data.noKpResourceList[0].notel);
          this.secondFormGroup.get('jobType').setValue(parseInt(data.noKpResourceList[0].pekerjaan));
          this.secondFormGroup.get('jobGroup').setValue(parseInt(data.noKpResourceList[0].kumpulanpekerjaan));
          this.secondFormGroup.get('addPemilik').setValue(data.noKpResourceList[0].alamat);
          this.secondFormGroup.get('poskodPemilik').setValue(data.noKpResourceList[0].poskod);
          this.secondFormGroup.get('daerahPemilik').setValue(data.noKpResourceList[0].daerah);
          this.secondFormGroup.get('negeriPemilik').setValue(data.noKpResourceList[0].negeri);

          this.thirdFormGroup.get('mailingAdd').setValue(data.noKpResourceList[0].alamatsurat);
          this.thirdFormGroup.get('mailingPoskod').setValue(data.noKpResourceList[0].poskodsurat);        
          this.thirdFormGroup.get('mailingDaerah').setValue(data.noKpResourceList[0].poskodsurat);
          this.thirdFormGroup.get('mailingNegeri').setValue(data.noKpResourceList[0].poskodsurat);

          this.selectedPoskod = data.noKpResourceList[0].poskodsurat;
          this.selectedOccupation = parseInt(data.noKpResourceList[0].pekerjaan);
          this.checkposkod('','');

          this.secondFormGroup.get('namaPemilik').enable();
          this.secondFormGroup.get('addPemilik').enable();
          this.secondFormGroup.get('poskodPemilik').enable();
          this.secondFormGroup.get('daerahPemilik').enable();
          this.secondFormGroup.get('negeriPemilik').enable();
          
          this.checkReqValues2();
        }

      }).bind(this));
    },
    error => {
    });

  }

  checkReqValues2() {

    let reqVal: any = ["icpassport", "namaPemilik", "phonePemilik", "jobType", "jobGroup"];
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

  checkOccupation(formValue: any){
    this.selectedOccupation = formValue.jobType;

    if(formValue.jobType != 1){
      this.secondFormGroup.get('jobGroup').setValue(0);
      this.secondFormGroup.get('jobGroup').disable();
    }

    else{
      this.secondFormGroup.get('jobGroup').enable();
    }

    this.checkReqValues2();
  }

  checkposkod(val, formValue: any){

    console.log(val);
    let valPoskod: any;
    if(val == 2){
      valPoskod = formValue.companyPoskod;
    }

    else if(val == 1){
      valPoskod = formValue.mailingPoskod;
    }

    else if(val == ''){
      valPoskod = this.selectedPoskod;
    }

    this.protectedService.getProtected('perhilitan/poskod/'+valPoskod,this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listdaerah = data.postcodeResourceList;     

        if(this.listdaerah.length == 1){

          if(val == 1){
            this.thirdFormGroup.get('mailingDaerah').setValue(formValue.companyPoskod);
            this.thirdFormGroup.get('mailingNegeri').setValue(formValue.companyPoskod);
          }

          else{
            this.fourthFormGroup.get('companyDaerah').setValue(formValue.companyPoskod);
            this.fourthFormGroup.get('companyNegeri').setValue(formValue.companyPoskod);
          }
        }

        this.checkReqValues5();

      }).bind(this));
    },
    error => {            
    });
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

  clickHantar(){
    let clickSubmit = this.fifthFormGroup.get('agreement');
    console.log(clickSubmit.value);

    if(clickSubmit.value == true){
      this.flagHantar = true;
    }else{
      this.flagHantar = false;
    }
  }

  step1(e){
    // console.log(e);
    // console.log(e.value);
  }

}
