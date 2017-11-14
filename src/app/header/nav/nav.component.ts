import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, Inject } from '@angular/core';
// import { AuthService } from '../../auth/auth.service'
import { IMenu, IUrl } from './nav.model';
import { Http, Response} from '@angular/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { RouterLinkActive  } from '@angular/router';
import { NavService } from './nav.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
  
  
})
export class NavComponent implements OnInit, AfterViewInit {

  @Output() menuClick = new EventEmitter();
  imgSrc: string;
  menus: IMenu[];
  articles: any[];
  lang = 'en';
  active_color = 'blue';
  inactive_color = 'red';
  setUrl = 'portal';
  menuId: number;
  constructor(private translate: TranslateService, @Inject(APP_CONFIG) private config: AppConfig, private http: Http, private navService: NavService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

            const myLang = translate.currentLang;

            if (myLang == 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'en';
                    this.imgSrc = 'logo_en';
                    this.getMenu();
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'ms';
                    this.imgSrc = 'logo_ms';
                    this.getMenu();
                });
            }
        });
   }


  private articleUrl: string = this.config.urlArticle;
  private menuUrl: string = this.config.urlMenu;
  ngOnInit() {
    this.imgSrc = 'logo_ms';
    this.navService.getMenuData(this.lang)
            .subscribe(resMenuData => this.menus = resMenuData);
  }

  handleClickMe(e){
        this.menuClick.emit(e);
        this.menuId = e;
        this.navService.triggerArticle(this.lang, e);
    }

  ngAfterViewInit() {
        $(function(){
            $('#main-menu > li > a').css({'backgroundColor': '#fff', 'color': '#000'});
            $('#main-menu > li > a.active').css('background-color', localStorage.getItem('themeColor'));
       });

    }


    getMenu(){
        this.navService.getMenuData(this.lang)
            .subscribe(resMenuData => this.menus = resMenuData);
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

    getUrl(){
        return 'portal';
    }

    searchfunc(eveny) {
        alert('search');
        event.preventDefault();
    }

}
