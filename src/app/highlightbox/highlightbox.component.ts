import { Component, OnInit , Inject} from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'app-highlightbox',
  templateUrl: './highlightbox.component.html',
  styleUrls: ['./highlightbox.component.css']
})
export class HighlightboxComponent implements OnInit {
    highlightData: any;
    hotTopic: string;
    hotTopicContent: any[];
    penyertaan: any[];
    penyertaanContent: any[];
    penyertaanButton: any[];
    statuslabel: string;
    statusContent: string;
    hotTopicImg: string;
    peyertaanImg: string;
    permohonanImg: string;
    lang = 'en';
    filter= false;

    constructor(private translate: TranslateService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig){
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            const myLang = translate.currentLang;
            if (myLang == 'en') {
               this.lang = 'en';
               this.getData(this.lang);
            }
            if (myLang == 'ms') {
              this.lang = 'ms';
              this.getData(this.lang);
            }
        });
    }

    ngOnInit(){
        this.getData(this.lang);
    }

   private highlightUrl: string = this.config.urlHighlights;
   getData(lang: string){
         return this.http.get(this.highlightUrl + '-' + lang + '.json')
           .map(res => res.json())
          .subscribe(eventData => {
                this.highlightData = eventData;
                this.hotTopic = eventData[0].label;
                this.hotTopicContent = eventData[0].content;
                this.hotTopicImg = eventData[0].url_image;
                this.peyertaanImg = eventData[1].url_image;
                this.permohonanImg = eventData[2].url_image;
                this.penyertaan = eventData[1].label;
                this.penyertaanContent = eventData[1].content;
                this.penyertaanButton = eventData[1].button;
                this.statuslabel = eventData[2].label;
                this.statusContent = eventData[2].content;
            });
    }

    getUrl(){
        return this.hotTopicImg;
    }

    getTheme(){
        return localStorage.getItem('themeColor');
    }

}
