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


  private handleError(error:Response){
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }

}

