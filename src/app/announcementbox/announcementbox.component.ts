import { Component, OnInit , Inject} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { NavService } from '../header/nav/nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-announcementbox',
  templateUrl: './announcementbox.component.html',
  styleUrls: ['./announcementbox.component.css']
})
export class AnnouncementboxComponent implements OnInit {
   lang = 'en';
   announcementData: any;
   calendarData: any;
   announces: any;
   announceRes: any;
   breadcrumb: any;
   isValid: any;
   private announcementUrl: string = this.config.urlAnnouncement;
   private calendarUrl: string = this.config.urlCalendar;

    constructor(private translate: TranslateService, private http: Http, 
        @Inject(APP_CONFIG) private config: AppConfig, private route: ActivatedRoute, 
        private navService: NavService,  private breadcrumbService: BreadcrumbService,private router: Router){
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            const myLang = translate.currentLang;
            if (myLang === 'en') {
               this.lang = 'en';
               this.getData(this.lang);
               this.getCalendarData(this.lang);
            }
            if (myLang === 'ms') {
              this.lang = 'ms';
              this.getData(this.lang);
              this.getCalendarData(this.lang);
            }
        });
    }

    ngOnInit() {
        this.getData(this.lang);
    }

    getData(lang);

    getData(lang: string) {
        let langID = 0;
        if (lang === 'ms') {
            langID = 2;
        }else {
            langID = 1;
        }
        return this.http.get(this.announcementUrl + '?langId=' + langID)
            .map(res => res.json())
            .subscribe(data => {
              console.log(data);
                this.announcementData = data.announcementList;
                console.log(this.announcementData);
            });
    }

    getCalendarData(lang: string) {
        return this.http.get(this.calendarUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(data => {
                this.calendarData = data;
                console.log(this.calendarData);
            });
    }

    getTheme() {
        return localStorage.getItem('themeColor');
    }

    triggerAnnouncementAll(moduleName, lang, id1, id2) {
        if (lang === 'ms') {
            lang = 2;
        }

        if (lang === 'en') {
            lang = 1;
        }

        this.route.paramMap
        .switchMap((params: ParamMap) =>
        this.navService.getAnnouncementDetails(moduleName, lang, id1, id2))
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
        });
    }

    getDetailAnnounce(id, childid?) {

        if (childid) {
            console.log(id, childid);
        } else {
            console.log(id);
        }

        this.triggerAnnouncementAll('announcement',  this.lang, childid, id);
        this.router.navigate(['announcement',   childid, id]);
        event.preventDefault();
    }

}
