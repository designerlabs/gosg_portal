import { Component, Output, Input, EventEmitter, OnInit, AfterContentInit, AfterViewChecked, AfterViewInit , OnDestroy} from '@angular/core';
import { ArticleService } from '../../article/article.service';
import { ISubscription } from "rxjs/Subscription";
import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';
import { TopnavService } from '../../header/topnav/topnav.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'gosg-archivecontent',
  templateUrl: './archivecontent.component.html',
  styleUrls: ['./archivecontent.component.css']
})
export class ArchivecontentComponent implements OnInit, OnDestroy {
  statusID: any;
  @Output() menuClick = new EventEmitter();
  breadcrumb: any;
  isValid: any;
  topicID: number;
  subID: number;
  moduleName: string;
  articles: any[];
  
  private subscriptionLang: ISubscription;

  articleData: any;
  @Output() langChange = new EventEmitter();

  handleClickMe(e){

  }

  constructor(public articleService: ArticleService,  private route: ActivatedRoute, 
    private navService: NavService, private translate: TranslateService, private router: Router, 
    private topnavservice: TopnavService,
    private breadcrumbService: BreadcrumbService) {
    this.lang = translate.currentLang;
    this.langId = 1;

        this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langId = 1;
                this.moduleName = this.router.url.split('/')[2];
                this.topicID = parseInt(this.router.url.split('/')[3]);
                var tt = this.router.url.split('/');
                // this.subID = parseInt(tt[tt.length-1]);
                this.subID = parseInt(this.router.url.split('/')[4]);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.moduleName = this.router.url.split('/')[2];
                this.topicID = parseInt(this.router.url.split('/')[3]);
                var tt = this.router.url.split('/');
                // this.subID = parseInt(tt[tt.length-1]);
                this.subID = parseInt(this.router.url.split('/')[4]);
            });
        }

        if(this.topnavservice.flagLang){

        if(this.moduleName == 'subcategory'){
          this.navService.triggerSubArticleOther(this.subID, this.langId, 'archive');
        }else if(this.moduleName == 'content'){
          this.navService.triggerContentOther(this.topicID, this.langId, 'archive');
        }else{
          this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
        }

    });
   }

   lang = this.lang;
   langId = this.langId;

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscription.unsubscribe();
  }

  ngOnInit() {

    if(!this.langId){
      this.langId = localStorage.getItem('langID');
    }else{
      this.langId = 1;
    }

    this.articleData = this.articleService.getArticle();
    this.topicID = parseInt(this.router.url.split('/')[3]);
    var tt = this.router.url.split('/');
    this.subID = parseInt(tt[tt.length-1]);
    this.navService.triggerContentOther(this.topicID, localStorage.getItem('langID'), 'archive');
  }


  getTheme(){
    return localStorage.getItem('themeColor');
  }

  clickSideMenu(e, status, url){
    this.statusID = status;
    this.navService.getSubArticleUrlOthers( e.categoryId, localStorage.getItem('langID'), url);
    this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'), url);
    this.router.navigate( ['/archive/subcategory', e.categoryCode]);
    event.preventDefault();
  }


  clickSideMenuSubCategory(e, status, url){
    this.statusID = status;
    this.navService.getSubArticleUrlOthers(e, localStorage.getItem('langID'), url);
    this.navService.triggerSubArticleOther(e, localStorage.getItem('langID'), url);
    this.router.navigate(['/archive/subcategory', e]);
    event.preventDefault();
  }


  clickContentFromMenu(pId, aId, status, url){
    this.statusID = status;
    this.navService.triggerContentOther(aId, localStorage.getItem('langID'), url);
    this.navService.getContentUrlOther( aId, localStorage.getItem('langID'), url);
    this.router.navigate( ['/archive/content', aId]);
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

  checkImgData(e){
      const chkData = e.search('<img');
      if (chkData != -1){
          return true;
      }else{
          return false;
      }
  }

}

