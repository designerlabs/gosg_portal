import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SharedService } from '../../common/shared.service';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'gosg-setactive',
  templateUrl: './setactive.component.html',
  styleUrls: ['./setactive.component.css']
})
export class SetactiveComponent implements OnInit {
  languageId: any;
  val_token;
  lang;
  chktoken = false;
  errormsg = '';
  constructor( private route: ActivatedRoute, private router: Router, private translate: TranslateService, private sharedservice: SharedService, private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private toastr: ToastrService,) { 
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.sharedservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      if(localStorage.getItem('langID')){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }
      
    }
  }

  ngOnInit() {
    this.languageId = localStorage.getItem('langID');
    let para = this.router.url.split('/')[3];
    this.val_token = para.split('?')[0];
    console.log(this.val_token);
    this.setActive(this.val_token)
    .subscribe(rData => {
      if(rData.statusCode === 'SUCCESS'){
        this.chktoken = true;
      }else if(rData.statusCode === "ERROR"){
        this.toastr.error(rData.statusDesc);
        this.chktoken = false;
        this.errormsg = rData.statusDesc;
      }
    },
    error => {
      this.toastr.error(this.translate.instant('common.err.servicedown'), '');
    });
    
  }

  setActive(token){
    return this.http.get(this.config.urlPortal + 'subscription/activate?code=' + token +'&language=' + this.languageId)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError); 
  }

  private handleError(error: Response) {
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);
  }

}
