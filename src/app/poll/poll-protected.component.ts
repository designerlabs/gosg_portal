import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';
import { debounce } from 'rxjs/operators/debounce';
import { ProtectedService } from '../services/protected.service';
import { SharedPipe } from '../common/shared.pipe';

@Component({
  selector: 'gosg-poll-protected',
  templateUrl: './poll-protected.component.html',
  styleUrls: ['./poll-protected.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollProtectedComponent implements OnInit {
  pollDataTitle: string;
  pollDataQuestion: string;
  pollDataQuestionID;
  pollDataAnswer: any;
  pollDataComment: string;
  pollComment = '';
  pollAnswer: any;
  lang = 'en';
  filter= false;
  private pollUrl: string = this.config.urlPollProtected;
  // showResult = false;
  showResult;
  latestResult = false;
  value = 50;
  ipData: any;
  dumy = '#0000';
  resultData: any;
  languageId = this.languageId;
  pollPercent;
  progressbarVal;
  pollReference;
  
  constructor(
    private translate: TranslateService,
    private http: Http, 
    @Inject(APP_CONFIG) private config: AppConfig,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private protectedService: ProtectedService) {
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
            console.log('from malay');
          }
      });
    }

  ngOnInit() {
    this.getData(this.languageId);
  }


  getData(languageId) {
    return this.http.get(this.config.urlPoll + '/question/lang/' + languageId + '/?active=true')
      .map(res => res.json())
     .subscribe(eventData => {
        this.pollDataQuestion = eventData.questionTitle;
        this.pollDataAnswer = eventData.answer.filter((element, index) => {
            return (element.answer.length > 0);
        });
        this.pollDataQuestionID = eventData.questionId;
        this.pollReference = eventData.pollReference;
        // tslint:disable-next-line:radix
        if (!this.latestResult) { // Check Latest Result Message while change lang
            this.showResult = ((localStorage.getItem('polldone') === this.pollReference));
        }
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
    // this.getAnsData(this.lang);
    const data = {
        'pollsComment': this.pollComment,
        'pollsAnswerId' : this.pollAnswer.id,
        'pollsQuestionId': this.pollDataQuestionID
        // 'pollReference' : this.pollReference
        };
    this.protectedService.submitPoll(data)
    .subscribe(
        resData => {
            this.resultData = resData;
            this.pollDataAnswer = resData.answer;
            this.pollDataQuestion = resData.questionTitle;
            this.pollDataQuestionID = resData.questionId;
            this.pollReference = resData.pollReference;
            console.log(this.resultData);
        }, Error => {
            this.toastr.error(this.translate.instant('common.err.servicedown'), '');
        }
    );
    this.toastr.success('Recommendation is : ' + this.pollComment + ', Answer is ' + this.pollAnswer.answer);
    this.showResult = true;
    localStorage.setItem('polldone', this.pollReference);
  }

  closeResult() {
    this.latestResult = true;
    this.showResult = false;
  }
  ShowLatest() {
    this.latestResult = false;
    this.showResult = true;
  }

  calVal(val) {
    if (val) {
        // tslint:disable-next-line:radix
    const numerator = parseInt(val.split('/')[0]);
    // tslint:disable-next-line:radix
    const denomi = parseInt(val.split('/')[1]);
    // tslint:disable-next-line:radix
    if (numerator && denomi) {
        this.pollPercent  = (numerator / denomi) * 100;
    }else {
        this.pollPercent  = 0;
    }
    this.progressbarVal = Math.round(this.pollPercent);
    // console.log(this.progressbarVal);
    return this.progressbarVal;
    }
  }

}