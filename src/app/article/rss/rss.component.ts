import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Injectable, Inject } from '@angular/core';
import { ArticleService } from '../article.service';
import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';



import 'rxjs/add/operator/switchMap';
import { debuglog } from 'util';

@Component({
  selector: 'gosg-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {
    feedUrl: string;
    rssParam: string;
    isSubRss = false;
    rssId: string;
  moduleName: string;

  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();
  breadcrumb: any;
  isValid: any;
  topicID: number;
  articles: any[];

  articleData: any;
  @Output() langChange = new EventEmitter();
  constructor(public articleService: ArticleService,  @Inject(APP_CONFIG) private config: AppConfig,  private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService) {
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
                this.navService.triggerArticle(this.moduleName, this.langId, this.topicID);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
            });
        }
        this.feedUrl = this.config.urlPortal+'rss/feeder/'+this.rssId+'?language='+this.langId;
    });
   }

   lang = this.lang;
   langId = this.langId;

  ngOnInit() {
    this.rssId = this.route.snapshot.paramMap.get('id');
    this.rssParam = this.route.snapshot.url[1].path;
    this.feedUrl = this.config.urlPortal+'rss/feeder/'+this.rssId+'?language='+this.langId;
    if(this.rssParam == 'id'){
        this.isSubRss = true;
        this.getSubRss(this.rssId);
    }else{
        this.isSubRss = false;
    }

    this.moduleName = this.router.url.split('/')[1];
    this.topicID = parseInt(this.router.url.split('/')[2]);
    this.navService.triggerArticle(this.moduleName, this.langId, this.topicID);
  }


  checkImgData(e){

    const chkData = e.search('<img');
    if (chkData != -1){
        return true;
    }else{
        return false;
    }
}


getTheme(){
    return localStorage.getItem('themeColor');
}

copyLink(text:string) {
    var event = (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', text);
        e.preventDefault();
        document.removeEventListener('copy', event);
    }
    document.addEventListener('copy', event);
    document.execCommand('copy');
}


getSubRss(rssId){
    const _getModuleName = this.router.url.split('/')[1];
    this.navService.triggerSubRss(_getModuleName, rssId, this.langId);
}

clickSideMenu(e){
    // const _getSubLabel = e.json_url.split('&');
    // let _getSubID = _getSubLabel[1].split('=');
    const _getModuleName = this.router.url.split('/')[1];
    const _getTopicID = parseInt(this.router.url.split('/')[2]);
    // _getSubID = parseInt(_getSubID[1]);
    this.navService.triggerSubRss(_getModuleName, e, this.langId);
    this.feedUrl = this.config.urlPortal+'rss/feeder/'+e+'?language='+this.langId;
    this.router.navigate(['/rss/id/', e]);
    event.preventDefault();
}


}
