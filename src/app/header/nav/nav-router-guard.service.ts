import { Injectable } from '@angular/core';
import { NavService } from './nav.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import {ArticleService} from '../../article/article.service'
@Injectable()
export class NavRouterGuardService {
  moduleName: string;
  lang = 'en';
  langId = 1;
  result;
  loading: boolean = false;
  constructor(private navService: NavService, private articleService:ArticleService, private router: Router, private translate: TranslateService) {
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

   boolCallback = (result: boolean) : void => {
     this.loading = result;
   }

  guardRoute(moduleName, lang, id1, id2?) {
  // this.moduleName = this.router.url.split('/')[1];
  return !!this.navService.triggerArticle(moduleName, lang, +id1, this.boolCallback);
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
