import { Component, OnInit, Input, Inject, AfterContentChecked, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ProtectedService } from '../services/protected.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/skip';
import { PortalService } from '../services/portal.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import { NavService } from '../header/nav/nav.service';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
@Component({
  selector: 'gosg-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  countDown;
  count = 5;

  currentSec: number = 5;
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
  getPassport:string;
  validMyIdentity:any;
  getEmail:string;
  public loading = false;
  public nonValidUser = false;
  getFullname:string;
  translatedText: string;
  supportedLanguages: any[];
  @Input() langChange: string;
  zIndex = '8888';
  zIndex2 = '9999';
  bHeight = '70px';
  bTop = '35px';
  userId: string;
  userNationality: string;
  isProfile = false;
  isProfileHide = false;
  query;
  pageSize;
  msgInvalidUser: any;
  entryService;
  constructor(public navService: NavService, private activatedRoute:ActivatedRoute, @Inject(APP_CONFIG) private config: AppConfig, private protectedService:ProtectedService, router:Router, private portalService:PortalService) {

      this.countDown = timer(0,1000).pipe(
          take(this.count),
          map(()=> --this.count)
       );

      this.clientHeight = window.innerHeight - 200;
  }
  getExpand(data) {
      if (data) {
          this.zIndex = '8888';
          this.zIndex2 = '9999';
          this.bHeight = '70px';
          this.bTop = '35px';

      } else {
          this.zIndex = '8888';
          this.zIndex2 = '9999';
          this.bHeight = '105px';
          this.bTop = '85px';
      }
  }


  logout(){
    localStorage.removeItem('usrID');
    location.href= this.config.urlUAP +'uapsso/Logout?return='+this.config.urlUAP+'portal/index';
  }

  getUserRegData(name){
    this.portalService.login(name).subscribe(
      data => {
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
    document.getElementById("mySidenavProtected").style.width = "250px";
    this.isProfile = data;

    if(localStorage.getItem('customFontType')){
      $('#fontOptSideMenu3').val(localStorage.getItem('customFontType'));
  }

  if (localStorage.getItem('themeIndex')) {
      $('#confBar2 .settingBtm input').removeClass('colorPaletteActive');
      $('#confBar2 .settingBtm input:nth('+localStorage.getItem('themeIndex')+')').addClass('colorPaletteActive');
      localStorage.setItem('themeIndex', localStorage.getItem('themeIndex'));
    }
  }


  getErorMsg(){
    if(!environment.staging){
    this.protectedService.getErrorMsg().subscribe(
      data => {
        this.msgInvalidUser = data.resource.messagesDescription;
        console.log(this.msgInvalidUser);
      }
    )
    }
  }

  getUserData(){
    this.loading = true;
    if(!environment.staging){
      this.protectedService.getUser().subscribe(
        data => {
          if(data.user){
            this.getUserName = data.user.fullName;
            this.getPassport = data.user.passportNo;
            this.validMyIdentity = data.user.isMyIdentityVerified;
            this.getEmail = data.user.email;
            this.getFullname = data.user.fullName;
            localStorage.setItem('fullname',data.user.fullName);
            localStorage.setItem('email',data.user.email);
            this.nonValidUser = false;
          }else{
            this.loading = false;
          }
          this.loading = false;

          if(data.statusCode !== 'SUCCESS' && !this.isFirstLogin){
            this.loading = false;
            this.nonValidUser = true;
              setTimeout(() => {
                this.logout();
              }, 5000);
          }
        },
        error => {

         // if(data.statusCode !== 'SUCCESS'){
          //   this.loading = false;
          //   this.nonValidUser = true;
          //     setTimeout(() => {
          //       this.logout();
          //     }, 5000);
          // }

          //location.href = this.config.urlUAP +'uapsso/Logout';
          //location.href = this.config.urlUAP+'portal/index';
        })
    }
  }


  getProfileData(data){
    this.loading = true;
    this.protectedService.getProfile(data).subscribe(
      data =>{
        if(data.length !=0){
        this.getFullname = data[0].fullName;
        localStorage.setItem('icNo',data[0].ic_number);
        localStorage.setItem('name',data[0].fullname);
        localStorage.setItem('email',data[0].email);
        localStorage.setItem('usrID', data[0].id);
        //this.getUserRegData(data[0].fullname);
        }else{
          //location.href = this.config.urlUAP+'portal/index';
        }
        this.loading = false;
      },
      error => {
        this.loading = true;
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

    this.getUserData();
    this.activatedRoute.queryParamMap.skip(1).subscribe((queryParams: Params) => {
      this.userId = queryParams.get('id');
      if(this.userId){
        this.getProfileData(this.userId);

      }
    });
    if(getUsrID){

      this.getProfileData(getUsrID);
    }else{

    }

  }




}
