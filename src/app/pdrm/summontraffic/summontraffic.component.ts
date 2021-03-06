import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../../header/topnav/topnav.service';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone'
// import { CommonService } from './../service/common.service';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatPaginator, MatSort
} from '@angular/material';

import { ProtectedService } from '../../services/protected.service';
import { SharedService } from '../../common/shared.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'gosg-summontraffic',
  templateUrl: './summontraffic.component.html',
  styleUrls: ['./summontraffic.component.css']
})
export class SummontrafficComponent implements OnInit {

  recordList = null; // pagination
  updateForm: FormGroup; // pagination

  lang = this.lang;
  langID: any;
  indicator: any;
  dataStatus: any;
  complete: boolean;
  param = "";
  dataApp: any;
  dataAppPage: any;
  totSumAmnt:any ;
  pageSize = 5;
  pageNumber = 1;
  summonTraffic: any;
  sumOfSaman: number;
  have:any ;
  dontHave: any;
  tableTitle: any;
  pdrmErrSummon: any;
  pdrmtittlesummonno: any;
  noPrevData = true;
  noNextData = false;
  showNoData = false;
  showFile : boolean;
  dataSummons: any;
  loading = false;
  dateSubmission = [];
  statusDesc = [];
  carianPlaceholder: any;

  public summon: any;
  public ammount: any;
  public showDetails = false;
  public varSelect: any;
  dsvcCode:any;
  agcCode:any;
  dataAnnouncement: any;

  searchForm: FormGroup;
  public optSelect: FormControl;
  public ic: FormControl;
  public noCar: FormControl;

  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  private urlFaq: string = this.config.urlFaq;
  validationRes: string[];

