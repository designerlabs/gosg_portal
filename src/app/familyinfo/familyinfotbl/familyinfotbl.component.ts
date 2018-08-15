import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Inject, Renderer, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SharedService } from '../../common/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../../dialogs/dialogs.service';
import { ProtectedService } from '../../services/protected.service';
import { FormControl, FormGroup } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { PortalService } from '../../services/portal.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { TopnavService } from '../../header/topnav/topnav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'gosg-familyinfotbl',
  templateUrl: './familyinfotbl.component.html',
  styleUrls: ['./familyinfotbl.component.css']
})
export class FamilyinfotblComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;
  dataApp: any;
  dataAppPage: any;
  dataAgency: any;
  dataStatus: any;
  showHide: boolean = false;
  
  searchForm: FormGroup;
  appNumber: FormControl;
  agency: FormControl;
  appStatus: FormControl;
  
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  collapse:boolean = true;
  barClass: string = "container-fluid";
  param = "";
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
          this.getStatusApp(this.langID);
          this.getAgencyApp(this.langID);
          this.getDataAppList(this.pageCount, this.pageSize);

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

    this.appNumber = new FormControl(),
    this.agency = new FormControl(),
    this.appStatus = new FormControl(),
    this.searchForm = new FormGroup({
      appNumber : this.appNumber,
      agency :  this.agency,
      appStatus : this.appStatus
    })

    this.getStatusApp(this.langID);
    this.getAgencyApp(this.langID);
    this.getDataAppList(this.pageCount, this.pageSize);
  }


  pageChange(event){
    this.getDataAppList(this.pageCount, event.value);
    this.pageSize = event.value;
  }

  paginatorL(page){
    this.getDataAppList(page-1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages){
    this.noPrevData = page >= 1 ? false : true;
    let pageInc = page+1;
    this.noNextData = pageInc === totalPages;
    this.getDataAppList(page+1, this.pageSize);
  }

  toggleCollapse() {
    // this.show = !this.show
      if(this.collapse == true) {
        this.collapse = false;
        this.barClass = "slideInDown";
      } else if(this.collapse == false) {
        this.collapse = true;
        this.barClass = "slideOutUp";
      }
  }

  changeShowStatus(){

    this.showHide = !this.showHide;
    this.getAgencyApp(this.langID);
    this.getStatusApp(this.langID);
  }

  getAgencyApp(lang){
    this.loading = true;
    this.protectedService.getListAgency(lang).subscribe(data => {
      this.dataAgency = data.agencyList;
      this.loading = false;
    });
  }

  getStatusApp(lang){
    this.loading = true;
    this.protectedService.getListApp(lang).subscribe(data => {
      this.dataStatus = data.groupList;
      this.loading = false;
    });
  }

  getDataAppList(page, size){
    this.loading = true;
    this.protectedService.getDataApp(page, size, this.param).subscribe(
    data => {
      this.sharedService.errorHandling(data, (function(){
        this.dataApp = data.list;
        this.dataAppPage = data;
        this.noNextData = data.pageNumber === data.totalPages;
        this.showNoData = false;

        if(this.dataApp.length == 0){
          this.showNoData = true;
        }

      }).bind(this));
      this.loading = false;
    },
    error => {      
      this.loading = false;      
    });
  }

  resetSearch(){
    this.appNumber.reset();
    this.agency.reset();
    this.appStatus.reset();
    this.param = "";
  }

  resetMethod(event) {
    this.resetSearch();
    this.getDataAppList(this.pageCount,this.pageSize);
  }

  searchapp(formValues: any){

    let strVar = "";

    if(formValues.appNumber != null){
      strVar += '&submissionRefno='+formValues.appNumber;
    }

    if(formValues.agency != null){
      strVar += '&agencyRefCode='+formValues.agency;
    }

    if(formValues.appStatus != null){
      strVar += '&status='+formValues.appStatus;
    }
    this.param = strVar;
    this.getDataAppList(this.pageCount,this.pageSize);

  }

  print(){

  }

  view(){

  }

  add() {
    this.router.navigate(['familyinfo/add']);
    //this.commonservice.pageModeChange(false);
  }

}
