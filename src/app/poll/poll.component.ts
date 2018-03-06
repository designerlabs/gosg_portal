import { Component, OnInit , Inject} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';
import { debounce } from 'rxjs/operators/debounce';
import { PortalService } from '../services/portal.service';
import { SharedPipe } from '../common/shared.pipe';

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
    // calcValue = 90;
    // tslint:disable-next-line:max-line-length
    constructor(private translate: TranslateService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private toastr: ToastrService, private sharedService: SharedService, private portalservice: PortalService) {
        this.lang = translate.currentLang;
        this.languageId = 2;
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
          // this.sharedService.errorHandling(event, (function(){
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
          // }).bind(this));
        });
    }

    ngOnInit() {
        this.getData(this.languageId);
        // this.getUserIpAddr();
    }

   getData(languageId) {   
     debugger;    
         return this.http.get(this.config.urlPoll + '/question/lang/' + languageId + '/?active=true')
           .map(res => res.json())
          .subscribe(eventData => {
            this.sharedService.errorHandling(eventData, (function(){
              let resData = eventData.pollQuestionListDto[0];
                this.pollDataQuestion = resData.questionTitle;
                this.pollDataAnswer = resData.answer.filter(fData => fData.answer !== undefined);
                this.pollDataQuestionID = resData.questionId;
                this.pollReference = resData.pollReference;
                // tslint:disable-next-line:radix
                if (!this.latestResult) { // Check Latest Result Message while change lang
                    this.showResult = ((localStorage.getItem('polldone') === resData.pollReference.toString()));
                }
                // this.pollDataComment = eventData[0].comment;
              }).bind(this));
            }, error => {
              this.toastr.error(this.translate.instant('common.err.servicedown'), '');
          }
          );
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
        // this.getAnsData(this.lang);
        debugger;
        const data = {
            'pollsComment': this.pollComment,
            'pollsAnswerId' : this.pollAnswer.id,
            'pollsQuestionId': this.pollDataQuestionID
            // 'pollReference' : this.pollReference
            };
        this.portalservice.submitPoll(data)
        .subscribe(
            resData => {
                this.sharedService.errorHandling(resData, (function(){
                  this.resultData = resData;
                  this.pollDataAnswer = resData.answer;
                  this.pollDataQuestion = resData.questionTitle;
                  this.pollDataQuestionID = resData.questionId;
                  this.pollReference = resData.pollReference;
                  console.log(this.resultData);
                }).bind(this));
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
    // getUserIpAddr() {
    //     this.sharedService.getIpCliente()
    //     .subscribe(resData => {
    //       this.ipData = resData.text();
    //     },
    //     Error => {
    //      this.toastr.error(this.translate.instant('common.err.servicedown'), '');
    //    });
    // }

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
