import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ISubscription } from "rxjs/Subscription";
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { SharedService } from '../common/shared.service';
import { TopnavComponent } from '../header/topnav/topnav.component';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'app-lifeevent',
  templateUrl: './lifeevent.component.html',
  styleUrls: ['./lifeevent.component.css']
})
export class LifeeventComponent implements OnInit, OnDestroy {
  lifeEventDesc: any;
  lifeEventTitle: any;
  lifeEventData: any[];
  lang = 'en';
  languageId = this.languageId;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(private translate: TranslateService, private topnavservice: TopnavService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private sharedService: SharedService) {
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
          this.subscription = this.getData(this.languageId);
        }

    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }
    this.subscription = this.getData(this.languageId);
  }

  private lifeEventUrl: string = 'life/event';
  getData(lang: string){

         return this.sharedService.readPortal(this.lifeEventUrl, '', '', '', lang)
          .subscribe(resSliderData => {
                this.lifeEventTitle = resSliderData['contentCategoryName'];
                this.lifeEventDesc = resSliderData['contentCategoryDescription'];
                this.lifeEventData = resSliderData['contentCategoryResourceList'];
            });
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

}
