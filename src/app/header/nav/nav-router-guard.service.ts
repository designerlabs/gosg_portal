import { Injectable } from '@angular/core';
import { NavService } from './nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class NavRouterGuardService {
  moduleName: string;
  lang = 'en';
  result;
  constructor(private navService: NavService, private router: Router, private translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
                  let myLang = translate.currentLang;
                  if (myLang === 'en') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                      });
                  }
                  if (myLang === 'ms') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                      });
                  }
              });
   }

  guardRoute(lang, id1, id2?) {
  this.moduleName = this.router.url.split('/')[1];
  if (this.moduleName !== 'announcement') {
    return !!this.navService.triggerArticle('', this.lang, +id1);
  } else if (this.moduleName === 'announcement') {
    if (id1 && id2) {
      return !!this.navService.triggerAnnouncementDetails('announcement', this.lang, id1, id2);
    }else if (id1 && !id2) {
      return !!this.navService.triggerAnnouncementList(this.lang, id1);
    }
  }

}

}
