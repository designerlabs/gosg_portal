import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Inject } from '@angular/core';
import { ArticleService } from './article.service';
import { NavService } from '../header/nav/nav.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  langIdVal: string;
  subID: number;
    moduleName: string;

  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();

  breadcrumb: any;
  isValid: any;
  topicID: number;
  articles: any[];

  articleData: any;
  @Output() langChange = new EventEmitter();
  constructor(public articleService: ArticleService,  private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig) {
    this.lang = translate.currentLang;
    this.langId = 1;

        translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langId = 1;
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                // this.navService.triggerArticle(this.moduleName, this.langId, this.topicID);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                this.subID = parseInt(this.router.url.split('/')[3]);
                // this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
            });
        }


        if(this.moduleName == 'subcategory'){
          this.navService.triggerSubArticle(this.topicID, this.subID, this.langId);
        }else if(this.moduleName == 'article'){
          this.navService.triggerContent(this.topicID, this.subID, this.langId);
        }else{
          this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
        }



    });

    if(localStorage.getItem('langID')){
      this.langIdVal = localStorage.getItem('langID');
    }else{
      this.langIdVal = this.langId;
    }

  }


  lang = this.lang;
  langId = this.langId;


  ngOnInit() {
        this.articleData = this.articleService.getArticle();
        this.moduleName = this.router.url.split('/')[1];
        this.topicID = parseInt(this.router.url.split('/')[2]);
        this.navService.triggerArticle(this.moduleName, this.langIdVal, this.topicID);
      }

   getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e){

      this.navService.getSubArticleUrl(e.parentCode,  e.categoryCode, this.langIdVal);
      this.router.navigate( ['/subcategory', e.parentCode, e.categoryCode]);
      event.preventDefault();
      // const _getSubLabel = e.json_url.split('&');
        // let _getSubID = _getSubLabel[1].split('=');
        // console.log(_getSubLabel);
        // console.log(_getSubID);
        // const _getTopicID = parseInt(this.router.url.split('/')[2]);
        // _getSubID = parseInt(_getSubID[1]);
        // this.navService.getSubArticleUrl(_getTopicID, _getSubID,this.langId);
        // this.router.navigate(['/subtopic', _getTopicID, _getSubID]);
        // event.preventDefault();
    }


    clickContentFromMenu(pId, aId){
      this.navService.triggerContent(pId,  aId, this.langIdVal);
      this.router.navigate( ['/article', pId, aId]);
      event.preventDefault();
      // const _getSubLabel = e.json_url.split('&');
        // let _getSubID = _getSubLabel[1].split('=');
        // console.log(_getSubLabel);
        // console.log(_getSubID);
        // const _getTopicID = parseInt(this.router.url.split('/')[2]);
        // _getSubID = parseInt(_getSubID[1]);
        // this.navService.getSubArticleUrl(_getTopicID, _getSubID,this.langId);
        // this.router.navigate(['/subtopic', _getTopicID, _getSubID]);
        // event.preventDefault();
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
