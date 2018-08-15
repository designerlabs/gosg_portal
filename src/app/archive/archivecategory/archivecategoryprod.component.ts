import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Inject, AfterContentInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../../article/article.service';
import { NavService } from '../../header/nav/nav.service';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../../header/topnav/topnav.service';
@Component({
  selector: 'gosg-archivecategory',
  templateUrl: './archivecategory.component.html',
  styleUrls: ['./archivecategory.component.css']
})
export class ArchivecategoryProdComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langId = this.langId;
  statusID: any;
  langIdVal: string;
  subID: number;
  moduleName: string;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();

  breadcrumb: any;
  isValid: any;
  topicID: number;
  articles: any[];

  articleData: any;
  @Output() langChange = new EventEmitter();
  constructor(public articleService: ArticleService, private topnavservice: TopnavService, private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig) {
    this.lang = translate.currentLang;
    this.langId = 1;

    this.subscriptionLang = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // this.sharedService.errorHandling(event, (function(){
        const myLang = this.translate.currentLang;
        if (myLang === 'en') {
           this.lang = 'en';
           this.langId = 1;
           this.moduleName = this.router.url.split('/')[2];
           this.topicID = parseInt(this.router.url.split('/')[3]);
        }
        if (myLang === 'ms') {
          this.lang = 'ms';
          this.langId = 2;
          this.moduleName = this.router.url.split('/')[2];
          this.topicID = parseInt(this.router.url.split('/')[3]);
          this.subID = parseInt(this.router.url.split('/')[4]);
        }

        if(this.topnavservice.flagLang){

          if(this.moduleName == 'subcategory'){
            this.navService.triggerSubArticleOther(this.subID, this.langId,'archive');
          }else if(this.moduleName == 'content'){
            this.navService.triggerContentOther(this.subID, this.langId,'archive');
          }else{
            this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
          }
        }

    });

  }


  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {

    if(localStorage.getItem('langID')){
      this.langIdVal = localStorage.getItem('langID');
    }else{
      this.langIdVal = this.langId;
    }

        this.articleData = this.articleService.getArticle();
        this.moduleName = this.router.url.split('/')[2];
        this.topicID = parseInt(this.router.url.split('/')[3]);
        this.navService.triggerArticleOthers(this.moduleName, localStorage.getItem('langID'), this.topicID, 'archive');
      }

   getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e, status, url){
      this.navService.loader = true;
      this.statusID = status;
      this.navService.getSubArticleUrlOthers(e.categoryCode, localStorage.getItem('langID'), url);
      this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'), url);
      this.router.navigate(['/archive/subcategory', e.categoryCode]);
      event.preventDefault();
    }

    clickSideMenuOthers(e, status, url){
      this.navService.loader = true;
      this.statusID = status;
      this.navService.getSubArticleUrlOthers(e.categoryCode, localStorage.getItem('langID'), url);
      this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'), url);
      this.router.navigate(['/archive/subcategory', e.categoryCode]);
      event.preventDefault();
    }


    clickSideMenuSubCategory(e, status, url){
      this.navService.loader = true;
      this.statusID = status;
      this.navService.getSubArticleUrlOthers(e, localStorage.getItem('langID'), url);
      this.navService.triggerSubArticleOther(e, localStorage.getItem('langID'), url);
      this.router.navigate(['/archive/subcategory', e]);
      event.preventDefault();
    }


    clickContentFromMenu(pId, aId, status){
      this.navService.loader = true;
      this.statusID = status;
      this.navService.triggerContentOther(aId, localStorage.getItem('langID'), status);
      this.navService.getContentUrlOther(aId, localStorage.getItem('langID'), status);
      this.router.navigate(['/archive/content', aId]);
      event.preventDefault();
    }


    triggerArticle(moduleName, lang, topicID){
        this.route.paramMap
        .switchMap((params: ParamMap) =>
        this.navService.getArticleData(moduleName, lang, topicID))
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

