import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavService } from './nav.service';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()

export class NavRouterActivator implements CanActivate {
      lang = 'en';
    constructor(private navService: NavService, private router: Router, private translate: TranslateService){
        translate.onLangChange.subscribe((event: LangChangeEvent) => {

            let myLang = translate.currentLang;

            if (myLang == 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'en';
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'ms';

                });
            }
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{


       const eventExists =  !!this.navService.triggerArticle(this.lang, +route.params['id']);

       if (!eventExists)
            this.router.navigate(['/404']);
        return eventExists;


    }
}
