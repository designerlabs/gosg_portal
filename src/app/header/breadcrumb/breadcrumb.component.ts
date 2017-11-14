import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
   _greetMessage: string;
    breadcrumb: any;
    isValid: any;
    lang = 'en';
  constructor(private breadcrumbService: BreadcrumbService, private translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

            const myLang = translate.currentLang;

            if (myLang == 'en') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'en';
                    this.getTitle();
                });

            }
            if (myLang == 'ms') {

                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'ms';
                    this.getTitle();
                });
            }
        });
  }

  ngOnInit() {
      this.breadcrumb = this.breadcrumbService.getBreadcrumb();
      this.isValid = this.breadcrumbService.getValid();
  }

  getTitle(){
        this.breadcrumb = this.breadcrumbService.getBreadcrumb();
        this.isValid = this.breadcrumbService.getValid();
    }

}
