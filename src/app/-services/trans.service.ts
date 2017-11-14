import { Injectable } from '@angular/core';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Injectable()
export class TransService {
  lang = this.lang;
  constructor(private translate: TranslateService) {
    this.lang = translate.currentLang;
   }

   getTranslate(){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
              const myLang = this.translate.currentLang;
      
              if (myLang == 'en') {
      
                  this.translate.get('HOME').subscribe((res: any) => {
                      this.lang = 'en';
                      // this.topicID = parseInt(this.router.url.split('/')[3]);
                      // this.navService.triggerArticle(this.lang, this.topicID);
                  });
      
              }
              if (myLang == 'ms') {
      
                  this.translate.get('HOME').subscribe((res: any) => {
                      this.lang = 'ms';
                      // this.topicID = parseInt(this.router.url.split('/')[3]);
                      // this.navService.triggerArticle(this.lang, this.topicID);
                  });
              }
          });
   }
  
}
