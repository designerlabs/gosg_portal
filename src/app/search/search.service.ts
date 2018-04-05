import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class obj {
    
        size: number;
        from: number;
        responseFields: [string];
        keywordMap: {
            exact: [string];
            fields: [string];
        };
        aggregations: Array<{
            name: string;
            type: string;
            field: string;
            interval: string;
        }>;

}



@Injectable()
export class SearchService {
    private intSource = new BehaviorSubject<any>(obj);
    
    private internalUrl: string = this.config.urlIntSearch;

    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {   }

    searchResData = [];

    getInternal(data){
        return this.http.post(this.internalUrl, data).map((response:Response) => response.json())
    }
    
    setIntData(data){
        this.intSource.next(data);
    }

    getIntData(){
        // return this.intSource.asObservable();
        return this.searchResData;
    }

    
}
