import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Inject, Renderer } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SharedService } from '../common/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { ProtectedService } from '../services/protected.service';
import { FormControl, FormGroup } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { PortalService } from '../services/portal.service';
import { Http } from '@angular/http';
import * as moment from 'moment';

@Component({
  selector: 'gosg-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css'],
})
export class AppManagementComponent implements OnInit {

  lang = this.lang;
  langID = 1;
  dataApp: any;
  dataAgency: any;
  dataStatus: any;
  showHide: boolean = false;
  mailData: any;
  mailContent: any;
  searchForm: FormGroup;
  appNumber: FormControl;
  agency: FormControl;
  appStatus: FormControl;
  startData: FormControl;
  endData: FormControl;
  mailboxId=[];
  mailPageSize = 10;
  mailPageCount = 1;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  isMailContainerShow = 'block';
  collapse:boolean = true;
  barClass: string = "container-fluid";
  param = "";

  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private portalService:PortalService,
    private translate:TranslateService, 
    private http: Http, 
    private _renderer: Renderer,
    @Inject(APP_CONFIG) private config: AppConfig) {
      
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

  ngOnInit() {
    
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

    this.getStatusApp();
    this.getAgencyApp(this.langID);
    this.getDataAppList(this.langID, this.pageSize, this.pageCount);
    this.getMails(this.mailPageCount, this.mailPageSize);
  }

  getMails(page, size){
    this.protectedService.getMails(page, size).
    subscribe(data => {
      this.mailData  = data;
    },
    Error => {

     this.toastr.error(this.translate.instant('mailbox.err.failtoload'), '');            
   });
  }

  pageChange(event){
    // this.getMails(this.mailPageCount, event.value);
    this.mailPageSize = event.value;
  }

  paginatorL(page){
    // this.getMails(page-1, this.mailPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages){
    this.noPrevData = page >= 1 ? false : true;
    let pageInc = page+1;
    this.noNextData = pageInc === totalPages;
    // this.getMails(page+1, this.mailPageSize);
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
    console.log(this.showHide);
    this.showHide = !this.showHide;
    this.getAgencyApp(this.langID);
    this.getStatusApp();
  }

  getAgencyApp(lang){
    this.protectedService.getListAgency(lang).subscribe(data => {
      this.dataAgency = data.list;
      console.log(this.dataAgency);
    });
  }

  getStatusApp(){
    this.protectedService.getListApp().subscribe(data => {
      this.dataStatus = data.list;
      console.log(this.dataStatus);
    });
  }

  getDataAppList(lang, size, count){
    this.protectedService.getDataApp(lang, this.param, size, count).subscribe(data => {
      this.dataApp = data.list;
      console.log(this.dataApp);
    });
  }

  resetSearch(){
    this.appNumber.reset();
    this.agency.reset();
    this.appStatus.reset();
    this.endData = null;
    this.startData = null;
    this.searchForm.get('endData').setValue("");
    this.searchForm.get('startData').setValue("");
  }

  resetMethod(event) {
    this.resetSearch();
  }

  searchapp(formValues: any){

    let sDate = new Date(formValues.startData);
    let eDate = new Date(formValues.endData);  

    let startD = moment(sDate).format('YYYY-MM-DD');
    let endD = moment(eDate).format('YYYY-MM-DD');   
    let strVar = "";
    
    console.log("epochS : "+startD+" epochE: "+endD);

    if(formValues.appNumber != null){
      strVar += '&appNo='+formValues.appNumber;
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

    // let body = {
    //   "no_app": null,
    //   "agensi": null,
    //   "status": null,
    //   "startD": null,
    //   "endD": null
    // }

    // body.no_app = formValues.appNumber;
    // body.agensi = formValues.agency;
    // body.status = formValues.appStatus;
    // body.startD = epochS;
    // body.endD = epochE;
    
    // let datasend = JSON.stringify(body);

  }
}
