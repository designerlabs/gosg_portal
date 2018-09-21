import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
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
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'gosg-onlineservice',
  templateUrl: './onlineservice.component.html',
  styleUrls: ['./onlineservice.component.css']
})
export class OnlineserviceComponent implements OnInit, OnDestroy {
  valByKeyword: any;

  dropdownOpt = [];
  onlyAgency: boolean = false;
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
  datatblAgencyPage = [];
  dataAlpha = [];
  dataPage = null;
  inxlan = 0;
  public loading = false;
  chkOnline = false;
  chkDownload = false;
  isDocument;
  dataAgencyPage = null;
  valByAlpha;
  valByAgency;

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private router: Router,
    public sharedService: SharedService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private topnavservice: TopnavService,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,

  ) {
    this.lang = translate.currentLang;
    this.languageId = 2;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
          this.inxlan = 0;
          this.dropdownOpt = [
            {
              "id": 0,
              "value": "Show All"
            },{
              "id":1,
              "value":"By Agency"
            },
            {
              "id":2,
              "value": "By Keyword"
            }
          ];
        });

      }

      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
          this.inxlan = 1;
          this.dropdownOpt = [
            {
              "id": 0,
              "value": "Tunjukkan Semua"
            },{
              "id":1,
              "value":"Oleh Agensi"
            },
            {
              "id":2,
              "value": "Oleh Kata Kunci"
            }
          ];
        });
      }

      if(this.topnavservice.flagLang){

        this.onlyAgency = false;
        this.loadAlpha(true);
        // this.selAllAgency(this.pageCount, this.pageSize);d
        this.selAgency(this.pageCount, this.pageSize);
        this.reset();
      }

    });

  }

  ngOnInit() {

    if(!this.languageId){
      if(localStorage.getItem('langID')){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }
      //this.getData();
    }

    this.valByAlpha = "0";
    this.valByAgency = "0";
    this.dropdownOpt = [
      {
        "id": 0,
        "value": "Show All"
      },{
        "id":1,
        "value":"By Agency"
      },
      {
        "id":2,
        "value": "By Keyword"
      }
    ];
    // this.getAgencyList();
    this.loadAlpha(true);
    this.selAllAgency(this.pageCount, this.pageSize);
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }


  /**
   *
   * Select an options
   */

  selByOptions(event){
    this.sharedService.defaultPageSize = this.sharedService.pageSize[0].size;
    this.valByKeyword = "";
    this.chkDownload = false;
    this.pageCount = 1;
    this.pageSize = 10;
    this.chkOnline = false;
    this.valByAlpha = "0";
    if(event.value == 0){
      this.keyword = false;
      this.onlyAgency = false;
      this.loadAlpha(true);
      this.selAllAgency(this.pageCount, this.pageSize);
    }else if(event.value == 1){
      this.keyword = false;
      this.onlyAgency = true;
      this.loadAlpha(false, true);
      this.selAgency(this.pageCount, this.pageSize);
    }else if(event.value == 2){
      this.keyword = true;
      this.onlyAgency = false;
      this.selAllAgency(this.pageCount, this.pageSize);
    }
  }


  appTracking(refCode){
    const readUrl = `${this.config.urlPortal}agencyapplication/tracking?refCode=${refCode}&source=online-service`;
    const req = this.http.post(readUrl,'')
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }



/**
 *
 * Load Alpha
 */


