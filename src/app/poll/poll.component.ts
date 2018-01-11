import { Component, OnInit , Inject} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ToastrService } from 'ngx-toastr';
import { debounce } from 'rxjs/operators/debounce';

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
    pollComment = '';
    pollAnswer: any;
    lang = 'en';
    filter= false;
    private pollUrl: string = this.config.urlPoll;
    showResult = false;
    value = 50;

    // tslint:disable-next-line:max-line-length
    constructor(private translate: TranslateService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private toastr: ToastrService) {
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            const myLang = translate.currentLang;
            if (myLang === 'en') {
               this.lang = 'en';
               this.getData(this.lang);
            }
            if (myLang === 'ms') {
              this.lang = 'ms';
              this.getData(this.lang);
            }
        });
    }

    ngOnInit() {
        this.getData(this.lang);
    }


   getData(lang: string) {
         return this.http.get('http://10.1.17.12:3000/poll')
           .map(res => res.json())
          .subscribe(eventData => {
                this.pollDataQuestion = eventData[0].questionTitle;
                this.pollDataAnswer = eventData[0].answer;
                // this.pollDataComment = eventData[0].comment;
            });
    }

    getAnsData(lang: string) {
        return this.http.get('http://10.1.17.12:3000/pollresult')
          .map(res => res.json())
         .subscribe(eventData => {
               this.pollAnswer = eventData[0].answer;
               // this.pollDataComment = eventData[0].comment;
           });
   }

    getTheme() {
        return localStorage.getItem('themeColor');

    }

    onSelectionChange(selItem) {
        // this.toastr.success(selItem.answer);
        this.pollAnswer = selItem;
    }

    submitPoll(event) {
        // debugger;
        this.getAnsData(this.lang);
        this.toastr.success('Recommendation is : ' + this.pollComment + ', Answer is ' + this.pollAnswer.answer);
        this.showResult = true;
    }

}
