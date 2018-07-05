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
  selector: 'gosg-statusposition',
  templateUrl: './statusposition.component.html',
  styleUrls: ['./statusposition.component.css']
})
export class StatuspositionComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;
  complete: boolean;

  public kp: any;
  public name: any;
  public date: any;
  public place: any;
  public status: any;
  public showDetails = false;

  searchForm: FormGroup;  
  public ic: FormControl;  

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

    this.searchForm = new FormGroup({   

      ic: this.ic   
    });

  }

  searchApp(formValues: any){

    this.showDetails = true;

    this.kp = "940911025242";
    this.name = "NUR IZZATY BINTI MAHD SUPON";
    this.date =  "2018-04-12";
    this.place = "PULAPOL DUNGUN";
    this.status = "PAPAR/CETAK";

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

    this.checkReqValues();
    
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  checkReqValues() {

    let reqVal:any = ["ic"];
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
    this.showDetails = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }

}
