import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../common/shared.service';
import { ValidateService } from '../common/validate.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

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

  lang = this.lang;
  languageId = this.languageId;
  showNoData = false;
  constructor(
    private router: Router, 
    private validateService:ValidateService,  
    private sharedService:SharedService, 
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
                  
              });
              
  }

  ngOnInit() {
    this.txtEmail = new FormControl();
    this.chkAnnounce = new FormControl();
    this.chkEpart = new FormControl();
    this.selCategory = new FormControl();

    this.subscriptionForm = new FormGroup({
      txtEmail: this.txtEmail,
      chkAnnounce: this.chkAnnounce,
      chkEpart: this.chkEpart,
      selCategory: this.selCategory
    });
this.getAllCategory();
  }

  getAllCategory(){
    this.loading = true;
    return this.http.get(this.config.urlSubscription + '?language=' + this.languageId)
      .subscribe(rData => {
        this.sharedService.errorHandling(rData, (function () {   
          debugger;       
          if (rData['subscriptionCategories'].length > 0) { 
            this.showNoData = false;
            this.dataSubs = rData['agencyApplicationList'];
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

  validateCtrlChk(ctrl: FormControl){
    // return ctrl.valid || ctrl.untouched
    return this.validateService.validateCtrl(ctrl);
}

}
