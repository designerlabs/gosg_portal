import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../../header/topnav/topnav.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { environment } from '../../../environments/environment';
import { ValidateService } from '../../common/validate.service';
import { SharedService } from '../../common/shared.service';
import { ProtectedService } from '../../services/protected.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'gosg-policereport',
  templateUrl: './policereport.component.html',
  styleUrls: ['./policereport.component.css']
})
export class PolicereportComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;
  complete: boolean;

  public noRptPol: any;
  public dateRptPol: any;
  public statusRpt: any;
  public noKertasSiasat: any;
  public seksyenSiasat: any;
  public statusSiasat: any;
  public pegawaiSiasat: any;
  public letter = []; 
  public listYear = [];
  public showDetails: any;
  public maskReportNo: any;
  pemDate1: any;
  pemDate2: any;
  pemDate3: any; 
  dsvcCode:any;
  agcCode:any;
  reportDetails: any;

  searchForm: FormGroup;  
  public ic: FormControl;  
  public noreport: FormControl;
  public yearreport: FormControl

  private subscriptionLang: ISubscription;
  loading: boolean = false;
  dataAnnouncement: any;
  annouceConvert: any;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private topnavservice: TopnavService,
    private sharedService: SharedService,
    private validateService:ValidateService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private protectedService: ProtectedService
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
          //this.subscription = this.getFaq(this.langID);
        }

        this.getAnnoucement();

    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  ngOnInit() {

    // AGENCY & DSERVICE CODE FOR VALIDATION
    let sub = this.route.queryParams.subscribe((params: Params) => {
      this.dsvcCode = parseInt(params.service);
      this.agcCode = parseInt(params.agency);
    });

    this.triggerDserviceValidation(this.dsvcCode);

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    this.maskReportNo = this.validateService.getMask().policeReportNo;
    this.ic = new FormControl();
    this.noreport = new FormControl();
    this.yearreport = new FormControl();

    this.searchForm = new FormGroup({   

      ic: this.ic,
      noreport: this.noreport,
      yearreport: this.yearreport      
    });

    this.getAnnoucement();
    this.getYear();
    this.getUserData();
  }

  getYear(){
    let y = new Date();
    let ny = y.getFullYear().toString();
    let year = ny.substr(-2);

    this.listYear = [];

    for (let i = 11; i < parseInt(year)+1; i++) { 
      this.listYear.push(i);
    }
  }

  searchApp(formValues: any){

    let reportNo = formValues.noreport;
    let y = formValues.yearreport;
    let rn = reportNo + "/" + y;
    let arrObj = [];

    arrObj.push(rn);
    arrObj.push(this.agcCode);
    arrObj.push(this.dsvcCode);

    this.loading = true;

    if (!environment.staging) {

      this.protectedService.getPdrm('pdrm/checkPoliceReport',arrObj).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          let dataReport = data.reportDetails;

          if(dataReport.ipNo != null) {
            this.showDetails = true;

            this.noRptPol = dataReport.reportNo;
            this.dateRptPol = dataReport.reportDateTime;
            this.statusRpt =  dataReport.reportStatus;

            this.noKertasSiasat = dataReport.ipNo;
            this.seksyenSiasat = dataReport.lawSection;
            this.statusSiasat = dataReport.caseStatus;
            this.pegawaiSiasat = dataReport.investigationOfficer;
            this.letter = [dataReport.pem1Url,dataReport.pem2Url,dataReport.pem3Url]; 
            this.pemDate1 = dataReport.pem1Date;
            this.pemDate2 = dataReport.pem2Date;
            this.pemDate3 = dataReport.pem3Date;
            
          }

          else {
            this.showDetails = false;
          }
      
        }).bind(this));
        this.loading = false;
        
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });

    } else {

      this.reportDetails = {
        "status": "1",
        "statusMessage": "Success",
        "caseStatus": "Dituduh",
        "investigationOfficer": "C/INSP NURUL HAFIDZ BIN MOHD DERUS",
        "ipNo": "DW/JSJ/KS/01114/11",
        "lawSection": "29 (1) AKTA KESALAHAN KECIL 1955,25 (1) (n) PERATURAN-PERATURAN PENDAFTARAN NEGARA 1990",
        "pem1Date": "2011-02-18",
        "pem1Url": "https://sso.rmp.gov.my/RP_FORM_E/RP_FORM_PEM1.aspx?id=OcK4bk+nQwqmQ1seQ3+twg1k2lfPB7Z9Ucc3YhV2kPBk8kZXgsjuWA==",
        "pem2Date": "2011-01-02",
        "pem2Url": "https://sso.rmp.gov.my/RP_FORM_E/RP_FORM_PEM2.aspx?id=OcK4bk+nQwqmQ1seQ3+twg1k2lfPB7Z9Ucc3YhV2kPBk8kZXgsjuWA==",
        "pem3Date": "2011-02-23",
        "pem3Url": "https://sso.rmp.gov.my/RP_FORM_E/RP_FORM_PEM3.aspx?id=OcK4bk+nQwqmQ1seQ3+twg1k2lfPB7Z9Ucc3YhV2kPBk8kZXgsjuWA==",
        "pem4Date": null,
        "pem4Url": "",
        "reportDateTime": "2011-02-18 17:44:40",
        "reportNo": "THSL/006026/11",
        "reportStatus": "Buka Kertas Siasatan Baru"
      }

            this.showDetails = true;
    
            let dataReport = this.reportDetails;

            this.noRptPol = dataReport.reportNo;
            this.dateRptPol = dataReport.reportDateTime;
            this.statusRpt =  dataReport.reportStatus;
            this.noKertasSiasat = dataReport.ipNo;
            this.seksyenSiasat = dataReport.lawSection;
            this.statusSiasat = dataReport.caseStatus;
            this.pegawaiSiasat = dataReport.investigationOfficer;
            this.letter     = [dataReport.pem1Url,  dataReport.pem2Url,   dataReport.pem3Url]; 
            this.pemDate1 = dataReport.pem1Date;
            this.pemDate2 = dataReport.pem2Date;
            this.pemDate3 = dataReport.pem3Date;           
            this.loading = false;
    }
    
  }

  getAnnoucement(){

    if(!environment.staging){
      this.loading = true;
      this.protectedService.postProtected('','pdrm/getAnnoucement?type=2'+'&agency='+this.agcCode+'&service='+this.dsvcCode+'&language='+this.langID).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          this.dataAnnouncement = data.announcementResource.content;
          // console.log(this.dataAnnouncement);
      
        }).bind(this));
        this.loading = false;
        
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      });
    } else {
      this.dataAnnouncement = '<table> <tr> <td align="left"> <b>Perhatian: <br /> <i>Semua jenis Repot Polis bertarikh dari 1 Ogos 2011 hingga kini (kecuali Repot Kemalangan Jalan Raya) yang dibuat di kawasan Kontinjen Kuala Lumpur dan Selangor boleh disemak buat masa ini. </i></b> </td> </tr> </table>';
    } 
  }

  openLink(varUrl){
    if(varUrl != undefined){
      let httpStr = varUrl.substring(0, 4);

      if(httpStr.toLowerCase() == 'http'){
        window.open(varUrl,'_blank');
      }

      else{
        let newUrl = "http://";
        window.open(newUrl+varUrl,'_blank');
      }

    }
  }

  triggerDserviceValidation(dsvcCode) {
    let sub;
    this.loading = true;

    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.protectedService.validateDserviceByRefCode(dsvcCode))
      .subscribe(resValidation => {
        
        if(!resValidation.valid) {
          this.toastr.error('Invalid Service!', '');
          this.router.navigate(['404']);
          
          // sub = Observable.interval(2000)
          // .subscribe((val) => {
          //   window.close();
          //   sub.unsubscribe();
          // });
        } else {
          localStorage.setItem('dserviceCode', dsvcCode);
          this.loading = false;
        }
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
  
      });
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  checkReqValues() {

    let reqVal:any = ["ic", "noreport", "yearreport"];
    let nullPointers:any = [];

    for (var reqData of reqVal) {
      let elem = this.searchForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }
      
    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

    this.getYear();
  }

  resetSearch(){
    //this.appNumber.reset();
    //this.searchForm.get('ic').setValue(null);
    this.complete = false;
    this.searchForm.get('noreport').setValue(null);
    this.searchForm.get('yearreport').setValue(null);
    this.showDetails = undefined;
  }

  resetMethod(event) {
    this.resetSearch();
  }

  getUserData(){
    
    this.searchForm.get('ic').disable();

    this.loading = true;
    if(!environment.staging){
      //this.getPerPostCodeFlag = false;
      this.protectedService.getUser().subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          if(data.user){
            
            this.searchForm.get('ic').setValue(data.user.identificationNo);

          }else{
          }
        }).bind(this));
        this.loading = false;
        
      },
      error => {
        location.href = this.config.urlUAP +'uapsso/Logout';
        this.loading = false;
        //location.href = this.config.urlUAP+'portal/index';
      });
    }
    
    else{ //need to be deleted Noraini for local only      
      this.loading = false;
      
      let data = {
        "user": {
          "userId": 116,
          "pid": "690521106312",
          "identificationNo": "690521106312",
          "passportNo": "",
          "fullName": "ZAKARIA BIN MOHD NOR",
          "email": "zakariatestgosg@yopmail.com"
         
        }
      }

    
      this.searchForm.get('ic').setValue(data.user.identificationNo);

    }
  }

}
