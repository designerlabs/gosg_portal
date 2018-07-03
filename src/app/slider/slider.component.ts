import { Component, Output, EventEmitter, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { ISlider, IResult } from './slider.model';
import { Http, Response} from '@angular/http';
import { Router } from '@angular/router';

import * as $ from 'jquery';


import {OwlCarousel} from 'ng2-owl-carousel';
import {SharedService } from '../common/shared.service'
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';

import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  breadcrumb: any;
  isValid: any;
  slides: any[];
  languageId: any;
  urlSlider: any;

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  @Output() langChange = new EventEmitter();
  @ViewChild('owlElement') owlElement: OwlCarousel;

  constructor(
    private translate: TranslateService,
    private topnavservice: TopnavService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private breadcrumbService: BreadcrumbService,
    private sharedservice:SharedService
  ) {

    this.subscriptionLang = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // this.sharedService.errorHandling(event, (function(){
        const myLang = this.translate.currentLang;
        if (myLang === 'en') {
           this.lang = 'en';
           this.languageId = 1;
        }
        if (myLang === 'ms') {
          this.lang = 'ms';
          this.languageId = 2;
        }

        if(this.topnavservice.flagLang){
          this.getSlide(this.languageId);
          //this.subscription = this.getSlide(this.languageId);
        }

      // }).bind(this));

    });

  }

  lang = this.lang;

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscription.unsubscribe();
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    //this.subscription = this.getSlide(this.languageId);
    this.getSlide(this.languageId);
    this.breadcrumb = this.breadcrumbService.getBreadcrumb();
    this.breadcrumb = this.breadcrumb.name = '';
    this.isValid = this.breadcrumbService.isValid = false;
  }

  getSlide(lang:any) {

    this.sharedservice.readPortal('slider','','','',lang)
    .subscribe(resSliderData => {
          this.slides = resSliderData['sliderList'];

    });
  }

  getUrl(getUrlSlider){
    debugger;
    if(getUrlSlider != undefined){

      let httpStr = getUrlSlider.substring(0, 4);

      if(httpStr.toLowerCase() == 'http'){
        window.open(getUrlSlider,'_blank');
      }

      else{
        window.open(getUrlSlider);
      }
    }
  }

  next() {
    this.owlElement.next();
  }
  pre() {
    this.owlElement.previous();
  }

}
