import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../../header/topnav/topnav.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';

@Component({
  selector: 'gosg-policereport',
  templateUrl: './policereport.component.html',
  styleUrls: ['./policereport.component.css']
})
export class PolicereportComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;
  complete: boolean;

  public noRptPol: any;
  public dateRptPol: any;
  public statusRpt: any;
  public noKertasSiasat: any;
  public seksyenSiasat: any;
  public statusSiasat: any;
  public pegawaiSiasat: any;
  public letter = [];
  public listYear = [];
  public showDetails = false;

  searchForm: FormGroup;  
  public ic: FormControl;  
  public noreport: FormControl;
  public yearreport: FormControl

  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  private urlFaq: string = this.config.urlFaq;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private topnavservice: TopnavService,) {

    this.lang = translate.currentLang;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langID = 1;
            });
        }

        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langID = 2;
            });
        }

        if(this.topnavservice.flagLang){
          //this.subscription = this.getFaq(this.langID);
        }

    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
   // this.subscription.unsubscribe();
  }

  ngOnInit() {

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    this.ic = new FormControl();
    this.noreport = new FormControl();
    this.yearreport = new FormControl();

    this.searchForm = new FormGroup({   

      ic: this.ic,
      noreport: this.noreport,
      yearreport: this.yearreport      
    });

    this.getYear();
  }

  getYear(){
    let y = new Date();
    let ny = y.getFullYear().toString();
    let year = ny.substr(-2);

    this.listYear = [];

    for (let i = 11; i < parseInt(year)+1; i++) { 
      this.listYear.push(i);
    }
  }

  searchApp(formValues: any){

    this.showDetails = true;

    this.noRptPol = "THSL/006026/11";
    this.dateRptPol = "2011-02-18 17:44:40";
    this.statusRpt =  "Buka Kertas Siasatan Baru";

    this.noKertasSiasat = "DW/JSJ/KS/01114/11";
    this.seksyenSiasat = "29 (1) AKTA KESALAHAN KECIL 1955,25 (1) (n) PERATURAN-PERATURAN PENDAFTARAN NEGARA 1990";
    this.statusSiasat = "Dituduh";
    this.pegawaiSiasat = "C/INSP NURUL HAFIDZ BIN MOHD DERUS";
    this.letter = ["www.google.com","www.yahoo.com","www.google.com"];
  }

  openLink(varUrl){
    if(varUrl != undefined){
      let httpStr = varUrl.substring(0, 4);

      if(httpStr.toLowerCase() == 'http'){
        window.open(varUrl,'_blank');
      }

      else{
        let newUrl = "http://";
        window.open(newUrl+varUrl,'_blank');
      }

    }
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  checkReqValues() {

    let reqVal:any = ["ic", "noreport", "yearreport"];
    let nullPointers:any = [];

    for (var reqData of reqVal) {
      let elem = this.searchForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }
      
    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

    this.getYear();
  }

  resetSearch(){
    //this.appNumber.reset();
    this.searchForm.get('ic').setValue(null);
    this.searchForm.get('noreport').setValue(null);
    this.searchForm.get('yearreport').setValue(null);
    this.showDetails = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }

  // getFaq(lang) {

  //   return this.http.get(this.urlFaq + '?language=' + lang + '&page=1&size=99')

  //   .map((response: Response) => response.json())
  //   .subscribe(resSliderData => {
  //     this.faqData = resSliderData
  //     this.faqList = this.faqData['faqList'];
      

  //   });

  // }

}
