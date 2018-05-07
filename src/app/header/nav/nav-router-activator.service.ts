import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavService } from './nav.service';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NavRouterGuardService } from './nav-router-guard.service';

@Injectable()

export class NavRouterActivator implements CanActivate {
  langIdVal: any;
      lang = 'en';
      langId = 1;
      eventExists;
    // tslint:disable-next-line:max-line-length
    constructor(private navService: NavService, private router: Router, private translate: TranslateService, private navGuardService: NavRouterGuardService){
        translate.onLangChange.subscribe((event: LangChangeEvent) => {

            let myLang = translate.currentLang;

            if (myLang === 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.langId = 1;
                    this.lang = 'en';
                });

            }
            if (myLang === 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.langId = 2;
                    this.lang = 'ms';

                });
            }
        });

        if(localStorage.getItem('langID')){
          this.langIdVal = localStorage.getItem('langID');
        }else{
          this.langIdVal = this.langId
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //    const eventExists =  !!this.navService.triggerArticle('', this.lang, +route.params['id']); // Old code
    if (route.params['id']) {
        this.eventExists =  !!this.navGuardService.guardRoute(route.url[0].path, this.langIdVal, route.params['id']);
    }else {
        if (route.params['id1']) {
            this.eventExists =  !!this.navGuardService.guardRoute(route.url[0].path, this.langIdVal, route.params['id1'], route.params['id2']);
        }
    }
       // tslint:disable-next-line:curly
       if (!this.eventExists)
            this.router.navigate(['/404']);
        return this.eventExists;
    }
}




