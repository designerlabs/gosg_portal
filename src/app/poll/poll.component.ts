import { Component, OnInit , Inject} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';
import { debounce } from 'rxjs/operators/debounce';
import { PortalService } from '../services/portal.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

 pollDataTitle: string;
    pollDataQuestion: string;
    pollDataQuestionID;
    pollDataAnswer: any;
    pollDataComment: string;
    pollComment = '';
    pollAnswer: any;
    lang = 'en';
    filter= false;
    private pollUrl: string = this.config.urlPoll;
    showResult = false;
    latestResult = false;
    value = 50;
    ipData: any;
    dumy = '#0000';
    resultData: any;
    languageId = this.languageId;
    pollPercent;
    progressbarVal;
    // calcValue = 90;
    // tslint:disable-next-line:max-line-length
    constructor(private translate: TranslateService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private toastr: ToastrService, private sharedService: SharedService, private portalservice: PortalService) {
        this.lang = translate.currentLang;
        this.languageId = 2;
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            const myLang = translate.currentLang;
            if (myLang === 'en') {
               this.lang = 'en';
               this.languageId = 1;
               this.getData('1');
            }
            if (myLang === 'ms') {
              this.lang = 'ms';
              this.languageId = 2;
              this.getData('2');
            }
        });
    }

    ngOnInit() {
        this.getData(this.languageId);
        this.getUserIpAddr();
    }

   getData(languageId) {
         return this.http.get('http://10.1.70.148:8081/service/polls/question/lang/' + languageId)
           .map(res => res.json())
          .subscribe(eventData => {
                this.pollDataQuestion = eventData[0].questionTitle;
                this.pollDataAnswer = eventData[0].answer;
                this.pollDataQuestionID = eventData[0].questionId;
                // tslint:disable-next-line:radix
                this.showResult = (parseInt(localStorage.getItem('polldone')) === this.pollDataQuestionID);
                // this.pollDataComment = eventData[0].comment;
            });
    }

    getAnsData() {
        // return this.http.get('http://10.1.17.12:3000/pollresult')
        //   .map(res => res.json())
        //  .subscribe(eventData => {
        //        this.pollAnswer = eventData[0].answer;
        //        // this.pollDataComment = eventData[0].comment;
        //    });
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
        // this.getAnsData(this.lang);
        const data = {
            'pollsComment': this.pollComment,
            'pollsAnswerId' : this.pollAnswer.id,
            'pollsQuestionId': this.pollDataQuestionID
            };
        this.portalservice.submitPoll(data)
        .subscribe(
            resData => {
                this.resultData = resData;
                this.pollDataAnswer = resData.answer;
                this.pollDataQuestion = resData.questionTitle;
                this.pollDataQuestionID = resData.questionId;
                console.log(this.resultData);
            }, Error => {
                this.toastr.error(this.translate.instant('common.err.servicedown'), '');
            }
        );
        this.toastr.success('Recommendation is : ' + this.pollComment + ', Answer is ' + this.pollAnswer.answer);
        this.showResult = true;
        localStorage.setItem('polldone', this.pollDataQuestionID);
    }
    closeResult() {
        this.latestResult = true;
        this.showResult = false;
    }
    ShowLatest() {
        this.latestResult = false;
        this.showResult = true;
    }
    getUserIpAddr() {
        this.sharedService.getIpCliente()
        .subscribe(resData => {
          this.ipData = resData.text();
        },
        Error => {
         this.toastr.error(this.translate.instant('common.err.servicedown'), '');
       });
    }

    calVal(val) {
        const numer = val.split('/')[0];
        const denomi = val.split('/')[1];
        this.pollPercent  = (numer / denomi) * 100;
        this.progressbarVal = Math.round(this.pollPercent);
        console.log(this.progressbarVal);
        return this.progressbarVal;
    }
}
