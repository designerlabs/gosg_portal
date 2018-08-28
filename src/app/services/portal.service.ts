import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retry';
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StatisticService } from '../statistic/statistic.service';


@Injectable()
export class PortalService {
  lang = this.lang;
  langId = this.langId;
  loader:boolean = false;
  catData: string[];
  allUsersData: string[];
  newUsersData: string[];
  totalUsers: any;
  totalNewUsers: any;

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig,  private translate: TranslateService,
  private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private statisticservice: StatisticService) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
                  this.loader = true;
                  const myLang = translate.currentLang;

                  if (myLang == 'en') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                          this.langId = 1;
                          this.loader = false;
                      });

                  }
                  if (myLang == 'ms') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                          this.langId = 2;
                          this.loader = false;
                      });
                  }

              });

              if(!this.langId){
                if(localStorage.getItem('langID')){
                  this.langId = localStorage.getItem('langID');
                }else{
                  this.langId = 1;
                }

              }
  }

  private registerUrl: string = this.config.urlRegister;
  private feedbackUrl: string = this.config.urlFeedback;
  private feedbacktypeUrl: string = this.config.urlFeedbackType;
  private profileUrl: string = this.config.urlProfile;
  private fbsubjectUrl: string = this.config.urlFeedbackSubject;
  private usertypeUrl:string = this.config.urlUserType;
  private AgencyAppUrl: string = this.config.urlAppAgency;
  private statusAppUrl: string = this.config.urlAppAgency;
  private dataAppUrl: string = this.config.urlAppAgency;
  private pollUrl: string = this.config.urlPoll;
  private ratingUrl: string = this.config.urlRating;
  private calendarUrl: string = this.config.urlEvents;
  private agencyUrl: string = this.config.urlAgency;
  private digitalServicesUrl: string = this.config.urlDigitalServices;
  private digitalServicesDetailsUrl: string = this.config.urlDigitalServicesDetails;
  private siteMapUrl: string = this.config.urlSiteMap;
  private statisticUrl: string = this.config.urlStatistic;
  private dserviceptUrl: string = this.config.urlDserviceRpt;
  private trafficUrl: string = this.config.UrlStreetNameAPI;
  private trafficFlowUrl: string = this.config.UrlTrafficPolylines;
  private trafficPredictionUrl: string = this.config.UrlTrafficPredictionAPI;

  private internalUrl: string = this.config.urlIntSearch;
  private subStatusUrl: string = this.config.urlSubStatus;

  private portalUrl: string = this.config.urlPortal;
  private protected: string = this.config.urlProtected;
  private dserviceValidationUrl: string = this.config.urlDserviceValidation;
  private dserviceTrackingUrl: string = this.config.urlDserviceTracking;

  getAgencyApp(){
    return this.http.get(this.AgencyAppUrl + '.json')
        .map(res => res.json());
  }

  getStatusApp(){
    return this.http.get(this.statusAppUrl + '.json')
       .map(res => res.json());
  }

  getDataApp(){
    return this.http.get(this.dataAppUrl + '.json')
       .map(res => res.json());
  }

  // searchApp(){
  //   return this.http.post()
  // }

  create(user) {
    if(!this.langId){
      this.langId = 1;
    }
    return this.http.post(this.registerUrl+"?language="+localStorage.getItem('langID'), user)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);

  }

  createForAgency(user, url) {
    if(!this.langId){
      this.langId = 1;
    }
    return this.http.post(this.registerUrl+"/agency?forwardUrl="+url+"&language="+localStorage.getItem('langID'), user)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  login(name){
    return this.http.get(this.registerUrl+"/?fullName="+name)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  feedback(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept':'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.feedbackUrl, data, options)
      .map((response:Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  feedbacksubject(data){
    return this.http.get(this.fbsubjectUrl + data)
      .map((response: Response) => response.json().feedbackSubjectList)
      .retry(5)
      .catch(this.handleError);
  }

  feedbacktype(data){
    return this.http.get(this.feedbacktypeUrl + data)
      .map((response: Response ) => response.json().feedbackTypeList)
      .retry(5)
      .catch(this.handleError);
  }


  createProfile(user) {
    return this.http.post(this.profileUrl, user)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  getUserType(data){


    return this.http.get(this.usertypeUrl + data)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  // DIGITAL SERVICES
  getDigitalServices(lang) {
    //
    return this.http.get(this.digitalServicesUrl + '?language='+lang)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  // SITE MAP
  getSitemapData(lang) {
    //
    return this.http.get(this.siteMapUrl + '?language='+lang)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  triggerSiteMap(lang) {

    this.loader = true;
    this.catData = [''];

    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.getSitemapData(lang))
      .subscribe(resCatData => {
        this.catData = resCatData;
        this.loader = false;
      });
  }

  // STATISTIC
  getStatisticData(type) {
    //
    return this.http.get(this.statisticUrl+ '&type=' + type)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  triggerStatistic(type) {

    this.loader = true;

    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.getStatisticData(type))
      .subscribe(resStatData => {
        
        if (type == 1) {
          this.allUsersData = [''];
          this.statisticservice.allUser = resStatData.rows;
          this.totalUsers = resStatData.totalsForAllResults['ga:Users'];
  
        } else if (type == 2) {
          this.newUsersData = [''];
          
          this.statisticservice.newUser = resStatData.rows;
          this.totalNewUsers = resStatData.totalsForAllResults['ga:newUsers'];
        }
  
        this.loader = false;
      });
  }

  getDserviceRptData(lng) {
    //
    return this.http.get(this.dserviceptUrl+ '?language=' + lng)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getPendingDserviceRptData(lng) {
    //
    return this.http.get(this.dserviceptUrl+ '/pending?language=' + lng)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  // CALENDAR
  getCalendarEvents(){

    //
    return this.http.get(this.calendarUrl + '?language='+this.langId)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getCalendarEventsByID(id){


    return this.http.get(this.calendarUrl + '/'+id+'?language='+this.langId)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getCalendarEventsByAgencyID(id){

    //
    return this.http.get(this.calendarUrl + '?agencyId='+id+'&language='+this.langId)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  // END CALENDAR

  // AGENCIES DIRECTORY

  // getAgencies(){

  //   //
  //   return this.http.get(this.agencyUrl+localStorage.getItem('langID')+'?keyword='+keyword)
  //   .map((response: Response) => response.json())
  //   .retry(5)
  //   .catch(this.handleError);
  // }

  getAgenciesByKeyword(keyword){

    //
    return this.http.get(this.agencyUrl+this.langId+'?keyword='+keyword)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getStreetNames(){

    return this.http.get(this.trafficUrl)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getTrafficFlows(){

    return this.http.get(this.trafficFlowUrl)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getTrafficPrediction(sn){

    return this.http.get(this.trafficPredictionUrl+sn)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getSubmissionStatus(refNo, lng) {
    
    return this.http.get(this.subStatusUrl+refNo+"?language="+lng, '').map((response:Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  // END AGENCIES DIRECTORY

  // NEW

  readPortal(moduleName, page?, size?, keyword?, custom?): Observable<any[]> {
    let readUrl;
    let reqLang = localStorage.getItem('langID');

    if(!keyword && page) {
      //
      readUrl = this.config.urlPortal + moduleName + '?page=' + page + '&size=' + size  + '&language='+this.langId;
    }else if(keyword && custom) {

      readUrl = this.config.urlPortal + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+this.langId+'&'+custom;
    }
    else if(keyword) {
      //
      readUrl = this.config.urlPortal + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+this.langId;
    } else if(custom) {

      readUrl = this.config.urlPortal + moduleName + '?'+custom+ '&language='+this.langId;
    } else {

      readUrl = this.config.urlPortal + moduleName + '?language='+this.langId;
    }


    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readProtected(moduleName, page?, size?, keyword?): Observable<any[]> {
    let readUrl;
    let reqLang = localStorage.getItem('langID');

    if(!keyword && page) {
      readUrl = this.config.urlProtected + moduleName + '?page=' + page + '&size=' + size  + '&language='+this.langId;
    } else if(keyword) {
      readUrl = this.config.urlProtected + moduleName + '?keyword='+keyword+'&page=' + page + '&size=' + size  + '&language='+this.langId;
    } else {
      readUrl = this.config.urlProtected + moduleName + '?language='+this.langId;
    }



    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readPortalById(moduleName, id): Observable<any[]> {
    let readUrl = this.config.urlPortal + moduleName + id + '?language='+this.langId;

    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

  readProtectedById(moduleName, id): Observable<any[]> {
    let readUrl = this.config.urlProtected + moduleName + id + '?language='+this.langId;
    return this.http.get(readUrl)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }




// ONLINE SEARCH

  getInternal(data){
    return this.http.post(this.internalUrl, data).map((response:Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }



// ONLINE SEARCH END

  // create(data, moduleName) {
  //   let createUrl = this.config.urlProtected   + moduleName + '?language='+this.languageId;

  //   return this.http.post(createUrl, data)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // update(data,moduleName) {
  //   let updateUrl = this.config.urlProtected  + moduleName +'?language='+this.languageId;

  //   return this.http.put(updateUrl, data)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // delete(id,moduleName) {
  //   let deleteUrl = this.config.urlProtected  + moduleName + id+ '?language='+this.languageId;
  //

  //   return this.http.delete(deleteUrl, null)
  //   .map((response: Response) => response.json())
  //   .catch(this.handleError);
  // }

  // END NEW

  private handleError(error:Response){
    let msg = `Status code ${error.status} on url ${error.url}`;
    return Observable.throw(msg);

  }

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

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

  submitPoll(data) {
    return this.http.post(this.pollUrl, data)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  submitScore(data) {
    return this.http.post(this.ratingUrl+"?language="+this.langId, data)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  // Dservice validation by DService RefCode
  validateDserviceByRefCode(dsvcCode){
    
    return this.http
    .get(this.dserviceValidationUrl+dsvcCode)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  sendTrackingCount(dserviceCode, agcCode) {

    let body = {
      "agencyCode": agcCode,
      "serviceCode": dserviceCode

    }
    return this.http.post(this.dserviceTrackingUrl+"?language="+localStorage.getItem('langID'), body)
      .map((response: Response) => response.json())
      .retry(5)
      .catch(this.handleError);
  }

}
