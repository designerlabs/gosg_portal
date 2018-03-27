import { Component, OnInit, Inject } from '@angular/core';
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

@Component({
  selector: 'gosg-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
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
  resetModal;
  constructor(
    private router: Router,
    private validateService: ValidateService,
    private sharedService: SharedService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
  ) {
    this.lang = translate.currentLang;
    this.languageId = 2;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
        });

      }
      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
        });
      }
      // this.getRace(this.languageId);
      this.getAllCategory();
    });

  }

  ngOnInit() {
    this.txtEmail = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern().email)]);    
    this.selCategory = new FormControl();

    this.subscriptionForm = new FormGroup({
      txtEmail: this.txtEmail,
      selCategory: this.selCategory
    });
    this.getAllCategory();
  }

  getAllCategory() {
    this.loading = true;
    return this.http.get(this.config.urlSubscription + '?language=' + this.languageId)
      .map(res => res.json())
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
          this.toastr.success(this.translate.instant('subscription.successMsg'), '');
      },
      error => {
          this.toastr.error(this.translate.instant('common.err.servicedown'), '');
      });

    this.loading = false;
  }

  createSubscriptions(emailval, subsval) {
    if(!this.languageId){
      this.languageId = 1;
    }
    return this.http.post(this.config.urlSubscription + '?email=' + emailval , subsval)
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
    console.error(msg);
    return Observable.throw(msg);
  }

  }
