import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/throw';

@Injectable()

export class SharedService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig,  private translate: TranslateService, private toastr: ToastrService) { }
  lang = this.lang;
  languageId = this.languageId;
  private countryUrl: string = this.config.urlCountry;
  private stateUrl: string = this.config.urlState;
  private postcodeUrl:string = this.config.urlPostcode;
  private cityUrl: string = this.config.urlCity;
  private genderUrl: string = this.config.urlGender;
  private colorUrl: string = this.config.urlColor;
  private fontUrl: string = this.config.urlFont;
  private religionUrl: string = this.config.urlReligion;
  private raceUrl: string = this.config.urlRace;

  getCountryData(): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.countryUrl)
      .map((response: Response) => response.json().countryList)
      .retry(5)
      .catch(this.handleError);

  }



  getStateData(): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.stateUrl)
      .map((response: Response) => response.json().stateList)
      .retry(5)
      .catch(this.handleError);

  }

  getPostCodeData(code): Observable<any[]> {
    //  console.log(this.countryUrl);
    return this.http.get(this.postcodeUrl+ code)
      .map((response: Response) => response.json().postcodeList)
      .retry(5)
      .catch(this.handleError);
  }

  
  errorHandling(err, callback){
    let statusCode = err.statusCode.toLowerCase();
    if(statusCode == 'error'){
      this.toastr.error(err.statusDesc, 'Error');
    }else{
      callback()
    }
  }

  getCountrybyCode(code): Observable<any[]> {
    return this.http.get(this.countryUrl + '/code/' + code)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);

  }

  getCitiesbyState(code): Observable<any[]> {
    return this.http.get(this.cityUrl + code)
      .map((response: Response) => response.json().cityList)
      .retry(5)
      .catch(this.handleError);

  }


  getReligion(langId): Observable<any[]> {
    return this.http.get(this.religionUrl + langId)
      .map((response: Response) => response.json().religionList)
      .retry(5)
      .catch(this.handleError);

  }

  getRace(langId): Observable<any[]> {
    return this.http.get(this.raceUrl + langId)
      .map((response: Response) => response.json().raceList)
      .retry(5)
      .catch(this.handleError);

  }

  getGender(langId): Observable<any[]> {
    return this.http.get(this.genderUrl + langId)
      .map((response: Response) => response.json().genderList)
      .retry(5)
      .catch(this.handleError);
  }

  getThemeColor(){
    return this.http.get(this.colorUrl)
    .map((response: Response) => response.json().colorList)
    .retry(5)
    .catch(this.handleError);
  }


  getThemeFont(){
    return this.http.get(this.fontUrl)
    .map((response: Response) => response.json().fontList)
    .retry(5)
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

//   getIpCliente(): Observable<any> {
//     return this.http.get('http://api.ipify.org')
//     .map((response: Response) => response)
//     .catch(this.handleError);
// }

}
