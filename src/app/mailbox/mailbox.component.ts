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
import { DialogsService } from '../dialogs/dialogs.service';

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
  noNextData = false;
  rerender = false;
  isMailContainerShow = 'block';
  languageId = this.languageId;
  showNoData = false;
  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
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
      this.isMailContainerShow = 'block'
      // if(data.object.length > 0){
        this.mailContent  = data;
        // this.showNoData = false;
      // }else{
        // this.showNoData = true;
      // }
      
    },
    Error => {
     this.toastr.error(this.translate.instant('mailbox.err.failtoload'), '');            
   });
  }

  getMails(page, size){
    this.protectedService.getMails(page, size).
    subscribe(data => {
      this.mailData  = data;
      this.noNextData = data.pageNumber === data.totalPages;
    },
    Error => {

     this.toastr.error(this.translate.instant('mailbox.err.failtoload'), '');            
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
      let index = this.mailboxId.indexOf(event.source.value);
      this.mailboxId.splice(index, 1);
    }
    return false;
  }

  paginatorL(page){
    this.getMails(page-1, this.mailPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages){
    this.noPrevData = page >= 1 ? false : true;
    let pageInc = page+1;
    this.noNextData = pageInc === totalPages;
    this.getMails(page+1, this.mailPageSize);
  }


  deleteMail(msgId){
    
    this.protectedService.deleteMail(msgId).
    subscribe(
      success => {
        this.getMails(this.mailPageCount, this.mailPageSize);
        this.toastr.success(this.translate.instant('mailbox.success.deletesuccess'), '');     
      },
      Error => {

       this.toastr.error(this.translate.instant('mailbox.err.failtodelete'), '');            
     });
  }

  showMailDelMsg(event, msgId){
    event.stopPropagation();
    this.isMailContainerShow = 'none';
    this.deleteMail(msgId);
  }



  showMailsDelMsg(){
    event.stopPropagation();
    this.isMailContainerShow = 'none';
    this.deleteMails();
  }

  resetMethod(event, msgId) {
    this.isMailContainerShow = 'none';
    this.deleteMail(msgId);
  }

  resetAllMethod(){
    this.isMailContainerShow = 'none';
    this.deleteMails();
  }

  deleteMails(){
    
    this.protectedService.deleteMails(this.mailboxId).
    subscribe(
      success => {
        this.getMails(this.mailPageCount, this.mailPageSize);
        this.mailboxId = [];
        this.toastr.success(this.translate.instant('mailbox.success.deletesuccess_multi'), '');     
      },
      Error => {

       this.toastr.error(this.translate.instant('mailbox.err.failtodelete'), '');            
     });
  }
}


