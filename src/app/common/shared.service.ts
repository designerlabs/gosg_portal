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

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private translate: TranslateService,
    private toastr: ToastrService) {
          /* LANGUAGE FUNC */
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.readPortal('language/all').subscribe((data:any) => {
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
    console.log("TESTED Languange: "+this.languageId);
    if(!this.languageId){
      //this.languageId = localStorage.getItem('langID'); // by N 04062018
      if(localStorage.getItem('langID')){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }

    }

    /* LANGUAGE FUNC */
     }
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

  icon = {
    update: 'fa fa-edit',
    check: 'fa fa-check',
    times: 'fa fa-times',
    trash: 'fa fa-trash',
    plus: 'fa fa-plus',
    arrLeft: 'fa fa-angle-left',
    arrRight: 'fa fa-angle-right',
    refresh: 'fa fa-refresh',
    view: 'fa fa-eye'
  }

  pageSize =  [
    {"id": 1, "size": 10},
    {"id": 2, "size": 25},
    {"id": 3, "size": 50}
  ];
  defaultPageSize = this.pageSize[0].size;
  getCountryData(): Observable<any[]> {

    return this.http.get(this.countryUrl)
      .map((response: Response) => response.json().countryList)
      .retry(5)
      .catch(this.handleError);

  }



  getStateData(): Observable<any[]> {

    return this.http.get(this.stateUrl)
      .map((response: Response) => response.json().stateList)
      .retry(5)
      .catch(this.handleError);

  }

  getPostCodeData(code): Observable<any[]> {

    return this.http.get(this.postcodeUrl+'id/'+ code)
      .map((response: Response) => response.json().postcodeList)
      .retry(5)
      .catch(this.handleError);
  }


   // NEW

   readPortal(moduleName, page?, size?, keyword?, lang?): Observable<any[]> {
    let readUrl;
    if(!lang){
      lang = localStorage.getItem('langID');
    }
    if(!keyword && page) {

      readUrl = this.config.urlPortal + moduleName + '?page=' + page + '&size=' + size  + '&language='+lang;
    } else if(keyword) {

      readUrl = this.config.urlPortal + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+lang;
    } else {

      readUrl = this.config.urlPortal + moduleName + '?language='+lang;
    }

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readProtected(moduleName, page?, size?, keyword?, lang?): Observable<any[]> {
    let readUrl;
    if(!lang){
      lang = localStorage.getItem('langID');
    }
    if(!keyword && page) {
      readUrl = this.config.urlProtected + moduleName + '?page=' + page + '&size=' + size  + '&language='+lang;
    } else if(keyword) {
      readUrl = this.config.urlProtected + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+lang;
    } else {
      readUrl = this.config.urlProtected + moduleName + '?language='+lang;
    }

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readPortalById(moduleName, id, lang?): Observable<any[]> {
    if(!lang){
      lang = localStorage.getItem('langID');
    }
    let readUrl = this.config.urlPortal + moduleName + id + '?language='+lang;

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readProtectedById(moduleName, id, lang?): Observable<any[]> {
    if(!lang){
      lang = localStorage.getItem('langID');
    }
    let readUrl = this.config.urlProtected + moduleName + id + '?language='+lang;
    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  create(data, moduleName, lang?) {
    if(!lang){
      lang = localStorage.getItem('langID');
    }
    let createUrl = this.config.urlProtected   + moduleName + '?language='+lang;

    return this.http.post(createUrl, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  update(data,moduleName, lang?) {
    if(!lang){
      lang = localStorage.getItem('langID');
    }
    let updateUrl = this.config.urlProtected  + moduleName +'?language='+lang;

    return this.http.put(updateUrl, data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  delete(id,moduleName, lang?) {
    if(!lang){
      lang = localStorage.getItem('langID');
    }
    let deleteUrl = this.config.urlProtected  + moduleName + id+ '?language='+lang;

    return this.http.delete(deleteUrl, null)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  // END NEW


  errorHandling(err, callback){
    if(err.statusCode){
      let statusCode = err.statusCode.toLowerCase();
      if(statusCode == 'error'){
        this.toastr.error(err.statusDesc, 'Error');
      }else{
        callback()
      }
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

    return Observable.throw(msg);

  }

//   getIpCliente(): Observable<any> {
//     return this.http.get('http://api.ipify.org')
//     .map((response: Response) => response)
//     .catch(this.handleError);
// }

}
