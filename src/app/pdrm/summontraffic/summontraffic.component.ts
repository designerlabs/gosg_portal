import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../../header/topnav/topnav.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'gosg-summontraffic',
  templateUrl: './summontraffic.component.html',
  styleUrls: ['./summontraffic.component.css']
})
export class SummontrafficComponent implements OnInit {

  lang = this.lang;
  langID: any;
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

  public kp: any;
  public name: any;
  public summon: any;
  public ammount: any;
  public showDetails = false;
  public varSelect: any;

  searchForm: FormGroup;
  public optSelect: FormControl;
  public ic: FormControl;
  public noCar: FormControl;

  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  private urlFaq: string = this.config.urlFaq;

  constructor(
    private protectedService: ProtectedService,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private sharedService: SharedService,
    private toastr: ToastrService,
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

  }

  searchApp(formValues: any) {

    this.showDetails = false;

    let type = this.optSelect.value;
    let icno = this.searchForm.get('ic').value;
    let plateNo = this.searchForm.get('noCar').value;
    let arrObj = [];

    if (type == 0) {
      arrObj.push(type);
      arrObj.push(icno);
    } else {
      arrObj.push(type);
      arrObj.push(icno);
      arrObj.push(plateNo);
    }

    if (!environment.staging) {

      this.protectedService.getPdrm('pdrm/summon-traffic', arrObj).subscribe(
        data => {
          this.sharedService.errorHandling(data, (function () {

            this.dataSummons = data.summonResource;

            if (this.dataSummons.summonDetails) {
              this.showDetails = true;
              this.showNoData = false;
            } else {
              this.showDetails = false;
              this.showNoData = true;
            }

          }).bind(this));

        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
        });

    } else {
      this.showDetails = true;
      this.showNoData = false;

      if (type == 0) {

        this.dataSummons = {

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
          ]
        };
      } else {
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

              this.loading = false;

            } else {

              this.loading = false;
            }
          }).bind(this));

        },
        error => {
          location.href = this.config.urlUAP + 'uapsso/Logout';
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

    if (this.varSelect == 1) {
      reqVal = ["ic"];
    }

    if (this.varSelect == 2) {
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

}
