import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Http, Response} from '@angular/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class FooterComponent implements OnInit {

  footer: any[];
  ftsociallink: any[];

  constructor(private translate: TranslateService, private router: Router, private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
    this.lang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.getFooter(this.lang);
            });
            // this.router.navigateByUrl('public')
        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.getFooter(this.lang);
            });
            // this.router.navigateByUrl('public')
        }
        
    });
  }

  lang = this.lang;
  showcontact = true;
  showaccess = true;
  showextlinks = true;
  showvisitor = true;

  private footerUrl: string = this.config.urlFooter;

  ngOnInit() {
      console.log('footer.comp.ts');
  }

  getFooter(lang: string) {

      return this.http.get(this.footerUrl + '-' + lang + '.json')
        .map((response: Response) => response.json())
        .subscribe(resSliderData => {
                this.footer = resSliderData;
            });
  }

  getTheme(){
        return localStorage.getItem('themeColor');
    }

  showFooter(ele){
        const temp = 'show' + ele;
        this[temp] = !this[temp];
    }
    
    onResize(event) {
        // console.log(event.target.innerWidth);
        // console.log(event.target.innerHeight);

        if(event.target.innerWidth >= 767) {
            this.showcontact = true;
            this.showaccess = true;
            this.showextlinks = true;
            this.showvisitor = true;
        }
    }
}
