import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { Http } from '@angular/http';
import { PortalService } from '../services/portal.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';
import { ProtectedService } from '../services/protected.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'gosg-digitalservices',
  templateUrl: './digitalservices.component.html',
  styleUrls: ['./digitalservices.component.css']
})
export class DigitalservicesprodComponent implements OnInit, OnDestroy {

  dsData: any = [];
  languageId = this.languageId;
  mediaUrl: any;
  isLogin: boolean;
  loading: boolean;
  validMyIdentity:boolean;
  activeUser: any;

  lang = this.lang;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private topnavservice: TopnavService,
    private protectedService:ProtectedService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) {

    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = this.translate.currentLang;
      if (myLang === 'en') {
        this.lang = 'en';
        this.languageId = 1;
      }
      if (myLang === 'ms') {
        this.lang = 'ms';
        this.languageId = 2;
      }

      if (this.topnavservice.flagLang) {
        this.getDServices(this.languageId);
      }

    });

  }

  ngOnInit() {

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }
    this.mediaUrl = this.config.externalMediaURL + '/documents/';
    this.getDServices(this.languageId);
    this.getUserData();
    window.scrollTo(0,0);

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    // this.subscription.unsubscribe();
  }

  getDServices(lang) {

    this.loading = true;
    this.portalservice.getDigitalServices(lang).subscribe(data => {

      this.dsData = data.list;
      this.loading = false;
      //
      // for(var item of data.list) {
      //
      // if(data.list.details)
      //   this.dsData.push(data.list);
      // }
      // this.dsData = [''];

    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      this.loading = false;

    });
  }

  getUserData(){
    if(!environment.staging){
    this.protectedService.getUser().subscribe(
      data => {
        this.validMyIdentity = data.user.isMyIdentityActive;
        this.isLogin = true;
        this.activeUser = data.user.accountStatus.accountStatusDescription;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;

      });
    } else {
      this.validMyIdentity = true;
      this.isLogin = true;

      this.activeUser = '';
    }

    console.log("okkkkkk: "+this.validMyIdentity);
    console.log("ACTIVE: "+this.activeUser);
  }

  toValidate(dserviceCode, dUrl, agcCode, common?) {
    // localStorage.setItem('referral',this.router.url.split('/')[1]);
    // localStorage.setItem('dserviceCode',dserviceCode);
    window.open(dUrl+'?service='+dserviceCode+'&agency='+agcCode, '_blank');

    if(common) {
      this.portalservice.sendTrackingCount(dserviceCode,agcCode).subscribe(
        data =>{
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        // this.loading = false;

      });
    }
  }

openDialog() {

}

}
