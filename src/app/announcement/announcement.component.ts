import { Component,  Injectable, Inject,Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { NavService } from '../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'gosg-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  moduleName: string;
    
  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();

  breadcrumb: any;
  isValid: any;
  announcementID = null;
  announces: any;
  announceData: any;
  
  @Output() langChange = new EventEmitter();
  constructor(public articleService: ArticleService,  private route: ActivatedRoute, 
    private navService: NavService, private translate: TranslateService, private router: Router, 
    private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig,
    private sharedService: SharedService) {
    this.lang = translate.currentLang;

        translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.moduleName = this.router.url.split('/')[1];
                this.announcementID = parseInt(this.router.url.split('/')[2]);
                this.navService.triggerAnnouncement(this.moduleName,this.lang, this.announcementID);
                this.triggerAnnouncementAll(this.moduleName,this.lang);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.moduleName = this.router.url.split('/')[1];
                this.announcementID = parseInt(this.router.url.split('/')[2]);
                this.navService.triggerAnnouncement(this.moduleName, this.lang, this.announcementID);
                this.triggerAnnouncementAll(this.moduleName,this.lang);
            });
        }
    });

  }

  lang = this.lang;

  ngOnInit() {
    this.announceData = this.getAnnounce();
    //this.articleData = this.articleService.getArticle();
    this.moduleName = this.router.url.split('/')[1];
    this.announcementID = parseInt(this.router.url.split('/')[2]); 
    this.triggerAnnouncementAll(this.moduleName, this.lang);
    // console.log(this.announcementID);
  }

  getTheme(){
    return localStorage.getItem('themeColor');
  }

  clickSideMenu(e){
    const _getSubLabel = e.json_url.split('&');
    let _getSubID = _getSubLabel[1].split('=');
    const _getTopicID = parseInt(this.router.url.split('/')[2]);
    _getSubID = parseInt(_getSubID[1]);
    this.navService.getSubArticleUrl(_getTopicID, _getSubID, this.lang);
    this.router.navigate(['/subtopic', _getTopicID, _getSubID]);
    event.preventDefault();
  }

  getAnnounce(){
      return this.annouce;
  }

  public annouce = {
      name: 'hello'
  };

  private announceUrl: string = this.config.urlAnnouncementSub;

  triggerAnnouncementAll(moduleName, lang){
    this.route.paramMap
    .switchMap((params: ParamMap) =>
    this.navService.getAnnouncementDataAll(moduleName, lang))
    .subscribe(resSliderData => {
        console.log(resSliderData);
       
        this.announces = resSliderData;
        this.breadcrumb = this.breadcrumbService.getBreadcrumb();
        this.isValid = this.breadcrumbService.isValid = true;
        this.breadcrumb = this.breadcrumb.name = '';
    });
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
