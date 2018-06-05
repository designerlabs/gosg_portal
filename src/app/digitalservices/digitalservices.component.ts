import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { PortalService } from '../services/portal.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'gosg-digitalservices',
  templateUrl: './digitalservices.component.html',
  styleUrls: ['./digitalservices.component.css']
})
export class DigitalservicesComponent implements OnInit, OnDestroy {

  dsData: any = [];
  languageId = this.languageId;
  mediaUrl: any;

  lang = this.lang;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private topnavservice: TopnavService,
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
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    // this.subscription.unsubscribe();
  }

  getDServices(lang) {

    this.portalservice.getDigitalServices(lang).subscribe(data => {

      this.dsData = data.list;
      // console.log(data.list)
      // for(var item of data.list) {
      // console.log(data.list)
      // if(data.list.details)
      //   this.dsData.push(data.list);
      // }
      // this.dsData = [''];
      console.log(this.dsData)
    });
  }

}
