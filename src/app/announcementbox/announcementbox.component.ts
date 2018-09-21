import { Component, OnInit , Inject, OnDestroy} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { NavService } from '../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-announcementbox',
  templateUrl: './announcementbox.component.html',
  styleUrls: ['./announcementbox.component.css']
})
export class AnnouncementboxComponent implements OnInit, OnDestroy {
   languageId: any;
   lang = 'en';
   announcementData: any;
   calendarData: any;
   announces: any;
   announceRes: any;
   breadcrumb: any;
   isValid: any;
   date = new Date();
   private announcementUrl: string = this.config.urlAnnouncement;
   private calendarUrl: string = this.config.urlCalendar;
   private subscription: ISubscription;
   private subscriptionLang: ISubscription;
    loading: boolean = false;

    constructor(private toastr: ToastrService, private translate: TranslateService,
        private http: Http,
        @Inject(APP_CONFIG) private config: AppConfig,
        private route: ActivatedRoute,
        private navService: NavService,
        private topnavservice: TopnavService,
        private datePipe:DatePipe,
        private breadcrumbService: BreadcrumbService,
        private router: Router
    ){
        this.lang = translate.currentLang;
        this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
            const myLang = translate.currentLang;
            if (myLang === 'en') {
               this.lang = 'en';
               this.languageId = 1;
            }
            if (myLang === 'ms') {
              this.lang = 'ms';
              this.languageId = 2;
            }

            if(this.topnavservice.flagLang){
                this.getCalendarData(this.languageId);
                this.getData(this.languageId);
            }
        });
    }

    ngOnInit() {

        if (!this.languageId) {
            this.languageId = localStorage.getItem('langID');
        } else {
            this.languageId = 1;
        }

        this.getData(this.languageId);
        this.getCalendarData(this.languageId);
    }

    ngOnDestroy() {
      this.subscriptionLang.unsubscribe();
    }

    // getData(lang);

    getData(lang: string) {
        // let langID = 0;
        // if (lang === 'ms') {
        //     langID = 2;
        // }else {
        //     langID = 1;
        // }

        return this.http.get(this.announcementUrl + '?language=' + this.languageId)
            .map(res => res.json())
            .subscribe(data => {
            //
                this.announcementData = data.contentCategoryResource.results[0];
                //
            },
            error => {
              this.toastr.error(JSON.parse(error._body).statusDesc, '');
              this.loading = false;
        
            });
    }

    getCalendarData(lang: string) {
        let calArr = [];
        let dDay1;
        let dMonth1;
        let eTitle1;
        let dDay2;
        let dMonth2;
        let eTitle2;
        let currDate = this.date.toISOString();
        let currMonth = currDate.substr(0,7);

        return this.http.get(this.calendarUrl + '?language='+this.languageId+'&keyword='+currMonth+'&notExpired=false&sort=id,DESC')
        .map(res => res.json())
        .subscribe(data => {

            if(data.list.length != 0) {
                dDay1 = this.datePipe.transform(data.list[0].eventStart, 'dd');
                dMonth1 = this.datePipe.transform(data.list[0].eventStart, 'MMMM');
                eTitle1 = data.list[0].eventName;

                if(data.list.length >= 2) {
                    dDay2 = this.datePipe.transform(data.list[1].eventStart, 'dd');
                    dMonth2 = this.datePipe.transform(data.list[1].eventStart, 'MMMM');
                    eTitle2 = data.list[1].eventName;
                    calArr.push({"day":dDay2,"month":dMonth2,"title":eTitle2})
                }

                calArr.push({"day":dDay1,"month":dMonth1,"title":eTitle1})

                this.calendarData = calArr;
            }
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
    
        });
    }

    getTheme() {
        return localStorage.getItem('themeColor');
    }

    triggerAnnouncementAll(id1, lang ) {
        // if (lang === 'ms') {
        //     lang = 2;
        // }

        // if (lang === 'en') {
        //     lang = 1;
        // }

        this.route.paramMap
        .switchMap((params: ParamMap) =>
        this.navService.getContentUrl(id1, this.languageId))
        .subscribe(resAllAnnounce => {
            this.announceRes = resAllAnnounce;
            // convert object to array
            // const temp1 = this.announceRes[0];
            // const temp = Object.keys(temp1).map(key => temp1[key]);
            // this.announces = temp;

            this.announces = resAllAnnounce;
            this.breadcrumb = this.breadcrumbService.getBreadcrumb();
            this.isValid = this.breadcrumbService.isValid = true;
            this.breadcrumb = this.breadcrumb.name = '';
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
    
        });
    }

    getDetailAnnounce(id0, id, childid?) {
        if (childid) {

        } else {

        }

        this.triggerAnnouncementAll(id, this.languageId);
        this.router.navigate(['content',   id]);
        event.preventDefault();
    }

}
