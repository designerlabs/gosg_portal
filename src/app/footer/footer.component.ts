import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { TopnavService } from '../header/topnav/topnav.service';
import { NavService } from '../header/nav/nav.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class FooterComponent implements OnInit, OnDestroy {

  footer= [];
  ftsociallink: any[];
  langID: any;
  dataSocialLnk= [];
  tltSocialLnk;
  dataContact= [];
  tltContact;
  dataAccessPage= [];
  tltAccessPage;
  dataNoOfVisitor= [];
  tltNoOfVisitor;
  dataExtLnk= [];
  tltExtLnk;
  dataBottom= [];
  tltBottom;
  dataBottomLnk= [];
  tltBottomLnk;
  copyright=[];
  dateOfUpdate=[];
  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  constructor(private translate: TranslateService,
    private router: Router, private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private topnavservice: TopnavService,private navService: NavService) {
    this.lang = translate.currentLang;

    this.subscriptionLang  = translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.langID = 1;
          //this.getFooter(this.langID);
        });
      }
      if (myLang == 'ms') {

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.langID = 2;
          //this.getFooter(this.langID);
        });
      }

      if(this.topnavservice.flagLang){
        this.subscription = this.getFooter(this.langID);
      }
    });
  }

  lang = this.lang;
  showcontact = true;
  showaccess = true;
  showextlinks = true;
  showvisitor = true;

  private footerUrl: string = this.config.urlFooter;

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    // this.langID = 0;
    // if (this.lang === 'ms') {
    //   this.langID = 2;
    // }else {
    //   this.langID = 1;
    // }

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }
    this.subscription = this.getFooter(this.langID);
    //this.getFooter(this.langID);
  }

  getFooter(lang) {
// if(this.footer.length == 0){
    return this.http.get(this.footerUrl + '?language=' + lang )
    // return this.http.get(this.footerUrl + '-ms.json')
      .map((response: Response) => response.json())
      .subscribe(resSliderData => {
        this.footer = resSliderData['footerResourceList'];
        this.tltContact = this.footer.filter(fdata => fdata.titleCode === 1)[0];
        this.dataContact = this.tltContact.footerContents;
        this.tltAccessPage = this.footer.filter(fdata => fdata.titleCode === 2)[0];
        this.dataAccessPage = this.tltAccessPage.footerContents;
        this.tltNoOfVisitor = this.footer.filter(fdata => fdata.titleCode === 3)[0];
        this.dataNoOfVisitor = this.tltNoOfVisitor.footerContents;
        this.tltSocialLnk = this.footer.filter(fdata => fdata.titleCode === 4)[0];
        this.dataSocialLnk = this.tltSocialLnk.footerContents;
        this.tltBottom = this.footer.filter(fdata => fdata.titleCode === 5);
        this.dataBottom =  this.tltBottom[0].footerContents;
        if(this.dataBottom.length > 0){
            this.copyright = this.dataBottom[1];
            this.dateOfUpdate = this.dataBottom[0];
        }else{
            this.copyright = [];
            this.dateOfUpdate = [];
        }
        this.tltBottomLnk = this.footer.filter(fdata => fdata.titleCode === 6)[0];
        this.dataBottomLnk = this.tltBottomLnk.footerContents;
        this.tltExtLnk = this.footer.filter(fdata => fdata.titleCode === 7)[0];
        this.dataExtLnk = this.tltExtLnk.footerContents;
      });
    // }
  }

  getUrl(ele){

    let split_url = ele.split('/');

    if(ele.includes('/')){
      let lastIndex = ele.lastIndexOf('/'),
          firstSet = ele.substr(0, lastIndex),
          secondSet = ele.substr(lastIndex),
          splitSet = secondSet.split('/');
      this.router.navigate(['/'+firstSet, splitSet[1]]);
      this.navService.triggerContent(splitSet[1], localStorage.getItem('langID'));
      this.navService.getContentUrl(splitSet[1], localStorage.getItem('langID'));
      window.scrollTo(0, 0);

    }else{
      this.router.navigate(['/'+split_url[0]]);
      window.scrollTo(0, 0);

    }

  }


  getTheme() {
    return localStorage.getItem('themeColor');
  }

  changeStyle($event){
    // this.color = $event.type == 'mouseover' ? 'yellow' : 'red';
  }

  showFooter(ele) {
    const temp = 'show' + ele;
    this[temp] = !this[temp];
  }

  onResize(event) {

    if (event.target.innerWidth >= 767) {
      this.showcontact = true;
      this.showaccess = true;
      this.showextlinks = true;
      this.showvisitor = true;
    }
  }
}
