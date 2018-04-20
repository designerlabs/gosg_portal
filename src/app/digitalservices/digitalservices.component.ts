import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { PortalService } from '../services/portal.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'gosg-digitalservices',
  templateUrl: './digitalservices.component.html',
  styleUrls: ['./digitalservices.component.css']
})
export class DigitalservicesComponent implements OnInit {

  dsData:any = [];
  languageId = this.languageId;

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) { 

      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        const myLang = translate.currentLang;
  
        if (myLang == 'en') {
          translate.get('HOME').subscribe((res: any) => {
              this.lang = 'en';
              this.languageId = 1;
            });
          }
          
          if (myLang == 'ms') {
            translate.get('HOME').subscribe((res: any) => {
              this.lang = 'ms';
              this.languageId = 2;
          });
        }
      
        if(!this.languageId){
          this.languageId = localStorage.getItem('langID');
        }else{
          this.languageId = 1;
        }
  
        this.getDServices();

      });
    }
  
  lang = this.lang;

  ngOnInit() {
    this.getDServices();
  }

  getDServices() {

    this.portalservice.getDigitalServices().subscribe(data => {
  
        this.dsData = data.list;
        // console.log(data.list)
        // for(var item of data.list) {
          // console.log(data.list)
          // if(data.list.details)
          //   this.dsData.push(data.list);
        // }
        // this.dsData = [''];
        console.log(this.dsData)
    });
  }

}
