import { Component, OnInit, Inject, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { ProtectedService } from '../services/protected.service';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'gosg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  uid: any;
  lang = this.lang;
  langID: any;
  dashboardData: any;

  totalApp: any;
  inProgress: any;
  approved: any;
  rejected: any;
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private activatedRoute:ActivatedRoute,
    @Inject(APP_CONFIG) private config: AppConfig,
    private router: Router,
    private http: Http, 
    private translate: TranslateService, 
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private topnavservice: TopnavService,
  ) { 

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
          //this.getSlide(this.languageId);
          //this.subscription = this.getSlide(this.languageId);
        }

    });

  }   
  
  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    //this.subscription.unsubscribe();
  }
  
  ngOnInit() {

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    this.getNoApp(this.langID);
  }

  getListApp(){
    this.router.navigate(['/appsmgmt']);
    event.preventDefault();
  }

  getTheme() {
    return localStorage.getItem('themeColor');
  }

  getNoApp(lang){
   
    this.protectedService.getDashboardData(lang).subscribe(
      data => {
        this.dashboardData = data;
        console.log(this.dashboardData);
        this.totalApp = this.dashboardData.total;
        this.inProgress = this.dashboardData.pending;
        this.approved = this.dashboardData.success;
        this.rejected = this.dashboardData.failed;
      },
      error => {
        this.toastr.error(this.translate.instant('Sorry'), '');            
    });    
  }
  
}
  