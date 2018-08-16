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
    filter= false;

    constructor(
     private route: ActivatedRoute, private navService: NavService, private router: Router, private breadcrumbService: BreadcrumbService, private toastr: ToastrService, private translate: TranslateService, private topnavservice: TopnavService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig){
        this.lang = translate.currentLang;
        this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
          const myLang = translate.currentLang;
          if (myLang === 'en') {
             this.lang = 'en';
          }
          if (myLang === 'ms') {
            this.lang = 'ms';
          }

            if(this.topnavservice.flagLang){
              this.subscription = this.getData(this.lang);
              this.subscriptionHotTopic = this.getHotTopic(this.lang);
            }
        });
    }

    ngOnInit(){
      this.subscription = this.getData(this.lang);
      this.subscriptionHotTopic = this.getHotTopic(this.lang);
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

    getUrl(){
      this.navService.loader = true;
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

}
