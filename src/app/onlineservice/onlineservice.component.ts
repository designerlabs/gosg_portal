import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { SharedService } from '../common/shared.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'gosg-onlineservice',
  templateUrl: './onlineservice.component.html',
  styleUrls: ['./onlineservice.component.css']
})
export class OnlineserviceComponent implements OnInit {

  lang = this.lang;
  languageId = this.languageId;

  pageCount = 1;
  pageSize = 10;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;
  showNoData = false;
  listAgency = [];
  datatblAgency = [];
  dataAlpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  dataPage = null;
  inxlan = 0;
  public loading = false;
  chkOnline = false;
  chkDownload = false;
  valByAlpha = "0";
  valByAgency= "0";

  constructor(
    private router: Router,
    private sharedService:SharedService, 
    private translate: TranslateService,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig,

  ) { 
    this.lang = translate.currentLang;
      this.languageId = 2;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
                  const myLang = translate.currentLang;
      
                  if (myLang == 'en') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                          this.languageId = 1;
                          this.inxlan = 0;
                      });
      
                  }
                  if (myLang == 'ms') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                          this.languageId = 2;
                          this.inxlan = 1;
                      });
                  }
                  this.getAgencyList();                  
              });
  }

  ngOnInit() {
    this.getAgencyList();
    this.selAllAgency(this.pageCount,this.pageSize);
  }  
  
  getAgencyList(){
    return this.sharedService.readPortal('agency')
      .subscribe(rData => {
        this.listAgency = rData['list'];
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  selByAgency(eve){
    console.log(eve.value);
    if(eve.value !=="0"){   
      this.loading = true;
    return this.sharedService.readPortal('agency/application/agencyid/os/' + eve.value, this.pageCount, this.pageSize)
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function(){
        this.dataPage = rData;
        if(rData['agencyApplicationList'].length > 0){
          this.seqPageNum = this.dataPage.pageNumber;
          this.seqPageSize = this.dataPage.pageSize;
          this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
          this.datatblAgency = rData['agencyApplicationList'];
          this.showNoData = false;
        }else {
          this.showNoData = true;
          this.seqPageNum = this.dataPage.pageNumber;
          this.seqPageSize = this.dataPage.pageSize;
          this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
        }
      }).bind(this));     
      this.loading = false;
      },
      error => {
        this.loading = false;
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
    }else {
      this.selAllAgency(this.pageCount,this.pageSize);
    }
  }

  selByAlpha(eve){
    console.log(eve.value);
    if(eve.value !=="0") {   
      this.loading = true;
    return this.sharedService.readPortal('agency/application/search/letter/' + eve.value, this.pageCount, this.pageSize)
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function(){
        this.dataPage = rData;
        if(rData['agencyApplicationList'].length > 0){
          this.seqPageNum = this.dataPage.pageNumber;
          this.seqPageSize = this.dataPage.pageSize;
          this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
          this.datatblAgency = rData['agencyApplicationList'];
          this.showNoData = false;
        }else {
          this.showNoData = true;
          this.seqPageNum = this.dataPage.pageNumber;
          this.seqPageSize = this.dataPage.pageSize;
          this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
        }
      }).bind(this));     
      this.loading = false;
      },
      error => {
        this.loading = false;
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
    }else {
      this.selAllAgency(this.pageCount,this.pageSize);
    }
  }

  selAllAgency(page, pagesize){
    this.loading = true;
    return this.sharedService.readPortal('agency/application/all/agencyapp/os', page, pagesize)
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function(){
        this.dataPage = rData;
        if(rData['agencyApplicationList'].length > 0){
          this.seqPageNum = this.dataPage.pageNumber;
          this.seqPageSize = this.dataPage.pageSize;
          this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
          this.datatblAgency = rData['agencyApplicationList'];
          this.showNoData = false;
        }else {
          this.showNoData = true;
          this.seqPageNum = this.dataPage.pageNumber;
          this.seqPageSize = this.dataPage.pageSize;
          this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
        }
      }).bind(this));     
      this.loading = false;
      },
      error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  reset() {
    this.chkDownload = false;
    this.chkOnline = false;
    this.valByAlpha = "0";
    this.valByAgency= "0";
    this.pageCount = 1;
    this.pageSize = 10;
    this.selAllAgency(this.pageCount,this.pageSize);
  }
  chkDocument(val){
    if(val === 1){ // isDocument = false
      this.chkDownload = false;
    }else if(val === 2){ // isDocument = true
      this.chkOnline = false;
    }
  }

  paginatorL(page) {    
    this.selAllAgency(page - 1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false; 
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    this.selAllAgency(pageInc , this.pageSize);
  }

  pageChange(event, totalPages) {   
    this.pageSize = event.value;   
    this.selAllAgency(this.pageCount, event.value);    
    this.noPrevData = true;
  }

}
