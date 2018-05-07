import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit  } from '@angular/core';
import { ArticleService } from '../article.service';

import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-article',
  templateUrl: './subarticle.component.html',
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
        this.navService.triggerSubArticle(this.topicID, this.subID, this.langId);

    });
  }

  lang = this.lang;
  langId = this.langId;

  ngOnInit() {
    this.articleData = this.articleService.getArticle();
    this.topicID = parseInt(this.router.url.split('/')[2]);
    this.subID = parseInt(this.router.url.split('/')[3]);
  //  console.log("from article "+ this.topicID)
    this.leftmenuAcc();
    this.navService.triggerSubArticle(this.topicID, this.subID, localStorage.getItem('langID'));
    // this.triggerArticle(this.lang,this.topicID)
  }

  getTheme(){
        return localStorage.getItem('themeColor');
    }

    leftmenuAcc(){
      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight){
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    }


    clickSideMenu(e){
      this.router.navigate( ['/subcategory', e.parentCode, e.categoryCode]);
      // this.navService.getSubArticleUrl(e.parentId,  e.categoryId, this.langId);
      this.navService.triggerSubArticle(e.parentCode,  e.categoryCode, localStorage.getItem('langID'));
      event.preventDefault();
    }

    clickContentFromMenu(pId, aId){
      this.navService.triggerSubArticle(pId,  aId, localStorage.getItem('langID'));
      this.navService.getSubArticleUrl(pId,  aId, localStorage.getItem('langID'));
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
