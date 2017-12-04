import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class SharedService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig,  private translate: TranslateService) { }
  lang = this.lang;
  languageId = this.languageId;
  private countryUrl: string = this.config.urlCountry;
  private stateUrl: string = this.config.urlState;
  private cityUrl: string = this.config.urlCity;
  private genderUrl: string = this.config.urlGender;
  private religionUrl: string = this.config.urlReligion;
  private raceUrl: string = this.config.urlRace;

  getCountryData(): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.countryUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  getStateData(): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.stateUrl)
      .map((response: Response) => response.json().stateList)
      .catch(this.handleError);

  }

  getCountrybyCode(code): Observable<any[]> {
    return this.http.get(this.countryUrl + '/code/' + code)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  getCitiesbyState(code): Observable<any[]> {
    return this.http.get(this.cityUrl + code)
      .map((response: Response) => response.json().cityList)
      .catch(this.handleError);

  }


  getReligion(langId): Observable<any[]> {
    return this.http.get(this.religionUrl + langId)
      .map((response: Response) => response.json().religionList)
      .catch(this.handleError);

  }

  getRace(langId): Observable<any[]> {
    return this.http.get(this.raceUrl + langId)
      .map((response: Response) => response.json().raceList)
      .catch(this.handleError);

  }

  getGender(): Observable<any[]> {
    return this.http.get(this.genderUrl)
      .map((response: Response) => response.json().genderList)
      .catch(this.handleError);
  }


  getTheme() {
    return localStorage.getItem('themeColor');
  }

  loadTranslate(){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = this.translate.currentLang;
      if (myLang == 'en') {
        this.translate.get('HOME').subscribe((res: any) => {
            this.lang = 'en';
            this.languageId = 1;
        });
  
      }
      if (myLang == 'ms') {
        this.translate.get('HOME').subscribe((res: any) => {
            this.lang = 'ms';
            this.languageId = 2;
        });
      }
    });
  }


  private handleError(error: Response) {
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }


}