  constructor(
    private protectedService: ProtectedService,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private topnavservice: TopnavService, ) {

    this.lang = translate.currentLang;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {

        this.summonTraffic = 'Traffic Summons';
        this.indicator = 'Indicator';
        this.carianPlaceholder = "Search";
        // this.carianPlaceholder = "";
        this.have = "Havee";
        this.dontHave = "Dont Havee";
        this.totSumAmnt = 'TOTAL AMOUNT (RM)';
        this.tableTitle = 'PDRM TRAFFIC SUMMONS STATUS';
        this.pdrmErrSummon = 'NO SUMMONS TRAFFIC';
        this.pdrmtittlesummonno = 'Summons No.';

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.langID = 1;
        });
      }

      if (myLang == 'ms') {

        this.summonTraffic = 'Saman Trafik';
        this.indicator = 'Petunjuk';
        this.carianPlaceholder = "Cari";
        // this.carianPlaceholder = "";
        this.have = "Adaa";
        this.dontHave = "Tiadaa";
        this.totSumAmnt = 'JUMLAH AMAUN (RM)';
        this.tableTitle = 'STATUS SAMAN TRAFIK PDRM';
        this.pdrmErrSummon = 'TIADA SAMAN TRAFIK';
        this.pdrmtittlesummonno = 'No. Saman';

        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.langID = 2;
        });
      }

      if (this.topnavservice.flagLang) {
        //this.subscription = this.getFaq(this.langID);
      }

      this.getStatusApp(this.langID); // farid testt
      this.getAnnoucement();

    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    // this.subscription.unsubscribe();
  }

  ngOnInit() {

    // AGENCY & DSERVICE CODE FOR VALIDATION
    let sub = this.route.queryParams.subscribe((params: Params) => {
      this.dsvcCode = parseInt(params.service);
      this.agcCode = parseInt(params.agency);
    });

    this.triggerDserviceValidation(this.dsvcCode);

    if (!this.langID) {
      this.langID = localStorage.getItem('langID');
    } else {
      this.langID = 1;
    }

    this.optSelect = new FormControl();
    this.ic = new FormControl();
    this.noCar = new FormControl();

    this.searchForm = new FormGroup({

      optSelect: this.optSelect,
      ic: this.ic,
      noCar: this.noCar
    });

    this.searchForm.get('optSelect').setValue(0);
    this.varSelect = 0;

    this.getStatusApp(this.langID);

    this.getUserData();
    this.checkReqValues();

    this.showNoData = false;

    this.getAnnoucement();

  }

  getAnnoucement(){

    if(!environment.staging){
      this.loading = true;
      this.protectedService.postProtected('','pdrm/getAnnoucement?type=1'+'&agency='+this.agcCode+'&service='+this.dsvcCode+'&language='+this.langID).subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          this.dataAnnouncement = data.announcementResource.content;
          console.log(this.dataAnnouncement);
      
        }).bind(this));
        this.loading = false;
        
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
      }); 
    } else {
      this.dataAnnouncement = 'Kadar kompaun saman berdasarkan prinsip <i>“The More You Delay, The More You Pay”</i>. Sila buat bayaran saman secepat mungkin. Lesen memandu & lesen kenderaan motor tidak boleh diperbaharui setelah no kad pengenalan disenarai hitamkan dalam sistem mySIKAP, jabatan pengangkutan jalan.';
    }
  }

  gridFormat() {
    let loop = this.dataSummons.summonDetails;
    this.sumOfSaman = 0;
    // 2018-03-22 09:28 // template formatt

    for (var i=0; i<loop.length; i++) {

      //sebelum tukar format di backend
      // this.sumOfSaman += parseInt(loop[i].summons_amt.substr(0, loop[i].summons_amt.length - 2));
      // loop[i].summons_amt = parseInt(loop[i].summons_amt.substr(0, loop[i].summons_amt.length - 2));

      //sebelum tukar format
      // let yy = loop[i].offence_date.substr(0,4) // 2018
      // let mm = loop[i].offence_date.substr(4,2) // 03
      // let dd = loop[i].offence_date.substr(6,2) // 22
      // let date = yy +'-'+ mm +'-'+ dd;
      // loop[i].offence_date = date;

        //selepas tukar format di backend
        this.sumOfSaman += parseInt(loop[i].summons_amt );
        // loop[i].offence_date = loop[i].offence_date.substr(0,9); 


      let hh = loop[i].offence_time.substr(0,2) // 09
      let ss = loop[i].offence_time.substr(2,2) // 38
      let time = hh + ':' + ss;
      loop[i].offence_time = time;
 
        if (loop[i].imageUrl.charAt(0) == 'h') {
          loop[i].imageUrl = loop[i].imageUrl;
        } else {
          loop[i].imageUrl = '-';
        }


    }
 
    // FARID TRY ENDS TEST
  }

  //this is button carian/search.
  searchApp(formValues: any, paramPageNumber, paramPageSize) {

    this.showDetails = false;

    let type = this.optSelect.value;
    let icno = this.searchForm.get('ic').value;
    let plateNo = this.searchForm.get('noCar').value;
    let arrObj = [];
    let page;
    let size;

    (plateNo == null) ? plateNo : plateNo = plateNo.toUpperCase() ;
    (paramPageNumber) ? page = paramPageNumber :  page = this.pageNumber;
    (paramPageSize)   ? size = paramPageSize   :  size = this.pageSize;
 
    arrObj.push(this.langID);
    arrObj.push(this.agcCode);
    arrObj.push(this.dsvcCode);
    arrObj.push(type);
    arrObj.push(icno);
  // if (type == 1) { // farid testt
    arrObj.push(plateNo);
  // } // farid testt
    arrObj.push(page); // farid testt
    arrObj.push(size); // farid testt

    console.log('browser arrObj: ',arrObj);
    console.log('browser page: ',page);
    console.log('browser size: ',size); 
    

    // this.loading = true;

    if (!environment.staging) {

      this.protectedService.getPdrm('pdrm/summon-traffic', arrObj).subscribe(
        data => {
          this.sharedService.errorHandling(data, (function () {

            console.log('data after service in browser: ', data);

            this.dataSummons = data.summonResource;

            // off kejap 
            // if (this.dataSummons.summonDetails.length == 0) { //original
            //   this.showNoData = true; //original 
            // } //original 

            /////////////////////
            //farid tesst starts // nanti kena buang ni. currntly api error

            this.showDetails = true;

            // sekiranya nombor kereta yang dicari tidak ada pada ic dia sendiri...
            if(this.dataSummons.summonDetails == null && this.dataSummons.total_summons == 0) {
              this.showNoData = true;     
            }

            if (this.dataSummons.summonDetails != null) {
              if (this.dataSummons.summonDetails.length == 0) {
                this.showNoData = true;
              }
            }

            if (this.dataSummons.numberOfElements == this.dataSummons.totalElements) {
              this.noPrevData = true;
              this.noNextData = true;
            } else {
              // this.noPrevData = false;
              // this.noNextData = false;
            }

            if (this.pageNumber == 1) {
              this.noPrevData = true;
            } else {
              // this.noPrevData = false;
            }

            if (this.dataSummons.totalPages == this.dataSummons.pageNumber) {
              this.noNextData = true;
            }

             // sekiranya ic yg dicari bukan berdasarkan kereta sendiri
            if (this.dataSummons.totalElements == 0) {
              this.showNoData = true;
            }

            // this.dataSummons.summonDetails[0].op   // template jer

            //farid tesst ends // nanti kena buang ni. currntly api error
            /////////////////////

            //original
            // if (this.dataSummons.summonDetails.length > 0) {

            // try test // sekiranya ada data 
            if (this.dataSummons.summonDetails != null && this.dataSummons.summonDetails.length > 0) {
              this.showNoData = false;
            } else { 
              // this.showNoData = true;
            }

            this.gridFormat();

          }).bind(this));
          this.loading = false;
          
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        });

    } else {
      this.showDetails = true;
      this.showNoData = false;
      this.loading = false;

      if (type == 0) {

        this.dataSummons = {

          "summonDetails": [
            {
              "op":"N",
              "sh":"Y",
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20060330",
              "imageUrl":"",
              // "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=FbhH6gFYja7sd0o9alLg/wgQHDc9AamOnJH1sj9lRvtlLYaR6HZcga8opFj4uXa03uxWb9Uz+uDB04XaFJhehA==",
              "summons_id_key": "1810000200002AB895306",
              "summons_number":"AB895306",
              "vehicle_registration_number": "ADM310",
              "offence_date": "20060329",
              "offence_desc":"Merbahayakan pemandu lain",
              "offence_time": "0815",
              "law_code": "APJ1987",
              "section_code": "026(1)",
              "offence_ori_amt": "30000",
              "offence_amt": "30000",
              "law_code2": "APJ1987",
              "section_code2": "090",
              "offence_ori_amt2": "30000",
              "offence_amt2": "30000",
              "law_code3": " ",
              "section_code3": " ",
              "offence_ori_amt3": "000",
              "offence_amt3": "000",
              "offence_location": "JLN SUBANG",
              "summons_ori_amt": "60000",
              "summons_amt": "600.00",
              "warrant_issue_date": "YNY",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "op":"Y",
              "sh":"N",
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20131003",
              // "imageUrl":"",
              "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=FbhH6gFYja7sd0o9alLg/wgQHDc9AamOnJH1sj9lRvtlLYaR6HZcga8opFj4uXa03uxWb9Uz+uDB04XaFJhehA==",
              "summons_id_key": "1812000200002AK469286",
              "summons_number":"AB895302",
              "vehicle_registration_number": "WPW7663",
              "offence_date": "20131001",
              "offence_desc":"Laju",
              "offence_time": "2125",
              "law_code": "APJ1987",
              "section_code": "020(1)",
              "offence_ori_amt": "30000",
              "offence_amt": "30000",
              "law_code2": " ",
              "section_code2": " ",
              "offence_ori_amt2": "000",
              "offence_amt2": "000",
              "law_code3": " ",
              "section_code3": " ",
              "offence_ori_amt3": "000",
              "offence_amt3": "000",
              "offence_location": "PERSIARAN KEWAJIPAN",
              "summons_ori_amt": "30000",
              "summons_amt": "300.00",
              "warrant_issue_date": "YNY",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "op":"N",
              "sh":"Y",
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20161003",
              // "imageUrl":"",
              "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=syTsQ+lvVo6ZOuuiZI66B9AZIsj+fmWcbvqOw7Caazsma31EKEh5DRXaXN598Hvsb78mtE5yfxW+lNI/4R0ljQ==",
              "summons_id_key": "181200010000116006C7733",
              "summons_number":"AB895399",
              "vehicle_registration_number": "WRH465",
              "offence_date": "20161002",
              "offence_desc":"Laju Sangat",
              "offence_time": "1448",
              "law_code": "APJ1987",
              "section_code": "079(2)M",
              "offence_ori_amt": "15000",
              "offence_amt": "15000",
              "law_code2": " ",
              "section_code2": " ",
              "offence_ori_amt2": "000",
              "offence_amt2": "000",
              "law_code3": " ",
              "section_code3": " ",
              "offence_ori_amt3": "000",
              "offence_amt3": "000",
              "offence_location": "KM 5.5 L/RAYA ELITE",
              "summons_ori_amt": "15000",
              "summons_amt": "150.00",
              "warrant_issue_date": "NNNP",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "op":"N",
              "sh":"Y",
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20160912",
              "imageUrl":"",
              // "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=syTsQ+lvVo6ZOuuiZI66B9AZIsj+fmWcbvqOw7Caazsma31EKEh5DRXaXN598HvsrjgEo6+6cB4FGrTOUsE/ng==",
              "summons_id_key": "18120001000011621016691",
              "summons_number":"AB895308",
              "vehicle_registration_number": "WRH465",
              "offence_date": "2016-09-11",
              "offence_desc":"Laju",
              "offence_time": "1211",
              "law_code": "APJ1987",
              "section_code": "079(2)M",
              "offence_ori_amt": "15000",
              "offence_amt": "30000",
              "law_code2": " ",
              "section_code2": " ",
              "offence_ori_amt2": "000",
              "offence_amt2": "000",
              "law_code3": " ",
              "section_code3": " ",
              "offence_ori_amt3": "000",
              "offence_amt3": "000",
              "offence_location": "KM 38.7 L/RAYA KESAS",
              "summons_ori_amt": "15000",
              "summons_amt": "300.00",
              "warrant_issue_date": "NNNP",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "op":"N",
              "sh":"Y",
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20180322",
              "imageUrl":"",
              // "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=syTsQ+lvVo6ZOuuiZI66B9AZIsj+fmWcbvqOw7CaaztRK4U3gyGDvcJbL9yGYkjZA9k7SkL9SR07cirgjPVC+g==",
              "summons_id_key": "1805000200002C2317G000284",
              "summons_number":"AB895306",
              "vehicle_registration_number": "BPK82",
              "offence_date": "2018-03-22",
              "offence_desc":"Laju",
              "offence_time": "0928",
              "law_code": "APJ1987",
              "section_code": "014(4)",
              "offence_ori_amt": "30000",
              "offence_amt": "30000",
              "law_code2": " ",
              "section_code2": " ",
              "offence_ori_amt2": "000",
              "offence_amt2": "000",
              "law_code3": " ",
              "section_code3": " ",
              "offence_ori_amt3": "000",
              "offence_amt3": "000",
              "offence_location": "LRAYA PERSEKUTUAAN 28.3",
              "summons_ori_amt": "30000",
              "summons_amt": "300.00",
              "warrant_issue_date": "NNNP",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            }
          ],
          "status": "1",
          "statusMessage": "Success",
          "total_summons": "5",
          "pageNumber": 1,

          "pageSize": 5, // original
          "numberOfElements": 5, // original
          "totalPages": 1, // original

          // "pageSize": 1, //farid testt
          // "numberOfElements": 1, //farid testt
          // "totalPages": 5, //farid testt

          "totalElements": 5
        };
      } else { //THIS ELSE IS UTK CHECK NO IC BASED ON CAR NUMBER.

        this.loading = false;
        this.dataSummons = {
            "summonDetails": [
              {
                "op":"Y",
                "sh":"Y",
                "compound_ind": "Y",
                "district_code": null,
                "enforcement_date": "20131003",
                "imageUrl":"",
                // "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=FbhH6gFYja7sd0o9alLg/wgQHDc9AamOnJH1sj9lRvtlLYaR6HZcga8opFj4uXa03uxWb9Uz+uDB04XaFJhehA==",
                "summons_id_key": "1812000200002AK469286",
                "summons_number":"AB895306",
                "vehicle_registration_number": "WPW7663",
                "offence_date": "2013-10-01",
                "offence_desc":"Lain2",
                "offence_time": "2125",
                "law_code": "APJ1987",
                "section_code": "020(1)",
                "offence_ori_amt": "30000",
                "offence_amt": "30000",
                "law_code2": " ",
                "section_code2": " ",
                "offence_ori_amt2": "000",
                "offence_amt2": "000",
                "law_code3": " ",
                "section_code3": " ",
                "offence_ori_amt3": "000",
                "offence_amt3": "000",
                "offence_location": "PERSIARAN KEWAJIPAN",
                "summons_ori_amt": "30000",
                "summons_amt": "300.00",
                "warrant_issue_date": "YNY",
                "offender_ic": "871222145031",
                "offender_name": "MOHD RAMZI BIN IBRAHIM"
              },
              {
                "op":"Y",
                "sh":"N",
                "compound_ind": "Y",
                "district_code": null,
                "enforcement_date": "20150601",
                "imageUrl": "?",
                "summons_id_key": "1812000200002AR594398",
                "summons_number":"AB895300",
                "vehicle_registration_number": "WPW7663",
                "offence_date": "2015-05-30",
                "offence_desc":"Tidak memakai Tali Keledar",
                "offence_time": "2330",
                "law_code": "APJ1987",
                "section_code": "026(1)",
                "offence_ori_amt": "30000",
                "offence_amt": "30000",
                "law_code2": "APJ1987",
                "section_code2": "015(1)A",
                "offence_ori_amt2": "30000",
                "offence_amt2": "30000",
                "law_code3": " ",
                "section_code3": " ",
                "offence_ori_amt3": "000",
                "offence_amt3": "000",
                "offence_location": "JLN SS 15/2A",
                "summons_ori_amt": "60000",
                "summons_amt": "600.00",
                "warrant_issue_date": "NNY",
                "offender_ic": "05500430",
                "offender_name": "DINESH AMEDEMBE"
              },
              {
                "op":"N",
                "sh":"Y",  
                "compound_ind": "Y",
                "district_code": null,
                "enforcement_date": "20150420",
                "imageUrl": "?",
                "summons_id_key": "1805000200002AR193569",
                "summons_number":"AB895301",
                "vehicle_registration_number": "WPW7663",
                "offence_date": "2015-04-16",
                "offence_desc":"Terlalu Perlahan",
                "offence_time": "2255",
                "law_code": "APJ1987",
                "section_code": "015(1)A",
                "offence_ori_amt": "30000",
                "offence_amt": "30000",
                "law_code2": " ",
                "section_code2": " ",
                "offence_ori_amt2": "000",
                "offence_amt2": "000",
                "law_code3": " ",
                "section_code3": " ",
                "offence_ori_amt3": "000",
                "offence_amt3": "000",
                "offence_location": "JLN AIRPORT SUBANG",
                "summons_ori_amt": "300.00",
                "summons_amt": "300.00",
                "warrant_issue_date": "NNN",
                "offender_ic": "940623146867",
                "offender_name": "MOHD ZALFIZ B IBRAHIM"
              }
            ],
          "status": "1",
          "statusMessage": "Success",
          "total_summons": "3",
          "pageNumber": 1,
          "pageSize": 3,
          "numberOfElements": 3,
          "totalPages": 1,
          "totalElements": 3
        };
      }  //end else sekiranya carian berdasarkan num plate kereta.
    } // end else kalau localhost.
 
    this.gridFormat();

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
          this.loading = false;
        } else {
          localStorage.setItem('dserviceCode', dsvcCode);
          this.loading = false;
        }
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

  getSelection(e) { //when change selection
    
    this.varSelect = e.value;
    this.showDetails = false;
    this.checkReqValues();
  } 

  getUserData() {

    this.loading = true;

    this.searchForm.get('ic').disable();

    if (!environment.staging) {
      //this.getPerPostCodeFlag = false;
      this.protectedService.getUser().subscribe(
        data => {
          this.sharedService.errorHandling(data, (function () {

            if (data.user) {

              this.searchForm.get('ic').setValue(data.user.identificationNo);
              this.checkReqValues();
              
            } else {
              
            }
          }).bind(this));
          this.loading = false;
          
        },
        error => {
          location.href = this.config.urlUAP + 'uapsso/Logout';
          this.loading = false;
          //location.href = this.config.urlUAP+'portal/index';
        });

    } else { //need to be deleted Noraini for local only      

      this.loading = false;

      let data = {
        "user": {
          "userId": 1411,
          "pid": "871222145031",
          "identificationNo": "871222145031",
          "passportNo": "",
          "fullName": "Encik Saman Trafik2",
          "email": "saman2@yopmail.com"

        }
      }

      this.searchForm.get('ic').setValue(data.user.identificationNo);

    }
  }

  checkReqValues() {

    let reqVal = [];
    let nullPointers: any = [];

    if (this.varSelect == 0) {
      reqVal = ["ic"];
      // (<HTMLInputElement> document.getElementById("searchbtn")).disabled = false;
    }

    if (this.varSelect == 1) {
      reqVal = ["noCar"];
      // (<HTMLInputElement> document.getElementById("searchbtn")).disabled = true;
    }

    // numCar

    for (var reqData of reqVal) {
      let elem = this.searchForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }

    if (nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  resetSearch() {
    // (<HTMLInputElement> document.getElementById("searchbtn")).disabled = true;
    this.searchForm.get('noCar').setValue(null);
    this.showDetails = false;
    this.complete = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }   


  isNumberAndAlphabet(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 97 || charCode > 122) && (charCode < 65 || charCode > 90) ) {
      /* 91-122 is a-z, 49-57 is 0-9 */
      /* 65-90  is A-Z. */
      return false;
    }
    return true;
  }


  ///////////////////
  //pagination starts
  ///////////////////

  pageChange(event){  
    this.pageSize = event.value; 
    this.pageNumber = 1;
    this.noPrevData = true;

    if (this.dataSummons.totalElements == this.dataSummons.numberOfElements) {
      this.noNextData = true;
    }

    if (this.dataSummons.totalElements > this.dataSummons.numberOfElements) {
      this.noNextData = false;
    }

 
    this.searchApp(null, this.pageNumber, this.pageSize);
  }
  
  paginatorL(page){ 

     // original
    // this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
    // this.pageNumber = page;
     // original
 
      //farid try test
      this.pageNumber = this.pageNumber - page;
      if (this.pageNumber == 0) {
       this.pageNumber = 1;
       this.noPrevData = true ;
      } else {
        this.noPrevData = false; 
      }

      this.searchApp(null, this.pageNumber, this.pageSize);  
      //farid try test
 
  }

  paginatorR(page, totalPages){

    //original
    // this.noPrevData = page >= 1 ? false : true;
    // let pageInc = page+1;
    // this.noNextData = pageInc === totalPages;
    //original

    //farid try test starts
      this.noPrevData = false;
      this.pageNumber = this.pageNumber + page;
      if (this.pageNumber == totalPages) {
        this.noNextData = true;
      }

      this.searchApp(null, this.pageNumber, this.pageSize);

      //KAT SINI MACAM TAK BETUL LAGI. function ni mcm lambat nak baca sebelom search app settle.
      // if (this.dataSummons.totalPages == this.dataSummons.pageNumber) {
      //   this.noNextData = true;
      // }

    //farid try test end'

  }

  getStatusApp(lang){
    this.loading = true;
    this.protectedService.getListApp(lang).subscribe(data => {
      this.dataStatus = data.groupList;
      this.loading = false;
    });
  }

  ///////////////////
  //pagination ends
  ///////////////////

  pageLink(param) {
    if (param.charAt(0) == 'h' ) {
      window.open(param);
    }
    console.log('masok link param: ',param)
  }


}
