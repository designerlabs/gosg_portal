import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from './../header/topnav/topnav.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from './../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { NavService } from '../header/nav/nav.service';

@Component({
  selector: 'gosg-replacementmycard',
  templateUrl: './replacementmycard.component.html',
  styleUrls: ['./replacementmycard.component.css']
})
export class ReplacementmycardComponent implements OnInit {

  lang = this.lang;
  langID: any;
  redirect_url: any;
  new_redirect_url: any;
  private subscriptionLang: ISubscription;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    private navService: NavService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private topnavservice: TopnavService,) {

    this.navService.restricted = false;
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

 
  ngOnInit() {

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }  

    let newPage = '';
    this.redirect_url = '';
    //newPage = 'https://www.google.com'; // for test only;
    this.redirect_url = document.URL + '?redirect_url='+newPage;
    this.new_redirect_url = this.redirect_url.split('?redirect_url=')[1];
    
    // console.log(this.redirect_url);
    // console.log(this.new_redirect_url);
  }

  clickYes(){
    
    if(this.new_redirect_url){     
      let newUrl = "http://";
      
      let httpStr = this.new_redirect_url.substring(0, 4);

      if(httpStr.toLowerCase() == 'http' || httpStr.toLowerCase() == 'https'){
        
        this.new_redirect_url = this.new_redirect_url.replace(/%2F/g, "/");
       
        window.open(this.new_redirect_url+"?status=ya", '_blank');

      } else {
        
        window.open(newUrl+this.new_redirect_url+"?status=ya", '_blank');
      }

    }
  }

  clickNo(){
    //open('', '_self').close();
    window.open('', '_self', '');
    window.close();   
  }
}
