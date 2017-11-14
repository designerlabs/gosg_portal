import { Component, OnInit , Inject} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
   lang = 'en';
   announcementData: any;
   calendarData: any;

    constructor(private translate: TranslateService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig){
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            const myLang = translate.currentLang;
            if (myLang == 'en') {
               this.lang = 'en';
               this.getData(this.lang);
               this.getCalendarData(this.lang);
            }
            if (myLang == 'ms') {
              this.lang = 'ms';
              this.getData(this.lang);
              this.getCalendarData(this.lang);
            }
        });
    }

    ngOnInit(){
    }

    private announcementUrl: string = this.config.urlAnnouncement;
    getData(lang: string){
         return this.http.get(this.announcementUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(data => {
                this.announcementData = data[0].results[0].Announcement;
                console.log(this.announcementData);
            });
    }

    private calendarUrl: string = this.config.urlCalendar;
    getCalendarData(lang: string){
        return this.http.get(this.calendarUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(data => {
                this.calendarData = data;
                console.log(this.calendarData);
            });
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

}
