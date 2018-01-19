// tslint:disable-next-line:max-line-length
import { Component,  Injectable, Inject, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import { NavService } from '../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { AnnouncementlistService } from '../announcementlist/announcementlist.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gosg-announcementlist',
  templateUrl: './announcementlist.component.html',
  styleUrls: ['./announcementlist.component.css']
})
export class AnnouncementlistComponent implements OnInit {

  moduleName: string;
    @ViewChild('textarea') textarea: ElementRef;
    @Output() menuClick = new EventEmitter();

    breadcrumb: any;
    isValid: any;
    announcementID = null;
    announcementID2 = null;
    announces: any[];
    announceRes: any;

    announceData: any;
    @Output() langChange = new EventEmitter();
    constructor(private route: ActivatedRoute,
        private navService: NavService, private translate: TranslateService, private router: Router, 
        // tslint:disable-next-line:max-line-length
        private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig, private announceService: AnnouncementlistService) {
        this.lang = translate.currentLang;

            translate.onLangChange.subscribe((event: LangChangeEvent) => {

            const myLang = translate.currentLang;

            if (myLang === 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '1';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = this.router.url.split('/')[2];
                    this.navService.triggerAnnouncementList(this.lang, this.announcementID);
                });

            }
            if (myLang === 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '2';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = this.router.url.split('/')[2];
                    this.navService.triggerAnnouncementList(this.lang, this.announcementID);
                });
            }
            console.log('langMY');
        });

    }

    lang = this.lang;

    ngOnInit() {
        this.moduleName = this.router.url.split('/')[1];
        this.announcementID = this.router.url.split('/')[2];
        this.navService.triggerAnnouncementList(this.lang, this.announcementID);
        console.log('onInit');
        console.log('###############################################');
    }

    getTheme() {
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e) {
        // tslint:disable-next-line:no-debugger
        debugger;
        const _getModule = this.router.url.split('/')[1];
        // this.router.navigate(['announcement', e.code]);
        // this.triggerAnnouncementList(this.lang, e.code);
        this.navService.triggerAnnouncementList(this.lang, e.code);
        this.router.navigate(['/announcement', e.code]);
        console.log('sideMenu List' + ['announcement', e.code]);
        event.preventDefault();
    }

    clickContent(e) {
        const _getModule = this.router.url.split('/')[1];
        const _getAnnounceID = this.router.url.split('/')[2];
        const _getAnnounceID2 = this.router.url.split('/')[3];
        if (e.runningNo) {
            this.router.navigate(['announcement', _getAnnounceID, e.runningNo]);
        }
        console.log('2');
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
