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

import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'gosg-summontraffic',
  templateUrl: './summontraffic.component.html',
  styleUrls: ['./summontraffic.component.css']
})
export class SummontrafficComponent implements OnInit {

  lang = this.lang;
  langID: any;
  complete: boolean;
  param = "";
  dataApp: any;
  dataAppPage: any;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  showNoData = false;

  public kp: any;
  public name: any;
  public summon: any;
  public ammount: any;
  public showDetails = false;
  public varSelect: any;

  searchForm: FormGroup;  
  public optSelect: FormControl;
  public ic: FormControl;  
  public noCar: FormControl;

  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  private urlFaq: string = this.config.urlFaq;

  constructor(
    private protectedService: ProtectedService,
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

    this.optSelect = new FormControl();
    this.ic = new FormControl();
    this.noCar = new FormControl();

    this.searchForm = new FormGroup({   

      optSelect: this.optSelect,
      ic: this.ic,
      noCar: this.noCar    
    });
    
    this.searchForm.get('optSelect').setValue(1);
    this.varSelect = 1;

    this.getDataAppList(this.pageCount, this.pageSize);

  }

  getDataAppList(page, size){

    this.protectedService.getDataApp(page, size, this.param).subscribe(
    data => {
      this.dataApp = data.list;
      this.dataAppPage = data;
      this.noNextData = data.pageNumber === data.totalPages;
      this.showNoData = false;

      if(this.dataApp.length == 0){
        this.showNoData = true;
      }
    });
  }

  pageChange(event){
    this.getDataAppList(this.pageCount, event.value);
    this.pageSize = event.value;
  }

  paginatorL(page){
    this.getDataAppList(page-1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages){
    this.noPrevData = page >= 1 ? false : true;
    let pageInc = page+1;
    this.noNextData = pageInc === totalPages;
    this.getDataAppList(page+1, this.pageSize);
  }

  searchApp(formValues: any){

    this.showDetails = true;

    this.kp = "971020085921";
    this.name = "MUHAMMAD ISYRAF RAZIQ B YUSOF";
    this.summon =  "1";
    this.ammount = "300";
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  getSelection(e){ //when change selection
    this.varSelect = e.value;
  }

  checkReqValues() {

    let reqVal = [];
    let nullPointers:any = [];

    if(this.varSelect == 1){
      reqVal = ["ic"];
    }

    if(this.varSelect == 2){
      reqVal = ["noCar"];
    }    

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
    this.searchForm.get('ic').setValue(null);
    this.searchForm.get('noCar').setValue(null);
    this.showDetails = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }

}
