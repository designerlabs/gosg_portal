import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';


@Component({
  selector: 'app-lifeevent',
  templateUrl: './lifeevent.component.html',
  styleUrls: ['./lifeevent.component.css']
})
export class LifeeventComponent implements OnInit {
  lifeEventData: any[];
  lang = 'en';
  constructor(private translate: TranslateService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
    this.lang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
        const myLang = translate.currentLang;
        if (myLang == 'en') {
            this.lang = 'en';
            this.getData(this.lang);
        }
        if (myLang == 'ms') {
          this.lang = 'ms';
          this.getData(this.lang);
        }
    });
  }

  ngOnInit() {
    this.getData(this.lang);
  }

  private lifeEventUrl: string = this.config.urlLifeevent;
  getData(lang: string){

         return this.http.get(this.lifeEventUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(resSliderData => {
                this.lifeEventData = resSliderData;
            });
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

}
