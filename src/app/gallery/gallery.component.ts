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
    private sharedService: SharedService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private topnavservice: TopnavService,
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

    clickSideMenu(id){

      this.statusID = status;
      this.navService.triggerGalleries(localStorage.getItem('langID'), id);
      // this.router.navigate(['gallery']);
      event.preventDefault();
    }

    clickSideMenuByAgency(e, status){
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

}

@Component({
  selector: 'gallery-media-content',
  templateUrl: './gallery-media-content.html',
  styleUrls: ['./gallery.component.css']
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
