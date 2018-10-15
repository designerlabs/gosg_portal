import { Component, OnInit, Inject, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  typeErrMsg;
}

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
  loading = false;
  dsvcCode:any;
  agcCode:any;

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
  flagData: FormControl;

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

  public listdaerahTNo: any;
  public listdaerahSuratNo: any;
  public listdaerahCompanyNo: any;

  public selectedTypeIC = 1;
  public selectedPoskodT: any;
  public selectedPoskodSurat: any;
  public selectedPoskodComp: any;
  public selectedOccupation: any;
  public cityT: any;
  public citySurat: any;
  public cityCompany: any;
  public poskodIdT: any;
  public poskodIdMailing: any;
  public stateCompany: any;
  public selectedFile1: any;
  public selectedFile2: any;
  public getUrl: any;
  public dataApp: any;

  public maskPostcode: any;
  public maskIC: any;
  public maskPhone: any;
  
  flagAfterSubmit = true;
  flagHantar = true;
  flag2 = true;
  flag3 = true;
  flag4 = true;
  flag5 = true;
  valObj: any;
  checkIC: any;
  tokenPhone = true;

  flagPoskodT = true;
  flagPoskodMailing = true;
  flagPoskodCompany = true;

  constructor(
    private activatedRoute:ActivatedRoute,
    @Inject(APP_CONFIG) private config: AppConfig,
    private router: Router,
    private route: ActivatedRoute,
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
    public dialog: MatDialog,
  ) { 

    this.lang = translate.currentLang;

    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;
    
        if (myLang == 'en') {    
            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langID = 1;
                this.openDialog();
            });
        }

        if (myLang == 'ms') {    
            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langID = 2;
            });
        }

        if(this.topnavservice.flagLang){

          if(this.langID == 1){
            //this.openDialog();
          }
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
      negeriPemilik: new FormControl(),
      flagData: new FormControl(),
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
    this.getOccupation(this.langID);
    //this.getGroupOcc(this.langID);
    this.getJenisMilikan(this.langID);
    this.getListRegComp(this.langID);
    this.getListBusiness(this.langID);
    this.getUserData();

    this.getUrl = this.router.url.split('/')[2];

    if(this.getUrl == undefined){// for add
      // AGENCY & DSERVICE CODE FOR VALIDATION
      let sub = this.route.queryParams.subscribe((params: Params) => {
        this.dsvcCode = parseInt(params.service);
        this.agcCode = parseInt(params.agency);
      });

      this.triggerDserviceValidation(this.dsvcCode);      
    
      this.checkOccupation(1);
      this.secondFormGroup.get('warganegara').setValue(1);
      this.secondFormGroup.get('typeIC').setValue(1);
      this.fourthFormGroup.get('companyType').setValue(3);
      this.fifthFormGroup.get('agreement').setValue(false);
      this.getJIC(1, this.langID);
      //this.flagAfterSubmit = false;
    }

    else{// for edit
      this.getDetailPerhilitan();
      this.dsvcCode = localStorage.getItem('dserviceCode');
      this.agcCode = localStorage.getItem('agencyCode');
    }
  }

  getUserData(){
    this.loading = true;

    if(!environment.staging){
      this.protectedService.getUser().subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          if(data.user){
            
            let phone = (data.user.mobilePhoneNo).replace(/[*/]/g, '');
            let getObjKeys = Object.keys(data.user);
            this.valObj = getObjKeys.filter(fmt => fmt === "address");

            if(this.valObj.length > 0){
              //let phone = data.user.address.permanentAddressHomePhoneNo.split('*')[1];              
              this.firstFormGroup.get('phonePemohon').setValue(phone);              
              this.firstFormGroup.get('add1').setValue(data.user.address.permanentAddress1);
              this.firstFormGroup.get('poskodPemohon').setValue(data.user.address.permanentAddressPostcode.postCode);
              this.firstFormGroup.get('daerahPemohon').setValue(data.user.address.permanentAddressCity.cityName);
              this.firstFormGroup.get('negeriPemohon').setValue(data.user.address.permanentAddressState.stateName);

              this.dbposkod = data.user.address.permanentAddressPostcode.postcodeId;
              this.dbdaerah = data.user.address.permanentAddressCity.cityId;
              this.dbnegeri = data.user.address.permanentAddressState.stateId;    
              this.flagAfterSubmit = false;
            }

            else{
              this.flagAfterSubmit = true;
            }

            this.firstFormGroup.get('namaPemohon').setValue(data.user.fullName);
            this.firstFormGroup.get('icPemohon').setValue(data.user.identificationNo);
            this.firstFormGroup.get('emailPemohon').setValue(data.user.email);            
            
            this.firstFormGroup.get('namaPemohon').disable();
            this.firstFormGroup.get('icPemohon').disable();
            this.firstFormGroup.get('phonePemohon').disable();
            this.firstFormGroup.get('emailPemohon').disable();
            this.firstFormGroup.get('add1').disable();
            this.firstFormGroup.get('poskodPemohon').disable();
            this.firstFormGroup.get('daerahPemohon').disable();
            this.firstFormGroup.get('negeriPemohon').disable();

          }else{
          }
        }).bind(this));
        this.loading = false;

      },
      error => {
        this.loading = false;
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

    let phone = data.user.address.permanentAddressHomePhoneNo.replace(/[*/]/g, '');

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

      this.firstFormGroup.get('namaPemohon').disable();
      this.firstFormGroup.get('icPemohon').disable();
      this.firstFormGroup.get('phonePemohon').disable();
      this.firstFormGroup.get('emailPemohon').disable();
      this.firstFormGroup.get('add1').disable();
      this.firstFormGroup.get('poskodPemohon').disable();
      this.firstFormGroup.get('daerahPemohon').disable();
      this.firstFormGroup.get('negeriPemohon').disable();
      this.flagAfterSubmit = false;
    }
  }

  getDetailPerhilitan(){
    this.loading = true;

    this.protectedService.getProtected('perhilitan/draft/'+this.getUrl,this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){

        if(data.statusCode != "ERROR"){
          this.flagAfterSubmit = false;
          this.dataApp = data.perhilitanElesenResource;

          this.selectedTypeIC = this.dataApp.icType.icTypeId;
          this.getJIC(this.dataApp.nationality.nationalityId, this.langID);

          this.secondFormGroup.get('warganegara').setValue(this.dataApp.nationality.nationalityId);
          this.secondFormGroup.get('typeIC').setValue(this.dataApp.icType.icTypeId);
          this.secondFormGroup.get('icpassport').setValue(this.dataApp.userIcNo);          
          this.secondFormGroup.get('namaPemilik').setValue(this.dataApp.userFullname);
          this.secondFormGroup.get('phonePemilik').setValue(this.dataApp.userPhoneNo);
          this.secondFormGroup.get('jobType').setValue(this.dataApp.jobType.jobTypeId);
          this.tokenPhone = false;
          //this.flagPoskodCompany = false;
          
          let getObjKeys = Object.keys(this.dataApp);
          let valObj = getObjKeys.filter(fmt => fmt === "workgroup");

          if(valObj.length == 1){
            this.secondFormGroup.get('jobGroup').setValue(this.dataApp.workgroup.workGroupId);
          }

          this.checkOccupation(this.dataApp.jobType.jobTypeId);
          
          this.secondFormGroup.get('addPemilik').setValue(this.dataApp.userAddress);
          this.secondFormGroup.get('poskodPemilik').setValue(this.dataApp.userPostcode);    

          this.thirdFormGroup.get('mailingAdd').setValue(this.dataApp.userMailingAddress);
          this.thirdFormGroup.get('mailingPoskod').setValue(this.dataApp.userMailingPostcode);               

          this.fourthFormGroup.get('companyType').setValue(this.dataApp.businessType.businessTypeId);
          //this.fourthFormGroup.get('jenisMilikan').setValue(this.dataApp.pemilikan);

          let getObjKeysRegType = Object.keys(this.dataApp);
          let valObjRegType = getObjKeysRegType.filter(fmt => fmt === "registerType");
          
          if(valObjRegType.length == 1){
            this.fourthFormGroup.get('registerType').setValue(this.dataApp.registerType.registerTypeId);
          }

          this.fourthFormGroup.get('companyName').setValue(this.dataApp.userCompanyName);
          this.fourthFormGroup.get('companyAdd').setValue(this.dataApp.userCompanyAddress);
          this.fourthFormGroup.get('registerNo').setValue(this.dataApp.userCompanyRegNo);
          this.fourthFormGroup.get('companyPoskod').setValue(this.dataApp.userCompanyPostcode);   
          this.fourthFormGroup.get('companyPhone').setValue(this.dataApp.userCompanyPhoneNo);
          this.fourthFormGroup.get('companyFax').setValue(this.dataApp.userFaxNo);

          let a = '';
          let b = '';
          let c = '';
          
          let getObjKeysUserPostcode = Object.keys(this.dataApp);
          let valObjUserPostcode = getObjKeysUserPostcode.filter(fmt => fmt === "userPostcode");
          if(valObjUserPostcode.length == 1){
            this.selectedPoskodT = this.dataApp.userPostcode;
            this.cityT = this.dataApp.userPostcodeId;
            a = this.selectedPoskodT;           
          }
          
          let getObjKeysUserMailingPostcode = Object.keys(this.dataApp);
          let valObjUserMailingPostcode = getObjKeysUserMailingPostcode.filter(fmt => fmt === "userMailingPostcode");
          if(valObjUserMailingPostcode.length == 1){
            this.selectedPoskodSurat = this.dataApp.userMailingPostcode;
            this.citySurat = this.dataApp.userMailingPostcodeId;
            b = this.selectedPoskodSurat;
          }

          let getObjKeysUserCompanyPostcode = Object.keys(this.dataApp);
          let valObjUserCompanyPostcode = getObjKeysUserCompanyPostcode.filter(fmt => fmt === "userCompanyPostcode");
          if(valObjUserCompanyPostcode.length == 1){
            this.selectedPoskodComp = this.dataApp.userCompanyPostcode;         
            this.cityCompany = this.dataApp.userCompanyDistrict;
            c = this.selectedPoskodComp;
          }

          let getObjKeysUserCompanyState = Object.keys(this.dataApp);
          let valObjUserCompanyState = getObjKeysUserCompanyState.filter(fmt => fmt === "state");
          if(valObjUserCompanyState.length == 1){
            this.cityCompany2 = this.dataApp.state.stateId;
          }

          if(valObjUserPostcode.length == 1){
            let dataPos = {
              poskod1: a,
              poskod2: b,
              poskod3: c
            }
            this.checkDetailPoskod(dataPos,0);
          }

          let getObjKeysXtvt = Object.keys(this.dataApp);
          let valObjXtvt = getObjKeysXtvt.filter(fmt => fmt === "activity");          
          if(valObjXtvt.length == 1){
            this.changeBuss(this.dataApp.activity.activityId);
            this.fifthFormGroup.get('lsnActivity').setValue(this.dataApp.activity.activityId);
          }
          
          let getObjKeysBusinessCategory = Object.keys(this.dataApp);
          let valObjBusinessCategory = getObjKeysBusinessCategory.filter(fmt => fmt === "businessCategory");          
          if(valObjBusinessCategory.length == 1){
            this.fifthFormGroup.get('businessCat').setValue(this.dataApp.businessCategory.businessCategoryId);
          }

          this.fifthFormGroup.get('dispBase641').setValue(this.dataApp.attachFileRoc);
          this.fifthFormGroup.get('dispBase642').setValue(this.dataApp.attachFilePbt);

          if(this.dataApp.attachFileRoc){
            this.fifthFormGroup.get('file1').setValue('ROC.pdf');
          }
          
          if(this.dataApp.attachFilePbt){
            this.fifthFormGroup.get('file2').setValue('PBT.pdf');
          }

          this.selectedOccupation = this.dataApp.jobType.jobTypeId;
        }else{
        }
        
      }).bind(this));
      this.loading = false;
    },
    error => {       
      this.loading = false;
      this.flagAfterSubmit = true;
      this.toastr.error('Rekod tidak dijumpai', '');    
    });

  }

  openRoc(val){
    
    var blob;  
    blob = this.converBase64toBlob(val, 'application/pdf'); 
    /*Find the content types for different format of file at http://www.freeformatter.com/mime-types-list.html*/
  
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }

  openPbt(val){
    
    var blob;  
    blob = this.converBase64toBlob(val, 'application/pdf'); 
    /*Find the content types for different format of file at http://www.freeformatter.com/mime-types-list.html*/
  
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }

  converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
  }

  getNationality(lang){
    this.loading = true;

    this.protectedService.getProtected('perhilitan/dropdown/nationality',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.nationality = data.perhilitanNationalityResourceList;    

      }).bind(this));
      this.loading = false;
    },
    error => {            
      this.loading = false;
    });
  }

  getJIC(val, lang){
    this.loading = true;

    this.protectedService.getProtected('perhilitan/dropdown/ictype/'+val,lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listjic = data.dropdownResourceList;     

      }).bind(this));
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }

  getOccupation(lang){
    this.loading = true;
    this.protectedService.getProtected('perhilitan/dropdown/job',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listOccupation = data.perhilitanJobTypeResourceList;   
        this.loading = false;  

      }).bind(this));
    },
    error => {        
      this.loading = false;    
    });
  }

  getGroupOcc(val,lang){
    this.loading = true;
    this.protectedService.getProtected('perhilitan/dropdown/job/workgroup/'+val,lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listGroupOcc = data.dropdownResourceList;   
        

      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;      
    });
  }

  getJenisMilikan(lang){
    this.loading = true;    
    this.protectedService.getProtected('perhilitan/jenispemilikan',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listJenisMilikan = data.perhilitanJenisPemilikanResourceList;   

      }).bind(this));
      this.loading = false;
    },
    error => {        
      this.loading = false;    
    });
  }

  getListRegComp(lang){
    this.loading = true;
    this.protectedService.getProtected('perhilitan/dropdown/regtype',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listRegComp = data.perhilitanRegisterTypeResourceList;   

      }).bind(this));
      this.loading = false;
    },
    error => {     
      this.loading = false;       
    });
  }

  getListBusiness(lang){
    this.loading = true;
    this.protectedService.getProtected('perhilitan/activity',lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listbusiness = data.perhilitanActivityResourceList;     

      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;      
    });
  }

  getDetailIC(lang, formValue: any){

    let month = (formValue.icpassport)?formValue.icpassport.substring(2,4) : 0;
    let day = (formValue.icpassport)?formValue.icpassport.substring(4,6) : 0;     

    let lengthIC = 0;
    let removeUndscr = (formValue.icpassport)?(formValue.icpassport).replace(/\_/g, ""): 0;

    if(formValue.typeIC == 1)// for ic only
    {
      lengthIC = 11;
      
      this.checkIC = this.validateIc(month, day);
      if(this.validateIc(month, day) == false){
        this.secondFormGroup.get('icpassport').setValue('');
      }
      
      if(removeUndscr.length < 12){
        this.secondFormGroup.get('icpassport').setValue('');
        this.checkIC = false;
      }
    }

    else{
      lengthIC = 5;
    }

    if(this.validateIc(month, day) == true && formValue.icpassport.length > lengthIC){

      this.flag2 = true; 
      this.flag3 = true; 
      this.loading = true;

      this.protectedService.getProtected('perhilitan/searchnokp/'+formValue.icpassport,lang).subscribe(
      data => {

        this.sharedService.errorHandling(data, (function(){
          
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
             
            let dataPkod = {
              poskod1: this.selectedPoskodT,
              poskod2: this.selectedPoskodSurat,
              poskod3: this.selectedPoskodComp,

            }       

            this.checkDetailPoskod(dataPkod, 0);
            
            this.secondFormGroup.get('namaPemilik').disable();
            this.secondFormGroup.get('addPemilik').disable();
            this.secondFormGroup.get('poskodPemilik').disable();
            this.secondFormGroup.get('daerahPemilik').disable();
            this.secondFormGroup.get('negeriPemilik').disable();
            this.tokenPhone = false;
            this.flagPoskodCompany = false; //by default company poskod will not checking;

          }

          else{ // bila tiada data
            this.resetForm23();
            this.listdaerahTNo = undefined;
            this.listdaerahCompanyNo = undefined;
            this.listdaerahSuratNo = undefined;
            this.flagPoskodCompany = false;
            this.flagPoskodMailing = false;
            this.secondFormGroup.get('flagData').setValue(''); 

          }

        }).bind(this));
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
    }

    else{
      this.resetForm23();      
      this.secondFormGroup.get('flagData').setValue(''); 
      this.listdaerahTNo = undefined;
      this.listdaerahCompanyNo = undefined;
      this.listdaerahSuratNo = undefined;
    }

  }

  checkposkod(val, valP){

    if(valP.poskodPemilik == ''){
      valP.poskodPemilik = null;
    }

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

    this.loading = true;
  
    this.protectedService.getProtected('perhilitan/poskod/'+valPoskod,this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){

        if(val == 1){ // alamat tetap
          this.flagPoskodT = true;
          this.listdaerahT = data.postcodeResourceList;  
          this.listdaerahTNo = data.postcodeResourceList.length;
          this.flagPoskodT = data.statusCode;

          if(this.flagPoskodT == 'SUCCESS'){
            this.flagPoskodT = false;

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
          }

          else{ //kosongkan bile cannot get api
            this.flagPoskodT = true;
            this.secondFormGroup.get('daerahPemilik').setValue('');  
            this.secondFormGroup.get('negeriPemilik').setValue('');   
          }          

          this.checkReqValues2();
        }

        else if(val == 2){ // surat menyurat
          
          this.flagPoskodMailing = true;
          this.listdaerahSurat = data.postcodeResourceList;   
          this.listdaerahSuratNo = data.postcodeResourceList.length; 
          this.flagPoskodMailing = data.statusCode;

          if(this.flagPoskodMailing == 'SUCCESS'){
            this.flagPoskodMailing = false;

            if(this.listdaerahSurat.length == 1){
              this.poskodIdMailing = this.listdaerahSurat[0].postcodeId;
              this.thirdFormGroup.get('mailingDaerah').setValue(this.listdaerahSurat[0].postcodeId);     
              this.thirdFormGroup.get('mailingNegeri').setValue(this.listdaerahSurat[0].state); 
            }
  
            else{ //when city more than one
              for (let i = 0; i < this.listdaerahSurat.length; i++) { 
  
                if((this.citySurat != undefined && this.citySurat == this.listdaerahSurat[i].postcodeId)){           
                  this.poskodIdMailing = this.listdaerahSurat[i].postcodeId;
                  this.thirdFormGroup.get('mailingDaerah').setValue(this.listdaerahSurat[i].postcodeId);     
                  this.thirdFormGroup.get('mailingNegeri').setValue(this.listdaerahSurat[i].state); 
                }
              }  
            }
          }

          else{ //kosongkan bile cannot get api
            this.flagPoskodMailing = true;
            this.thirdFormGroup.get('mailingDaerah').setValue('');  
            this.thirdFormGroup.get('mailingNegeri').setValue('');   
          }

          this.checkReqValues3();
        }

        else{ // company
          
          this.flagPoskodCompany = true;
          this.listdaerahCompany = data.postcodeResourceList;  
          this.listdaerahCompanyNo = data.postcodeResourceList.length;  
          this.flagPoskodCompany = data.statusCode;

          if(this.flagPoskodCompany == 'SUCCESS'){
            this.flagPoskodCompany = false;
          }

          if(this.listdaerahCompany.length == 1){

            this.stateCompany = this.listdaerahCompany[0].formValue;
            this.fourthFormGroup.get('companyDaerah').setValue(this.listdaerahCompany[0].postcodeId);     
            this.fourthFormGroup.get('companyNegeri').setValue(this.listdaerahCompany[0].state);       
          }

          else{ //when city more than one
            for (let i = 0; i < this.listdaerahCompany.length; i++) { 
              if((this.cityCompany == this.listdaerahCompany[i].postcodeId)){
                this.stateCompany = this.listdaerahCompany[i].formValue;
                this.fourthFormGroup.get('companyDaerah').setValue(this.listdaerahCompany[i].postcodeId);     
                this.fourthFormGroup.get('companyNegeri').setValue(this.listdaerahCompany[i].state); 
              }
            }
          }

          this.checkReqValues4();
        }

        if(this.flagPoskodT == false && this.flagPoskodMailing == false && this.flagPoskodCompany == false){
          this.secondFormGroup.get('flagData').setValue(false); 
        }

        else{
          this.secondFormGroup.get('flagData').setValue(''); 
        }
        
      }).bind(this));
      this.loading = false;
    },
    error => {     
      this.loading = false;       
    });    
  }

  clearDaerahNegeri(form: any){

    console.log("test");
    console.log(form);
    
    let getObjKeys = Object.keys(form);
    let valObj = getObjKeys.filter(fmt => fmt === "poskodPemilik");
    let valObj2 = getObjKeys.filter(fmt => fmt === "mailingPoskod");
    let valObj3 = getObjKeys.filter(fmt => fmt === "companyPoskod");
    
    if(valObj.length == 1){
      this.secondFormGroup.get('daerahPemilik').setValue('');  
      this.secondFormGroup.get('negeriPemilik').setValue('');  
      if(form.poskodPemilik == ''){
        this.listdaerahTNo = undefined;
      }
      this.checkReqValues2();
    }
    if(valObj2.length == 1){
      this.thirdFormGroup.get('mailingDaerah').setValue('');     
      this.thirdFormGroup.get('mailingNegeri').setValue('');  
      if(form.mailingPoskod == ''){
        this.listdaerahCompanyNo = undefined;
      }
      this.checkReqValues3();
    }

    if (valObj3.length == 1){
      this.fourthFormGroup.get('companyDaerah').setValue('');     
      this.fourthFormGroup.get('companyNegeri').setValue(''); 
      if(form.companyPoskod == ''){
        this.listdaerahSuratNo = undefined;
      }
      this.checkReqValues4();
    }
  }
  

  checkDetailPoskod(pkod, step){

    let valPoscode = '', postcode, postcodeField, form, listdaerah, listdaerahNo, poscodeId, flagPoskod, checkReqValues, param, city, field=[] ;

    switch(step){
      case 0 :
        postcode = 'poskod1';
        postcodeField = 'poskodPemilik';
        form = 'secondFormGroup';
        field = ['daerahPemilik', 'negeriPemilik'];
        listdaerah = 'listdaerahT';
        listdaerahNo = 'listdaerahTNo';
        poscodeId = 'poskodIdT';
        flagPoskod = 'flagPoskodT';     
        checkReqValues = 'checkReqValues2';   
        param = 'postcodeId';
        city = 'cityT';
        break;
      case 1 :
        postcode = 'poskod2';
        postcodeField = 'mailingPoskod';
        form = 'thirdFormGroup';
        field = ['mailingDaerah', 'mailingNegeri'];
        listdaerah = 'listdaerahSurat';
        listdaerahNo = 'listdaerahSuratNo';
        poscodeId = 'poskodIdMailing';
        flagPoskod = 'flagPoskodMailing';
        checkReqValues = 'checkReqValues3';
        param = 'postcodeId';
        city = 'citySurat';
        break;
      case 2 :
        postcode = 'poskod3';
        postcodeField = 'companyPoskod';
        form = 'fourthFormGroup';
        field = ['companyDaerah', 'companyNegeri'];
        listdaerah = 'listdaerahCompany';
        listdaerahNo = 'listdaerahCompanyNo';
        poscodeId = 'stateCompany';
        flagPoskod = 'flagPoskodCompany';
        checkReqValues = 'checkReqValues4';
        param = 'formValue';
        city = 'cityCompany';
        break;      
    }

    if(pkod[postcode]){ // FROM GET DATA
      valPoscode = pkod[postcode];
    }

    if(pkod[postcode] == undefined){ // ONCLICK
      valPoscode = pkod[postcodeField];
    }
  
    if(valPoscode != null && valPoscode != ""){
      this.loading = true;
      this.protectedService.getProtected('perhilitan/poskod/'+valPoscode,this.langID).subscribe(
      data => {

        this.sharedService.errorHandling(data, (function(){
         
          this[flagPoskod] = true;
          this[listdaerah] = data.postcodeResourceList;  
          this[listdaerahNo] = data.postcodeResourceList.length;
          this[flagPoskod] = data.statusCode;

          
          if(this[flagPoskod] == 'SUCCESS'){
            this[flagPoskod] = false;

            if(this[listdaerah].length == 1){ // return 1 result   
              this[poscodeId] = this[listdaerah][0][param];  
              this[form].get(field[0]).setValue(this[listdaerah][0].postcodeId);  
              this[form].get(field[1]).setValue(this[listdaerah][0].state);      
            }
  
            else{ //when city more than one
              for (let i = 0; i < this[listdaerah].length; i++) { 
  
                if(this[city] == this[listdaerah][i].postcodeId){    
                  this[poscodeId] = this[listdaerah][i][param];
                  this[form].get(field[0]).setValue(this[listdaerah][i].postcodeId);  
                  this[form].get(field[1]).setValue(this[listdaerah][i].state);   
                }
              }                   
            }
          }

          else{ //kosongkan bile cannot get api
            this[flagPoskod] = true;  
            this[form].get(field[0]).setValue('');  
            this[form].get(field[1]).setValue('');  
          }      
          
          if(this[listdaerahNo] == 0){ // array 0
            this[flagPoskod] = true;
            this[form].get(field[0]).setValue('');  
            this[form].get(field[1]).setValue('');  
          }

          pkod['flag'+(step+1)] = this[flagPoskod];

          if(step < 3 && pkod['poskod'+(step+1)] && (valPoscode != undefined || valPoscode != "")) {
            this.checkDetailPoskod(pkod, step+1);
          }

          this[checkReqValues]();

          if(this.flagPoskodT == false && this.flagPoskodMailing == false && this.flagPoskodCompany == false && this.getUrl == undefined){
            this.secondFormGroup.get('flagData').setValue(false); 
          }

          else if(this.flagPoskodT == false && this.getUrl != undefined){
            this.secondFormGroup.get('flagData').setValue(false); 
          }
  
          else{
            this.secondFormGroup.get('flagData').setValue(''); 
          }
          
        }).bind(this));
        this.loading = false;
      },
      error => {     
        this.loading = false;       
      });  
    }
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

      this.checkReqValues2();
      this.secondFormGroup.get('negeriPemilik').disable();
    } 
    
    else if(val == 2){
      formValues = formValues.mailingDaerah;

      for (let i = 0; i < this.listdaerahSurat.length; i++) { 
        if(formValues == this.listdaerahSurat[i].postcodeId){
          this.poskodIdMailing = this.listdaerahSurat[i].postcodeId;
          this.thirdFormGroup.get('mailingNegeri').setValue(this.listdaerahSurat[i].state); 
        }
      } 

      this.checkReqValues3();
      this.thirdFormGroup.get('mailingNegeri').disable();
    }

    else{
      formValues = formValues.companyDaerah;

      for (let i = 0; i < this.listdaerahCompany.length; i++) { 
        if(formValues == this.listdaerahCompany[i].postcodeId){
          this.stateCompany = this.listdaerahCompany[i].formValue;
          this.fourthFormGroup.get('companyNegeri').setValue(this.listdaerahCompany[i].state); 
        }
      } 

      this.checkReqValues4();
      this.thirdFormGroup.get('mailingNegeri').disable();
    }
    
  }

  checkPhone(formValue: any){
    let removeUndscr = (formValue.phonePemilik)?(formValue.phonePemilik).replace(/\_/g, ""): 0;
    if(removeUndscr.length == 0 || removeUndscr.length == undefined){
      this.tokenPhone = true;
    }
    else
      this.tokenPhone = false;
  }

  checkNamapemilik(formValue: any){
    if(formValue.namaPemilik != null){
      let validNamaPemilik = (formValue.namaPemilik)?(formValue.namaPemilik).replace(/[`~!#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\0-9]/gi, "") : '';
      this.secondFormGroup.get('namaPemilik').setValue(validNamaPemilik);
    }
    this.checkReqValues2();
  }

  checkPassport(formValue: any){
    if(formValue.icpassport != null){
      let validPassport = (formValue.icpassport)?(formValue.icpassport).replace(/[^A-Z0-9]/ig, "").toUpperCase() : '';
      this.secondFormGroup.get('icpassport').setValue(validPassport);
    }
    
    if(formValue.icpassport != null){

      if(formValue.icpassport.length > 10){        
        let subIC = (formValue.icpassport).substring(0,10);
        this.secondFormGroup.get('icpassport').setValue(subIC);
        console.log(subIC);
      }
    }
    this.checkReqValues2();
  }

  checkNoCompany(formValue: any){
    if(formValue.registerNo != null){
      let validNoCompany = (formValue.registerNo)?(formValue.registerNo).replace(/[^A-Z0-9\-]/ig, "").toUpperCase() : '';
      this.fourthFormGroup.get('registerNo').setValue(validNoCompany);
    }
    this.checkReqValues4();
  }

  clearFile(formValue: any, val){
    if(val == 1){
      this.fifthFormGroup.get('file1').setValue('');
      this.fifthFormGroup.get('dispBase641').setValue('')
    }

    else{
      this.fifthFormGroup.get('file2').setValue('');
      this.fifthFormGroup.get('dispBase642').setValue('')
    }
    this.checkReqValues5();
  }

  checkICLength(formValue: any){
    if(formValue.icpassport != null){
      if(formValue.icpassport.length<12){
        this.secondFormGroup.get('flagData').setValue(''); 
      }
    }     
    this.checkReqValues2();
  }

  validateIc(m,d){

    let arrM = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let arrD = ['01','02','03','04','05','06','07','08','09','10',
                '11','12','13','14','15','16','17','18','19','20',
                '21','22','23','24','25','26','27','28','29','30','31'];
    let valM = arrM.includes(m);
    let valD = arrD.includes(d);
    let validIC: any;

    if(valM == false || valD == false)
      validIC = false;

    else
      validIC = true;
    
      return validIC;
  }

  resetForm23(){
    
    this.secondFormGroup.get('namaPemilik').setValue('');
    this.secondFormGroup.get('phonePemilik').setValue('');
    this.secondFormGroup.get('jobType').setValue(1);
    this.secondFormGroup.get('jobGroup').setValue('');
    this.secondFormGroup.get('addPemilik').setValue('');
    this.secondFormGroup.get('poskodPemilik').setValue(null);
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
    //this.secondFormGroup.get('negeriPemilik').enable();

    this.checkReqValues2();
  }

  checkReqValues2() {
    let reqVal: any;

    if(this.selectedOccupation == 1 || this.secondFormGroup.get('jobType').value == 1){
      reqVal = ["icpassport", 
                "namaPemilik",  
                "jobType", 
                "jobGroup",
                "addPemilik","poskodPemilik","daerahPemilik","negeriPemilik"];
    }
    else{
      reqVal = ["icpassport", 
                "namaPemilik", 
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

    this.getJIC(formValue.warganegara,this.langID)

    if(formValue.warganegara == 1){
      this.secondFormGroup.get('typeIC').setValue(1);
      this.selectedTypeIC = 1;
    }

    else{
      this.secondFormGroup.get('typeIC').setValue(2);
      this.selectedTypeIC = 2;
    }    
    this.secondFormGroup.get('icpassport').setValue('');    
    this.checkIC = undefined;
    this.resetForm23();
    this.listdaerahTNo = undefined;
    this.listdaerahCompanyNo = undefined;
    this.listdaerahSuratNo = undefined;
  }

  checkTypeIc(formValue: any){
    this.selectedTypeIC = formValue.typeIC;
    this.secondFormGroup.get('icpassport').setValue('');
    this.checkIC = undefined;
    this.resetForm23();
    this.listdaerahTNo = undefined;
    this.listdaerahCompanyNo = undefined;
    this.listdaerahSuratNo = undefined;
  } 

  checkOccupation(formValue: any){
    this.selectedOccupation = formValue.jobType;

    if(typeof(formValue) == "object"){
      formValue = formValue.jobType;
    }

    else{
      formValue = formValue;
    }

    this.getGroupOcc(formValue, this.langID)
    if(formValue != 1){
      this.secondFormGroup.get('jobGroup').setValue(null);
      this.secondFormGroup.get('jobGroup').disable();
    }

    else{
      this.secondFormGroup.get('jobGroup').enable();
    }
   
    this.checkReqValues2();
  }

  changeBuss(formValue: any){

    if(typeof(formValue) == "object"){
      formValue = formValue.lsnActivity;
    }

    else{
      formValue = formValue;
    }

    this.loading = true;

    this.protectedService.getProtected('perhilitan/activity/catbusiness/'+formValue,this.langID).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listcatbuss = data.perhilitanBusinessCategoryResourceList;     
        this.checkReqValues5();

      }).bind(this));
      this.loading = false;
    },
    error => {     
      this.loading = false;       
    });
  }

  clickCopyAdd(){

    let chkboxCopyAdd = this.thirdFormGroup.get('copyAdd').value;

    if(chkboxCopyAdd == true){

      this.citySurat =  this.secondFormGroup.get('daerahPemilik').value;   
      this.selectedPoskodSurat = this.secondFormGroup.get('poskodPemilik').value;            
      this.thirdFormGroup.get('mailingAdd').setValue(this.secondFormGroup.get('addPemilik').value);     
      this.thirdFormGroup.get('mailingPoskod').setValue(this.secondFormGroup.get('poskodPemilik').value);   
      this.checkDetailPoskod({poskod2:this.secondFormGroup.get('poskodPemilik').value}, 1);     
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
      
      this.cityCompany =  this.secondFormGroup.get('daerahPemilik').value;   
      this.selectedPoskodComp = this.secondFormGroup.get('poskodPemilik').value;   
      this.fourthFormGroup.get('companyAdd').setValue(this.secondFormGroup.get('addPemilik').value);     
      this.fourthFormGroup.get('companyPoskod').setValue(this.secondFormGroup.get('poskodPemilik').value);   
      this.checkDetailPoskod({poskod3:this.secondFormGroup.get('poskodPemilik').value}, 2);   
    }

    else{

      this.fourthFormGroup.get('companyAdd').setValue('');     
      this.fourthFormGroup.get('companyPoskod').setValue('');     
      this.fourthFormGroup.get('companyDaerah').setValue('');  
      this.fourthFormGroup.get('companyNegeri').setValue('');        
    }

    this.checkReqValues3();
  }

  uploadFile1(selectedFiles: Ng4FilesSelected): void {    
   
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
      if(sizeFile >  2097152){ //1048576
        this.toastr.error('Fail tidak boleh melebihi 2MB');
        this.fifthFormGroup.controls.file1.setValue(null);
        this.fifthFormGroup.controls.dispBase641.setValue(null);
      }
    }

    this.changeBase641(this.selectedFile1);         
    this.checkReqValues5(); 
  
  }

  uploadFile2(selectedFiles: Ng4FilesSelected): void {    

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
      if(sizeFile >  2097152){ //1048576
        this.toastr.error('Fail tidak boleh melebihi 2MB');
        this.fifthFormGroup.controls.file2.setValue(null);
        this.fifthFormGroup.controls.dispBase642.setValue(null);
      }
    }

    this.changeBase642(this.selectedFile2);
    this.checkReqValues5();
  }

  changeBase641(inputValue: any): void {
    this.loading = true;
    var file:File = inputValue[0].files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      let base641;
      base641 = myReader.result;
      let splitB64 = base641.split('data:application/pdf;base64,')[1];          
      this.fifthFormGroup.get('dispBase641').setValue(splitB64);
    }
    myReader.readAsDataURL(file);
    this.loading = false;
  }

  changeBase642(inputValue: any): void {
    this.loading = true;
    var file:File = inputValue[0].files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      let base642;
      base642 = myReader.result;
      let splitB64 = base642.split('data:application/pdf;base64,')[1];          
      this.fifthFormGroup.get('dispBase642').setValue(splitB64);
    }
    myReader.readAsDataURL(file);
    this.loading = false;
  }

  clickHantar(){
    let clickSubmit = this.fifthFormGroup.get('agreement');

    if(clickSubmit.value == true){
      this.flagHantar = true;
    }else{
      this.flagHantar = false;
    }
  }

  draft(){ //"licenseId": 50,
  
    if(this.getUrl == undefined){
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
      body.extFileRoc = "pdf"; //this.selectedFile1[0].files[0].name.split('.')[1];
      body.attachFilePbt = this.fifthFormGroup.get('dispBase642').value;
      body.extFilePbt = "pdf"; //this.selectedFile2[0].files[0].name.split('.')[1];
      body.attachFileIc = "";  
      body.extFileIc = "";
      body.userApplyStatus = "";
      body.userLicenseNoStatus = "";
      body.userLicenseRenewStatus = "";
      body.userLicenseCronRenewStatus = "";
      body.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
      body.icType.icTypeId = this.secondFormGroup.get('typeIC').value; 
      body.icType.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
      body.jobType.jobTypeId = this.secondFormGroup.get('jobType').value;
      body.workgroup.workGroupId = this.secondFormGroup.get('jobGroup').value; 
      body.workgroup.jobType.jobTypeId = this.secondFormGroup.get('jobType').value; 
      body.businessType.businessTypeId = this.fourthFormGroup.get('companyType').value; 
      body.registerType.registerTypeId = this.fourthFormGroup.get('registerType').value; 
      body.state.stateId = this.stateCompany;
      body.activity.activityId = this.fifthFormGroup.get('lsnActivity').value; 
      body.businessCategory.businessCategoryId = this.fifthFormGroup.get('businessCat').value;
      body.isDraft = "True";
      body.cronStatus = false;
      
      //console.log(JSON.stringify(body));
      this.loading = true;
      
      this.protectedService.create(body,'perhilitan/draft/save',this.langID, this.dsvcCode, this.agcCode).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function () {
          this.toastr.success(data.statusDesc, '');
          this.router.navigate(['appsmgmt']);
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });
    }

    else{ // when update

      if(this.stateCompany == undefined){
        this.stateCompany = null;
      }

      let body = {
        "licenseId": null,
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
  
      body.licenseId = this.getUrl;
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
      body.extFileRoc = "pdf"; //this.selectedFile1[0].files[0].name.split('.')[1];
      body.attachFilePbt = this.fifthFormGroup.get('dispBase642').value;
      body.extFilePbt = "pdf"; //this.selectedFile2[0].files[0].name.split('.')[1];
      body.attachFileIc = "";  
      body.extFileIc = "";
      body.userApplyStatus = "";
      body.userLicenseNoStatus = "";
      body.userLicenseRenewStatus = "";
      body.userLicenseCronRenewStatus = "";
      body.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
      body.icType.icTypeId = this.secondFormGroup.get('typeIC').value; 
      body.icType.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
      body.jobType.jobTypeId = this.secondFormGroup.get('jobType').value;
      body.workgroup.workGroupId = this.secondFormGroup.get('jobGroup').value; 
      body.workgroup.jobType.jobTypeId = this.secondFormGroup.get('jobType').value; 
      body.businessType.businessTypeId = this.fourthFormGroup.get('companyType').value; 
      body.registerType.registerTypeId = this.fourthFormGroup.get('registerType').value; 
      body.state.stateId = this.stateCompany;
      body.activity.activityId = this.fifthFormGroup.get('lsnActivity').value; 
      body.businessCategory.businessCategoryId = this.fifthFormGroup.get('businessCat').value;
      body.isDraft = "True";
      body.cronStatus = false;
      
      //console.log(JSON.stringify(body));
      this.loading = true;
      
      this.protectedService.update(body,'perhilitan/draft/update',this.langID, this.dsvcCode, this.agcCode).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function () {
          this.toastr.success(data.statusDesc, '');
          this.router.navigate(['appsmgmt']);
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });

    }    
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
    body.extFileRoc = "pdf"; //this.selectedFile1[0].files[0].name.split('.')[1];
    body.attachFilePbt = this.fifthFormGroup.get('dispBase642').value;
    body.extFilePbt = "pdf"; //this.selectedFile2[0].files[0].name.split('.')[1];
    body.attachFileIc = "";  
    body.extFileIc = "";
    body.userApplyStatus = "";
    body.userLicenseNoStatus = "";
    body.userLicenseRenewStatus = "";
    body.userLicenseCronRenewStatus = "";
    body.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
    body.icType.icTypeId = this.secondFormGroup.get('typeIC').value; 
    body.icType.nationality.nationalityId = this.secondFormGroup.get('warganegara').value; 
    body.jobType.jobTypeId = this.secondFormGroup.get('jobType').value;
    body.workgroup.workGroupId = this.secondFormGroup.get('jobGroup').value; 
    body.workgroup.jobType.jobTypeId = this.secondFormGroup.get('jobType').value; 
    body.businessType.businessTypeId = this.fourthFormGroup.get('companyType').value; 
    body.registerType.registerTypeId = this.fourthFormGroup.get('registerType').value; 
    body.state.stateId = this.stateCompany;
    body.activity.activityId = this.fifthFormGroup.get('lsnActivity').value; 
    body.businessCategory.businessCategoryId = this.fifthFormGroup.get('businessCat').value;
    body.isDraft = false;
    body.cronStatus = false;
    
    //console.log(JSON.stringify(body));
    this.loading = true;

    this.protectedService.create(body,'perhilitan/apply',this.langID, this.dsvcCode, this.agcCode).subscribe(
    data => {
      this.sharedService.errorHandling(data, (function () {
        // this.translate.instant('Permohonan Baru Lesen Peniaga/Taksidermi berjaya dihantar')

        if(this.getUrl != undefined){// delete draft bile dari dashboard
          this.deleteDraft(this.getUrl);
        }

        this.toastr.success(data.statusDesc, '');
        this.router.navigate(['appsmgmt']);
      }).bind(this));
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
    });
    
  }

  deleteDraft(idDraft){
    this.protectedService.deleteServices(idDraft,'/perhilitan/draft/delete/',this.langID).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function () {
          
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });
  }

  triggerDserviceValidation(dsvcCode) {
    let sub;
    this.loading = true;

    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.protectedService.validateDserviceByRefCode(dsvcCode))
      .subscribe(resValidation => {
        
        if(!resValidation.valid) {
          this.toastr.error('Invalid Service!', '');
          this.router.navigate(['404']);
          
          // sub = Observable.interval(2000)
          // .subscribe((val) => {
          //   window.close();
          //   sub.unsubscribe();
          // });
        } else {
          localStorage.setItem('dserviceCode', dsvcCode);
          localStorage.setItem('agencyCode', this.agcCode);
          this.loading = false;
        }
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
  
      });
  }

  openDialog() {

    let errMsg = '';
    errMsg = 'This form is only available in Malay language.'

    this.dialog.open(PopupPerhilitan, {
      data: {
        typeErrMsg: errMsg
      }
    });
  }

}

@Component({
  selector: 'popupperhilitan',
  templateUrl: './popupperhilitan.html',
})

export class PopupPerhilitan {

  constructor(
    public dialogRef: MatDialogRef<PopupPerhilitan>,
    private translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick() {
      this.dialogRef.close();
    }
}
