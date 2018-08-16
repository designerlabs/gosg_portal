import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Inject, AfterContentInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { TopnavService } from '../header/topnav/topnav.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { NavService } from '../header/nav/nav.service';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { PortalService } from '../services/portal.service';

@Component({
  selector: 'app-highlightbox',
  templateUrl: './highlightbox.component.html',
  styleUrls: ['./highlightbox.component.css']
})
export class HighlightboxComponent implements OnInit, OnDestroy {
    highlightData: any;
    hotTopic: string;
    hotTopicContent: any[];
    hotTopicData: any[];
    penyertaan: any[];
    penyertaanContent: any[];
    penyertaanButton: any[];
    statuslabel: string;
    statusContent: string;
    hotTopicImg: string;
    peyertaanImg: string;
    permohonanImg: string;
    private subscription: ISubscription;
    private subscriptionLang: ISubscription;
    private subscriptionHotTopic: ISubscription;
    lang = 'en';
    languageId: any;
    filter= false;
    loading: boolean = false;
    result: any;
    updateForm: FormGroup

    noPermohonanCarian: FormControl
    sbgcolor: boolean;

    constructor(
      private toastr: ToastrService, private translate: TranslateService, private topnavservice: TopnavService, private portalService:PortalService, private navService: NavService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private portalservice: PortalService){
        this.lang = translate.currentLang;
        this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
          const myLang = translate.currentLang;
          if (myLang === 'en') {
             this.lang = 'en';
             this.languageId = 1;
          }
          if (myLang === 'ms') {
            this.lang = 'ms';
            this.languageId = 2;
          }

          if(this.topnavservice.flagLang){
            this.subscriptionHotTopic = this.getHotTopic(this.lang);
            this.subscription = this.getData(this.lang);
            this.updateForm.reset();
            this.result = null;
          }
        });
    }

    ngOnInit(){

      if(!this.languageId){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }

      this.subscription = this.getData(this.lang);
      this.subscriptionHotTopic = this.getHotTopic(this.lang);
      this.noPermohonanCarian = new FormControl()

      this.updateForm = new FormGroup({
        noPermohonanCarian: this.noPermohonanCarian
      });
    }

    ngOnDestroy() {
      this.subscriptionLang.unsubscribe();
      this.subscription.unsubscribe();
      this.subscriptionHotTopic.unsubscribe();
    }




   private highlightUrl: string = this.config.urlHighlights;
   private hottopicUrl: string = this.config.urlHotTopics;
   getData(lang: string){
         return this.http.get(this.highlightUrl + '-' + lang + '.json')
           .map(res => res.json())
           .subscribe(eventData => {
                this.highlightData = eventData;
                this.hotTopic = eventData[0].label;
                this.hotTopicContent = eventData[0].content;
                this.hotTopicImg = eventData[0].url_image;
                this.peyertaanImg = eventData[1].url_image;
                this.permohonanImg = eventData[2].url_image;
                this.penyertaan = eventData[1].label;
                this.penyertaanContent = eventData[1].content;
                this.penyertaanButton = eventData[1].button;
                this.statuslabel = eventData[2].label;
                this.statusContent = eventData[2].content;
            },
            error => {
              this.toastr.error(JSON.parse(error._body).statusDesc, '');
            });
    }

    getHotTopic(lang: string){

      return this.http.get(this.hottopicUrl+'?language=1')
      .map(res => res.json().list)
      .subscribe(eventData => {
           this.hotTopicData = eventData;
           this.navService.loader = false;
       },
       error => {
        this.navService.loader = false;
         this.toastr.error(JSON.parse(error._body).statusDesc, '');
       });
    }


    getModule(data){
      let a = data.split("/");
      return a[1];
    }

    getID(data){
      let a = data.split("/");
      return a[2];
    }
    checkRefNo(formvalues: any) {
      this.loading = true;
      this.portalservice.getSubmissionStatus(formvalues.noPermohonanCarian, this.languageId).subscribe(
        data => {
          if(data.statusCode == "ERROR")
            this.sbgcolor = false;
          else
            this.sbgcolor = true;

        this.result = data.statusDesc;
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });
    }

    getUrl(){
      this.navService.loader = true;
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

}
