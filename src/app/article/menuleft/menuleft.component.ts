import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Inject } from '@angular/core';
import { ArticleService } from '../article.service';
import { NavService } from '../../header/nav/nav.service';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'gosg-menuleft',
  templateUrl: './menuleft.component.html',
  styleUrls: ['./menuleft.component.css']
})
export class MenuleftComponent implements OnInit {
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
          this.navService.triggerSubArticle(this.subID, this.langId);
        }else if(this.moduleName == 'content'){
          this.navService.triggerContent(this.subID, this.langId);
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
    this.topicID = parseInt(this.router.url.split('/')[2]);
    this.subID = parseInt(this.router.url.split('/')[3]);
    // this.navService.triggerSubArticle(this.topicID, this.subID, localStorage.getItem('langID'));
  }



  clickSideMenu(event: Event, e){
    this.navService.getSubArticleUrl(e.categoryCode, this.langIdVal);
    this.router.navigate( ['/subcategory', e.categoryCode]);
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


  clickContentFromMenu(event: Event, pId, aId){
    this.navService.triggerContent(aId, this.langIdVal);
    this.router.navigate( ['/content', aId]);
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

}
