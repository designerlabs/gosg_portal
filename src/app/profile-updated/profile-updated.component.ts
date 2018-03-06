import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { ProtectedService } from "../services/protected.service";
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { environment } from '../../environments/environment';

@Component({
  selector: 'gosg-profile-updated',
  templateUrl: './profile-updated.component.html',
  styleUrls: ['./profile-updated.component.css']
})
export class ProfileUpdatedComponent implements OnInit {

  interval: any;
  varArray: string[];
  queryString: string;
  getUserData: any;
  userId:string;
  rndNo:any;
  progressBar:any;
  id:any;
  private sub: any;
  public emailDesc = false;
  public phoneDesc = false;

  constructor(
    private protectedservice: ProtectedService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  ngOnInit() {
    
    this.profileUpdated();
     
    

    let timeleft = 10;
    // let downloadTimer = setInterval(function(){
    //   this.progressBar = 10 - timeleft;
    //   if(timeleft <= 0)
    //     clearInterval(downloadTimer);
    // },1000);

    
    
  }


  profileUpdated(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.status){
        if(params.status.indexOf('emailUpdated') != -1){
          this.emailDesc = true;
          this.phoneDesc = false;
        }
        if(params.status.indexOf('phoneUpdated') != -1){
          this.emailDesc = false;
          this.phoneDesc = true;
        }

        this.interval = setInterval(() => {
          this.getConfirmation();
        }, 5000);
      }
    })

  }

  getConfirmation(){
    if(this.emailDesc){
      this.protectedservice.completeProfileEmail()
        .subscribe(
            userData => {
              if(userData.statusCode === 'SUCCESS'){
                this.router.navigate(['/profile']);
              }else{
                console.log(userData.statusDesc);
                clearInterval(this.interval);
                console.log('cleared interval');
              }
            
              
            },Error => {
              //this.toastr.error(this.translate.instant('feedback.err.subject'), '');
            }
        );
    }
    if(this.phoneDesc){
      this.protectedservice.completeProfilePhone()
        .subscribe(
            userData => {
              if(userData.statusCode === 'SUCCESS'){
                this.router.navigate(['/profile']);
              }else{
                console.log(userData.statusDesc);
                clearInterval(this.interval);
                console.log('cleared interval');
              }
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
