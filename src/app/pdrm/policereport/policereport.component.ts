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

    // this.subscription = this.getFaq(this.langID);
  }

  checkReqValues() {

    let reqVal:any = ["ic", "noreport", "yearrepoart"];
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
  }

  resetSearch(){
    //this.appNumber.reset();
    this.searchForm.get('ic').setValue(null);
    this.searchForm.get('noreport').setValue(null);
    this.searchForm.get('yearreport').setValue(null);
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
