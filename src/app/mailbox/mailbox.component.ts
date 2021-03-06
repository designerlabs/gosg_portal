import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../header/topnav/topnav.service';
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
export class MailboxComponent implements OnInit, OnDestroy {
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
  loading = false;
  private subscriptionLang: ISubscription;
  private subscription: ISubscription;
  
  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private translate:TranslateService,
    private topnavservice: TopnavService,
    ) {
        sharedService.loadTranslate();
        
        // if(this.topnavservice.flagLang){
        //   this.getMails(this.mailPageCount, this.mailPageSize);
        // }

     }

     lang = this.lang;
  
  ngOnDestroy() {
    //this.subscriptionLang.unsubscribe();
    //this.subscription.unsubscribe();
  }
  ngOnInit() {
    //this.languageId = 2;
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    this.getMails(this.mailPageCount, this.mailPageSize);
  }


  getMail(event, msgId){
    this.loading = true;
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
      this.loading = false;
    },
    Error => {
      this.loading = false;
      this.toastr.error(this.translate.instant('mailbox.err.failtoload'), '');            
   });
  }

  getMails(page, size){
    this.loading = true;
    this.protectedService.getMails(page, size).
    subscribe(data => {
      this.mailData  = data;
      this.noNextData = data.pageNumber === data.totalPages;
      this.loading = false;
    },
    Error => {
      this.loading = false;
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
    this.loading = true;
    this.protectedService.deleteMail(msgId).
    subscribe(
      success => {
        this.getMails(this.mailPageCount, this.mailPageSize);
        this.toastr.success(this.translate.instant('mailbox.success.deletesuccess'), '');     
        this.loading = false;
      },
      Error => {
        this.loading = false;
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
    this.loading = true;
    this.protectedService.deleteMails(this.mailboxId).
    subscribe(
      success => {
        this.getMails(this.mailPageCount, this.mailPageSize);
        this.mailboxId = [];
        this.toastr.success(this.translate.instant('mailbox.success.deletesuccess_multi'), '');     
        this.loading = false;
      },
      Error => {
        this.loading = false;
        this.toastr.error(this.translate.instant('mailbox.err.failtodelete'), '');            
     });
  }
}


