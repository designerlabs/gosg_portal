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
  mailContent: any;
  mailboxId=[];
  mailPageSize = 10;
  mailPageCount = 1;
  noPrevData = true;
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
    this.getMails(this.mailPageCount, this.mailPageSize);
  }


  getMail(event, msgId){
    event.target.parentElement.parentElement.parentElement.removeAttribute('style')
    this.protectedService.getMail(msgId).
    subscribe(data => {
      this.mailContent  = data;
    },
    Error => {
     this.toastr.error(this.translate.instant('feedback.err.type'), '');            
   });
  }

  getMails(page, size){
    this.protectedService.getMails('930701055000', page, size).
    subscribe(data => {
      this.mailData  = data;
    },
    Error => {

     this.toastr.error(this.translate.instant('feedback.err.type'), '');            
   });
  }

  readMail(event, msgId){
    event.stopPropagation();
  }


  pageChange(event){
    this.getMails(this.mailPageCount, event.value);
    this.mailPageSize = event.value;
  }

  isChecked(event) {
    if(event.checked){
      this.mailboxId.push(event.source.value);
    }else{
      var index = this.mailboxId.indexOf(event.source.value);
      this.mailboxId.splice(index, 1);
    }
    return false;
  }

  paginatorL(page){
    this.getMails(page-1, this.mailPageSize);
    this.noPrevData = page <= 2 ? true : false;
  }

  paginatorR(page){
    this.noPrevData = page >= 1 ? false : true;
    this.getMails(page+1, this.mailPageSize);
  }


  deleteMail(event, msgId){
    event.stopPropagation();
    this.protectedService.deleteMail(msgId).
    subscribe(
      success => {
        this.getMails(this.mailPageCount, this.mailPageSize);
        this.toastr.error(this.translate.instant('feedback.err.type'), '');     
      },
      Error => {

       this.toastr.error(this.translate.instant('feedback.err.type'), '');            
     });
  }

  deleteMails(){
    
    this.protectedService.deleteMails(this.mailboxId).
    subscribe(
      success => {
        this.getMails(this.mailPageCount, this.mailPageSize);
        this.mailboxId = [];
        this.toastr.error(this.translate.instant('feedback.err.type'), '');     
      },
      Error => {

       this.toastr.error(this.translate.instant('feedback.err.type'), '');            
     });
  }
}
