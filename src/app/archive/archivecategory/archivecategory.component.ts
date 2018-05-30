import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Inject, AfterContentInit } from '@angular/core';
import { ArticleService } from '../../article/article.service';
import { NavService } from '../../header/nav/nav.service';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'gosg-archivecategory',
  templateUrl: './archivecategory.component.html',
  styleUrls: ['./archivecategory.component.css']
})
export class ArchivecategoryComponent implements OnInit {statusID: any;
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
                this.moduleName = this.router.url.split('/')[2];
                this.topicID = parseInt(this.router.url.split('/')[3]);
                // this.navService.triggerArticle(this.moduleName, this.langId, this.topicID);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.moduleName = this.router.url.split('/')[2];
                this.topicID = parseInt(this.router.url.split('/')[3]);
                this.subID = parseInt(this.router.url.split('/')[4]);
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
        this.moduleName = this.router.url.split('/')[2];
        this.topicID = parseInt(this.router.url.split('/')[3]);
        this.navService.triggerArticle(this.moduleName, localStorage.getItem('langID'), this.topicID);
      }

   getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e, status, url){
      this.statusID = status;
      this.navService.getSubArticleUrlOthers(e.categoryCode, localStorage.getItem('langID'), url);
      this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'), url);
      this.router.navigate(['/archive/subcategory', e.categoryCode]);
      event.preventDefault();
    }

    clickSideMenuOthers(e, status, url){
      this.statusID = status;
      this.navService.getSubArticleUrlOthers(e.categoryCode, localStorage.getItem('langID'), url);
      this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'), url);
      this.router.navigate(['/archive/subcategory', e.categoryCode]);
      event.preventDefault();
    }


    clickContentFromMenu(pId, aId, status){

      this.statusID = status;
      this.navService.triggerContent(aId, localStorage.getItem('langID'));
      this.navService.getContentUrl(aId, localStorage.getItem('langID'));
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

