import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit  } from '@angular/core';
import { ArticleService } from '../article.service';

import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'gosg-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
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
    this.langId = 1;

        translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langId = 1;
                this.topicID = parseInt(this.router.url.split('/')[2]);
                this.subID = parseInt(this.router.url.split('/')[3]);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.topicID = parseInt(this.router.url.split('/')[2]);
                this.subID = parseInt(this.router.url.split('/')[3]);
            });
        }
        this.navService.triggerContent(this.topicID, this.subID, this.langId);

    });
   }

   lang = this.lang;
   langId = this.langId;

  ngOnInit() {
    this.articleData = this.articleService.getArticle();
    this.topicID = parseInt(this.router.url.split('/')[2]);
    this.subID = parseInt(this.router.url.split('/')[3]);
  //  console.log("from article "+ this.topicID)
    this.navService.triggerContent(this.topicID, this.subID, this.langId);
    // this.triggerArticle(this.lang,this.topicID)
  }


  getTheme(){
    return localStorage.getItem('themeColor');
  }

  clickSideMenu(e){
    this.router.navigate( ['/subcategory', e.parentId, e.categoryId]);
    // this.navService.getSubArticleUrl(e.parentId,  e.categoryId, this.langId);
    this.navService.triggerContent(e.parentId,  e.categoryId, this.langId);
    event.preventDefault();
  }

  clickContentFromMenu(pId, aId){
    this.navService.triggerContent(pId,  aId, this.langId);
    this.navService.getSubArticleUrl(pId,  aId,this.langId);
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

  checkImgData(e){
      const chkData = e.search('<img');
      if (chkData != -1){
          return true;
      }else{
          return false;
      }
  }

}
