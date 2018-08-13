import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { ArticleService } from '../article.service';
import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../../header/topnav/topnav.service';
import { SharedService } from '../../common/shared.service';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-article',
  templateUrl: './subarticle.component.html',
  styleUrls: ['./subarticle.component.css']
})
export class SubarticleComponent implements OnInit, OnDestroy {
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
  loading = false;

  handleClickMe(e) {

  }
  boolCallback = (result: boolean) : void => {
    this.loading = result;
  }

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(private http: HttpClient, public articleService: ArticleService,private sharedservice: SharedService, @Inject(APP_CONFIG) private config: AppConfig, private topnavservice: TopnavService, private route: ActivatedRoute, private navService: NavService, private translate: TranslateService, private router: Router, private breadcrumbService: BreadcrumbService) {
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
          this.navService.triggerSubArticle(this.subID, this.langId, this.boolCallback);
        } else if (this.moduleName == 'content') {
          this.navService.triggerContent(this.subID, this.langId, this.boolCallback);
        } else {
          this.navService.triggerArticle(this.moduleName, this.langId, this.topicID, this.boolCallback);
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
    this.moduleName = this.router.url.split('/')[1];
    var tt = this.router.url.split('/');
    this.subID = parseInt(tt[tt.length - 1]);

    if (location.pathname.indexOf('agency') !== -1) {
      this.agencyActive = true;
      this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
    } else {
      this.agencyActive = false;
      this.navService.triggerSubArticle(this.subID, localStorage.getItem('langID'), this.boolCallback);
    }

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getTheme() {
    return localStorage.getItem('themeColor');
  }


  clickTopMenu(e){
    this.router.navigate(['/category', e.categoryCode]);
    event.preventDefault();
  }


  clickSideMenu(e, status, event) {
    this.agencyActive = false;
    this.statusID = status;
    this.navService.getSubArticleUrl(e.categoryId, localStorage.getItem('langID'));
    this.navService.triggerSubArticle(e.categoryCode, localStorage.getItem('langID'), this.boolCallback);
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

  breadcrumLink(id1, id2, $event){

    if(this.getModule(id1) === 'category'){
      this.router.navigate(['/category', this.getID(id2)]);
    }else if(this.getModule(id1) === 'subcategory'){
      this.router.navigate(['/subcategory', this.getID(id2)]);
      this.navService.getSubArticleUrl(this.getID(id2), localStorage.getItem('langID'));
      this.navService.triggerSubArticle(this.getID(id2), localStorage.getItem('langID'), this.boolCallback);
    }
    $event.preventDefault();
  }

  appTracking(refCode){
    const readUrl = `${this.config.registerationUrl}agencyapplication/tracking?refCode=${refCode}&source=life-event`;
    const req = this.http.post(readUrl,'')
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }


  clickContentFromMenu(pId, aId, event) {
    // this.navService.triggerContent(aId, localStorage.getItem('langID'));
    // this.navService.getContentUrl(aId, localStorage.getItem('langID'));
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
