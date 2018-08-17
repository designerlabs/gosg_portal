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
//import { OwlDateTimeInputDirective } from 'ng-pick-datetime/date-time/date-time-picker-input.directive';

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

    if(this.getUrl == 'add'){

      this.searchForm.get('warganegara').setValue(1);
      
    }

    else{
      //if(this.searchForm.controls.warganegara.value == 1){
        this.searchForm.get('warganegara').disable();
        //this.searchForm.get('noic').disable();
        this.searchForm.get('name').disable();
        this.searchForm.get('relation').disable();
        this.searchForm.get('race').disable();
        this.searchForm.get('religion').disable();
      // }

      // else{
      //   this.searchForm.get('name').enable();
      //   this.searchForm.get('relation').enable();
      //   this.searchForm.get('race').enable();
      //   this.searchForm.get('religion').enable();
      // }
    }

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
    
    if(this.searchForm.controls.warganegara.value == 1){
      if(this.checkNation == false){
        reqVal =  ["icno","name","relation","race","religion"];
      }
      else{
        reqVal =  ["icno","name","relation","race","religion","profileStatus"];
      }
    }

    else{
      reqVal =  ["passportno","name","relation","race","religion","profileStatus"];
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
    console.log("PRINT: ");
  }

  publishDOB(type: string, event: MatDatepickerInputEvent<Date>) { 

    this.adapter.setLocale('en-in');
    this.events = [];
    this.events.push(`${event.value}`);   
    this.valDOB = new Date(this.events[0]).getTime();
    //this.searchForm.get('dob').setValue(new Date(this.valDOB).toISOString());
  }

  checkOKU(){
    console.log("check OKU");
    this. openDialog(1);
  }

  submit(val){

    let icpassport: any;

    let body = {
      "nationality":{
          "nationalityId": null
       },
      "icno": null,
      "passportState":{
        "passportStateId": null
      },
      "name": null,
      "relation":{
        "relationId": null
      },
      "dob": null,
      "sex":{
        "sexId": null
      },
      "email": null,
      "race":{
        "raceId": null
      },
      "religion":{
        "religionId": null
      },
      "phone": null,
      "profileStatus":{
        "profileStatusId": null
      },
      "reasonStatus":{
        "reasonStatusId": null
      },
      "addInfo": null
    };

    if(this.searchForm.controls.warganegara.value == 1){
      icpassport = val.icno;
    }

    else{
      icpassport = val.passportno;
    }

    body.nationality.nationalityId = val.warganegara;
    body.icno = icpassport;
    body.passportState.passportStateId = val.passportState;
    body.name = val.name;
    body.relation.relationId = val.relation;
    body.dob = this.valDOB;
    body.sex.sexId = val.sex;
    body.email = val.email;
    body.race.raceId = val.race;
    body.religion.religionId = val.religion;
    body.phone = val.phone;
    body.profileStatus.profileStatusId = val.profileStatus;
    body.reasonStatus.reasonStatusId = val.reasonStatus;
    body.addInfo = val.addInfo;

    console.log(JSON.stringify(body));
    // this.loading = true;
    
    // this.protectedService.create(body,'perhilitan/draft/save',this.langID).subscribe(
    // data => {
    //   this.sharedService.errorHandling(data, (function () {
    //     this.toastr.success(this.translate.instant('Permohonan Baru Lesen Peniaga/Taksidermi berjaya disimpan sebagai draft'), '');
    //     this.router.navigate(['appsmgmt']);
    //   }).bind(this));
    //   this.loading = false;
    // },
    // error => {
    //   this.loading = false;
    //   this.toastr.error(JSON.parse(error._body).statusDesc, '');
    // });
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
