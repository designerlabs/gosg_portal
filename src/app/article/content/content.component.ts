import { Component, Output, Input, EventEmitter, OnInit, AfterContentInit, AfterViewChecked, AfterViewInit  } from '@angular/core';
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
    this.navService.triggerContent(this.subID, localStorage.getItem('langID'));
  }


  getTheme(){
    return localStorage.getItem('themeColor');
  }

  clickSideMenu(e, status){
    this.statusID = status;
    this.navService.getSubArticleUrl( e.categoryId, localStorage.getItem('langID'));
    this.navService.triggerSubArticle(e.categoryCode, localStorage.getItem('langID'));
    this.router.navigate( ['/subcategory', e.categoryCode]);
    event.preventDefault();
  }

  clickSideMenuByAgency(e, status){
    this.navService.getSubArticleUrlByAgency(localStorage.getItem('langID'));
    this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
    this.router.navigate(['/subcategory', 'agency']);
    event.preventDefault();
  }

  clickContentFromMenu(pId, aId, status){
    this.statusID = status;
    this.navService.triggerContent(aId, localStorage.getItem('langID'));
    this.navService.getContentUrl( aId, localStorage.getItem('langID'));
    this.router.navigate( ['/content', aId]);
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