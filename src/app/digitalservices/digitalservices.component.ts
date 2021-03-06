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
import { MatDialog, MatDialogRef } from '@angular/material';

// export interface DialogData {
//   type;
//   title;
//   path;
// }

@Component({
  selector: 'gosg-digitalservices',
  templateUrl: './digitalservices.component.html',
  styleUrls: ['./digitalservices.component.css']
})
export class DigitalservicesComponent implements OnInit, OnDestroy {

  dsData: any = [];
  languageId = this.languageId;
  mediaUrl: any;
  isLogin: boolean;
  @Input() state:string;
  @Input() validMyIdentity: any;

  lang = this.lang;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;
  loading: boolean;

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private topnavservice: TopnavService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig,
    public dialog: MatDialog) {

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

    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      this.loading = false;

    });
  }

  getUserData(){
    this.isLogin = false;
  }

  openDialog() {
    this.dialog.open(DigitalServiceDialog, {
    });
  }

  toTrack(dserviceCode, dUrl, agcCode, common?) {
    window.open(dUrl+'?service='+dserviceCode+'&agency='+agcCode, '_blank');
    this.portalservice.sendTrackingCount(dserviceCode,agcCode).subscribe(
      data =>{
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      // this.loading = false;

    });
  }
}

@Component({
  selector: 'digital-service-popup',
  templateUrl: './digital-service-popup.html',
})


export class DigitalServiceDialog {

  constructor(
    public dialogRef: MatDialogRef<DigitalServiceDialog>,
    private translate: TranslateService,
    private router: Router) {}

    onNoClick() {
      this.dialogRef.close();
    }

    goToRegister() {
      this.router.navigate(['/register']);
      this.dialogRef.close();
    }

    goToLogin() {
      // this.router.navigate(['./portal-protected/']);
      window.location.href = "../portal-protected/";
      this.dialogRef.close();
    }

}
