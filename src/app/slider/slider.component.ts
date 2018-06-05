import { Component, Output, EventEmitter, OnInit, ViewChild, Inject } from '@angular/core';

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
export class SliderComponent implements OnInit {
  breadcrumb: any;
  isValid: any;
  @Output() langChange = new EventEmitter();


  @ViewChild('owlElement') owlElement: OwlCarousel;

  slides: any[];
  languageId: any;

  constructor(
    private translate: TranslateService,
    private topnavservice: TopnavService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private breadcrumbService: BreadcrumbService,
    private sharedservice:SharedService
  ) {

  }

  lang = this.lang;
  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // this.sharedService.errorHandling(event, (function(){

        const myLang = this.translate.currentLang;

        if (myLang === 'en') {
          this.lang = 'en';
          this.languageId = 1;
          console.log('Translate ENGLISH');
        }
        if (myLang === 'ms') {
          this.lang = 'ms';
          this.languageId = 2;
          console.log('Translate MALAY');
        }

        console.log("tested: "+ this.topnavservice.flagLang);
        //if(this.topnavservice.flagLang != undefined){
          console.log(this.languageId);
          this.getSlide(this.lang);
        //}
      // }).bind(this));
    });
    console.log('slider.comp.ts');
    this.getSlide(this.lang);
    this.breadcrumb = this.breadcrumbService.getBreadcrumb();
    this.breadcrumb = this.breadcrumb.name = '';
    this.isValid = this.breadcrumbService.isValid = false;
  }

    private sliderUrl: string = this.config.urlSlider;
    getSlide(lang: string) {
      this.sharedservice.readPortal('slider')
          .subscribe(resSliderData => {
                this.slides = resSliderData['sliderList'];
                console.log(this.slides);
            });
    }

  next() {
    this.owlElement.next();
  }
  pre() {
    this.owlElement.previous();
  }

}
