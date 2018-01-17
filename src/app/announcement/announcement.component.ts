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
    announcementID2 = null;
    announces: any;
    announceRes: any;
    announcementList: any;
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
                    this.lang = '1';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = parseInt(this.router.url.split('/')[2]);
                    this.announcementID2 = parseInt(this.router.url.split('/')[3]);
                    this.triggerAnnouncementAll(this.moduleName,this.lang, this.announcementID,this.announcementID2);
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '2';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = parseInt(this.router.url.split('/')[2]);
                    this.announcementID2 = parseInt(this.router.url.split('/')[3]);
                    this.triggerAnnouncementAll(this.moduleName,this.lang,this.announcementID,this.announcementID2);
                });
            }
        });

    }

    lang = this.lang;

    ngOnInit() {
        this.moduleName = this.router.url.split('/')[1];
        this.announcementID = parseInt(this.router.url.split('/')[2]); 
        this.announcementID2 = parseInt(this.router.url.split('/')[3]);
        this.triggerAnnouncementAll(this.moduleName, this.lang, this.announcementID, this.announcementID2);
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e){
       
        const _getModule = this.router.url.split('/')[1];
        const _getAnnounceID = parseInt(this.router.url.split('/')[2]); 
        const _getAnnounceID2 = parseInt(this.router.url.split('/')[3]);   

        // this.announcementID = parseInt(this.router.url.split('/')[2]); 
        // this.announcementID2 = parseInt(this.router.url.split('/')[3]);
        // _getSubID = parseInt(_getSubID[1]);
        
        if (isNaN(_getAnnounceID)){  
            this.triggerAnnouncementAll(_getModule,  this.lang, _getAnnounceID, _getAnnounceID2);          
        }

        else{
            this.triggerAnnouncementAll(_getModule,  this.lang, e.id, _getAnnounceID2);            
        }

        this.router.navigate([_getModule, e.id]);
        event.preventDefault();
    }

    clickContent(e){
       
        const _getModule = this.router.url.split('/')[1];
        const _getAnnounceID = parseInt(this.router.url.split('/')[2]); 
        const _getAnnounceID2 = parseInt(this.router.url.split('/')[3]);   
        debugger;
        console.log(e.active);
        if (isNaN(_getAnnounceID) && isNaN(_getAnnounceID2)){  
            this.triggerAnnouncementAll(_getModule,  this.lang, _getAnnounceID, _getAnnounceID2);   
            this.router.navigate([_getModule, e.id]);       
        }

        // else if(!isNaN(_getAnnounceID) && e.active == undefined){
        //     this.triggerAnnouncementAll(_getModule,  this.lang, e.id, _getAnnounceID2);   
        //     this.router.navigate([_getModule, e.id]);         
        // }

        else{
            this.triggerAnnouncementAll(_getModule,  this.lang, _getAnnounceID, e.id);   
            this.router.navigate([_getModule,  _getAnnounceID, e.id]);
        }
        debugger;
        // this.router.navigate([_getModule, e.id]);
        event.preventDefault();
    }
  
    triggerAnnouncementAll(moduleName, lang, id1, id2){
      
        if(lang == "ms"){
            this.lang = 2;
        }

        if(lang == "en"){
            this.lang = 1;
        }

        this.route.paramMap
        .switchMap((params: ParamMap) =>
        this.navService.getAnnouncementDataAll(moduleName, this.lang, id1, id2))
       
        .subscribe(resAllAnnounce => { 
            this.announceRes = resAllAnnounce;
            //convert object to array
            // const temp1 = this.announceRes[0];            
            // const temp = Object.keys(temp1).map(key => temp1[key]);
            // this.announces = temp;

            this.announces = resAllAnnounce;
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
