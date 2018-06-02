import { Component, Output, Input, EventEmitter, OnInit, AfterContentInit, AfterViewChecked, AfterViewInit  } from '@angular/core';
import { ArticleService } from '../../article/article.service';

import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'gosg-archivecontent',
  templateUrl: './archivecontent.component.html',
  styleUrls: ['./archivecontent.component.css']
})
export class ArchivecontentComponent implements OnInit {
  statusID: any;
  @Output() menuClick = new EventEmitter();
  breadcrumb: any;
  isValid: any;
  topicID: number;
  subID: number;
  moduleName: string;
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
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                var tt = this.router.url.split('/');
                this.subID = parseInt(tt[tt.length-1]);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                var tt = this.router.url.split('/');
                this.subID = parseInt(tt[tt.length-1]);
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
   }

   lang = this.lang;
   langId = this.langId;


  ngOnInit() {
    this.articleData = this.articleService.getArticle();
    this.topicID = parseInt(this.router.url.split('/')[2]);
    var tt = this.router.url.split('/');
    this.subID = parseInt(tt[tt.length-1]);
    this.navService.triggerContentOther(this.subID, localStorage.getItem('langID'), 'archive');
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

  checkImgData(e){
      const chkData = e.search('<img');
      if (chkData != -1){
          return true;
      }else{
          return false;
      }
  }

}

