import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit, ViewChild, ElementRef, Inject, AfterContentInit, OnDestroy } from '@angular/core';
import { ArticleService } from './article.service';
import { NavService } from '../header/nav/nav.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  statusID: any;
  langIdVal: string;
  subID: number;
  moduleName: string;
  public loading = false;

  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();

  breadcrumb: any;
  isValid: any;
  topicID: number;
  public selectedIndex: number = 4;
  articles: any[];

  articleData: any;
  @Output() langChange = new EventEmitter();

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(private http:HttpClient, public articleService: ArticleService, private topnavservice: TopnavService, private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig) {
    this.lang = translate.currentLang;
    this.langId = 1;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.langId = 1;
          this.moduleName = this.router.url.split('/')[1];
          this.topicID = parseInt(this.router.url.split('/')[2]);
          // this.navService.triggerArticle(this.moduleName, this.langId, this.topicID);
        });

      }
      if (myLang == 'ms') {

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.langId = 2;
          this.moduleName = this.router.url.split('/')[1];
          this.topicID = parseInt(this.router.url.split('/')[2]);
          this.subID = parseInt(this.router.url.split('/')[3]);
          // this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
        });
      }

      if (this.topnavservice.flagLang) {
        if (this.moduleName == 'subcategory') {
          this.navService.triggerSubArticle(this.subID, this.langId);
        } else if (this.moduleName == 'content') {
          this.navService.triggerContent(this.subID, this.langId);
        } else {
          this.navService.triggerArticle(this.moduleName, this.langId, this.topicID);
        }
      }

    });

  }

  lang = this.lang;
  langId = this.langId;

  boolCallback = (result: boolean) : void => {
    this.loading = result;
  }


  ngOnInit() {
    // this.loading = true;
    if(!this.langId){
      this.langId = localStorage.getItem('langID');
    }else{
      this.langId = 1;
    }
    this.articleData = this.articleService.getArticle();
    this.moduleName = this.router.url.split('/')[1];
    this.topicID = parseInt(this.router.url.split('/')[2]);
    // this.loading = this.articleService.loading.name;
    // console.log(!!this.navService.triggerArticle(this.moduleName, this.langId, this.topicID, this.boolCallback));

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getAlbum(tabId) {
   debugger;
    // API calls...
  }

  getTheme() {
    return localStorage.getItem('themeColor');
  }

  clickTopMenu(e){
    this.router.navigate(['/category', e.categoryCode]);
    event.preventDefault();
  }

  clickSideMenu(e, status, event) {
    this.navService.loader = true;
    this.statusID = status;
    // this.navService.getSubArticleUrl(e.categoryCode, localStorage.getItem('langID'));
    // this.navService.triggerSubArticle(e.categoryCode, localStorage.getItem('langID'));
    this.router.navigate(['/subcategory', e.categoryCode]);
    event.preventDefault();
  }

  clickSideMenuByAgency(e, status, event) {
    this.navService.loader = true;
    this.navService.getSubArticleUrlByAgency(localStorage.getItem('langID'));
    this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
    this.router.navigate(['/subcategory', 'agency']);
    event.preventDefault();
  }

  clickContentFromMenu(pId, aId, status, event) {
    this.navService.loader = true;
    this.statusID = status;
    // this.navService.triggerContent(aId, localStorage.getItem('langID'));
    // this.navService.getContentUrl(aId, localStorage.getItem('langID'));
    this.router.navigate(['/content', aId]);
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

  getJson(x, p){
    let z = x.replace('[', '').replace(']', '');
    let y = z.split(',');
    return y[p]
  }

  appTracking(refCode){
    this.loading = true;
    const readUrl = `${this.config.registerationUrl}agencyapplication/tracking?refCode=${refCode}&source=life-event`;
    const req = this.http.post(readUrl,'')
      .subscribe(
        res => {
          this.loading = false;
        },
        err => {
          console.log("Error occured");
          this.loading = false;
        }
      );
  }

  // triggerArticle(moduleName, lang, topicID) {
  //   this.loading = true;
  //   this.route.paramMap
  //     .switchMap((params: ParamMap) =>
  //       this.navService.getArticleData(moduleName, lang, topicID))
  //     .subscribe(resSliderData => {
  //       this.articles = resSliderData;
  //       this.breadcrumb = this.breadcrumbService.getBreadcrumb();
  //       this.isValid = this.breadcrumbService.isValid = true;
  //       this.breadcrumb = this.breadcrumb.name = '';
  //       this.loading = false;
  //     });
  // }

  checkImgData(e) {
    if (e) {
      const chkData = e.search('<img');
      if (chkData != -1) {
        return true;
      } else {
        return false;
      }
    }

  }

}
