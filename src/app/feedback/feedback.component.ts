
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
import { PortalService } from '../services/portal.service';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from '../common/validate.service';

@Component({
  selector: 'gosg-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {
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
    private portalService:PortalService,
    private validateService:ValidateService,
    private toastr: ToastrService
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
      this.checkLog();
      // this.getUserData();
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
      // this.resetForm()
      
    }
    

    getUserData(){
          if(localStorage.getItem('fullname')){
            this.feedbackFormgrp.get('nama_penuh').setValue(localStorage.getItem('fullname'));
            this.feedbackFormgrp.get('nama_penuh').disable();
          }else{
            this.feedbackFormgrp.get('nama_penuh').enable();
          }

          if(localStorage.getItem('email')){
            this.feedbackFormgrp.get('email').setValue(localStorage.getItem('email'));
            this.feedbackFormgrp.get('email').disable();
          }else{
            this.feedbackFormgrp.get('email').enable();
          }
    };

    validateCtrlChk(ctrl: FormControl) {
      // return ctrl.valid || ctrl.untouched
      return this.validateService.validateCtrl(ctrl);
    }
    
    formCtrl(){
      if(this.isAdmin == false){
        this.nama_penuh = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern(2,60).name)]),            
        this.email = new FormControl('', [Validators.required, Validators.email])
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
      this.portalService.feedbacktype(this.languageId).subscribe(data => {
        this.typeFb  = data;
      },
       Error => {

        this.toastr.error(this.translate.instant('feedback.err.type'), '');            
      });
      this.portalService.feedbacksubject(this.languageId).subscribe(data => {
        this.subjectFb  = data;          
      },
       Error => {
        this.toastr.error(this.translate.instant('feedback.err.subject'), '');        
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
    
      this.portalService.feedback(datasend).subscribe(
        data => {
          if(data.statusCode == "S001"){
            console.log();
            this.resetForm();        
            this.toastr.success(this.translate.instant('feedback.msgsubmit'), '');     
          }
          else{
            this.toastr.error(this.translate.instant('feedback.err.submit'), '');     
          }
        },
        Error => {
          this.toastr.error(this.translate.instant('feedback.err.submit'), '');                    
        }
      );
    }
    else{
      this.portalService.feedback(datasend).subscribe(
        data => {
          if(data.statusCode == "S001"){
            console.log();
            this.resetForm();        
            this.toastr.success(this.translate.instant('feedback.msgsubmit'), '');  
          }
          else{
            this.toastr.error(this.translate.instant('feedback.err.submit'), '');                               
          }
        },
        Error => {
          this.toastr.error(this.translate.instant('feedback.err.submit'), '');            
        }
      );

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
    this.nama_penuh.reset();
    this.feedback_message.reset();
    this.email.reset();
    this.feedbacksubject.reset();
    this.feedbacktype.reset();
    this.sendMsg = true;
  } 

  resetMethod(event) {
    this.resetForm();
  }


}