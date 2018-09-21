import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { PortalService } from '../services/portal.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'gosg-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit, OnDestroy {

  lang = this.lang;
  languageId = this.languageId;
  private subscriptionLang: ISubscription;

  constructor(
    private http: Http,
    public portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private topnavservice: TopnavService,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) {

      this.subscriptionLang = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        // this.sharedService.errorHandling(event, (function(){
          const myLang = this.translate.currentLang;
          if (myLang === 'en') {
             this.lang = 'en';
             this.languageId = 1;
          }
          if (myLang === 'ms') {
            this.lang = 'ms';
            this.languageId = 2;
          }

          if(this.topnavservice.flagLang){
            this.portalservice.triggerSiteMap(this.languageId);
            window.scrollTo(0,0);
          }

      });
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.portalservice.triggerSiteMap(this.languageId);
    console.log(this.portalservice.loader)
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
