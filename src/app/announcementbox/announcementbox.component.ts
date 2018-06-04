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
    languageId: any;
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
               this.languageId = 1; 
            }
            if (myLang === 'ms') {
              this.lang = 'ms';
              this.languageId = 2;          
            }
            this.getCalendarData(this.lang);
            this.getData(this.languageId);
        });

        if (!this.languageId) {
            this.languageId = localStorage.getItem('langID');
        } else {
            this.languageId = 1;
        }
    }

    ngOnInit() {
        this.getData(this.languageId);
        this.getCalendarData(this.lang)
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
            //   console.log(data);
                this.announcementData = data.contentCategoryResource.results[0];
                // console.log(this.announcementData);
            });
    }

    getCalendarData(lang: string) {
        return this.http.get(this.calendarUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(data => {
                this.calendarData = data;
                // console.log(this.calendarData);d
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
        });
    }

    getDetailAnnounce(id, childid?) {
        if (childid) {
            console.log(id, childid);
        } else {
            console.log(id);
        }

        this.triggerAnnouncementAll(id, this.languageId);
        this.router.navigate(['content',   id]);
        event.preventDefault();
    }

}
