import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, AfterViewInit,  ViewChild, ElementRef, Inject, AfterContentInit, OnDestroy } from '@angular/core';
import { NavService } from '../header/nav/nav.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { GalleryService } from './gallery.service';
import { SharedService } from '../common/shared.service';
import { ISubscription } from 'rxjs/Subscription';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { TopnavService } from '../header/topnav/topnav.service';
import { PortalService } from '../services/portal.service';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  type;
  title;
  path;
  desc;
}

@Component({
  selector: 'gosg-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input()
  agencySel: String
  statusID: any;
  subID: number;
  moduleName: string;

  @ViewChild('textarea') textarea: ElementRef;
  @Output() menuClick = new EventEmitter();

  breadcrumb: any;
  isValid: any;
  galleryID: number;
  gallery: any[];
  mediaSource: any;
  showPopup: boolean;
  isImages:boolean;
  isDocument:boolean;
  isAudio:boolean;
  isVideo:boolean;
  mediaTypeName: string;
  loading = false;
  agencyData: any;
  isActiveList: boolean = false;
  getDay = '';
  valYear: any;
  valMonth: any;
  valDay: any;

  galleryData: any;
  @Output() langChange = new EventEmitter();

  private subscriptionLang: ISubscription;

  mediaUrl: any = this.config.externalMediaURL;
  // mediaUrl: any = this.config.externalMediaURL.split('/')[2];

  constructor(
    public galleryService: GalleryService,
    private route: ActivatedRoute,
    private navService: NavService,
    private translate: TranslateService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private topnavservice: TopnavService,
    private portalService:PortalService,
    public dialog: MatDialog
  ) {

    this.lang = translate.currentLang;

    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langId = 1;
                this.moduleName = this.router.url.split('/')[1];
                this.galleryID = parseInt(this.router.url.split('/')[2]);
                // this.navService.triggerArticle(this.moduleName, this.langId, this.galleryID);
            });

        }
        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langId = 2;
                this.moduleName = this.router.url.split('/')[1];
                this.galleryID = parseInt(this.router.url.split('/')[2]);
                this.subID = parseInt(this.router.url.split('/')[3]);
                // this.navService.triggerArticle(this.moduleName,  this.langId, this.galleryID);
            });
        }

        if(this.topnavservice.flagLang){
          this.galleryData = this.galleryService.getGallery();
          this.moduleName = this.router.url.split('/')[1];
          this.navService.triggerGalleries(this.langId, '');

          this.showPopup = false;
          this.isImages = false;
          this.isAudio = false;
          this.isDocument = false;
          this.isVideo = false;

        }

    });

  }


  lang = this.lang;
  langId = this.langId;
  boolCallback = (result: boolean) : void => {
    this.loading = result;
  }
  searchAgencyResult(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.mediaUrl = this.mediaUrl.replace("/media","");

    if(!this.langId){
      this.langId = localStorage.getItem('langID');
    }else{
      this.langId = 1;
    }

    this.galleryData = this.galleryService.getGallery();
    this.moduleName = this.router.url.split('/')[1];
    this.navService.triggerGalleries(localStorage.getItem('langID'), '');
    this.showPopup = false;
    this.isImages = false;
    this.isAudio = false;
    this.isDocument = false;
    this.isVideo = false;
    
    }

   getTheme(){
        return localStorage.getItem('themeColor');
    }

    clickSideMenu(id,val1,val2){
      localStorage.setItem('yearGallery','');
      localStorage.setItem('monthGallery','');
      localStorage.setItem('dayGallery','');
      this.statusID = status;
      this.navService.triggerGalleries(localStorage.getItem('langID'), id, null);
      // this.router.navigate(['gallery']);
      event.preventDefault();
    }

    clickY(val){
      this.valYear = val;
      console.log(val);
      localStorage.setItem('yearGallery',val);
      this.navService.triggerGalleries(localStorage.getItem('langID'), localStorage.getItem('idmenuleft'), null, val);
      event.preventDefault();
    }

    clickM(val){
      this.valMonth = val;
      console.log(val);
      localStorage.setItem('monthGallery',val);
      this.navService.triggerGalleries(localStorage.getItem('langID'), localStorage.getItem('idmenuleft'), null,  localStorage.getItem('yearGallery'), val);
      this.getDay = localStorage.getItem('dayGallery');
      event.preventDefault();
    }

    clickD(val){
      this.valDay = val;
      console.log(val);
      localStorage.setItem('dayGallery',val);
      this.navService.triggerGalleries(localStorage.getItem('langID'), localStorage.getItem('idmenuleft'), null,  localStorage.getItem('yearGallery'), localStorage.getItem('monthGallery'), val);
      this.getDay = localStorage.getItem('dayGallery');
      event.preventDefault();
    }

    changeMonth(val){
      if(val == '01'){
        if(this.langId == 1) val = "January";
        else val = "Januari";
      } else if (val == '02'){
        if(this.langId == 1) val = "February";
        else val = "Februari";
      } else if (val == '03'){
        if(this.langId == 1) val = "March";
        else val = "Mac";
      } else if (val == '04'){val = "April";
      } else if (val == '05'){
        if(this.langId == 1) val = "May";
        else val = "Mei";
      } else if (val == '06'){
        if(this.langId == 1) val = "June";
        else val = "Jun";
      } else if (val == '07'){
        if(this.langId == 1) val = "July";
        else val = "Julai";
      } else if (val == '08'){
        if(this.langId == 1) val = "August";
        else val = "Ogos";
      } else if (val == '09'){val = "September";
      } else if (val == '10'){
        if(this.langId == 1) val = "October";
        else val = "Oktober";
      } else if (val == '11'){ val = "November";
      } else if (val == '12'){
        if(this.langId == 1) val = "December";
        else val = "Disember";
      }

      return val;
    }

    backToDefault(){
      localStorage.setItem('yearGallery','');
      this.navService.triggerGalleries(localStorage.getItem('langID'), localStorage.getItem('idmenuleft'), null);
      // this.router.navigate(['gallery']);
      event.preventDefault();
    }
    backToYear(){
      localStorage.setItem('monthGallery','');
      this.navService.triggerGalleries(localStorage.getItem('langID'), localStorage.getItem('idmenuleft'), null, localStorage.getItem('yearGallery'));
      event.preventDefault();

    }
    backToMonth(){
      this.getDay = '';
      localStorage.setItem('dayGallery','');
      this.navService.triggerGalleries(localStorage.getItem('langID'), localStorage.getItem('idmenuleft'), null, localStorage.getItem('yearGallery'),localStorage.getItem('monthGallery'));
      event.preventDefault();
    }

    clickSideMenuByAgency(e, status){
      localStorage.setItem('yearGallery','');
      localStorage.setItem('monthGallery','');
      localStorage.setItem('dayGallery','');

      this.navService.getSubArticleUrlByAgency(localStorage.getItem('langID'));
      this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
      this.router.navigate(['/subcategory', 'agency']);
      event.preventDefault();
    }

    clickContentFromMenu(pId, aId, status){

      this.statusID = status;
      this.navService.triggerContent(aId, localStorage.getItem('langID'));
      this.navService.getContentUrl(aId, localStorage.getItem('langID'));
      this.router.navigate(['/content', aId]);
      event.preventDefault();
    }

    checkImgData(e){
        if(e){
          const chkData = e.search('<img');
          if (chkData != -1){
              return true;
          }else{
              return false;
          }
        }

    }

    changeTypeName(name) {

      let res;

      console.log(name)

      switch (name) {
        case 'images':
          res = 'imej'
          break;

        case 'documents':
          res = 'dokumen'
          break;

        case 'audios':
          res = 'audio'
          break;

        case 'videos':
          res = 'video'
          break;

        default:
          break;
      }
      return res;
    }

    openDialog(mPath, mType, mTitle?, mDesc?) {
      this.mediaSource = mPath;
      this.dialog.open(DialogDataExampleDialog, {
        data: {
          type: mType,
          path: mPath,
          title: mTitle,
          desc: mDesc
        }
      });
    }

    downloadFile(filePath) {
      window.open(filePath);
    }

    onScroll(event){
  
      //
      if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
        //
        //
  
        let keywordVal;
  
        this.getSearchData(keywordVal, this.langId, 1, this.searchAgencyResult.length+10)
        //
      }
    }

    getSearchData(keyword, langId?, count?, page?){
  
      console.log(keyword.length)
      if(keyword.length >= 3) {
        this.loading = true;

        this.navService.triggerGalleries(localStorage.getItem('langID'), 5, keyword);
        this.loading = false;
      } else if(keyword == '') {
        this.resetSearch();
        this.loading = false;
      }
    }

    resetSearch() {
      this.navService.triggerGalleries(localStorage.getItem('langID'), 5);
    }
  
    // getValue(aId,aName,mName, refCode){
  
    //   //
    //   this.agencySel = aName;
    //   this.isActiveList = false;
  
    //   this.getEventByAgency(aId);
  
    // }

}

@Component({
  selector: 'gallery-media-content',
  templateUrl: './gallery-media-content.html',
  styleUrls: ['./gallery.component.css']
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