loadAlpha(onlineService?, agency?, isDocument?, keyword?){
  let dataUrl;


  if(agency && (typeof isDocument !== 'undefined')){
    dataUrl = 'agency/agencyid/app/alpha?document='+isDocument+'&language='+this.languageId;
  }else if(onlineService && (typeof isDocument !== 'undefined')){
    dataUrl = 'agency/application/search/onlineservices/alpha?document='+isDocument+'&language='+this.languageId;
  }else  if(onlineService){
    dataUrl = 'agency/application/search/onlineservices/alpha?language='+this.languageId;
  }else if(agency){
    dataUrl = 'agency/agencyid/app/alpha?language='+this.languageId;
  }else if(keyword){
    dataUrl = 'agency/application/search/onlineservices/alpha?keyword='+keyword+'&language='+this.languageId;
  }else if(keyword && (typeof isDocument !== 'undefined')){
    dataUrl = 'agency/application/search/onlineservices/alpha?keyword='+keyword+'&document='+isDocument+'&language='+this.languageId;
  }
  return this.http.get(this.config.urlPortal + dataUrl)
  .map(res => res.json())
  .subscribe(rData => {
    this.dataAlpha = rData.letters;
  })
}


/**
 *
 *
 * Checkbox selections
 *
 */

chkDocument(e, val) {
  let agencyVal = this.valByAgency;
  let alphaVal = this.valByAlpha;
  this.sharedService.defaultPageSize = this.sharedService.pageSize[0].size;
  this.pageCount = 1;
  this.pageSize = 10;
  if(val == 1){
    this.chkDownload = false;
    this.chkOnline = true;
  }else if(val == 2){
    this.chkDownload = true;
    this.chkOnline = false;
  }

  if(!e.checked){
    this.chkDownload = undefined;
    this.chkOnline = undefined;
  }
  if((agencyVal) && (alphaVal !== "0")){
    if(agencyVal == "0"){
      if(!e.checked){
        this.loadAlpha(true,false);
        this.selAllAgency(this.pageCount, this.pageSize, undefined, undefined, alphaVal);
      }else{
        if(val === 1){
          this.loadAlpha(true,false, false);
          this.selAllAgency(this.pageCount, this.pageSize, false, undefined, alphaVal);
        }else if(val === 2){
          this.loadAlpha(true,false, true);
          this.selAllAgency(this.pageCount, this.pageSize, true, undefined, alphaVal);
        }
      }
    }else if(agencyVal == "1"){
      if(!e.checked){
        this.loadAlpha(false, true);
        this.selAgency(this.pageCount, this.pageSize, undefined, alphaVal);
      }else{
        if(val === 1){
          this.loadAlpha(false,true, false);
          this.selAgency(this.pageCount, this.pageSize, false, alphaVal);
        }else if(val === 2){
          this.loadAlpha(false,true, true);
          this.selAgency(this.pageCount, this.pageSize, true, alphaVal);
        }
      }
    }
  }else if(agencyVal == "0"){

    if(!e.checked){
      this.loadAlpha(true, false);
      this.selAllAgency(this.pageCount, this.pageSize, undefined);
    }else{
      if(val === 1){
        this.loadAlpha(true, false, false);
        this.selAllAgency(this.pageCount, this.pageSize, false);
      }else if(val === 2){
        this.loadAlpha(true, false, true);
        this.selAllAgency(this.pageCount, this.pageSize, true);
      }
    }

  }
  else if(agencyVal == "1"){
    if(!e.checked){
      this.loadAlpha(false, true);
      this.selAgency(this.pageCount, this.pageSize, undefined);
    }else{
      if(val === 1){
        this.loadAlpha(false, true, false);
        this.selAgency(this.pageCount, this.pageSize, false);
      }else if(val === 2){
        this.loadAlpha(false, true, true);
        this.selAgency(this.pageCount, this.pageSize, true);
      }
    }
  }
  else if(alphaVal !== "0"){
    if(!e.checked){
      this.loadAlpha();
      this.selAllAgency(this.pageCount, this.pageSize, undefined, undefined, alphaVal);
    }else{
      if(val === 1){
        this.loadAlpha();
        this.selAllAgency(this.pageCount, this.pageSize, undefined, undefined, alphaVal);
      }else if(val === 2){
        this.loadAlpha();
        this.selAllAgency(this.pageCount, this.pageSize, undefined, undefined, alphaVal);
      }
    }
  }else if(agencyVal == "2"){
    if(this.valByKeyword){
      if(!e.checked){
        this.selAllAgency(this.pageCount, this.pageSize, undefined, this.valByKeyword);
      }else{
        if(val === 1){
          this.selAllAgency(this.pageCount, this.pageSize, false, this.valByKeyword);
        }else if(val === 2){
          this.selAllAgency(this.pageCount, this.pageSize, true, this.valByKeyword);
        }else{
          this.selAllAgency(this.pageCount, this.pageSize, undefined, this.valByKeyword);
        }
      }


    }else{
      if(!e.checked){
        this.selAllAgency(this.pageCount, this.pageSize);
      }else{
        if(val === 1){
          this.selAllAgency(this.pageCount, this.pageSize, false);
        }else if(val === 2){
          this.selAllAgency(this.pageCount, this.pageSize, true);
        }else{
          this.selAllAgency(this.pageCount, this.pageSize);
        }
      }
    }

  }
}


