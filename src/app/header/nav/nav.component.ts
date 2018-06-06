import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
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
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../topnav/topnav.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']

})
export class NavComponent implements OnInit, AfterViewInit, OnDestroy {

    mobile: boolean;
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
    page;

    private articleUrl: string = this.config.urlArticle;
    private menuUrl: string = this.config.urlMenu;

    private subscription: ISubscription;
    private subscriptionLang: ISubscription;
    
    constructor(
        private translate: TranslateService,
        private toastr: ToastrService,
        @Inject(APP_CONFIG) private config: AppConfig,
        private http: Http,
        private navService: NavService,
        private topnavservice: TopnavService,
        private router: Router,
        private searchService: SearchService)
        {
        translate.onLangChange.subscribe((event: LangChangeEvent) => {

            const myLang = translate.currentLang;

            if (myLang == 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'en';
                    this.langId = 1;
                    this.languageId = 1;
                    this.imgSrc = 'logo_en';
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'ms';
                    this.langId = 2;
                    this.languageId = 2;
                    this.imgSrc = 'logo_ms';
                });
            }

            if(this.topnavservice.flagLang){
              this.getMenu();
            }
        });
    }

    ngOnInit() {

        if (!this.languageId) {
            this.languageId = localStorage.getItem('langID');
        } else {
            this.languageId = 1;
        }

        this.page = this.router.url.split('/')[1];
        // console.log(this.page)
        this.imgSrc = 'logo_ms';
        this.getMenu();
        this.getPop();
    }

    ngOnDestroy() {
      this.subscriptionLang.unsubscribe();
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
        this.navService.getMenuData(this.languageId)
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
        this.page = this.router.url.split('/')[1];
        if(key) {
            $('#searchDDown').css({ 'display': 'none' });
            localStorage.setItem('ser_word', key);
            this.router.navigate(['search/searchResult', key]);
            this.internal(key);
            console.log(this.page)
            if(this.page == 'search')
                window.location.reload();

        } else {
            this.toastr.error(this.translate.instant('common.msg.searchKeyword'), '');
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
                "ref_language_id": this.languageId.toString()
            },
            "aggregations": [
              {
                "name": "histogram",
                "type": "dateHistogram",
                "field": "publish_date",
                "interval": "month",
                "time_zone": "+08:00",
                "minDocCount": 1,
                "size": 10
              },
              {
                "name": "filter_topic.category",
                "type": "filter",
                "field": "category.is_active",
                "filter": {
                  "category.is_active": true
                },
                "subAggregation": {
                  "name": "active_cat",
                  "type": "terms",
                  "field": "category.topic.raw",
                  "size": "10"
                }
              },
              {
                "name": "filter_sub_topic.category",
                "type": "filter",
                "field": "category.is_active",
                "filter": {
                  "category.is_active": true
                },
                "subAggregation": {
                  "name": "active_cat",
                  "type": "terms",
                  "field": "category.sub_topic.raw",
                  "size": "10"
                }
              }
            ]
        }

        console.log(body)
        // console.log(JSON.stringify(body))

        this.searchService.getInternal(body).subscribe(
            data => {
                this.searchService.setIntData(data);
            });


    }

}
