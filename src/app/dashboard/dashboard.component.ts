import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'gosg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uid: any;
  lang = this.lang;
  langID = 1;
  dashboardData= [];

  constructor(
    private activatedRoute:ActivatedRoute,
    @Inject(APP_CONFIG) private config: AppConfig,
    private router: Router,
    private http: Http, 
    private translate: TranslateService, 
  ) { 

    this.lang = translate.currentLang;

    translate.onLangChange.subscribe((event: LangChangeEvent) => {

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

    });

  }   
  
  private urlDashboardData: string = this.config.urlDashboardData;
  ngOnInit() {
  }

  getListApp(){
    this.router.navigate(['/appsmgmt']);
    event.preventDefault();
  }

  getNoApp(){
    return this.http.get(this.urlDashboardData)
    
    .map((response: Response) => response.json())
    .subscribe(resSliderData => {
      this.dashboardData = resSliderData       
      console.log(this.dashboardData);

    });
  }
  
}
  