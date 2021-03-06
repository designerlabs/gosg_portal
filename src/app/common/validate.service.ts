import { Injectable, Inject} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Validators, ValidatorFn } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import 'rxjs/add/operator/map';

@Injectable()

export class ValidateService {

  constructor() { }


	validateCtrl(ctrl){
        return ctrl.valid || ctrl.untouched;
	}


	getPattern(min?, max?){
		return {
			'name':'^[a-zA-Z@.&*()-+/\' ]{'+min+','+max+'}$',
			'passport':'^[a-zA-Z0-9]{'+min+','+max+'}$',
			'numberOnly': '^[0-9]{'+min+','+max+'}$',
			'alphaOnly':'^[a-zA-Z]{'+min+','+max+'}$',
			'alphaNumeric':'^[a-zA-Z0-9]{'+min+','+max+'}$',
      'email':'^[0-9a-zA-Z-_\.]+@([0-9a-zA-Z-_]+\.)+[0-9a-zA-Z-_]{2,4}$',
			'phoneNo':'^[0-9]{3}+[-]+^[0-9]{8,9}',
			'ic':'^[0-9]{12,12}$'
      // 'email': '^[a-z0-9]+@([a-z0-9]{5,})+\.[a-z]{2,}$'
      // 'email': '^[0-9a-zA-Z]+@([a-zA-Z0-9-_]+?\.)+?[0-9a-zA-Z]+$', OLD
			};
	}

	getMask(){
		return {
			'telephone' : [ /[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
			'telephonef': ['+', /[0-9]/, /\d/, '-', /\d/, '-',/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
			'icno': [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
			'postcode':[/\d/, /\d/, /\d/, /\d/, /\d/],
			'dateFormat':[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
			'icno2': [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
			'policeReportNo': [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
		}
	}


}
