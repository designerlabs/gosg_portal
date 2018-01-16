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
  lang = this.lang;
  langId = this.langId;
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private translate: TranslateService) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
                  const myLang = translate.currentLang;
      
                  if (myLang == 'en') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                          this.langId = 1;
                      });
      
                  }
                  if (myLang == 'ms') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                          this.langId = 2;
                      });
                  }
            
              });
   }

  private profileUrl: string = this.config.urlGetProfile;
  private mailUrl: string = this.config.urlMail;
  private completeUrl: string = this.config.urlComplete;
  private getUserUrl: string = this.config.urlGetUser;

  // private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  private inboxUrl = this.mailUrl+"pages/";


  createProfile(user) {
    return this.http
    .post(this.profileUrl, user).map((response: Response) => response.json())
    .catch(this.handleError);
  }
  
  getProfile(userId){
    return this.http
    .get(this.profileUrl+"/"+userId+"?langId="+localStorage.getItem('langID')).map((response: Response) => response.json())
    .catch(this.handleError);

  } 


  getUser(){
    return this.http
    .get(this.getUserUrl+"?langId="+localStorage.getItem('langID')).map((response: Response) => response.json())
    .catch(this.handleError);
  } 

  updateProfile(user) {
    debugger;
    return this.http
    .put(this.profileUrl+"/update/"+user.pid, user).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getMails(icno, pages, size){
    return this.http
    .get(`${this.inboxUrl}${icno}?page=${pages}&size=${size}`)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  deleteMail(msgId){
    return this.http
    .delete(this.mailUrl+"delete/"+msgId).map((response: Response) => response.json())
    .catch(this.handleError);
  }
  
  deleteMails(msgId){
    return this.http
    .delete(this.mailUrl+"delete/selected?id="+msgId).map((response: Response) => response.json())
    .catch(this.handleError);
  }

  completeTran(rnd){
    return this.http
    .put(this.completeUrl+"?randomNo="+rnd+"&langId="+localStorage.getItem('langID'),'').map((response: Response) => response.json())
    .catch(this.handleError);
  }

  getMail(msgId){
    return this.http
    .get(this.mailUrl+"id/"+msgId).map((response: Response) => response.json())
    .catch(this.handleError);
  }


  private handleError(error:Response){
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }

}

