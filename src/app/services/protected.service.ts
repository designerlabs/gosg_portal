import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

@Injectable()
export class ProtectedService {
  languageId: any;
  lang = this.lang;
  langId = this.langId;
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private translate: TranslateService) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {

                  const myLang = translate.currentLang;

                  if (myLang == 'en') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                          this.langId = 1;
                          this.languageId = 1;
                      });

                  }
                  if (myLang == 'ms') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                          this.langId = 2;
                          this.languageId = 2;
                      });
                  }

              });

              if(!this.languageId){
                if(localStorage.getItem('langID')){
                  this.languageId = localStorage.getItem('langID');
                }else{
                  this.languageId = 1;
                }
              }
   }

   private feedbackUrl: string = this.config.urlFeedbackProtected;
   private feedbacktypeUrl: string = this.config.urlFeedbackType;
   private fbsubjectUrl: string = this.config.urlFeedbackSubject;
  private profileUrl: string = this.config.urlGetProfile;
  private profileEmailUrl: string = this.config.urlGetProfileEmail;
  private profilePhoneUrl: string = this.config.urlGetProfilePhone;
  private mailUrl: string = this.config.urlMail;
  private completeUrl: string = this.config.urlComplete;
  private completeUrlEmail: string = this.config.urlCompleteEmail;
  private completeUrlPhone: string = this.config.urlCompletePhone;
  private getUserUrl: string = this.config.urlGetUser;
  private pollUrl: string = this.config.urlPollProtected;
  // private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  private inboxUrl = this.mailUrl;
  private urlDashboardData: string = this.config.urlDashboardData;
  private statusAppUrl: string = this.config.statusAppUrl;
  private urlAgencyList: string = this.config.urlAgencyList;
  private dataAppUrl: string = this.config.dataAppUrl;
  private urlPerhilitan: string = this.config.urlPerhilitan;


  createProfile(user) {
    return this.http
    .post(this.profileUrl, user).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getProfile(userId){
    return this.http
    .get(this.profileUrl+"/"+userId+"?language="+this.languageId).map((response: Response) => response.json())
    .catch(this.handleError);

  }


  getUser(){
    return this.http
    .get(this.getUserUrl+"?language="+localStorage.getItem('langID')).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateProfile(user) {
    return this.http
    .put(this.profileUrl+"/update/"+user.pid+"?language="+localStorage.getItem('langID'), user).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateEmail(pid, user) {
    return this.http
    .put(this.profileEmailUrl+"/update/"+pid+"?requestEmail="+user+"&language="+localStorage.getItem('langID'), user).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  updatePhone(pid, user) {
    return this.http
    .put(this.profilePhoneUrl+"/update/"+pid+"?requestPhone="+user+"&language="+localStorage.getItem('langID'), user).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getMails(pages, size){
    return this.http
    .get(`${this.inboxUrl}?page=${pages}&size=${size}`)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  deleteMail(msgId){
    return this.http
    .delete(this.mailUrl+msgId).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  deleteMails(msgId){
    return this.http
    .delete(this.mailUrl+"delete/selected?id="+msgId).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  completeTran(rnd){
    return this.http
    .put(this.completeUrl+"?randomNo="+rnd+"&language="+localStorage.getItem('langID'),'').map((response: Response) => response.json())
    .catch(this.handleError);
  }

  completeProfileEmail(){
    return this.http
    .put(this.completeUrlEmail+"?language="+localStorage.getItem('langID'),'').map((response: Response) => response.json())
    .catch(this.handleError);
  }

  completeProfilePhone(){
    return this.http
    .put(this.completeUrlPhone+"?language="+localStorage.getItem('langID'),'').map((response: Response) => response.json())
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


  getMail(msgId){
    return this.http
    .get(this.mailUrl+msgId).map((response: Response) => response.json())
    .catch(this.handleError);
  }


  private handleError(error:Response){
    let msg = `Status code ${error.status} on url ${error.url}`;
    return Observable.throw(msg);

  }

  submitPoll(data) {
    return this.http.post(this.pollUrl, data)
    .map((response: Response) => response.json())
    .retry(5)
    .catch(this.handleError);
  }

  getDashboardData(lang){
    return this.http
    .get(this.urlDashboardData + '?language='+lang).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getListApp(lang){
    return this.http
    .get(this.statusAppUrl + '?language='+lang).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getListAgency(lang){
    return this.http
    .get(this.urlAgencyList + '?language='+lang).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getDataApp(page, size, param){
    return this.http
    .get(this.dataAppUrl + '?language='+this.languageId+'&page='+page+'&size='+size+param).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getProtected(modules, lang){
    //this.urlPerhilitan
    console.log(this.urlPerhilitan + modules + '?language='+lang);
    return this.http
    .get('http://10.1.70.148:8080/service-dservice-protected/' + modules + '?language='+lang).map((response: Response) => response.json())
    .catch(this.handleError);
  }
}

