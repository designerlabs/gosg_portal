import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { FaqService } from './faq.service';

@Component({
     templateUrl: 'faq.component.html',
     styles: [`
     a {
            color: #337ab7;
            text-decoration: none;
      }
      a:hover, a:focus {
        color: #1ebebc;
        text-decoration: underline;
      }
     `
     ],
     providers: [FaqService]
})

export class FaqComponent{
  lang = this.lang;
  langID = 1;
  faqData = null;
  faqList = [];
  faqAnswer: any;
  faqQuestion: any;

  private urlFaq: string = this.config.urlFaq;

  constructor(private translate: TranslateService,
      private router: Router,
      private http: Http,
      @Inject(APP_CONFIG) private config: AppConfig) {

      this.lang = translate.currentLang;

      translate.onLangChange.subscribe((event: LangChangeEvent) => {

          const myLang = translate.currentLang;

          if (myLang == 'en') {

              translate.get('HOME').subscribe((res: any) => {
                  this.lang = 'en';
                  this.langID = 1;
                  this.getFaq(this.langID);
              });
          }

          if (myLang == 'ms') {

              translate.get('HOME').subscribe((res: any) => {
                  this.lang = 'ms';
                  this.langID = 2;
                  this.getFaq(this.langID);
              });
          }

      });
  }

  ngOnInit() {
    this.langID = 0;
    if (this.lang === 'ms') {
      this.langID = 2;
    }else {
      this.langID = 1;
    }

    this.getFaq(this.langID);
  }

  getFaq(lang) {

    return this.http.get(this.urlFaq + '?language=' + lang + '&page=1&size=99')

    .map((response: Response) => response.json())
    .subscribe(resSliderData => {
      this.faqData = resSliderData
      this.faqList = this.faqData['faqList'];
      console.log(this.faqList);

    });

  }

}
