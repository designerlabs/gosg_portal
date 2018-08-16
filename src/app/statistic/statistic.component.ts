import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { PortalService } from '../services/portal.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import 'rxjs/add/observable/interval';
import { Observable } from '../../../node_modules/rxjs';
import { StatisticService } from './statistic.service';

@Component({
  selector: 'gosg-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})


export class StatisticComponent implements OnInit {

  StatByYearAll: any = [["01", "0"], ["02", "0"], ["03", "0"], ["04", "0"], ["05", "0"], ["06", "0"], ["07", "0"], ["08", "0"], ["09", "0"], ["10", "0"], ["11", "0"], ["12", "0"]]
  StatByYearNew: any = [["01", "0"], ["02", "0"], ["03", "0"], ["04", "0"], ["05", "0"], ["06", "0"], ["07", "0"], ["08", "0"], ["09", "0"], ["10", "0"], ["11", "0"], ["12", "0"]]
  StatByYearDservice: any = [{"name":"01","val":0},{"name":"02","val":0},{"name":"03","val":0},{"name":"04","val":0},{"name":"05","val":0},{"name":"06","val":0},{"name":"07","val":0},{"name":"08","val":0},{"name":"09","val":0},{"name":"10","val":0},{"name":"11","val":0},{"name":"12","val":0}];
  StatByYearPendingDservice: any = [{"name":"01","val":0},{"name":"02","val":0},{"name":"03","val":0},{"name":"04","val":0},{"name":"05","val":0},{"name":"06","val":0},{"name":"07","val":0},{"name":"08","val":0},{"name":"09","val":0},{"name":"10","val":0},{"name":"11","val":0},{"name":"12","val":0}];
  StatByYearCounterDservice: any = [{"name":"01","val":0},{"name":"02","val":0},{"name":"03","val":0},{"name":"04","val":0},{"name":"05","val":0},{"name":"06","val":0},{"name":"07","val":0},{"name":"08","val":0},{"name":"09","val":0},{"name":"10","val":0},{"name":"11","val":0},{"name":"12","val":0}];
  allUsersByYear: any;
  newUsersByYear: any;
  dserviceByYear: any;
  pdserviceByYear: any;
  dserviceCounterByYear: any;
  allUsersData: any = [];
  newUsersData: any = [];
  dServiceData: any = [];
  dServicePendingData: any = [];
  dServiceCounterData: any = [];
  dserviceRpt: any;
  totalUsers: any;
  totalNewUsers: any;
  languageId = this.languageId;
  sum = (total, currentValue) => total + currentValue;
  loading:boolean = false;
  sub: any;
  newUsers: any;
  allUsers: any;
  statisticData: any;

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private statisticservice: StatisticService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
        });
      }

      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
        });
      }

      // this.getUsersStatData(1);
      // this.getUsersStatData(2);

    });
  }
  lang = this.lang;

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.statisticData = this.statisticservice.getAllUserData();
    this.statisticData = this.statisticservice.getNewUserData();
    this.portalservice.triggerStatistic(1);
    this.portalservice.triggerStatistic(2);

    this.sub = Observable.interval(2000)
    .subscribe((val) => {
      this.getUsersStatData(1);
      this.getUsersStatData(2);
      this.sub.unsubscribe();
    });
    
    this.getDserviceReport(this.languageId);
    this.getPendingDserviceReport(this.languageId);
    this.getDserviceCounterReport(this.languageId);
  }

  getDserviceCounterReport(lng) {

    let aryObj: any;
    let retn = [];
    let sum: any;

    aryObj = {
      mName: "",
      mVal: ""
    };

    this.dServiceCounterData = this.StatByYearCounterDservice;

    sum = this.dServiceCounterData.reduce((sum, item) => sum + item.val, 0);
    this.dServiceCounterData.rptTotal = sum;

    // dsvcc.report = retn;
    // retn = [];

  }

  getDserviceReport(lng) {

    let aryObj: any;
    let retn = [];
    let newArrObj:any;
    let sum: any;

    aryObj = {
      mName: "",
      mVal: ""
    };

    this.loading = true;

    this.portalservice.getDserviceRptData(lng).subscribe(data => {
      this.dServiceData = data.list;
      this.dserviceByYear = this.StatByYearDservice;

      this.dServiceData.forEach(dsvc => {

        if(dsvc.report) {
          
          // if(dsvc.title == "Registration Form 1") {

            Object.keys(dsvc.report).map(function (inx) {
              aryObj = new Object;
              
              aryObj.name = inx;
              aryObj.val = dsvc.report[inx];
              
              retn.push(aryObj);
            });

            retn.forEach(el => {
              el.name = this.convertMonthName(el.name);
            });

            dsvc.report = retn;
            sum = retn.reduce((sum, item) => sum + item.val, 0);
            retn = [];
            
            // }
            
            dsvc.rptTotal = sum;
          } else {
            dsvc.report = this.StatByYearDservice;
            dsvc.rptTotal = 0;
          }

        });

        this.loading = false;

    });
  }

  getPendingDserviceReport(lng) {

    let aryObj: any;
    let retn = [];
    let newArrObj:any;
    let sum: any;

    aryObj = {
      mName: "",
      mVal: ""
    };

    this.loading = true;

    this.portalservice.getPendingDserviceRptData(lng).subscribe(data => {
      this.dServicePendingData = data.list;

      this.dServicePendingData.forEach(pdsvc => {

        if(pdsvc.report) {
          
          // if(pdsvc.title == "Registration Form 1") {
            // console.log(pdsvc.title)

            Object.keys(pdsvc.report).map(function (inx) {
              aryObj = new Object;
              
              aryObj.name = inx;
              aryObj.val = pdsvc.report[inx];
              
              retn.push(aryObj);
            });

            retn.forEach(el => {
              el.name = this.convertMonthName(el.name);
            });

            pdsvc.report = retn;
            sum = retn.reduce((sum, item) => sum + item.val, 0);
            retn = [];
            
            // }
            
            pdsvc.rptTotal = sum;
          } else {
            pdsvc.report = this.StatByYearPendingDservice;
            pdsvc.rptTotal = 0;
          }

        });

        this.loading = false;

    });
  }

  getUsersStatData(type) {

    // this.portalservice.triggerStatistic(type);
      
      if (type == 1) {
        
        this.allUsersByYear = this.StatByYearAll;

        this.StatByYearAll.forEach(el => {
          this.statisticservice.allUser.forEach(api => {
            if (el[0] === api[0]) {
              el[1] = api[1]
              console.log(el[1])
            }
          });
          this.allUsers = this.allUsersByYear;
        });
        // debugger;

      } else if (type == 2) {
        
        this.newUsersByYear = this.StatByYearNew;

        this.newUsersByYear.forEach(el => {
          this.statisticservice.newUser.forEach(api => {
              if (el[0] === api[0]) {
                el[1] = api[1]
                console.log(el[1])
              }
            });
            this.newUsers = this.newUsersByYear;
          });
      }

  }

  generateStatByYearFor(name:String) {
    let objName:String = name;
    let StatByYear: any = [["01", "0"], ["02", "0"], ["03", "0"], ["04", "0"], ["05", "0"], ["06", "0"], ["07", "0"], ["08", "0"], ["09", "0"], ["10", "0"], ["11", "0"], ["12", "0"]]
    let genObj = {objName:StatByYear};
    return genObj;
  }

  convertMonthName(objName:String) {

    let objElem;

    switch (objName) {

      case "jan":
        objElem = "01"
        break;

      case "feb":
        objElem = "02"
        break;

      case "mar":
        objElem = "03"
        break;

      case "apr":
        objElem = "04"
        break;

      case "may":
        objElem = "05"
        break;

      case "jun":
        objElem = "06"
        break;

      case "jul":
        objElem = "07"
        break;

      case "aug":
        objElem = "08"
        break;

      case "sep":
        objElem = "09"
        break;

      case "oct":
        objElem = "10"
        break;

      case "nov":
        objElem = "11"
        break;

      case "dec":
        objElem = "12"
        break;

    }
    return objElem;
  }
}
