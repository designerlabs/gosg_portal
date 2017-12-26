import { Component, OnInit, Input, Inject, AfterContentChecked, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ProtectedService } from '../services/protected.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/skip';
import { PortalService } from '../services/portal.service';

@Component({
  selector: 'gosg-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  isFirst: boolean;
  uid: any;
  clientHeight: number;
  title = 'app';
  showLoader: boolean;
  breadcrumb: any;
  txtColor = '#333';
  isFirstLogin: boolean;
  childData: string;
  getUserName:string;
  translatedText: string;
  supportedLanguages: any[];
  @Input() langChange: string;
  zIndex = '10000';
  bHeight = '70px';
  bTop = '35px';
  userId: string;
  userNationality: string;
  isProfile = false;
  isProfileHide = false;
  query;
  pageSize;
  entryService;
  constructor(private activatedRoute:ActivatedRoute, @Inject(APP_CONFIG) private config: AppConfig, private protectedService:ProtectedService, router:Router, private portalService:PortalService) {
      
      this.clientHeight = window.innerHeight - 200;
  }
  getExpand(data) {
      if (data) {
          this.zIndex = '10000';
          this.bHeight = '70px';
          this.bTop = '35px';

      } else {
          this.zIndex = '10000';
          this.bHeight = '105px';
          this.bTop = '85px';
      }
  }


  logout(){
    localStorage.removeItem('usrID');
    location.href=this.config.urlUAP+'uapsso/Logout';
  }

  getUserRegData(name){
    this.portalService.login(name).subscribe(
      data => {
        console.log(data);
        if(data.length != 0){
          localStorage.setItem('userNationality', data[0].country);
        }else{
          alert('username not found');
        }
          
      },
      error => {
        alert('error');
          //this.alertService.error(error);
          //this.loading = false;
      });

  }

  showProfile(data){
    console.log(this.isProfile);
    document.getElementById("mySidenavProtected").style.width = "250px";
    this.isProfile = data;
    console.log(this.isProfile);
  }

  getUserData(){
    this.protectedService.getUser().subscribe(
      data => {
        debugger;
      },
    error => {
        debugger;
        //location.href = this.config.urlUAP+'portal/index';
      }
    )
  }
  getProfileData(data){
    this.protectedService.getProfile(data).subscribe(
      data =>{
        if(data.length !=0){
        this.getUserName = data[0].fullname;
        localStorage.setItem('icNo',data[0].ic_number);
        localStorage.setItem('name',data[0].fullname);
        localStorage.setItem('email',data[0].email);
        localStorage.setItem('usrID', data[0].id);
        //this.getUserRegData(data[0].fullname);
        }else{
          debugger;
          //location.href = this.config.urlUAP+'portal/index';
        }
      },
      error => {
        debugger;
        //location.href = this.config.urlUAP+'portal/index';
      });
  }

  getTheme() {
      return localStorage.getItem('themeColor');
  }

  checkFirstTime(){
    if(location.href.search('firsttime') > 0){
      this.isFirstLogin = true;
    }else{
      this.isFirstLogin = false;
    }
  }
 

  ngOnInit() {
    
    this.checkFirstTime();
    let getUsrID = localStorage.getItem('usrID');
    let getUserID = localStorage.getItem('userId');
    let getUserCountry = localStorage.getItem('userNationality');
    console.log(this.userId);
    console.log(getUserCountry)
    this.getUserData();
    this.activatedRoute.queryParamMap.skip(1).subscribe((queryParams: Params) => {
      this.userId = queryParams.get('id');
      if(this.userId){
        this.getProfileData(this.userId);
        console.log('got user id' + this.userId)
      }
    });
    if(getUsrID){
      console.log('no userid 1' + this.userId);
      this.getProfileData(getUsrID);
    }else{
      console.log('no userid 2' + this.userId)

    }

  }



}
