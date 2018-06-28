import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit  } from '@angular/core';
import { ArticleService } from '../../article/article.service';

import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'gosg-archivesubcategory',
  templateUrl: './archivesubcategory.component.html',
  styleUrls: ['./archivesubcategory.component.css'],
})
export class ArchivesubcategoryComponent implements OnInit {
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

  handleClickMe(e){
    
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
          this.navService.triggerSubArticleOther(this.subID, this.langId, 'archive');
        }else if(this.moduleName == 'content'){
          this.navService.triggerContentOther(this.subID, this.langId, 'archive');
        }else{
          this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
        }

        // this.navService.triggerSubArticle(this.topicID, this.subID, this.langId);

    });
  }

  lang = this.lang;
  langId = this.langId;

  ngOnInit() {
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
      this.statusID = status;
      this.navService.getSubArticleUrlOthers(e.catgoryId, localStorage.getItem('langID'), 'archive');
      this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'), 'archive');
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


    clickContentFromMenu(pId, aId, url){
      this.navService.triggerContentOther(aId, localStorage.getItem('langID'), url);
      this.navService.getContentUrlOther(aId, localStorage.getItem('langID'),  url);
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