/**
 *
 *
 * Left and Right pagination navigation
 */

paginatorL(page) {
  let agencyVal = this.valByAgency;
  let alphaVal = this.valByAlpha;

  this.noPrevData = page <= 2 ? true : false;
  this.noNextData = false;
  this.pageCount = page - 1;

  if((agencyVal) && (alphaVal !== "0")){
    if(agencyVal == "0"){
      if(this.chkOnline){
        this.selAllAgency(this.pageCount, this.pageSize, false, undefined, alphaVal);
      }else if(this.chkDownload){
        this.selAllAgency(this.pageCount, this.pageSize, true, undefined, alphaVal);
      }else{
        this.selAllAgency(this.pageCount, this.pageSize, undefined, undefined, alphaVal);
      }
    }else if(agencyVal == "1"){
      if(this.chkOnline){
        this.selAgency(this.pageCount, this.pageSize, false, alphaVal);
      }else if(this.chkDownload){
        this.selAgency(this.pageCount, this.pageSize, true, alphaVal);
      }else{
        this.selAgency(this.pageCount, this.pageSize, undefined, alphaVal);
      }
    }

  }else if(agencyVal == "0"){
    if(this.chkOnline){
      this.selAllAgency(this.pageCount, this.pageSize, false);
    }else if(this.chkDownload){
      this.selAllAgency(this.pageCount, this.pageSize, true);
    }else{
      this.selAllAgency(this.pageCount, this.pageSize, undefined);
    }
  }else if(agencyVal == "1"){
    if(this.chkOnline){
      this.selAgency(this.pageCount, this.pageSize, false);
    }else if(this.chkDownload){
      this.selAgency(this.pageCount, this.pageSize, true);
    }else{
      this.selAgency(this.pageCount, this.pageSize, undefined);
    }
  }else if(agencyVal == "2"){
    if(this.valByKeyword){
      if(this.chkOnline){
        this.selAllAgency(this.pageCount, this.pageSize, false, this.valByKeyword);
      }else if(this.chkDownload){
        this.selAllAgency(this.pageCount, this.pageSize, true, this.valByKeyword);
      }else{
        this.selAllAgency(this.pageCount, this.pageSize, undefined, this.valByKeyword);
      }

    }

  } else{
    this.selAllAgency(page - 1, this.pageSize);
  }
}




