import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, Inject } from '@angular/core';
// import { AuthService } from '../../auth/auth.service'
import { IMenu, IUrl } from './nav.model';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { RouterLinkActive, Router } from '@angular/router';
import { NavService } from './nav.service';
import * as $ from 'jquery';
import { SearchService } from '../../search/search.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']

})
export class NavComponent implements OnInit, AfterViewInit {

    @Output() menuClick = new EventEmitter();
    languageId: any;
    imgSrc: string;
    menus: IMenu[];
    articles: any[];
    lang = 'en';
    langId = 1;
    active_color = 'blue';
    inactive_color = 'red';
    setUrl = 'portal';
    menuId: number;
    popData: any;
    ser_word = "";
    env:any;
    envPathName = window.location.pathname;
    envOrigin = window.location.origin;

    hName = window.location.hostname;

    private articleUrl: string = this.config.urlArticle;
    private menuUrl: string = this.config.urlMenu;

    constructor(
        private translate: TranslateService,
        private toastr: ToastrService, 
        @Inject(APP_CONFIG) private config: AppConfig, 
        private http: Http, 
        private navService: NavService, 
        private router: Router, 
        private searchService: SearchService)
         {
        translate.onLangChange.subscribe((event: LangChangeEvent) => {

            const myLang = translate.currentLang;

            if (myLang == 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'en';
                    this.langId = 1;
                    this.imgSrc = 'logo_en';
                    this.getMenu();
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'ms';
                    this.langId = 2;
                    this.imgSrc = 'logo_ms';
                    this.getMenu();
                });
            }
        });

        if (!this.languageId) {
            this.languageId = localStorage.getItem('langID');
        } else {
            this.languageId = 1;
        }
    }

    ngOnInit() {

        this.env = this.envPathName.split('/')[1];
        
        this.imgSrc = 'logo_ms';
        this.navService.getMenuData(this.langId).subscribe(resMenuData => this.menus = resMenuData);
        this.getPop();
    }

    color: string = 'red';

    changeStyle($event) {
        this.color = $event.type == 'mouseover' ? 'animated fadeIn' : '';
    }

    handleClickMe(e) {
        this.menuClick.emit(e);
        this.menuId = e;
        // this.navService.triggerArticle('',this.langId, e);
    }

    ngAfterViewInit() {
        $(function () {
            $('#main-menu > li > a').css({ 'backgroundColor': '#fff', 'color': '#000' });
            $('#main-menu > li > a.active').css('background-color', localStorage.getItem('themeColor'));
        });

    }

    dropdownDisplay(action) {
        $(function () {

            if (action == 'show')
                $('#searchDDown').css({ 'display': 'block' });
            else
                $('#searchDDown').css({ 'display': 'none' });
            // $('#searchDDown').css('background-color', localStorage.getItem('themeColor'));
        });
    }

    getMenu() {
        this.navService.getMenuData(this.langId)
            .subscribe(resMenuData => { this.menus = resMenuData });
    }

    getPop() {
        let body = {
            "size": 10,
            "filters": {
            }
        };
        this.navService.getPopularData(body)
            .subscribe(resPopularData => {
                this.popData = resPopularData
            });
    }

    getTheme() {
        return localStorage.getItem('themeColor');
    }

    getUrl() {
        return 'portal';
    }

    mainSearch(key) {
        let loc = window.location.hostname;
        this.env = this.envPathName.split('/')[1];

        if(this.env == 'search') {
            
            this.ser_word = key;
        } else {
    
            if(key) {
                $('#searchDDown').css({ 'display': 'none' });
                localStorage.setItem('ser_word', key);
                this.router.navigate(['search/searchResult']);
                this.internal(key);
            } else {
                this.toastr.error(this.translate.instant('common.msg.searchKeyword'), '');
            }
        }
    }

    internal(key) {

        let body = {
            "size": 10,
            "from": 0,
            "keyword": key,
            "filters": {
                "ranges":
                    {
                        "end_date": [
                            {
                                "gte": "now/d",
                                "time_zone": "+08:00"
                            }
                        ]
                    },
                "ref_language_id": this.languageId
            }
        }

        this.searchService.getInternal(JSON.stringify(body)).subscribe(
            data => {
                this.searchService.setIntData(data);
            });


    }

}
