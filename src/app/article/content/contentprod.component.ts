import { Component, Output, Input, EventEmitter, OnInit, AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy, Inject  } from '@angular/core';
import { ArticleService } from '../article.service';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { NavService } from '../../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';
import { ValidateService } from '../../common/validate.service';
import { SharedService} from '../../common/shared.service';
import 'rxjs/add/operator/switchMap';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../../header/topnav/topnav.service';
import { HttpClient } from '@angular/common/http';
import { PortalService } from '../../services/portal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'gosg-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentProdComponent implements OnInit, OnDestroy {
  statusID: any;
  @Output() menuClick = new EventEmitter();
  breadcrumb: any;
  isValid: any;
  topicID: number;
  subID: number;
  moduleName: string;
  articles: any[];
  public scoreFormgrp: FormGroup;
  score: FormControl;
  remarks: FormControl;

  articleData: any;
  @Output() langChange = new EventEmitter();
  loading: boolean;

  handleClickMe(e){

  }
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private http:HttpClient,
    public articleService: ArticleService,
    private topnavservice: TopnavService,
    private route: ActivatedRoute,
    private navService: NavService,
    private translate: TranslateService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private validateService:ValidateService,
    private sharedService :SharedService,
    private portalService:PortalService,
    private toastr: ToastrService) {
    this.lang = translate.currentLang;
    this.langId = 1;

        this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langId = 1;
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                var tt = this.router.url.split('/');
                this.subID = parseInt(tt[tt.length-1]);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.moduleName = this.router.url.split('/')[1];
                this.topicID = parseInt(this.router.url.split('/')[2]);
                var tt = this.router.url.split('/');
                this.subID = parseInt(tt[tt.length-1]);
            });
        }

        if(this.topnavservice.flagLang){

          if(this.moduleName == 'subcategory'){
            this.navService.triggerSubArticle(this.subID, this.langId);
          }else if(this.moduleName == 'content'){
            this.navService.triggerContent(this.subID, this.langId, this.boolCallback);
          }else{
            this.navService.triggerArticle(this.moduleName,  this.langId, this.topicID);
          }
        }

    });
   }

   lang = this.lang;
   langId = this.langId;


  ngOnInit() {

    if(!this.langId){
      this.langId = localStorage.getItem('langID');
    }else{
      this.langId = 1;
    }

    this.articleData = this.articleService.getArticle();
    this.topicID = parseInt(this.router.url.split('/')[2]);
    this.moduleName = this.router.url.split('/')[1];
    var tt = this.router.url.split('/');
    this.subID = parseInt(tt[tt.length-1]);

    this.navService.triggerContent(this.subID, localStorage.getItem('langID'), this.boolCallback);
    this.score = new FormControl('', [Validators.required]);
    this.remarks = new FormControl('');
    this.scoreFormgrp = new FormGroup({
      score: this.score,
      remarks: this.remarks

    });

  }

  boolCallback = (result: boolean) : void => {
   this.loading = result;
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getTheme(){
    return localStorage.getItem('themeColor');
  }

  appTracking(refCode){
    const readUrl = `${this.config.registerationUrl}agencyapplication/tracking?refCode=${refCode}&source=life-event`;
    const req = this.http.post(readUrl,'')
      .subscribe(
        res => {

        },
        err => {
          console.log("Error occured");
        }
      );
  }

  getRate(val){

  }

  submitForm(formValues:any){
    let body = {
        "contentCode": null,
        "score": null,
        "remarks": null
    };

    body.contentCode = this.subID;
    body.score = parseInt(formValues.score);
    body.remarks = formValues.remarks;

    // let datasend = JSON.stringify(body);

      this.portalService.submitScore(body).subscribe(
        data => {

          this.sharedService.errorHandling(data, (function(){
            this.getRateReset();
            this.toastr.success(this.translate.instant('feedback.msgsubmit'), '');
        }).bind(this));
      },
      error => {
        // this.toastr.error(JSON.parse(error._body).statusDesc, '');

      });

  }

  getRateReset(){
    this.scoreFormgrp.reset();
  }

  clickSideMenu(e, status, event){
    this.statusID = status;
    // this.navService.getSubArticleUrl( e.categoryId, localStorage.getItem('langID'));
    // this.navService.triggerSubArticle(e.categoryCode, localStorage.getItem('langID'));
    this.router.navigate( ['/subcategory', e.categoryCode]);
    event.preventDefault();
  }

  clickSideMenuByAgency(e, status, event){
    this.navService.getSubArticleUrlByAgency(localStorage.getItem('langID'));
    this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
    this.router.navigate(['/subcategory', 'agency']);
    event.preventDefault();
  }

  clickContentFromMenu(pId, aId, status, event){
    this.statusID = status;
    this.navService.triggerContent(aId, localStorage.getItem('langID'), this.boolCallback);
    this.navService.getContentUrl(aId, localStorage.getItem('langID'));
    this.router.navigate( ['/content', aId]);
    event.preventDefault();
  }

  getModule(data){
    let a = data.split("/");
    return a[1];
  }

  getID(data){
    let a = data.split("/");
    return a[2];
  }

  checkImgData(e){
      const chkData = e.search('<img');
      if (chkData != -1){
          return true;
      }else{
          return false;
      }
  }

}
