import { Component, OnInit, Injectable, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class FaqService{

    constructor(private translate: TranslateService, private router: Router, private http: Http, @Inject(APP_CONFIG) private config: AppConfig){

    }

    getFaqData(){
        return this.http.get('./app/apidata/faq-all.json')
        .map(res => res.json());
    }
}
