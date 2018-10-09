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
  dataStatus: any;
  complete: boolean;
  param = "";
  dataApp: any;
  dataAppPage: any;
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  showNoData = false;
  dataSummons: any;
  loading = false;
  dateSubmission = [];
  statusDesc = [];

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

      if (this.topnavservice.flagLang) {
        //this.subscription = this.getFaq(this.langID);
      }

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

    this.getUserData();
    this.checkReqValues();

    this.showNoData = false;

    this.getAnnoucement();

  }

  getAnnoucement(){
    // this.loading = true;
    // this.protectedService.postProtected('','pdrm/getAnnoucement?type=1'+'&agency='+this.agcCode+'&service='+this.dsvcCode+'&language='+this.langID).subscribe(
    // data => {
    //   this.sharedService.errorHandling(data, (function(){

    //     this.dataAnnouncement = data.announcementResource.content;
    //     console.log(this.dataAnnouncement);
     
    //   }).bind(this));
    //   this.loading = false;
      
    // },
    // error => {
    //   this.toastr.error(JSON.parse(error._body).statusDesc, '');
    //   this.loading = false;
    // }); 
  }

  searchApp(formValues: any) {

    this.showDetails = false;

    let type = this.optSelect.value;
    let icno = this.searchForm.get('ic').value;
    let plateNo = this.searchForm.get('noCar').value;
    let arrObj = [];

    arrObj.push(this.langID);
    arrObj.push(this.agcCode);
    arrObj.push(this.dsvcCode);
    arrObj.push(type);
    arrObj.push(icno);
    arrObj.push(this.pageCount); // farid testt
    arrObj.push(this.pageSize); // farid testt
    console.log('this.pageCount: ',this.pageCount);
    console.log('this.pageSize: ',this.pageSize);
    if (type == 1) {
      arrObj.push(plateNo);
    }

    // this.loading = true;

    if (!environment.staging) {

      this.protectedService.getPdrm('pdrm/summon-traffic', arrObj).subscribe(
        data => {
          this.sharedService.errorHandling(data, (function () {

            this.dataSummons = data.summonResource;

            if(this.dataSummons.summonDetails == null && this.dataSummons.summonDetails.length == 0){              
              this.showNoData = true;
            }

            if (this.dataSummons.summonDetails) {
              this.showDetails = true;
            } else {
              this.showDetails = false;
              this.showNoData = true;
            }

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

          
          "status": "1",
          "statusMessage": "Success",
          "total_summons": "5",
          "summonDetails": [
            {
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20060330",
              "imageUrl": "?",
              "summons_id_key": "1810000200002AB895306",
              "vehicle_registration_number": "ADM310",
              "offence_date": "20060329",
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
              "summons_amt": "60000",
              "warrant_issue_date": "YNY",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20131003",
              "imageUrl": "?",
              "summons_id_key": "1812000200002AK469286",
              "vehicle_registration_number": "WPW7663",
              "offence_date": "20131001",
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
              "summons_amt": "30000",
              "warrant_issue_date": "YNY",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20161003",
              "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=syTsQ+lvVo6ZOuuiZI66B9AZIsj+fmWcbvqOw7Caazsma31EKEh5DRXaXN598Hvsb78mtE5yfxW+lNI/4R0ljQ==",
              "summons_id_key": "181200010000116006C7733",
              "vehicle_registration_number": "WRH465",
              "offence_date": "20161002",
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
              "summons_amt": "15000",
              "warrant_issue_date": "NNNP",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20160912",
              "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=syTsQ+lvVo6ZOuuiZI66B9AZIsj+fmWcbvqOw7Caazsma31EKEh5DRXaXN598HvsrjgEo6+6cB4FGrTOUsE/ng==",
              "summons_id_key": "18120001000011621016691",
              "vehicle_registration_number": "WRH465",
              "offence_date": "20160911",
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
              "summons_amt": "30000",
              "warrant_issue_date": "NNNP",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            },
            {
              "compound_ind": "Y",
              "district_code": null,
              "enforcement_date": "20180322",
              "imageUrl": "https://sso.rmp.gov.my/SM/LOADIMAGE_E.aspx?id=syTsQ+lvVo6ZOuuiZI66B9AZIsj+fmWcbvqOw7CaaztRK4U3gyGDvcJbL9yGYkjZA9k7SkL9SR07cirgjPVC+g==",
              "summons_id_key": "1805000200002C2317G000284",
              "vehicle_registration_number": "BPK82",
              "offence_date": "20180322",
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
              "summons_amt": "30000",
              "warrant_issue_date": "NNNP",
              "offender_ic": "871222145031",
              "offender_name": "MOHD RAMZI BIN IBRAHIM"
            }
          ],
          "pageNumber": 1,
          "pageSize": 5,
          "numberOfElements": 5,
          "totalPages": 1,
          "totalElements": 5
        };
      } else {
        this.loading = false;
        this.dataSummons = {
            "summonDetails": [
              {
                "compound_ind": "Y",
                "district_code": null,
                "enforcement_date": "20131003",
                "imageUrl": "?",
                "summons_id_key": "1812000200002AK469286",
                "vehicle_registration_number": "WPW7663",
                "offence_date": "20131001",
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
                "summons_amt": "30000",
                "warrant_issue_date": "YNY",
                "offender_ic": "871222145031",
                "offender_name": "MOHD RAMZI BIN IBRAHIM"
              },
              {
                "compound_ind": "Y",
                "district_code": null,
                "enforcement_date": "20150601",
                "imageUrl": "?",
                "summons_id_key": "1812000200002AR594398",
                "vehicle_registration_number": "WPW7663",
                "offence_date": "20150530",
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
                "summons_amt": "60000",
                "warrant_issue_date": "NNY",
                "offender_ic": "05500430",
                "offender_name": "DINESH AMEDEMBE"
              },
              {
                "compound_ind": "Y",
                "district_code": null,
                "enforcement_date": "20150420",
                "imageUrl": "?",
                "summons_id_key": "1805000200002AR193569",
                "vehicle_registration_number": "WPW7663",
                "offence_date": "20150416",
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
                "summons_ori_amt": "30000",
                "summons_amt": "30000",
                "warrant_issue_date": "NNN",
                "offender_ic": "940623146867",
                "offender_name": "MOHD ZALFIZ B IBRAHIM"
              }
            ]
        };
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
    }

    if (this.varSelect == 1) {
      reqVal = ["noCar"];
    }

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
    this.searchForm.get('noCar').setValue(null);
    this.showDetails = false;
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

        let dateS = moment.tz(new Date(this.dataApp[i].submissionDatetime),'Asia/Singapore').format('DD-MM-YYYY hh:mm');
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

  ///////////////////
  //pagination ends
  ///////////////////


}
