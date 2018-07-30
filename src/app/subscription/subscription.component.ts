import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../common/shared.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { ValidateService } from '../common/validate.service';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'gosg-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit,OnDestroy {
  categoryIds: any;
  subscriptionForm: FormGroup;
  public txtEmail: FormControl;
  public chkAnnounce: FormControl;
  public chkEpart: FormControl;
  public selCategory: FormControl;
  public loading = false;
  dataSubs = [];
  selCategoryVal;

  lang = this.lang;
  languageId = this.languageId;
  showNoData = false;
  errormsg = '';
  resetModal;
  showerr = false;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  constructor(
    private router: Router,
    private validateService: ValidateService,
    private sharedService: SharedService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private topnavservice: TopnavService,
    private toastr: ToastrService,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
  ) {
    this.lang = translate.currentLang;
    //this.languageId = 2;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang === 'en') {
         this.lang = 'en';
         this.languageId = 1;
      }
      if (myLang === 'ms') {
        this.lang = 'ms';
        this.languageId = 2;
      }

      if(this.topnavservice.flagLang){
        this.getAllCategory(this.languageId);
      }
    });

  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = this.languageId;
    }

    this.txtEmail = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern().email)]);
    this.selCategory = new FormControl();

    this.subscriptionForm = new FormGroup({
      txtEmail: this.txtEmail,
      selCategory: this.selCategory
    });
    this.getAllCategory(this.languageId);
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  getAllCategory(lang: string) {
    this.loading = true;
    return this.sharedService.readPortal('subscription/list', '', '', '', lang)
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function () {
          if (rData['subscriptionCategories'].length > 0) {
            this.showNoData = false;
            this.dataSubs = rData['subscriptionCategories'];
          } else {
            this.showNoData = true;
          }
        }).bind(this));
        this.loading = false;
      },
        error => {
          this.toastr.error(this.translate.instant('common.err.servicedown'), '');
        });
  }

  chk(eve) {
    this.selCategoryVal = eve.source.triggerValue.split(',')[0];
  }

  update(formval) {
    this.loading = true;
    this.createSubscriptions(formval.txtEmail, formval.selCategory)
    .subscribe(
      data => {
        if(data.statusCode === "SUCCESS"){
          this.toastr.success(this.translate.instant('subscription.successMsg'), '');
          this.showerr = false;
        }else if(data.statusCode === "ERROR"){
          this.toastr.error(data.statusDesc);
          this.showerr = true;
          this.errormsg = data.statusDesc;
        }

      },
      error => {
          this.toastr.error(this.translate.instant('common.err.servicedown'), '');
      });

    this.loading = false;
  }

  createSubscriptions(emailval, subsval) {
    // if(!this.languageId){
    //   this.languageId = 1;
    // }
    this.languageId = localStorage.getItem('langID');
    this.categoryIds = '';
    subsval.forEach((item, index) => {
      this.categoryIds += '&categories='+item;


  });
    return this.http.get(this.config.urlPortal + 'subscription?email=' + emailval+this.categoryIds + '&language='+ this.languageId)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  resetMethod(eve){
    this.router.navigate(['index']);
  }

  validateCtrlChk(ctrl: FormControl) {
    // return ctrl.valid || ctrl.untouched
    return this.validateService.validateCtrl(ctrl);
  }
  
  private handleError(error: Response) {
    let msg = `Status code ${error.status} on url ${error.url}`;
    return Observable.throw(msg);
  }

  }
