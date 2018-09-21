import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit, OnDestroy  } from '@angular/core';
import { ArticleService } from '../../article/article.service';

import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../../header/topnav/topnav.service';

@Component({
  selector: 'gosg-archivesubcategory',
  templateUrl: './archivesubcategory.component.html',
  styleUrls: ['./archivesubcategory.component.css'],
})
export class ArchivesubcategoryProdComponent implements OnInit, OnDestroy{
  lang = this.lang;
  langId = this.langId;
  statusID: any;
  langIdVal: string;
  @Output() menuClick = new EventEmitter();
  breadcrumb: any;
  isValid: any;
  topicID: number;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  subID: number;
  step = 0;
  articles: any[];
  public loading = false;
  moduleName: string;
  articleData: any;
  @Output() langChange = new EventEmitter();

  handleClickMe(e){

  }


  constructor(public articleService: ArticleService,  private topnavservice: TopnavService,  private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService) {
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
            this.navService.triggerSubArticleOther(this.topicID, this.langId,'archive');
          }else if(this.moduleName == 'content'){
            this.navService.triggerContentOther(this.subID, this.langId, 'archive');
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
    this.topicID = parseInt(this.router.url.split('/')[2]);
    var tt = this.router.url.split('/');
    this.subID = parseInt(tt[tt.length-1]);
    this.navService.triggerSubArticleOther(this.subID, localStorage.getItem('langID'), 'archive');
  }


  getTheme(){
        return localStorage.getItem('themeColor');
    }


    clickSideMenu(e, status){
      this.navService.loader = true;
      this.statusID = status;
      // this.navService.getSubArticleUrlOthers(e.catgoryId, localStorage.getItem('langID'), 'archive');
      // this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'), 'archive');
      this.router.navigate( ['/archive/subcategory', e.categoryCode]);
      event.preventDefault();
    }


    clickSideMenuSubCategory(e, status, url){
      this.navService.loader = true;
      this.statusID = status;
      // this.navService.getSubArticleUrlOthers(e, localStorage.getItem('langID'), url);
      // this.navService.triggerSubArticleOther(e, localStorage.getItem('langID'), url);
      this.router.navigate(['/archive/subcategory', e]);
      event.preventDefault();
    }


    clickContentFromMenu(pId, aId, url){
      this.navService.loader = true;
      // this.navService.triggerContentOther(aId, localStorage.getItem('langID'), url);
      // this.navService.getContentUrlOther(aId, localStorage.getItem('langID'),  url);
      this.router.navigate( ['/archive/content', aId]);
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

    breadcrumLink(id1, id2, $event){

      if(this.getModule(id1) === 'category'){
        this.router.navigate(['/archive/category', this.getID(id2)]);
      }else if(this.getModule(id1) === 'subcategory'){
        this.router.navigate(['/archive/subcategory', this.getID(id2)]);
        // this.navService.getSubArticleUrlOthers(this.getID(id2), localStorage.getItem('langID'), 'archive');
        // this.navService.triggerSubArticleOther(this.getID(id2), localStorage.getItem('langID'), 'archive');
      }
      $event.preventDefault();
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
