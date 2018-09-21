import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Inject, AfterContentInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../../../article/article.service';
import { NavService } from '../../../header/nav/nav.service';
import { APP_CONFIG, AppConfig } from '../../../config/app.config.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../../../header/topnav/topnav.service';

@Component({
  selector: 'gosg-rssmain',
  templateUrl: './rssmain.component.html',
  styleUrls: ['./rssmain.component.css']
})
export class RssmainComponent implements OnInit, OnDestroy {

  feedUrl: string;
  statusID: any;
  langIdVal: string;
  subID: number;
  moduleName: string;


  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();

  breadcrumb: any;
  isValid: any;
  topicID: number;
  articles: any[];
  loading = false;

  articleData: any;
  @Output() langChange = new EventEmitter();

  boolCallback = (result: boolean) : void => {
    this.loading = result;
  }

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;


  constructor(public articleService: ArticleService, private topnavservice: TopnavService, private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig) {
   this.lang = translate.currentLang;
    this.langId = 1;

    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.langId = 1;
          this.moduleName = this.router.url.split('/')[1];
          this.topicID = parseInt(this.router.url.split('/')[2]);
          var tt = this.router.url.split('/');
          this.subID = parseInt(tt[tt.length - 1]);
        });

      }
      if (myLang == 'ms') {

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.langId = 2;
          this.moduleName = this.router.url.split('/')[1];
          this.topicID = parseInt(this.router.url.split('/')[2]);
          var tt = this.router.url.split('/');
          this.subID = parseInt(tt[tt.length - 1]);
        });
      }

      if (this.topnavservice.flagLang) {
        this.navService.triggerRSS(this.moduleName, this.langId, this.topicID);
      }


      // this.navService.triggerSubArticle(this.topicID, this.subID, this.langId);

    });
  }


  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }


  lang = this.lang;
  langId = this.langId;

  ngOnInit() {

    if(!this.langId){
      this.langId = localStorage.getItem('langID');
    }else{
      this.langId = 1;
    }

        this.articleData = this.articleService.getArticle();
        this.moduleName = this.router.url.split('/')[1];
        this.topicID = parseInt(this.router.url.split('/')[2]);
        this.navService.triggerRSS(this.moduleName, localStorage.getItem('langID'), this.topicID);
      }

   getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e, status, url){
      this.statusID = status;
      this.feedUrl = this.config.urlPortal+'rss/feeder/'+e.leftMenuId+'?language='+this.langId;
      window.open(this.feedUrl, "_blank");
      event.preventDefault();
    }

    clickSideMenuOthers(e, status, url){
      this.statusID = status;
      this.feedUrl = this.config.urlPortal+'rss/feeder/'+e.categoryCode+'?language='+this.langId;
      window.open(this.feedUrl, "_blank");
      event.preventDefault();
    }



    triggerRSS(moduleName, lang, topicID){
        this.route.paramMap
        .switchMap((params: ParamMap) =>
        this.navService.getRSSData(moduleName, lang, topicID))
        .subscribe(resSliderData => {
            this.articles = resSliderData;
            this.breadcrumb = this.breadcrumbService.getBreadcrumb();
            this.isValid = this.breadcrumbService.isValid = true;
            this.breadcrumb = this.breadcrumb.name = '';
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

    checkImgData(e){
        if(e){
          const chkData = e.search('<img');
          if (chkData != -1){
              return true;
          }else{
              return false;
          }
        }

    }
}
