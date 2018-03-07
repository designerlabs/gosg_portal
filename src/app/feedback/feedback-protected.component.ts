
import { Component, OnInit,ElementRef, Input, ViewChild, Inject, ViewContainerRef  } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http, Response} from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { DialogsService } from '../dialogs/dialogs.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ProtectedService } from '../services/protected.service';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from '../common/validate.service';
import { SharedService} from '../common/shared.service';
import {environment} from '../../environments/environment';
@Component({
  selector: 'gosg-feedback-protected',
  templateUrl: './feedback-protected.component.html',
  styleUrls: ['./feedback-protected.component.css']
})

export class FeedbackProtectedComponent implements OnInit {
  regemail: any;
  fullname: any;
  userId: any;
  userTypeId: any;
  submitMsg: any;
  
  @Input() state:string;
  @Input() getEmail;
  @Input() getFullname;

  public feedbackFormgrp: FormGroup;
  feedback_message: FormControl;
  feedbacktype: FormControl;
  nama_penuh: FormControl;
  feedbacksubject: FormControl;
  email: FormControl;
  @Input() sendMsg;
  isAdmin = false;
  fullName:string;
  emaiL:string;
  icNo:string;
  languageId = this.languageId;
  resultdata :any=[];
  typeFb: any[];
  subjectFb = [];

  constructor(
    public snackBar: MatSnackBar,
    private dialogsService: DialogsService,
    vcr: ViewContainerRef,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private protectedService:ProtectedService,
    private validateService:ValidateService,
    private toastr: ToastrService,
    private sharedService :SharedService
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;
      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
            this.lang = 'en';
            this.languageId = 1;
        });
  
      }
      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
            this.lang = 'ms';
            this.languageId = 2;
        });
      }
      this.getSubType();
      this.getTypenSubject();
    });
  }
  lang = this.lang;
  
  resetMsg = this.resetMsg;

  ngOnInit() {
    this.languageId = 2;
    //this.checkLog();
    this.getUserData();
    this.getTypenSubject();
    this.feedback_message = new FormControl('', [Validators.required]),
    this.feedbacktype = new FormControl('', [Validators.required]),
    this.feedbacksubject = new FormControl('', [Validators.required]),
    this.formCtrl();
    this.feedbackFormgrp = new FormGroup({
      nama_penuh: this.nama_penuh,
      feedback_message: this.feedback_message,
      email: this.email,
      feedbacktype: this.feedbacktype,
      feedbacksubject: this.feedbacksubject,
      
    });
  }

  getUserData(){
    if(!environment.staging){
      this.protectedService.getUser().subscribe(
        data => {
          if(data.user){
            // this.fullname = data.user.fullName;
            this.userTypeId = data.user.userType.userTypeId;
  
            this.protectedService.getProfile(data.user.pid).subscribe(
              data => {
                this.sharedService.errorHandling(data, (function(){
                  if(data.user){
                    this.userId = data.user.userId;
                    this.fullname = data.user.fullName;
                    this.regemail = data.user.email;
                    this.feedbackFormgrp.get('nama_penuh').setValue(this.fullname);
                    this.feedbackFormgrp.get('email').setValue(this.regemail);
                  }
                }).bind(this)); 
              },
              error => {
                this.toastr.error(JSON.parse(error._body).statusDesc, '');   
              }
            )
          }else{}
          
        },
  
  
        error => {
          location.href = this.config.urlUAP +'uapsso/Logout';
          //location.href = this.config.urlUAP+'portal/index';
        }
      )
    }    
  }

validateCtrlChk(ctrl: FormControl) {
  // return ctrl.valid || ctrl.untouched
  return this.validateService.validateCtrl(ctrl);
}

formCtrl(){
  if(this.isAdmin == false){
    this.nama_penuh = new FormControl('', [Validators.pattern(this.validateService.getPattern(2,60).name)]),            
    this.email = new FormControl('', [Validators.email])
  }
  if(this.isAdmin == true){
    this.nama_penuh = new FormControl(),                  
    this.email = new FormControl()
  }
}

checkLog(){
  let value:string = localStorage.getItem('usrID');
  if(value != null){
    this.isAdmin = true;
    this.fullName = localStorage.getItem('name');
    this.emaiL = localStorage.getItem('email');
    this.icNo = localStorage.getItem('icNo');
  }
  else{
    this.isAdmin = false;
  }
  // console.log(value);
}

getSubType(){
  this.feedbacksubject.reset();
  this.feedbacktype.reset();
  this.resetForm();
  
}

getTypenSubject(){
  this.protectedService.feedbacktype(this.languageId)
    .subscribe(data => {
      this.sharedService.errorHandling(data, (function(){
        this.typeFb  = data;
      }).bind(this));  
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');                 
    });

  this.protectedService.feedbacksubject(this.languageId)
  .subscribe(data => {
    this.sharedService.errorHandling(data, (function(){
        this.subjectFb  = data;          
      }).bind(this));  
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');                 
    });
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 9000
  });
}

submitForm(formValues:any){
  let body = {
    "feedbackName":null,
    "feedbackEmail":null,
    "feedbackType":null,
    "feedbackMessage": null,
    "feedbackSubject":null,
    "language":null,
    "feedbackActionBy":null
  };

  body.feedbackName = formValues.nama_penuh;
  body.feedbackEmail = formValues.email;
  body.feedbackType = { "feedbackTypeId": formValues.feedbacktype };
  body.feedbackSubject = { "feedbackSubjectId": formValues.feedbacksubject };
  body.feedbackMessage = formValues.feedback_message;
  body.language =  { "languageId": this.languageId};
  
  let datasend = JSON.stringify(body); 

  if(this.isAdmin){
    body.feedbackName = this.fullName;
    body.feedbackActionBy = {"id": this.icNo }
    body.feedbackEmail = this.emaiL;
    datasend =JSON.stringify(body); 

    this.protectedService.feedback(datasend).subscribe(
      data => {

        this.sharedService.errorHandling(data, (function(){         
          this.resetForm();        
          this.toastr.success(this.translate.instant('feedback.msgsubmit'), '');     
        }).bind(this));  
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
                  
      });
  }
  else{
    this.protectedService.feedback(datasend).subscribe(
      data => {

        this.sharedService.errorHandling(data, (function(){
          this.resetForm();        
          this.toastr.success(this.translate.instant('feedback.msgsubmit'), '');            
        }).bind(this));  
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
      });
  }
}

showResetMsg(){
  this.dialogsService
  .confirm('', this.translate.instant('feedback.reset'))
  .subscribe(
    data => {
      if(data){
        this.resetForm();
      }
    });
}

resetForm(){
  // this.nama_penuh.reset();
  this.feedback_message.reset();
  // this.email.reset();
  this.feedbacksubject.reset();
  this.feedbacktype.reset();
  this.sendMsg = true;
} 

resetMethod(event) {
  this.resetForm();
}


}
