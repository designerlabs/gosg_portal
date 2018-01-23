import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { ProtectedService } from "../services/protected.service";
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
@Component({
  selector: 'gosg-firsttimelogin',
  templateUrl: './firsttimelogin.component.html',
  styleUrls: ['./firsttimelogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirsttimeloginComponent implements OnInit {
  varArray: string[];
  queryString: string;
  getUserData: any;
  userId:string;
  rndNo:any;
  id:any;
  private sub: any;

  constructor(
    private protectedservice: ProtectedService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

 @Input() loginfirst:boolean;

  ngOnInit() {
    this.rndNo =  location.search.split('rnd=')[1];
    console.log(this.rndNo);
    this.getConfirmation();
  }

  getConfirmation(){

    let body = {
      "REMOTE_USER": this.rndNo
    };

    this.protectedservice.completeTran(this.rndNo)
        .subscribe(
            userData => {
              if(userData.statusCode === 'S001'){
                if(userData.statusDesc === 'Success'){
                  window.location.href = this.config.urlDashboard;
                }else{
                  window.location.href = userData.statusDesc;
                }
              }else{
                alert(userData.statusDesc);
              }
              this.getUserData = userData.userTypeList;
              
            },Error => {
              //this.toastr.error(this.translate.instant('feedback.err.subject'), '');
            }
        );
}


  userIsLogged(){
   return true; 
  }

}