pageChange(event, totalPages) {
  let agencyVal = this.valByAgency;
  let alphaVal = this.valByAlpha;
  this.pageSize = event.value;
  this.pageCount = 1;
  this.noPrevData = true;

  if((agencyVal) && (alphaVal !== "0")){
    if(agencyVal == "0"){
      if(this.chkOnline){
        this.selAllAgency(this.pageCount, this.pageSize, false, undefined, alphaVal);
      }else if(this.chkDownload){
        this.selAllAgency(this.pageCount, this.pageSize, true, undefined, alphaVal);
      }else{
        this.selAllAgency(this.pageCount, this.pageSize, undefined, undefined, alphaVal);
      }
    }else if(agencyVal == "1"){
      if(this.chkOnline){
        this.selAgency(this.pageCount, this.pageSize, false, alphaVal);
      }else if(this.chkDownload){
        this.selAgency(this.pageCount, this.pageSize, true, alphaVal);
      }else{
        this.selAgency(this.pageCount, this.pageSize, undefined, alphaVal);
      }
    }

  }else if(agencyVal == "0"){
    if(this.chkOnline){
      this.selAllAgency(this.pageCount, this.pageSize, false);
    }else if(this.chkDownload){
      this.selAllAgency(this.pageCount, this.pageSize, true);
    }else{
      this.selAllAgency(this.pageCount, this.pageSize, undefined);
    }
  }else if(agencyVal == "1"){
    if(this.chkOnline){
      this.selAgency(this.pageCount, this.pageSize, false);
    }else if(this.chkDownload){
      this.selAgency(this.pageCount, this.pageSize, true);
    }else{
      this.selAgency(this.pageCount, this.pageSize, undefined);
    }
  }else if(agencyVal == "2"){
    if(this.valByKeyword){
      if(this.chkOnline){
        this.selAllAgency(this.pageCount, this.pageSize, false, this.valByKeyword);
      }else if(this.chkDownload){
        this.selAllAgency(this.pageCount, this.pageSize, true, this.valByKeyword);
      }else{
        this.selAllAgency(this.pageCount, this.pageSize, undefined, this.valByKeyword);
      }

    }

  }else{
    this.selAllAgency(this.pageCount, this.pageSize);
  }

}



