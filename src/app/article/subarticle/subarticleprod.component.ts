import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../article.service';

import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../../header/topnav/topnav.service';


@Component({
  selector: 'app-article',
  templateUrl: './subarticle.component.html',
  styleUrls: ['./subarticle.component.css']
})
export class SubarticleprodComponent implements OnInit, OnDestroy {
  agencyActive: boolean = false;
  statusID: any;
  @Output() menuClick = new EventEmitter();
  breadcrumb: any;
  isValid: any;
  topicID: number;
  subID: number;
  step = 0;
  articles: any[];
  moduleName: string;
  articleData: any;
  @Output() langChange = new EventEmitter();

  handleClickMe(e) {

  }

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(public articleService: ArticleService, private topnavservice: TopnavService, private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService) {
    this.lang = translate.currentLang;
    this.langId = 1;

    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.langId = 1;
          this.moduleName = this.router.url.split('/')[1];
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
        if (location.pathname.indexOf('agency') !== -1) {
          this.agencyActive = true;
          this.navService.triggerSubArticleAgency(this.langId);
        }
        else if (this.moduleName == 'subcategory') {
          this.navService.triggerSubArticle(this.subID, this.langId);
        } else if (this.moduleName == 'content') {
          this.navService.triggerContent(this.subID, this.langId);
        } else {
          this.navService.triggerArticle(this.moduleName, this.langId, this.topicID);
        }
      }


      // this.navService.triggerSubArticle(this.topicID, this.subID, this.langId);

    });
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
    this.topicID = parseInt(this.router.url.split('/')[2]);
    var tt = this.router.url.split('/');
    this.subID = parseInt(tt[tt.length - 1]);

    if (location.pathname.indexOf('agency') !== -1) {
      this.agencyActive = true;
      this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
    } else {
      this.agencyActive = false;
      this.navService.triggerSubArticle(this.subID, localStorage.getItem('langID'));
    }

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getTheme() {
    return localStorage.getItem('themeColor');
  }


  clickSideMenu(e, status, event) {
    this.agencyActive = false;
    this.statusID = status;
    this.navService.getSubArticleUrl(e.categoryId, localStorage.getItem('langID'));
    this.navService.triggerSubArticle(e.categoryCode, localStorage.getItem('langID'));
    this.router.navigate(['/subcategory', e.categoryCode]);
    event.preventDefault();
  }

  clickSideMenuByAgency(e, status, event) {
    this.agencyActive = true;
    this.navService.getSubArticleUrlByAgency(localStorage.getItem('langID'));
    this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
    this.router.navigate(['/subcategory', 'agency']);
    event.preventDefault();
  }


  getModule(data){
    let a = data.split("/");
    return a[1];
  }

  getID(data){
    let a = data.split("/");
    return a[2];
  }

  clickContentFromMenu(pId, aId, event) {
    this.navService.triggerContent(aId, localStorage.getItem('langID'));
    this.navService.getContentUrl(aId, localStorage.getItem('langID'));
    this.router.navigate(['/content', aId]);
    event.preventDefault();
  }


  checkImgData(e) {
    const chkData = e.search('<img');
    if (chkData != -1) {
      return true;
    } else {
      return false;
    }
  }

}