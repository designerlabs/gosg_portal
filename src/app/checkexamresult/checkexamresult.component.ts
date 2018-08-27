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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { TopnavService } from '../header/topnav/topnav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ValidateService } from '../common/validate.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../environments/environment';

export interface DialogData {
  typeErrMsg;
  examInfo;
}

// export interface DialogData {
//   examInfo;
// }

@Component({
  selector: 'gosg-checkexamresult',
  templateUrl: './checkexamresult.component.html',
  styleUrls: ['./checkexamresult.component.css']
})
export class CheckexamresultComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;

  searchForm: FormGroup;
  name: FormControl;
  examyear: FormControl;
  examname: FormControl;
  examtype: FormControl;
  
  public complete: boolean; 
  public getUrl: any;
  public listUser: any[] = [];
  public listYear: any[] = [];
  public listExam: any[] = [];
  public listTypeExam: any[] = [];
  public listResult: any[] = [];
  public showResult: boolean = false;
  public profileId: any;
  public resultInfo: any;

  showNoData = false;
  loading = false;

  private subscriptionLang: ISubscription;

  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private translate:TranslateService,
    private http: Http,
    private router: Router,
    private _renderer: Renderer,
    private topnavservice: TopnavService,
    private validateService:ValidateService,
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

   
    this.name = new FormControl();
    this.examname = new FormControl();
    this.examyear = new FormControl();
    this.examtype = new FormControl();

    this.searchForm = new FormGroup({

      name: this.name,
      examname: this.examname,
      examyear: this.examyear,
      examtype: this.examtype
    });

    this.getUserData();
    this.getUrl = this.router.url.split('/')[2];
    this.checkReqValues();

    console.log("check length of user");
    console.log(this.listUser.length);

  }

  getUserData(){
    this.loading = true;

    if(!environment.staging){
      this.protectedService.getUser().subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          if(data.user){

            let a = {
              "ic" :data.user.identificationNo,
              "name" : data.user.fullName
            }
            this.listUser.push(a);
            
            if(this.listUser.length == 1){
              //this.searchForm.get('name').setValue(data.user.fullName);
              this.searchForm.get('name').setValue(data.user.identificationNo);      
              this.getListYear();
            }

            this.profileId = data.user.userId;

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
      this.loading = false;
      let data = {
        "user": {
          "userId": 116,
          "pid": "700101712555",
          "identificationNo": "700101712555",
          "passportNo": "",
          "fullName": "ZAKARIA BIN MOHD NOR",
          "email": "zakariatestgosg@yopmail.com",
          "mobilePhoneNo": "1-684*123-1231 2312",
        }
      }

      let a = {
        "ic" :data.user.identificationNo,
        "name" : data.user.fullName
      }

      this.listUser.push(a);
      this.profileId = 1446;

      console.log("dalam get user");
      console.log(this.listUser.length);

      if(this.listUser.length == 1){
        //this.searchForm.get('name').setValue(data.user.fullName);
        this.searchForm.get('name').setValue(data.user.identificationNo);    
        this.getListYear();  
      }
    }
  }

  getListYear(){
    this.listYear = [2018,2017,2016,2015];
    this.checkReqValues();
  }

  getListExam(){
    this.listExam = [{"id":1,"name": "UPSR"},
                     {"id":2,"name": "PT3"},
                     {"id":3,"name": "SPM"},
                     {"id":4,"name": "STPM"},
                     {"id":5,"name": "Peperiksaan Penggal"}];
    this.checkReqValues();
  }

  getListTypeExam(){
    if(this.searchForm.controls.examname.value == 5){

      this.listTypeExam = [{"id": 1, "name": "Ujian 1"},
                           {"id": 2, "name": "Peperiksaan Pertengahan Tahun"},
                           {"id": 3, "name": "Peperiksaan Akhir Tahun"}]
    }

    this.checkReqValues();
  }

  getSTPM(){
    this.loading = true;

    this.protectedService.getProtectedNopg('stpmservice/stpm/id/'+this.profileId+'?user=true').subscribe(
    data => {

      this.sharedService.errorHandling(data, (function(){

        let getObjKeys = Object.keys(data.resource);
        let valObj = getObjKeys.filter(fmt => fmt === "subject");
        if(valObj.length == 1){
          this.resultInfo = data.resource;
          this.listResult = data.resource.subject;
          this.showResult = true;
        }
        
        else{
          this.listResult = [];
        }

      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;      
    });
  }

  checkExam(){
    this.listResult = [1];
    if(this.listResult.length == 0){
      this.openDialog();
      //this.openResult();
    }

    if(this.searchForm.controls.examname.value == 4){

      this.getSTPM();
    }

    else{
      this.openDialog();
    }
   
    // else{
    //   this.listResult = [{"nama":"Bahasa Melayu", "gred": "A1", "desc": "Cemerlang", "markah": 80.00},
    //                      {"nama":"Bahasa Inggeris", "gred": "A1", "desc": "Cemerlang", "markah": 90.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},
    //                      {"nama":"Pendidikan Islam", "gred": "A1", "desc": "Cemerlang", "markah": 95.00},]
    //   this.showResult = true;
    // }
  }
  
  checkReqValues() {

    let reqVal = [];
    let nullPointers:any = [];
       
    reqVal =  ["name","examname","examyear"];
    
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

  openDialog() {

    let errMsg = '';

    if(this.langID == 1){
      errMsg = 'There is no information in the database. Please try again.';
    }
    else{
      errMsg = 'Maklumat tiada di dalam pangkalan data. Sila cuba lagi.';
    }      
  
    this.dialog.open(ExamPopupDialog, {
      data: {
        typeErrMsg: errMsg
      }
    });
  }

  openResult() {

    let errMsg = '';

    if(this.langID == 1){
      errMsg = 'There is no information in the database. Please try again.';
    }
    else{
      errMsg = 'Maklumat tiada di dalam pangkalan data. Sila cuba lagi.';
    }      
  
    this.dialog.open(ExamResult, {
      data: {
        examInfo: errMsg
      }
    });
  }

}

@Component({
  selector: 'checkexam-popup',
  templateUrl: './checkexam-popup.html',
})

export class ExamPopupDialog {

  constructor(
    public dialogRef: MatDialogRef<ExamPopupDialog>,
    private translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick() {
      this.dialogRef.close();
    }
}

@Component({
  selector: 'examresult',
  templateUrl: './examresult.html',
})

export class ExamResult {

  constructor(
    public dialogRef: MatDialogRef<ExamResult>,
    private translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick() {
      this.dialogRef.close();
    }
}
