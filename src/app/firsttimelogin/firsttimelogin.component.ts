import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { ProtectedService } from "../services/protected.service";
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { environment } from '../../environments/environment';
@Component({
  selector: 'gosg-firsttimelogin',
  templateUrl: './firsttimelogin.component.html',
  styleUrls: ['./firsttimelogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirsttimeloginComponent implements OnInit {
  interval: any;
  varArray: string[];
  queryString: string;
  getUserData: any;
  userId:string;
  rndNo:any;
  progressBar:any;
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

    if(!environment.staging){
      this.rndNo =  location.search.split('rnd=')[1];

      this.interval = setInterval(() => {
        this.getConfirmation();
      }, 5000);
    }


    let timeleft = 10;
    // let downloadTimer = setInterval(function(){
    //   this.progressBar = 10 - timeleft;
    //   if(timeleft <= 0)
    //     clearInterval(downloadTimer);
    // },1000);



  }

  getConfirmation(){
    let body = {
      "REMOTE_USER": this.rndNo
    };

    if(this.rndNo){
      this.protectedservice.completeTran(this.rndNo)
        .subscribe(
            userData => {
              if(userData.statusCode === 'Success'){
                if(userData.statusDesc === 'Success'){
                  window.location.href = this.config.urlDashboard;
                }else{
                  window.location.href = userData.statusDesc;
                }
              }else{

                clearInterval(this.interval);

              }
              this.getUserData = userData.userTypeList;

            },Error => {
              //this.toastr.error(this.translate.instant('feedback.err.subject'), '');
            }
        );
    }

}

  userIsLogged(){
   return true;
  }

}
