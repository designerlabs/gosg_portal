import { Component, OnInit , Inject} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

 pollDataTitle: string;
    pollDataQuestion: string;
    pollDataAnswer: any;
    pollDataComment: string;
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

    ngOnInit(){
        this.getData(this.lang);
    }

   private pollUrl: string = this.config.urlPoll;
   getData(lang: string){
         return this.http.get(this.pollUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(eventData => {
                this.pollDataTitle = eventData[0].title;
                this.pollDataQuestion = eventData[0].question;
                this.pollDataAnswer = eventData[0].answer;
                this.pollDataComment = eventData[0].comment;
            });
    }

    getTheme(){
        return localStorage.getItem('themeColor');

    }

}
