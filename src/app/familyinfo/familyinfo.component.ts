import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Inject, Renderer, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SharedService } from '../common/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { ProtectedService } from '../services/protected.service';
import { FormControl, FormGroup } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { PortalService } from '../services/portal.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { TopnavService } from '../header/topnav/topnav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'gosg-familyinfo',
  templateUrl: './familyinfo.component.html',
  styleUrls: ['./familyinfo.component.css']
})
export class FamilyinfoComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;

  searchForm: FormGroup;
  warganegara: FormControl;
  icno: FormControl;
  passportState: FormControl;
  name: FormControl;
  relation: FormControl;
  dob: FormControl;
  sex: FormControl;
  email: FormControl;
  race: FormControl;
  religion: FormControl;
  phone: FormControl;
  profileStatus: FormControl;
  reasonStatus: FormControl;
  addInfo: FormControl;
  
  showNoData = false;
  loading = false;

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private portalService:PortalService,
    private translate:TranslateService,
    private http: Http,
    private router: Router,
    private _renderer: Renderer,
    private topnavservice: TopnavService,
    @Inject(APP_CONFIG) private config: AppConfig) {

      this.lang = translate.currentLang;

      this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

          const myLang = translate.currentLang;

          if (myLang == 'en') {
              translate.get('HOME').subscribe((res: any) => {
                  this.lang = 'en';
                  this.langID = 1;
              });
          }

          if (myLang == 'ms') {
              translate.get('HOME').subscribe((res: any) => {
                  this.lang = 'ms';
                  this.langID = 2;
              });
          }
          if(this.topnavservice.flagLang){
          }        
      });
    }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    this.warganegara = new FormControl();
    this.icno = new FormControl();
    this.passportState = new FormControl();
    this.name = new FormControl();
    this.relation = new FormControl();
    this.dob = new FormControl();
    this.sex = new FormControl();
    this.email = new FormControl();
    this.race = new FormControl();
    this.religion = new FormControl();
    this.phone = new FormControl();
    this.profileStatus = new FormControl();
    this.reasonStatus = new FormControl();
    this.addInfo = new FormControl();

    this.searchForm = new FormGroup({

      warganegara: this.warganegara,
      icno: this.icno,
      passportState: this.passportState,
      name: this.name,
      relation: this.relation,
      dob: this.dob,
      sex: this.sex,
      email: this.email,
      race: this.race,
      religion: this.religion,
      phone: this.phone,
      profileStatus: this.profileStatus,
      reasonStatus: this.reasonStatus,
      addInfo: this.addInfo
    });

    this.searchForm.get('warganegara').setValue(1);
    
  }
    
}
