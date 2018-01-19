import { Component, Output, EventEmitter, OnInit, ViewChild, Inject } from '@angular/core';

import { ISlider, IResult } from './slider.model';
import { Http, Response} from '@angular/http';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import {OwlCarousel} from 'ng2-owl-carousel';

import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';

import { APP_CONFIG, AppConfig } from '../config/app.config.module';


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

  constructor( private translate: TranslateService, private router: Router, private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private breadcrumbService: BreadcrumbService ) {
    this.lang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.getSlide(this.lang);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.getSlide(this.lang);
            });
        }
    });
  }

  lang = this.lang;
  ngOnInit() {
    console.log('slider.comp.ts');
    this.getSlide(this.lang);
    this.breadcrumb = this.breadcrumbService.getBreadcrumb();
        this.breadcrumb = this.breadcrumb.name = '';
        this.isValid = this.breadcrumbService.isValid = false;
  }

    private sliderUrl: string = this.config.urlSlider;
    getSlide(lang: string) {
      return this.http.get('./app/apidata/sliderdata-'+lang+'.json')
      // return this.http.get(this.sliderUrl + '-' + lang)
           .map(res => res.json())
          .subscribe(resSliderData => {
                this.slides = resSliderData;
            });

    }

  next() {
    this.owlElement.next();
  }
  pre() {
    this.owlElement.previous();
  }

}
