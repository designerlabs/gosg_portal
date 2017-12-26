import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProtectedService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  private profileUrl: string = this.config.urlProfile;
  private mailUrl: string = this.config.urlMail;
  private completeUrl: string = this.config.urlComplete;
  // private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  private inboxUrl = this.mailUrl+"pages/";


  createProfile(user) {
    return this.http
    .post(this.profileUrl, user).map((response: Response) => response.json())
    .catch(this.handleError);
  }
  
  getProfile(userId){
    return this.http
    .get(this.profileUrl+"/?user_id="+userId).map((response: Response) => response.json())
    .catch(this.handleError);

  } 

  updateProfile(user) {
    return this.http
    .put(this.profileUrl+"/"+user.user_id, user).map((response: Response) => response.json())
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
    .get(this.completeUrl+"?randomNo="+rnd).map((response: Response) => response.json())
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

