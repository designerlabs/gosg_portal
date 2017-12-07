import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../common/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { ProtectedService } from '../services/protected.service';

@Component({
  selector: 'gosg-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css'],
})
export class AppManagementComponent implements OnInit {
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
  collapse:string = "closed";

  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private translate:TranslateService) { }

  ngOnInit() {
    this.languageId = 2;
    this.getMails(this.mailPageCount, this.mailPageSize);
  }

  getMails(page, size){
    this.protectedService.getMails('930701055000', page, size).
    subscribe(data => {
      this.mailData  = data;
    },
    Error => {

     this.toastr.error(this.translate.instant('mailbox.err.failtoload'), '');            
   });
  }

  pageChange(event){
    // this.getMails(this.mailPageCount, event.value);
    this.mailPageSize = event.value;
  }

  paginatorL(page){
    // this.getMails(page-1, this.mailPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages){
    this.noPrevData = page >= 1 ? false : true;
    let pageInc = page+1;
    this.noNextData = pageInc === totalPages;
    // this.getMails(page+1, this.mailPageSize);
  }

  toggleCollapse() {
    // this.show = !this.show
      this.collapse = this.collapse == "open" ? 'closed' : 'open';
  }
}