paginatorR(page, totalPages) {
  let agencyVal = this.valByAgency;
  let alphaVal = this.valByAlpha;

  this.noPrevData = page >= 1 ? false : true;
  let pageInc: any;
  pageInc = page + 1;
  this.pageCount = pageInc;


  if((agencyVal) && (alphaVal !== "0")){
    if(agencyVal == "0"){
      if(this.chkOnline){
        this.selAllAgency(pageInc, this.pageSize, false, undefined, alphaVal);
      }else if(this.chkDownload){
        this.selAllAgency(pageInc, this.pageSize, true, undefined, alphaVal);
      }else{
        this.selAllAgency(pageInc, this.pageSize, undefined, undefined, alphaVal);
      }
    }else if(agencyVal == "1"){
      if(this.chkOnline){
        this.selAgency(pageInc, this.pageSize, false, alphaVal);
      }else if(this.chkDownload){
        this.selAgency(pageInc, this.pageSize, true, alphaVal);
      }else{
        this.selAgency(pageInc, this.pageSize, undefined, alphaVal);
      }
    }

  }else if(agencyVal == "0"){
    if(this.chkOnline){
      this.selAllAgency(pageInc, this.pageSize, false);
    }else if(this.chkDownload){
      this.selAllAgency(pageInc, this.pageSize, true);
    }else{
      this.selAllAgency(pageInc, this.pageSize, undefined);
    }
  }else if(agencyVal == "1"){
    if(this.chkOnline){
      this.selAgency(pageInc, this.pageSize, false);
    }else if(this.chkDownload){
      this.selAgency(pageInc, this.pageSize, true);
    }else{
      this.selAgency(pageInc, this.pageSize, undefined);
    }
  }else if(agencyVal == "2"){
    if(this.valByKeyword){
      if(this.chkOnline){
        this.selAllAgency(pageInc, this.pageSize, false, this.valByKeyword);
      }else if(this.chkDownload){
        this.selAllAgency(pageInc, this.pageSize, true, this.valByKeyword);
      }else{
        this.selAllAgency(pageInc, this.pageSize, undefined, this.valByKeyword);
      }

    }

  }else{
    this.selAllAgency(pageInc, this.pageSize);
  }

}


  getAgencyList() {
    return this.sharedService.readPortal('agency','1','999')
      .subscribe(rData => {
        this.listAgency = rData['list'];
      },
        Error => {
          this.toastr.error(this.translate.instant('common.err.servicedown'), '');
        });
  }

  selByAgency(eve) {
    this.pageCount = 1;
    this.noPrevData = true;
    this.chkDownload = false;
    this.chkOnline = false;
    this.valByAlpha = "0";
    if(eve.value == 1){
      this.onlyAgency = true;
      this.keyword = false;
      this.selAgency(this.pageCount, this.pageSize);
    }else if(eve.value == 0){
      this.onlyAgency = false;
      this.keyword = false;
      this.selAllAgency(this.pageCount, this.pageSize);
    }else if(eve.value == 2){
      this.onlyAgency = false;
      this.keyword = true;
      // this.datatblAgency = [''];
    }else{
      this.onlyAgency = false;
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
    this.pageSize = 10;
    this.noPrevData = true;
    this.chkDownload = false;
    this.chkOnline = false;
    this.sharedService.defaultPageSize = this.sharedService.pageSize[0].size;

    this.getDataSelByAlpha(eve.target.value);
  }


  searchByKeyword(val){
    this.selAllAgency(this.pageCount, this.pageSize, undefined, val);
  }


  getDataSelByAlpha(val){
    let dataUrl="";
      if (val !== "0") {
        this.loading = true;
        if(this.valByAgency == "1"){
          // this.selAgency(this.pageCount, this.pageSize, undefined, val);
          dataUrl = 'agency/agencyid/app?letter='+val+'&page='+this.pageCount+'&size='+this.pageSize;
          // dataUrl='agency/application/search?letter=' + val +'&agencyId=' + this.valByAgency + '&page=' + this.pageCount + '&size=' + this.pageSize;
        }else if(this.valByAgency == "0"){
          dataUrl = 'agency/application/search/onlineservices?letter=' + val + '&page=' + this.pageCount + '&size=' + this.pageSize ;
        }
        // return this.sharedService.readPortal(dataUrl, this.pageCount, this.pageSize)
        return this.http.get(this.config.urlPortal + dataUrl + '&language=' + this.languageId)
          .map(res => res.json())
          .subscribe(rData => {
            this.sharedService.errorHandling(rData, (function () {
              this.dataPage = rData;
              if(this.valByAgency == "1"){
                this.dataAgencyPage = rData;
                if (rData['list'].length > 0) {
                  this.seqPageNum = this.dataAgencyPage.pageNumber;
                  this.seqPageSize = this.dataAgencyPage.pageSize;
                  this.noNextData = this.dataAgencyPage.pageNumber === this.dataAgencyPage.totalPages;
                  this.datatblAgencyPage = rData['list'];
                  this.showNoData = false;
                } else {
                  this.showNoData = true;
                  this.seqPageNum = this.dataAgencyPage.pageNumber;
                  this.seqPageSize = this.dataAgencyPage.pageSize;
                  this.noNextData = this.dataAgencyPage.pageNumber === this.dataAgencyPage.totalPages;
                }
              }else{
                if (rData['list'].length > 0) {
                  this.seqPageNum = this.dataPage.pageNumber;
                  this.seqPageSize = this.dataPage.pageSize;
                  this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
                  this.datatblAgency = rData['list'];
                  this.showNoData = false;
                } else {
                  this.showNoData = true;
                  this.seqPageNum = this.dataPage.pageNumber;
                  this.seqPageSize = this.dataPage.pageSize;
                  this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
                }
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
          this.selAgency(this.pageCount, this.pageSize);
        }else{
          this.selAllAgency(this.pageCount, this.pageSize);
        }
      }
  }

  selAllAgency(page, pagesize, isDocument?, keyword?, letter?) {
    this.loading = true;
    let dataUrl = '';
    if(letter && (typeof isDocument !== 'undefined')){
      dataUrl = 'agency/application/search/onlineservices?page='+page+'&size='+pagesize+'&letter='+letter+'&document='+isDocument+'&language='+this.languageId;
    }else if(keyword && (typeof isDocument !== 'undefined')){
      dataUrl = 'agency/application/search/onlineservices?page='+page+'&size='+pagesize+'&keyword='+keyword+'&document='+isDocument+'&language='+this.languageId;
    }else if(keyword){
      dataUrl = 'agency/application/search/onlineservices?page='+page+'&size='+pagesize+'&keyword='+keyword+'&language='+this.languageId;
    }else if(letter){
      dataUrl = 'agency/application/search/onlineservices?page='+page+'&size='+pagesize+'&letter='+letter+'&language='+this.languageId;
    }else if(typeof isDocument !== 'undefined'){
      dataUrl = 'agency/application/search/onlineservices?page='+page+'&size='+pagesize+'&document='+isDocument+'&language='+this.languageId;
    }else{
      dataUrl = 'agency/application/search/onlineservices?page='+page+'&size='+pagesize+'&language='+this.languageId;
    }

    // return this.sharedService.readPortal('agency/application/search/onlineservices', page, pagesize)
    return this.http.get(this.config.urlPortal+dataUrl)
      .map(res => res.json())
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function () {
          this.dataPage = rData;
          if (rData['list'].length > 0) {
            this.seqPageNum = this.dataPage.pageNumber;
            this.seqPageSize = this.dataPage.pageSize;
            this.noNextData = this.dataPage.pageNumber === this.dataPage.totalPages;
            this.datatblAgency = rData['list'];
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
    if(typeof isDocument !== 'undefined' && typeof letter !== 'undefined'){
      this.agencyUrl = 'agency/agencyid/app?document='+isDocument+'&letter='+letter+'&page='+page+'&size='+pagesize+'&language='+this.languageId;
    }else if(typeof letter !== 'undefined'){
      this.agencyUrl = 'agency/agencyid/app?letter='+letter+'&page='+page+'&size='+pagesize+'&language='+this.languageId;
    }else if(typeof isDocument !== 'undefined'){
      this.agencyUrl = 'agency/agencyid/app?document='+isDocument+'&page='+page+'&size='+pagesize+'&language='+this.languageId;
    }else{
      this.agencyUrl = 'agency/agencyid/app?page='+page+'&size='+pagesize+'&language='+this.languageId;
    }

    return this.http.get(this.config.urlPortal+this.agencyUrl)
      .map(res => res.json())
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function () {
          this.dataAgencyPage = rData;
          if (rData['list'].length > 0) {
            this.seqPageNum = this.dataAgencyPage.pageNumber;
            this.seqPageSize = this.dataAgencyPage.pageSize;
            this.noNextData = this.dataAgencyPage.pageNumber === this.dataAgencyPage.totalPages;
            this.datatblAgencyPage = rData['list'];
            this.showNoData = false;
          } else {
            this.showNoData = true;
            this.seqPageNum = this.dataAgencyPage.pageNumber;
            this.seqPageSize = this.dataAgencyPage.pageSize;
            this.noNextData = this.dataAgencyPage.pageNumber === this.dataAgencyPage.totalPages;
          }
        }).bind(this));
        this.loading = false;
      },
        error => {
          this.toastr.error(this.translate.instant('common.err.servicedown'), '');
        });
  }

  reset() {
    this.onlyAgency = false;
    this.chkDownload = false;
    this.chkOnline = false;
    this.keyword = false;
    this.valByAlpha = "0";
    this.valByAgency = "0";
    this.pageCount = 1;
    this.pageSize = 10;
    this.noPrevData = true;
    this.sharedService.defaultPageSize = this.sharedService.pageSize[0].size;
    this.selAllAgency(this.pageCount, this.pageSize);
  }

  getChkDocData(val){
    this.loading = true;
    if(this.valByAgency == "0"){
      this.selAllAgency(this.pageCount, this.pageSize, val)
    }
  }



}
