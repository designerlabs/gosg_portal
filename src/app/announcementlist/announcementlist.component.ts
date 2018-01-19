import { Component,  Injectable, Inject,Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import { NavService } from '../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
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
        private breadcrumbService: BreadcrumbService, @Inject(APP_CONFIG) private config: AppConfig) {
        this.lang = translate.currentLang;

            translate.onLangChange.subscribe((event: LangChangeEvent) => {

            const myLang = translate.currentLang;

            if (myLang == 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '1';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = this.router.url.split('/')[2];
                 
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = '2';
                    this.moduleName = this.router.url.split('/')[1];
                    this.announcementID = this.router.url.split('/')[2];
                    
                });
            }

            this.triggerAnnouncementList(this.lang,this.announcementID);
            console.log("langMY")
        });

    }

    lang = this.lang;

    ngOnInit() {
        
        this.moduleName = this.router.url.split('/')[1];
        this.announcementID = this.router.url.split('/')[2]; 
     
        this.triggerAnnouncementList(this.lang, this.announcementID);
        console.log("onInit");
        console.log("###############################################");
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(e){
       
        const _getModule = this.router.url.split('/')[1];
        
        // this.router.navigate(['announcement', e.code]); 
        this.triggerAnnouncementList(this.lang, e.code);
        this.router.navigate(['/announcement', e.code]);
        //this.navService.getAnnouncementList(this.moduleName, this.lang, this.announcementID);
        

        console.log("sideMenu List"+['announcement', e.code]);
        event.preventDefault();
    }

    clickContent(e){
       
        const _getModule = this.router.url.split('/')[1];
        const _getAnnounceID = this.router.url.split('/')[2]; 
        const _getAnnounceID2 = this.router.url.split('/')[3]; 
     
        this.router.navigate(['announcement', _getAnnounceID, e.code]);   
        
        console.log("2");
        event.preventDefault();   
  }
  
  triggerAnnouncementList(lang, id1){
    
    if(lang == "ms"){
        this.lang = 2;
    }

    if(lang == "en"){
        this.lang = 1;
    }

    if(id1){
        this.route.paramMap
    .switchMap((params: ParamMap) =>
    
    this.navService.getAnnouncementList('announcement', this.lang, id1))
   
    .subscribe(resAllAnnounce => { 
        // this.announceRes = resAllAnnounce;
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
