// tslint:disable-next-line:max-line-length
import { Component,  Injectable, Inject, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { NavService } from '../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { AnnouncementlistService } from '../announcementlist/announcementlist.service';

@Component({
  selector: 'gosg-announcementdetails',
  templateUrl: './announcementdetails.component.html',
  styleUrls: ['./announcementdetails.component.css']
})
export class AnnouncementdetailsComponent implements OnInit {

  moduleName: string;

    @ViewChild('textarea') textarea: ElementRef;
    @Output() menuClick = new EventEmitter();

    breadcrumb: any;
    isValid: any;
    announcementID = null;
    announcementID2 = null;
    announces: any;
    announceRes: any;
    announceData: any;

    @Output() langChange = new EventEmitter();
    constructor(public articleService: ArticleService,  private route: ActivatedRoute,
        private navService: NavService, private translate: TranslateService, private router: Router,
        // tslint:disable-next-line:max-line-length
        private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig, public announceService: AnnouncementlistService) {
        this.lang = translate.currentLang;

            translate.onLangChange.subscribe((event: LangChangeEvent) => {
            const myLang = translate.currentLang;
            if (myLang === 'en') {
                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '1';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = this.router.url.split('/')[2];
                    this.announcementID2 = this.router.url.split('/')[3];
                    if ( this.moduleName && this.announcementID && this.announcementID2){
                        this.navService.triggerAnnouncementDetails(this.moduleName,this.lang,this.announcementID,this.announcementID2);
                    }
                });
            }
            if (myLang === 'ms') {
                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '2';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = this.router.url.split('/')[2];
                    this.announcementID2 = this.router.url.split('/')[3];
                    if ( this.moduleName && this.announcementID && this.announcementID2){
                        this.navService.triggerAnnouncementDetails(this.moduleName,this.lang,this.announcementID,this.announcementID2);
                    }
                });
            }
        });
    }

    lang = this.lang;

    ngOnInit() {
        this.moduleName = this.router.url.split('/')[1];
        this.announcementID = this.router.url.split('/')[2];
        this.announcementID2 = this.router.url.split('/')[3];
        this.navService.triggerAnnouncementDetails(this.moduleName, this.lang, this.announcementID, this.announcementID2);
    }

    getTheme() {
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e) {
        const _getModule = this.router.url.split('/')[1];


        this.router.navigate([_getModule, e.code]);

        event.preventDefault();
    }

    clickContent(e) {
        const _getModule = this.router.url.split('/')[1];
        const _getAnnounceID = this.router.url.split('/')[2];
        const _getAnnounceID2 = this.router.url.split('/')[3];
        event.preventDefault();
    }

    checkImgData(e) {
        const chkData = e.search('<img');
        if (chkData !== -1) {
            return true;
        }else {
            return false;
        }
    }

}
