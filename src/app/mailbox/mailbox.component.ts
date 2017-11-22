import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {Http} from '@angular/http';
import { ProtectedService } from '../services/protected.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort} from '@angular/material';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'gosg-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  mailData: any;
  rerender = false;
  languageId = this.languageId;
  constructor(
    private protectedService: ProtectedService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private translate:TranslateService
    ) {
      sharedService.loadTranslate();
      
     }

     lang = this.lang;
  
  ngOnInit() {
    this.languageId = 2;
    this.getMail();
  }


  getMail(){
    this.protectedService.getMails().
    subscribe(data => {
      this.mailData  = data;
    },
    Error => {

     this.toastr.error(this.translate.instant('feedback.err.type'), '');            
   });
  }

  readMail(event, msgId){
    event.stopPropagation();
    alert(msgId);
  }

  pageChange(event){
    debugger;
  }

  deleteMail(event, msgId){
    event.stopPropagation();
    this.protectedService.deleteMail(msgId).
    subscribe(
      success => {
        this.getMail();
        this.toastr.error(this.translate.instant('feedback.err.type'), '');     
      },
      Error => {

       this.toastr.error(this.translate.instant('feedback.err.type'), '');            
     });
  }
}
