import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../../header/topnav/topnav.service';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { SharedService } from '../../common/shared.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { environment } from '../../../environments/environment';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'gosg-statusposition',
  templateUrl: './statusposition.component.html',
  styleUrls: ['./statusposition.component.css']
})
export class StatuspositionComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;
  complete: boolean;
  dataIntake;
  urlDoc;

  public kp: any;
  public name: any;
  public date: any;
  public place: any;
  public status: any;
  public showDetails = false;
  public showNoData = false;
  dsvcCode:any;
  agcCode:any;

  searchForm: FormGroup;  
  public ic: FormControl;  

  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  private urlFaq: string = this.config.urlFaq;
  loading: boolean = false;

  constructor(
    private protectedService: ProtectedService,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private topnavservice: TopnavService,) {

    this.lang = translate.currentLang;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langID = 1;
            });
        }

        if (myLang == 'ms') {

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langID = 2;
            });
        }

        if(this.topnavservice.flagLang){
          //this.subscription = this.getFaq(this.langID);
        }

    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
   // this.subscription.unsubscribe();
  }

  ngOnInit() {

    // AGENCY & DSERVICE CODE FOR VALIDATION
    let sub = this.route.queryParams.subscribe((params: Params) => {
      this.dsvcCode = parseInt(params.service);
      this.agcCode = parseInt(params.agency);
    });

    this.triggerDserviceValidation(this.dsvcCode);

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    this.ic = new FormControl();

    this.searchForm = new FormGroup({   

      ic: this.ic   
    });

    this.getUserData();

  }

  getUserData(){
    
    this.loading = true;
    
    this.searchForm.get('ic').disable();

    if(!environment.staging){
      //this.getPerPostCodeFlag = false;
      this.protectedService.getUser().subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          console.log(data);
          if(data.user){
            
            this.searchForm.get('ic').setValue(data.user.identificationNo);

          }else{
          }
        }).bind(this));
        this.loading = false;
        
      },
      error => {
        location.href = this.config.urlUAP +'uapsso/Logout';
        this.loading = false;
          //location.href = this.config.urlUAP+'portal/index';
      });
      
    } else{ //need to be deleted Noraini for local only      

      this.loading = false;
      let data = {
        "user": {
          "userId": 1411,
          "pid": "871222145031",
          "identificationNo": "871222145031",
          "passportNo": "",
          "fullName": "Encik Saman Trafik2",
          "email": "saman2@yopmail.com"
         
        }
      }

    
      this.searchForm.get('ic').setValue(data.user.identificationNo);

    }
  }

  searchApp(formValues: any){

    this.showDetails = true;
    this.showNoData = false;

    let icno = this.searchForm.get('ic').value;
    let arrObj = [];

    arrObj.push(this.langID);
    arrObj.push(this.agcCode);
    arrObj.push(this.dsvcCode);

    if(!environment.staging) {

    this.protectedService.getPdrm('pdrm/checkPoliceIntake', arrObj).subscribe(
    data => {
      this.sharedService.errorHandling(data, (function(){

        this.dataIntake = data.policeIntakeResource;

        if(this.dataIntake){
          this.showDetails = true;
          this.showNoData = false;

          this.kp = this.dataIntake.newIcNo;
          this.name = this.dataIntake.personnelName;
          this.date =  this.dataIntake.startDate;
          this.place = this.dataIntake.location;
          this.urlDoc = this.dataIntake.docUrl;
          
          if(this.dataIntake.status == 1)
          this.status = "PAPAR/CETAK";
          else
          this.status = "-";
          
        } else{
          this.showDetails = false;
          this.showNoData = true;
        }
        
      }).bind(this));
      
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
    });
    
  } else {
    this.showDetails = true;
    this.showNoData = false;
    
    this.kp = "930319095074";
    this.name = "FARZANA NUR YUSRA BINTI SAKRI";
    this.date =  "2018-04-12";
    this.place = "PULAPOL DUNGUN";
    this.status = "PAPAR/CETAK";
    this.urlDoc = "http://sso.rmp.gov.my/AP_E/AP_LETTER_EXTENSION.aspx?id=Y1P0FzQmQC6C9/7nGjjnsK6RIY59dq2UUIUrQXJYzIiTm+45KsQfIQ==";
    }
  }

  openLink(varUrl){
    if(varUrl != undefined){
      let httpStr = varUrl.substring(0, 4);

      if(httpStr.toLowerCase() == 'https'){
        window.open(varUrl,'_blank');
      } else {
        let newUrl = "http://";
        window.open(newUrl+varUrl,'_blank');
      }

    }
  }

  isNumber(evt) {

    this.checkReqValues();
    
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  checkReqValues() {

    let reqVal:any = ["ic"];
    let nullPointers:any = [];

    for (var reqData of reqVal) {
      let elem = this.searchForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }
      
    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  resetSearch(){
    //this.appNumber.reset();
    this.searchForm.get('ic').setValue(null);
    this.showDetails = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }

  triggerDserviceValidation(dsvcCode) {
    let sub;
    this.loading = true;

    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.protectedService.validateDserviceByRefCode(dsvcCode))
      .subscribe(resValidation => {
        
        if(!resValidation.valid) {
          this.toastr.error('Invalid Service!', '');
          
          // sub = Observable.interval(2000)
          // .subscribe((val) => {
          //   window.close();
          //   sub.unsubscribe();
          // });
        } else {
          localStorage.setItem('dserviceCode', dsvcCode);
          this.loading = false;
        }
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
  
      });
  }

}
