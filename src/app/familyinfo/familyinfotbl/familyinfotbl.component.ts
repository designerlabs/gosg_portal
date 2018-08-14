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
  startData: FormControl;
  endData: FormControl;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  collapse:boolean = true;
  barClass: string = "container-fluid";
  param = "";
  startDate:any;
  dateSubmission = [];
  statusDesc = [];
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
    this.startData = new FormControl(),
    this.endData = new FormControl(),
    this.searchForm = new FormGroup({
      appNumber : this.appNumber,
      agency :  this.agency,
      appStatus : this.appStatus,
      startData : this.startData,
      endData : this.endData
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
      this.dataApp = data.list;
      this.dataAppPage = data;
      this.noNextData = data.pageNumber === data.totalPages;
      this.dateSubmission = [];
      this.statusDesc = [];
      this.showNoData = false;

      if(this.dataApp.length == 0){
        this.showNoData = true;
      }

      for(let i=0; i<this.dataApp.length; i++){

        let dateS = moment(new Date(this.dataApp[i].submissionDatetime)).format('DD-MM-YYYY hh:ss');
        this.dateSubmission.push(dateS);

        let stat: any;
        this.dataStatus.forEach(element => {
          if(this.dataApp[i].status == element.statusCode){
            stat = element.statusDescription;
            this.statusDesc.push(stat);
          }

        });
      }

      this.loading = false;
    });
  }

  viewData(agency, id){

    let test = "papar-89";
    if(agency == "PAP-07-09-00"){ //perhilitan
      let statusId =  id.split('-')[1];
      let statusText =  id.split('-')[0];
      
      if(statusText == "Apply"){
        
        this.router.navigate(['perhilitan/'+statusId]);
      }

      else{
        this.router.navigate(['perhilitan_renew/'+statusId]);
      }
    }
  }

  resetSearch(){
    this.appNumber.reset();
    this.agency.reset();
    this.appStatus.reset();
    this.endData = null;
    this.startData = null;
    this.searchForm.get('endData').setValue(null);
    this.searchForm.get('startData').setValue(null);
    this.param = "";
  }

  resetMethod(event) {
    this.resetSearch();
    this.getDataAppList(this.pageCount,this.pageSize);
  }

  searchapp(formValues: any){

    let sDate = new Date(formValues.startData);
    let eDate = new Date(formValues.endData);

    let startD = moment(sDate).format('YYYY-MM-DD');
    let endD = moment(eDate).format('YYYY-MM-DD');
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

    if(formValues.startData != null){
      strVar += '&start='+startD;
    }

    if(formValues.endData != null){
      strVar += '&end='+endD;
    }

    this.param = strVar;
    this.getDataAppList(this.pageCount,this.pageSize);

  }

  add() {
    this.router.navigate(['familyinfo/add']);
    //this.commonservice.pageModeChange(false);
  }

}
