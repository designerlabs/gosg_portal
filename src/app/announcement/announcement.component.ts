import { Component,  Injectable, Inject,Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from '../article/article.service';
import { NavService } from '../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

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
    announces: any[];
    announceRes: any;
    announceData: any;
  
    @Output() langChange = new EventEmitter();
    constructor(public articleService: ArticleService,  private route: ActivatedRoute, 
        private navService: NavService, private translate: TranslateService, private router: Router, 
        private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig) {
        this.lang = translate.currentLang;

            translate.onLangChange.subscribe((event: LangChangeEvent) => {

            const myLang = translate.currentLang;

            if (myLang == 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '1';
                    this.moduleName = this.router.url.split('/')[1];                 
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '2';
                    this.moduleName = this.router.url.split('/')[1];                    
                });
            }

            this.triggerAnnouncement(this.moduleName,this.lang);
            console.log("language: "+this.lang);
        });

    }

    lang = this.lang;

    ngOnInit() {
        this.moduleName = this.router.url.split('/')[1];
        this.triggerAnnouncement(this.moduleName, this.lang);
        console.log("onInit Announcement");
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e){
       
        const _getModule = this.router.url.split('/')[1];
        this.router.navigate([_getModule, e.code]);         

        console.log(e);
        console.log("sideMenu Announcement")
        event.preventDefault();
    }

    clickContent(e){    

        const _getModule = this.router.url.split('/')[1];
        this.router.navigate([_getModule, e.code]);   
        
        console.log("content Announcement");
        event.preventDefault(); 
    }
  
    triggerAnnouncement(moduleName, lang){
    
        if(lang == "ms"){
            this.lang = 2;
        }

        if(lang == "en"){
            this.lang = 1;
        }

        this.route.paramMap
        .switchMap((params: ParamMap) =>
        
        this.navService.getAnnouncement(moduleName, this.lang))
       
        .subscribe(resAllAnnounce => { 
            // this.announceRes = resAllAnnounce;
            //convert object to array
            // const temp1 = this.announceRes[0];            
            // const temp = Object.keys(temp1).map(key => temp1[key]);
            // this.announces = temp;
            console.log(resAllAnnounce);
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
