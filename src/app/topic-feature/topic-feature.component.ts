import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'app-topic-feature',
  templateUrl: './topic-feature.component.html',
  styleUrls: ['./topic-feature.component.css']
})
export class TopicFeatureComponent implements OnInit {

  topicsData: any[];
    lang = 'en';
    filter= false;

    constructor(private translate: TranslateService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig){
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
        console.log('topic-feature.comp.ts');
      this.getData(this.lang);
    }

   private topicUrl: string = this.config.urlTopics;
   getData(lang: string){
         return this.http.get(this.topicUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(topicJsonData => {
                this.topicsData = topicJsonData[0].data;
            });
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

    showMore(){
    }

    filterData(){
        this.filter = !this.filter; // this will change value of it true and false
    }

}
