import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../common/shared.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'gosg-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  emailId: any;
  lang = this.lang;
  languageId = this.languageId;

  unsubcribeStat: any;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
  ) { 
    this.lang = translate.currentLang;
    this.languageId = 2;
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
      // Some Functions goes here;
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailId = params['code'];
      
  });
  }

  unsubs(){
    
    return this.http.get(this.config.urlPortal + 'subscription/unsub?code='+this.emailId).subscribe(
      data => {

        console.log(data);
        this.toastr.success(this.translate.instant('subscription.unsubMsg'), '');
      }, error => {
        this.toastr.error('Token is invalid');
      }
    )
    // http://10.1.70.148:8080//portal/unsubscribe?email=f41a5c939e5343b908d8fc447d0c2775effeb0879a982570f6e7dedb601745ef

    // this.http.post('','').subscribe(
    //   data => {
       
    //   }
    // )

   
    
  }

  gotoHome(){
    this.router.navigate(['index']);
  }
}
