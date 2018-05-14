import { Injectable } from '@angular/core';
import { NavService } from './nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class NavRouterGuardService {
  moduleName: string;
  lang = 'en';
  langId = 1;
  result;
  constructor(private navService: NavService, private router: Router, private translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
                  let myLang = translate.currentLang;
                  if (myLang === 'en') {
                    this.langId =1;
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                      });
                  }
                  if (myLang === 'ms') {
                    this.langId =2;
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                      });
                  }
              });
   }

  guardRoute(moduleName, lang, id1, id2?) {
  // this.moduleName = this.router.url.split('/')[1];
  return !!this.navService.triggerArticle(moduleName, lang, +id1);
  // if (this.moduleName !== 'announcement') {
  //   return !!this.navService.triggerArticle(moduleName, lang, +id1);
  // } else if (this.moduleName === 'announcement') {
  //   if (id1 && id2) {
  //     return !!this.navService.triggerAnnouncementDetails('announcement', lang, id1, id2);
  //   }else if (id1 && !id2) {
  //     return !!this.navService.triggerAnnouncementList(lang, id1);
  //   }
  // }

}

}
