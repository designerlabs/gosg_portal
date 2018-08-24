import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Inject, Renderer, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { SharedService } from '../common/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { ProtectedService } from '../services/protected.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { PortalService } from '../services/portal.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { TopnavService } from '../header/topnav/topnav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ValidateService } from '../common/validate.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  typeErrMsg;
}

@Component({
  selector: 'gosg-familyinfo',
  templateUrl: './familyinfo.component.html',
  styleUrls: ['./familyinfo.component.css']
})
export class FamilyinfoComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;

  searchForm: FormGroup;
  warganegara: FormControl;
  icno: FormControl;
  passportno: FormControl;
  passportState: FormControl;
  name: FormControl;
  relation: FormControl;
  dob: FormControl;
  sex: FormControl;
  email: FormControl;
  race: FormControl;
  religion: FormControl;
  phone: FormControl;
  profileStatus: FormControl;
  reasonStatus: FormControl;
  addInfo: FormControl;
  
  public maskIC: any;
  public maskPhone: any;
  public checkNation: boolean = false;
  public complete: boolean;
  public valDOB: any;
  public getUrl: any;
  public events: string[] = [];
  public okuInfo: any;
  public checkOku = false;
  public listCitizenData: any;
  public listRaceData: any;
  public listReligionData: any;
  public listCountryData: any;
  public listGenderData: any;
  public listRelationData: any;
  public valProfileID: any;
  showNoData = false;
  loading = false;

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private portalService:PortalService,
    private translate:TranslateService,
    private http: Http,
    private router: Router,
    private _renderer: Renderer,
    private topnavservice: TopnavService,
    private validateService:ValidateService,
    private adapter: DateAdapter<any>,
    public dialog: MatDialog,
    @Inject(APP_CONFIG) private config: AppConfig) {

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

    this.maskIC = this.validateService.getMask().icno;
    this.maskPhone = this.validateService.getMask().telephone;

    this.warganegara = new FormControl();
    this.icno = new FormControl('', [Validators.required, Validators.pattern('^[0-9-]{14}$')]);
    this.passportno = new FormControl();
    this.passportState = new FormControl();
    this.name = new FormControl();
    this.relation = new FormControl();
    this.dob = new FormControl();
    this.sex = new FormControl();
    this.email = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern().email)]);
    this.race = new FormControl();
    this.religion = new FormControl();
    this.phone = new FormControl();
    this.profileStatus = new FormControl();
    this.reasonStatus = new FormControl();
    this.addInfo = new FormControl();

    this.searchForm = new FormGroup({

      warganegara: this.warganegara,
      icno: this.icno,
      passportno: this.passportno,
      passportState: this.passportState,
      name: this.name,
      relation: this.relation,
      dob: this.dob,
      sex: this.sex,
      email: this.email,
      race: this.race,
      religion: this.religion,
      phone: this.phone,
      profileStatus: this.profileStatus,
      reasonStatus: this.reasonStatus,
      addInfo: this.addInfo
    });

    this.getUrl = this.router.url.split('/')[2];
    this.checkReqValues();
    this.getRace(2);
    this.getReligion(2);
    this.getCountryPass(2);
    this.getGender(2);
    this.getRelation(2);
    this.getCitizen(2);

    if(this.getUrl == 'add'){
      this.searchForm.get('warganegara').setValue(5);
    }

    else{

      this.getDataFamily(this.getUrl);
      this.checkNation = true;
      this.searchForm.get('warganegara').disable();

    }

  }

  getDataFamily(val){

    this.loading = true;
    this.protectedService.getDataProtectedById('user/family/profile/'+val, this.langID).subscribe(
    data => {
      this.sharedService.errorHandling(data, (function(){
        let familyData = data.familyProfile;

        if(familyData.identificationNo == ""){
          this.searchForm.get('warganegara').setValue(6);
          this.searchForm.get('passportno').setValue(familyData.passportNo);
          this.searchForm.get('passportState').setValue(familyData.passportCountryIssue.countryId);
        }else{
          this.searchForm.get('warganegara').setValue(5);
          this.searchForm.get('icno').setValue(familyData.identificationNo);
          this.checkOKU();
        }

        this.searchForm.get('name').setValue(familyData.fullName);
        this.searchForm.get('relation').setValue(familyData.relationship.relationshipId);
        this.searchForm.get('race').setValue(familyData.race.raceId);
        this.searchForm.get('religion').setValue(familyData.religion.religionId);
        this.searchForm.get('email').setValue(familyData.email);
        this.searchForm.get('dob').setValue(new Date(familyData.dateOfBirth).toISOString());
        this.searchForm.get('sex').setValue(familyData.gender.genderId);
        this.searchForm.get('phone').setValue(familyData.mobilePhoneNo);
        this.searchForm.get('profileStatus').setValue(familyData.accountStatus.accountStatusId);
        this.searchForm.get('reasonStatus').setValue(familyData.accountStatus.accountStatusId);
        this.searchForm.get('addInfo').setValue(familyData.additionalInfo);
        this.valProfileID = familyData.profileId;
        this.valDOB = familyData.dateOfBirth;

        if(this.searchForm.get('warganegara').value == 5){        
          this.searchForm.get('icno').disable();
          this.searchForm.get('name').disable();
          this.searchForm.get('relation').disable();
          this.searchForm.get('race').disable();
          this.searchForm.get('religion').disable();
        }
  
        else{
          this.searchForm.get('passportno').disable();
          // this.searchForm.get('name').enable();
          // this.searchForm.get('relation').enable();
          // this.searchForm.get('race').enable();
          // this.searchForm.get('religion').enable();
        }
        this.checkReqValues();
      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;      
    });
  }

  getCitizen(lang){
    this.loading = true;
    return this.sharedService.getCitizenship(lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listCitizenData = data;
        this.loading = false;
      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;     
      this.toastr.error(this.translate.instant('common.err.servicedown'), ''); 
    });
  }

  getRace(lang){
    this.loading = true;
    return this.sharedService.getRace(lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listRaceData = data;
        this.loading = false;
      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;     
      this.toastr.error(this.translate.instant('common.err.servicedown'), ''); 
    });
  }

  getReligion(lang){
    this.loading = true;
    return this.sharedService.getReligion(lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listReligionData = data;
        this.loading = false;
      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;     
      this.toastr.error(this.translate.instant('common.err.servicedown'), ''); 
    });
  }

  getCountryPass(lang){
    this.loading = true;
    return this.sharedService.getCountryData().subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listCountryData = data;
        this.loading = false;
      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;     
      this.toastr.error(this.translate.instant('common.err.servicedown'), ''); 
    });
  }
  
  getGender(lang){
    this.loading = true;
    return this.sharedService.getGender(lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listGenderData = data;
        this.loading = false;
      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;     
      this.toastr.error(this.translate.instant('common.err.servicedown'), ''); 
    });
  }

  getRelation(lang){
    this.loading = true;
    return this.sharedService.getRelationship(lang).subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.listRelationData = data;
        this.loading = false;
      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;     
      this.toastr.error(this.translate.instant('common.err.servicedown'), ''); 
    });
  }
  
  checkNationalyty(){
    this.checkNation = true;
    this.complete = false;

    this. openDialog(2);
  }

  changeNation(val){

    if(val.warganegara == 2){
      this.checkNation = true;
    }

    else{
      this.checkNation = false;
    }

    this.checkReqValues();
  }

  checkReqValues() {

    let reqVal = [];
    let nullPointers:any = [];
    
    if(this.searchForm.controls.warganegara.value == 5){
      if(this.checkNation == false){
        reqVal =  ["icno","name","relation","race","religion"];
      }
      else{
        reqVal =  ["icno","name","relation","race","religion","profileStatus","dob"];
      }
    }

    else{
      reqVal =  ["passportno","name","relation","race","religion","profileStatus","dob"];
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

  validateCtrlChk(ctrl: FormControl) {
    return this.validateService.validateCtrl(ctrl);
  }

  print(){
  }

  publishDOB(type: string, event: MatDatepickerInputEvent<Date>) { 
   
    this.adapter.setLocale('en-in');
    this.events = [];
    this.events.push(`${event.value}`);   
    this.valDOB = new Date(this.events[0]).getTime();

    this.checkReqValues();
    //this.searchForm.get('dob').setValue(new Date(this.valDOB).toISOString());
  }

  checkOKU(){
    this.loading = true;

    let ic = this.searchForm.controls.icno.value;
    ic = ic.replace('-','');
    let ic2 = ic.replace('-','');

    let body = {
      "icNumber":ic2,
      "okuStatus":"",
      "okuRegistrationNumber":"",
      "okuType":"",
      "okuTypeId":"",
      "errorCode":"",
      "errorDescription":"",
      "isOku":false
    } 

    console.log(JSON.stringify(body));

    this.protectedService.postProtected(body,'jkmservice/okustatus').subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){
        this.okuInfo = data.resource;
        
      if(this.okuInfo.isOku == true){
        this.checkOku = true;
      }

      else{
        this.checkOku = false;
        this. openDialog(1);
      }

      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;      
    });

  }

  submit(val){

    let valIc = '';
    let valPassport = '';  
    let validentification: any;

    let body: any;

    if(this.searchForm.controls.warganegara.value == 5){
      valIc = this.searchForm.controls.icno.value;
      valPassport = '';
      val.passportState = null; //
      validentification = this.searchForm.controls.icno.value;
    }

    else{
      valIc = '';
      valPassport = this.searchForm.controls.passportno.value;
      validentification = this.searchForm.controls.passportno.value;
    }

    if(val.addInfo == null){
      val.addInfo = '';
    }

    if(this.getUrl == 'add'){
      body = {
        "identificationNo": '',
        "passportNo": '',
        "fullName": '',
        "firstName": '',
        "lastName": '',
        "dateOfBirth": null,
        "email": '',
        "mobilePhoneNo": '',
        "isMyidentityVerified": false,
        "isMyidentityActive": false,
        "isMyidentityCitizen": false,
        "isOku": false,
        "okuStatus": "",
        "okuRegistrationNo": '',
        "additionalInfo": '',
        "userType": {
          "userTypeId": null
        },
        "relationship": {
          "relationshipId": null
        },
        "passportCountryIssue": {
          "countryId": null //152
        },
        "gender": {
          "genderId": null
        },
        "religion": {
          "religionId": null
        },
        "race": {
          "raceId": null
        },
        "accountStatus": {
          "accountStatusId": null
        }
      }

      body.identificationNo = valIc;
      body.passportNo = valPassport;
      body.fullName = val.name;    
      body.email = val.email;
      body.mobilePhoneNo = val.phone;
      body.isMyidentityVerified = false;
      body.isMyidentityActive = false
      body.isMyidentityCitizen = false;
      body.isOku = this.checkOku;
      body.okuStatus = '';
      body.okuRegistrationNo = '';
      body.additionalInfo = val.addInfo;
      body.userType.userTypeId = val.warganegara;
      body.relationship.relationshipId = val.relation;
      body.dateOfBirth = this.valDOB;
      body.passportCountryIssue.countryId = val.passportState;
      body.gender.genderId = val.sex;
      body.race.raceId = val.race;
      body.religion.religionId = val.religion;    
      body.accountStatus.accountStatusId = val.profileStatus;
      //body.reasonStatus.reasonStatusId = val.reasonStatus;      

      console.log(JSON.stringify(body));
      this.loading = true;    
      this.protectedService.createFamily(body,'user/family/profile',this.langID).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function () {
          this.toastr.success(this.translate.instant('Maklumat berjaya disimpan.'), '');
          this.router.navigate(['familyinfo']);
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });
    }

    else{
      body = {
        "profileId": null,
        "identificationNo": '',
        "passportNo": '',
        "fullName": '',
        "firstName": '',
        "lastName": '',
        "dateOfBirth": null,
        "email": '',
        "mobilePhoneNo": '',
        "isMyidentityVerified": false,
        "isMyidentityActive": false,
        "isMyidentityCitizen": false,
        "isOku": false,
        "okuStatus": "",
        "okuRegistrationNo": '',
        "additionalInfo": '',
        "userType": {
          "userTypeId": null
        },
        "relationship": {
          "relationshipId": null
        },
        "passportCountryIssue": {
          "countryId": null //152
        },
        "gender": {
          "genderId": null
        },
        "religion": {
          "religionId": null
        },
        "race": {
          "raceId": null
        },
        "accountStatus": {
          "accountStatusId": null
        }
      }

      body.profileId = this.valProfileID,
      body.identificationNo = valIc;
      body.passportNo = valPassport;
      body.fullName = this.searchForm.controls.name.value;    
      body.email = val.email;
      body.mobilePhoneNo = val.phone;
      body.isMyidentityVerified = false;
      body.isMyidentityActive = false
      body.isMyidentityCitizen = false;
      body.isOku = this.checkOku;
      body.okuStatus = '';
      body.okuRegistrationNo = '';
      body.additionalInfo = val.addInfo;
      body.userType.userTypeId = this.searchForm.controls.warganegara.value;
      body.relationship.relationshipId = this.searchForm.controls.relation.value;
      body.dateOfBirth = this.valDOB;
      body.passportCountryIssue.countryId = val.passportState;
      body.gender.genderId = val.sex;
      body.race.raceId = this.searchForm.controls.race.value;
      body.religion.religionId = this.searchForm.controls.religion.value;    
      body.accountStatus.accountStatusId = val.profileStatus;
      //body.reasonStatus.reasonStatusId = val.reasonStatus;      

      console.log(JSON.stringify(body));
      this.loading = true;    
      this.protectedService.updateFamily(body,'user/family/profile/'+validentification,this.langID).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function () {
          this.toastr.success(this.translate.instant('Maklumat berjaya dikemaskini.'), '');
          this.router.navigate(['familyinfo']);
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
      });
    }
  }

  openDialog(a) {

    let errMsg = '';
    if(a == 1){ // msg for oku
      if(this.langID == 1){
        errMsg = 'There is no information. Verification can not be done.';
      }
      else{
        errMsg = 'Tiada Maklumat berkaitan. Pengesahan tidak dapat dilakukan.';
      }      
    }

    else{
      if(this.langID == 1){ // msg for indentification
        errMsg = 'The information entered can not be verified. Please try again.';
      }
      else{
        errMsg = 'Maklumat yang dimasukkan tidak dapat disemak. Sila cuba sekali lagi.';
      }
    }

    this.dialog.open(FamilyPopupDialog, {
      data: {
        typeErrMsg: errMsg
      }
    });
  }
    
}

@Component({
  selector: 'familyinfo-popup',
  templateUrl: './familyinfo-popup.html',
})

export class FamilyPopupDialog {

  constructor(
    public dialogRef: MatDialogRef<FamilyPopupDialog>,
    private translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick() {
      this.dialogRef.close();
    }
}
