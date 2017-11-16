import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PortalService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }
  
  private registerUrl: string = this.config.urlRegister;
  private feedbackUrl: string = this.config.urlFeedback;
  private feedbacktypeUrl: string = this.config.urlFeedbackType;
  private profileUrl: string = this.config.urlProfile;
  private fbsubjectUrl: string = this.config.urlFeedbackSubject;
  private usertypeUrl:string = this.config.urlUserType;
  
  create(user) {
    return this.http.post(this.registerUrl, user)
      .map((response: Response) => response.json())
      .catch(this.handleError);
      
  }

  login(name){
    return this.http.get(this.registerUrl+"/?fullName="+name)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  } 

  
  feedback(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept':'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.feedbackUrl, data, options)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  feedbacksubject(data){
    return this.http.get(this.fbsubjectUrl + data)
      .map((response: Response) => response.json().feedbackSubjectList)
      .catch(this.handleError);
  }

  feedbacktype(data){
    return this.http.get(this.feedbacktypeUrl + data)
      .map((response: Response ) => response.json().feedbackTypeList)
      .catch(this.handleError);
  }

  
  createProfile(user) {
    return this.http.post(this.profileUrl, user)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUserType(data){
    return this.http.get(this.usertypeUrl + data)
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  private handleError(error:Response){
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
