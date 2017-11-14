import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class FaqService{

    constructor(private http: Http){

    }

    getFaqData(){
        return this.http.get('./app/apidata/faq-all.json')
        .map(res => res.json());
    }
}
