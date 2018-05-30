import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { PortalService } from '../services/portal.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'gosg-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})


export class StatisticComponent implements OnInit {

  StatByYear: any = [["01", "0"], ["02", "0"], ["03", "0"], ["04", "0"], ["05", "0"], ["06", "0"], ["07", "0"], ["08", "0"], ["09", "0"], ["10", "0"], ["11", "0"], ["12", "0"]]
  allUsersByYear: any;
  newUsersByYear: any;
  allUsersData: any = [];
  newUsersData: any = [];
  totalUsers: any;
  totalNewUsers: any;
  languageId = this.languageId;

  constructor(
    private http: Http,
    private portalservice: PortalService,
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

      if (!this.languageId) {
        this.languageId = localStorage.getItem('langID');
      } else {
        this.languageId = 1;
      }
      this.getUsersStatData(1);
      this.getUsersStatData(2);

    });
  }
  lang = this.lang;

  ngOnInit() {
    this.getUsersStatData(1);
    this.getUsersStatData(2);
  }

  getUsersStatData(type) {

    this.portalservice.getStatisticData(type).subscribe(data => {

      if (type == 1) {
        this.allUsersData = data.rows;
        this.totalUsers = data.totalsForAllResults['ga:Users'];
        // console.log(this.totalUsers)

        this.allUsersByYear = this.StatByYear;
        this.allUsersByYear.forEach(el => {
          this.allUsersData.forEach(api => {
            // console.log(el)
            if (el[0] === api[0]) {
              el[0] = this.translate.instant('calendar.label.short.'+el[0].toString())
              el[1] = api[1]
              // console.log('yes')
            }
          });
        });
        console.log(this.allUsersByYear)

      } else if (type == 2) {
        this.newUsersData = data.rows;
        this.totalNewUsers = data.totalsForAllResults['ga:newUsers'];
        // console.log(this.newUsersData)
        // console.log(this.totalNewUsers)
        this.newUsersByYear = this.StatByYear;
        this.newUsersByYear.forEach(el => {
          console.log(el)

          this.newUsersByYear = this.StatByYear;
          this.newUsersByYear.forEach(el => {
            this.newUsersData.forEach(api => {
              // console.log(el)
              if (el[0] === api[0]) {
                el[0] = this.translate.instant('calendar.label.short.'+el[0].toString())
                el[1] = api[1]
                // console.log('yes')
              }
            });
          });
        });
        console.log(this.newUsersByYear)
      }

    });
  }

}
