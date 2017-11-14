import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit  } from '@angular/core';
import { ArticleService } from '../article.service';

import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-article',
  templateUrl: '../article.component.html',
  styleUrls: ['./subarticle.component.css']
})
export class SubarticleComponent implements OnInit {
  @Output() menuClick = new EventEmitter();
  breadcrumb: any;
  isValid: any;
  topicID: number;
  subID: number;

  articles: any[];

  articleData: any;
  @Output() langChange = new EventEmitter();

  handleClickMe(e){
    console.log(e);
  }


  constructor(public articleService: ArticleService,  private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService) {
    this.lang = translate.currentLang;

        translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.topicID = parseInt(this.router.url.split('/')[3]);
                this.subID = parseInt(this.router.url.split('/')[4]);
                this.navService.triggerSubArticle(this.topicID, this.subID, this.lang);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.topicID = parseInt(this.router.url.split('/')[3]);
                this.subID = parseInt(this.router.url.split('/')[4]);
                this.navService.triggerSubArticle(this.topicID, this.subID, this.lang);
            });
        }
    });
  }

  lang = this.lang;

  ngOnInit() {
    this.articleData = this.articleService.getArticle();
    this.topicID = parseInt(this.router.url.split('/')[3]);
    this.subID = parseInt(this.router.url.split('/')[4]);
  //  console.log("from article "+ this.topicID)
    this.navService.triggerSubArticle(this.topicID, this.subID, this.lang);
    // this.triggerArticle(this.lang,this.topicID)
  }

  getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e){
        const _getSubLabel = e.json_url.split('&');
        let _getSubID = _getSubLabel[1].split('=');
        const _getTopicID = parseInt(this.router.url.split('/')[3]);
        _getSubID = parseInt(_getSubID[1]);
        this.navService.triggerSubArticle(_getTopicID, _getSubID, this.lang);
        this.router.navigate(['/portal/subtopic', _getTopicID, _getSubID]);
        event.preventDefault();
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
