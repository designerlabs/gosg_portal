import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../common/shared.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'gosg-onlineservice',
  templateUrl: './onlineservice.component.html',
  styleUrls: ['./onlineservice.component.css']
})
export class OnlineserviceComponent implements OnInit {
  keyword: boolean = false;
  agencyUrl: any;

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
  dataAlpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  dataPage = null;
  inxlan = 0;
  public loading = false;
  chkOnline = false;
  chkDownload = false;
  isDocument;
  valByAlpha;
  valByAgency;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private http: Http,
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
      
      // this.getAgencyList();
      this.reset();
     
    });
  }

  ngOnInit() {
    this.valByAlpha = "0";
    this.valByAgency = "0";
    this.getAgencyList();
    this.loadAlpha();
    this.selAllAgency(this.pageCount, this.pageSize);
  }

  getAgencyList() {
    return this.sharedService.readPortal('agency','1','999')
      .subscribe(rData => {
        debugger;
        this.listAgency = rData['list'];
      },
        Error => {
          this.toastr.error(this.translate.instant('common.err.servicedown'), '');
        });
  }

  selByAgency(eve) {
    debugger;
    this.pageCount = 1;
    this.noPrevData = true;
    this.chkDownload = false;
    this.chkOnline = false;
    this.valByAlpha = "0"; 
    if(eve.value == 1){
      this.keyword = false;
      this.selAgency(this.pageCount, this.pageSize);
    }else if(eve.value == 0){
      this.keyword = false;
      this.selAllAgency(this.pageCount, this.pageSize);
    }else if(eve.value == 2){
      this.keyword = true;
      // this.datatblAgency = [''];
    }else{
      this.keyword = false;
      this.getDataSelByAgency(eve.value);
    }
  }

  getDataSelByAgency(val){
    this.loading = true;
      let dataUrl='agency/application/search?agencyId=' + val + '&page=' + this.pageCount + '&size=' + this.pageSize;
      return this.http.get(this.config.urlPortal + dataUrl + '&language=' + this.languageId)
        .map(res => res.json())
        .subscribe(rData => {
          debugger;
          this.sharedService.errorHandling(rData, (function () {
            this.dataPage = rData;
            if (rData['agencyApplicationList'].length > 0) {
              this.seqPageNum = this.dataPage.pageNumber;
              this.seqPageSize = this.dataPage.pageSize;
              this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
              this.datatblAgency = rData['agencyApplicationList'];
              this.showNoData = false;
            } else {
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
  }

  selByAlpha(eve) {
    this.pageCount = 1;
    this.noPrevData = true;
    this.chkDownload = false;
    this.chkOnline = false;
    console.log(eve.value);
    this.getDataSelByAlpha(eve.value);
  }

  loadAlpha(isDocument?, keyword?, agency?){
    let dataUrl;
    if(agency){
      dataUrl = 'agency/agencyid/app/alpha?language='+this.languageId;
    }else if(agency && (typeof isDocument !== 'undefined')){
      dataUrl = 'agency/agencyid/app/alpha?document='+isDocument+'&language='+this.languageId;
    }else if(keyword){
      dataUrl = 'agency/application/search/onlineservices/alpha?keyword='+keyword+'&language='+this.languageId;
    }else if(keyword && (typeof isDocument !== 'undefined')){
      dataUrl = 'agency/application/search/onlineservices/alpha?keyword='+keyword+'&document='+isDocument+'&language='+this.languageId;
    }else{
      dataUrl = 'agency/application/search/onlineservices/alpha?language='+this.languageId;
    }
    return this.http.get(this.config.urlPortal + dataUrl)
    .subscribe(rData => {
      debugger;
    })
  }
  
  getDataSelByAlpha(val){
    let dataUrl="";
      if (val !== "0") {
        this.loading = true;
        if(this.valByAgency !== "0"){
          dataUrl='agency/application/search?letter=' + val +'&agencyId=' + this.valByAgency + '&page=' + this.pageCount + '&size=' + this.pageSize;
        }else{
          dataUrl = 'agency/application/search?letter=' + val + '&page=' + this.pageCount + '&size=' + this.pageSize ;
        }
        // return this.sharedService.readPortal(dataUrl, this.pageCount, this.pageSize)
        return this.http.get( this.config.urlPortal + dataUrl + '&language=' + this.languageId)
          .map(res => res.json())
          .subscribe(rData => {
            this.sharedService.errorHandling(rData, (function () {
              this.dataPage = rData;
              if (rData['agencyApplicationList'].length > 0) {
                this.seqPageNum = this.dataPage.pageNumber;
                this.seqPageSize = this.dataPage.pageSize;
                this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
                this.datatblAgency = rData['agencyApplicationList'];
                this.showNoData = false;
              } else {
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
      } else {
        if(this.valByAgency !== "0"){
          this.getDataSelByAgency(this.valByAgency);
        }else{
          this.selAllAgency(this.pageCount, this.pageSize);
        }        
      }  
  }

  selAllAgency(page, pagesize) {
    this.loading = true;
    return this.sharedService.readPortal('agency/application/all/agencyapp/os', page, pagesize)
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function () {
          this.dataPage = rData;
          if (rData['agencyApplicationList'].length > 0) {
            this.seqPageNum = this.dataPage.pageNumber;
            this.seqPageSize = this.dataPage.pageSize;
            this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
            this.datatblAgency = rData['agencyApplicationList'];
            this.showNoData = false;
          } else {
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

  selAgency(page, pagesize, isDocument?, letter?) {
    this.loading = true;
    
    if(typeof isDocument !== 'undefined'){
      this.agencyUrl = 'agency/agencyid/app?document='+isDocument+'&page='+page+'&size='+pagesize+'&language='+this.languageId;
    }else if(typeof letter !== 'undefined'){
      this.agencyUrl = 'agency/agencyid/app?letter='+letter+'&page='+page+'&size='+pagesize+'&language='+this.languageId;
    }else if(typeof isDocument !== 'undefined' && typeof letter !== 'undefined'){
      this.agencyUrl = 'agency/agencyid/app?document='+isDocument+'&letter='+letter+'&page='+page+'&size='+pagesize+'&language='+this.languageId;
    }else{
      this.agencyUrl = 'agency/agencyid/app?page='+page+'&size='+pagesize+'&language='+this.languageId;
    }

    return this.http.get(this.config.urlPortal+this.agencyUrl)
      .subscribe(rData => {
        debugger;
        this.sharedService.errorHandling(rData, (function () {
          // this.dataPage = rData;
          // if (rData['agencyApplicationList'].length > 0) {
          //   this.seqPageNum = this.dataPage.pageNumber;
          //   this.seqPageSize = this.dataPage.pageSize;
          //   this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
          //   this.datatblAgency = rData['agencyApplicationList'];
          //   this.showNoData = false;
          // } else {
          //   this.showNoData = true;
          //   this.seqPageNum = this.dataPage.pageNumber;
          //   this.seqPageSize = this.dataPage.pageSize;
          //   this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
          // }
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
    this.valByAgency = "0";
    this.pageCount = 1;
    this.pageSize = 10;
    this.noPrevData = true;
    this.sharedService.defaultPageSize = this.sharedService.pageSize[0].size;
    this.selAllAgency(this.pageCount, this.pageSize);
  }
  chkDocument(e, val) {
    this.pageCount = 1;
    this.noPrevData = true;
    if(!e.checked){
      this.selAllAgency(this.pageCount, this.pageSize);
      this.selAgency(this.pageCount, this.pageSize);
    }else{
      if(this.valByAgency == "0"){
      
      }else if(this.valByAgency == "1"){
        if (val === 1) { // isDocument = false
          this.chkDownload = false;
          this.isDocument = false;
        } else if (val === 2) { // isDocument = true
          this.chkOnline = false;
          this.isDocument = true;
          
        }
        this.selAgency(this.pageCount, this.pageSize, this.isDocument);
      }else{
        
      }
    };

    console.log(this.chkDownload);
    console.log(this.chkOnline);
    console.log(this.chkDownload && this.chkOnline);

   

    
    // this.valByAlpha = "0";
    // this.valByAgency = "0";
    // let isDocument;
   
    this.getChkDocData(this.isDocument);    
  }
  getChkDocData(val){
    this.loading = true;
    return this.sharedService.readPortal('agency/application/all/agencyapp/os/lang', this.pageCount, this.pageSize, val)
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function () {
          this.dataPage = rData;
          if (rData['agencyApplicationList'].length > 0) {
            this.seqPageNum = this.dataPage.pageNumber;
            this.seqPageSize = this.dataPage.pageSize;
            this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
            this.datatblAgency = rData['agencyApplicationList'];
            this.showNoData = false;
          } else {
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
          this.loading = false;
        });
  }

  paginatorL(page) {
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
    this.pageCount = page - 1;

    if(this.valByAgency != "0" ){
      this.getDataSelByAgency(this.valByAgency);
    }else if(this.valByAlpha != "0"){
      this.getDataSelByAlpha(this.valByAlpha);
    }else if(this.chkOnline || this.chkDownload){
      this.getChkDocData(this.isDocument);
    }else{
      this.selAllAgency(page - 1, this.pageSize);
    }  
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    this.pageCount = pageInc;

    if(this.valByAgency != "0" ){
      this.getDataSelByAgency(this.valByAgency);
    }else if(this.valByAlpha != "0"){
      this.getDataSelByAlpha(this.valByAlpha);
    }else if(this.chkOnline || this.chkDownload){
      this.getChkDocData(this.isDocument);
    }else{
      this.selAllAgency(pageInc, this.pageSize);
    }   
  }

  pageChange(event, totalPages) {
    this.pageSize = event.value;
    this.pageCount = 1;
    this.noPrevData = true;
    if(this.valByAgency != "0" ){
      this.getDataSelByAgency(this.valByAgency);
    }else if(this.valByAlpha != "0"){
      this.getDataSelByAlpha(this.valByAlpha);
    }else if(this.chkOnline || this.chkDownload){
      this.getChkDocData(this.isDocument);
    }else{
      this.selAllAgency(this.pageCount, event.value);
    } 
  }

}
