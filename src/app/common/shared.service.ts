import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Http, Response} from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class SharedService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  private countryUrl: string = this.config.urlCountry;
    private genderUrl: string = this.config.urlGender;
    private religionUrl: string = this.config.urlReligion;
    private raceUrl: string = this.config.urlRace;

     getCountryData(): Observable<any[]> {
        //  console.log(this.countryUrl);
      return this.http.get(this.countryUrl)
        .map((response: Response) => response.json())
        .catch(this.handleError);

    }

    getCountrybyCode(code): Observable<any[]> {
        return this.http.get(this.countryUrl+'/code/'+code)
            .map((response: Response) => response.json())
            .catch(this.handleError);
  
      }

    
    getReligion(langId): Observable<any[]> {
      return this.http.get(this.religionUrl)
        .map((response: Response) => response.json())
        .catch(this.handleError);

    }

    getRace(langId): Observable<any[]> {
      return this.http.get(this.raceUrl+langId)
        .map((response: Response) => response.json())
        .catch(this.handleError);

    }

    getGender(): Observable<any[]> {
        return this.http.get(this.genderUrl + '.json')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


   getTheme(){
        return localStorage.getItem('themeColor');
    }

    
  private handleError(error:Response){
    let msg = `Status code ${error.status} on url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);

  }
    

}
