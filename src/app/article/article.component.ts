import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from './article.service';
import { NavService } from '../header/nav/nav.service';
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
    moduleName: string;
    
  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();

  breadcrumb: any;
  isValid: any;
  topicID: number;
  articles: any[];

  articleData: any;
  @Output() langChange = new EventEmitter();
  constructor(public articleService: ArticleService,  private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService) {
    this.lang = translate.currentLang;

        translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                this.navService.triggerArticle(this.moduleName,this.lang, this.topicID);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                this.navService.triggerArticle(this.moduleName, this.lang, this.topicID);
            });
        }
    });

  }


  lang = this.lang;

  ngOnInit() {
        this.articleData = this.articleService.getArticle();
        this.moduleName = this.router.url.split('/')[1];
        this.topicID = parseInt(this.router.url.split('/')[2]);
        this.navService.triggerArticle(this.moduleName, this.lang, this.topicID);
      }

   getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e){
        const _getSubLabel = e.json_url.split('&');
        let _getSubID = _getSubLabel[1].split('=');
        const _getTopicID = parseInt(this.router.url.split('/')[2]);
        _getSubID = parseInt(_getSubID[1]);
        this.navService.getSubArticleUrl(_getTopicID, _getSubID, this.lang);
        this.router.navigate(['/subtopic', _getTopicID, _getSubID]);
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

        const chkData = e.search('<img');
        if (chkData != -1){
            return true;
        }else{
            return false;
        }
    }

}
