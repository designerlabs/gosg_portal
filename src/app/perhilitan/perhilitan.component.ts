import { Component, OnInit, Inject, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { ProtectedService } from '../services/protected.service';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { TopnavService } from '../header/topnav/topnav.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {
  Ng4FilesService,
  Ng4FilesConfig,
  Ng4FilesStatus,
  Ng4FilesSelected
} from '../ng4-files';
import { environment } from '../../environments/environment';

@Component({
  selector: 'gosg-perhilitan',
  templateUrl: './perhilitan.component.html',
  styleUrls: ['./perhilitan.component.css']
})
export class PerhilitanComponent implements OnInit, OnDestroy {

  uid: any;
  lang = this.lang;
  langID: any;
  private subscriptionLang: ISubscription;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  namaPemohon: FormControl;
  icPemohon: FormControl;
  phonePemohon: FormControl;
  emailPemohon: FormControl;
  add1: FormControl;
  add2: FormControl;
  add3: FormControl;
  poskodPemohon: FormControl;
  daerahPemohon: FormControl;
  negeriPemohon: FormControl;
    
  warganegara: FormControl;
  typeIC: FormControl;
  icpassport: FormControl;
  namaPemilik: FormControl;
  phonePemilik: FormControl;
  jobType: FormControl;
  jobGroup: FormControl;
  addPemilik: FormControl;
  poskodPemilik: FormControl;
  daerahPemilik: FormControl;
  negeriPemilik: FormControl;

  mailingAdd: FormControl;
  mailingPoskod: FormControl;
  mailingDaerah: FormControl;
  mailingNegeri: FormControl;
  copyAdd: FormControl;

  companyType: FormControl;
  jenisMilikan: FormControl;
  registerType: FormControl;
  registerNo: FormControl;
  companyName: FormControl;
  companyAdd: FormControl;
  companyPoskod: FormControl;
  companyDaerah: FormControl;
  companyNegeri: FormControl;
  companyPhone: FormControl;
  companyFax: FormControl;
  copyAddPemilik: FormControl;

  lsnActivity: FormControl;
  businessCat: FormControl;
  file1: FormControl;
  file2: FormControl;
  agreement: FormControl;

  public nationality: any;
  public listjic: any;
  flagPemohon = false;
  flagPemilik = false;
  

  constructor(
    private activatedRoute:ActivatedRoute,
    @Inject(APP_CONFIG) private config: AppConfig,
    private router: Router,
    private http: Http, 
    private translate: TranslateService, 
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private _formBuilder: FormBuilder,
    private topnavservice: TopnavService,
    private ng4FilesService: Ng4FilesService, 
  ) { 

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
        }

    });

  }   
  
  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }
  
  ngOnInit() {

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    // this.firstFormGroup = this._formBuilder.group({
    //   namaPemohon: [''],
    //   icPemohon: [''],
    //   phonePemohon: [''],
    //   emailPemohon: [''],
    //   add1: [''],
    //   add2: [''],
    //   add3: [''],
    //   poskodPemohon: [''],
    //   daerahPemohon: [''],
    //   negeriPemohon: ['']
    // });

    this.firstFormGroup = this._formBuilder.group({
      namaPemohon: new FormControl(),
      icPemohon: new FormControl(),
      phonePemohon: new FormControl(),
      emailPemohon: new FormControl(),
      add1: new FormControl(),
      add2: new FormControl(),
      add3: new FormControl(),
      poskodPemohon: new FormControl(),
      daerahPemohon: new FormControl(),
      negeriPemohon: new FormControl(),
    });

    this.secondFormGroup = this._formBuilder.group({
      warganegara: new FormControl(),
      typeIC: new FormControl(),
      icpassport: new FormControl(),
      namaPemilik: new FormControl(),
      phonePemilik: new FormControl(),
      jobType: new FormControl(),
      jobGroup: new FormControl(),
      addPemilik: new FormControl(),
      poskodPemilik: new FormControl(),
      daerahPemilik: new FormControl(),
      negeriPemilik: new FormControl()
    });

    this.thirdFormGroup = this._formBuilder.group({
      mailingAdd: new FormControl(),
      mailingPoskod: new FormControl(),
      mailingDaerah: new FormControl(),
      mailingNegeri: new FormControl(),
      copyAdd: new FormControl()
    });

    this.fourthFormGroup = this._formBuilder.group({
      companyType: new FormControl(),
      jenisMilikan: new FormControl(),
      registerType: new FormControl(),
      registerNo: new FormControl(),
      companyName: new FormControl(),
      companyAdd: new FormControl(),
      companyPoskod: new FormControl(),
      companyDaerah: new FormControl(),
      companyNegeri: new FormControl(),
      companyPhone: new FormControl(),
      companyFax: new FormControl(),
      copyAddPemilik: new FormControl()
    });

    this.fifthFormGroup = this._formBuilder.group({
      lsnActivity: new FormControl(),
      businessCat: new FormControl(),
      file1: new FormControl(),
      file2: new FormControl(),
      agreement: new FormControl()
    });

    this.getNationality(this.langID);
    this.getJIC(this.langID);
    this.getUserData();
  }

  uploadFile1(selectedFiles: Ng4FilesSelected, lan): void {    

    console.log(selectedFiles.files.length);

    let nameFile1 = selectedFiles.files[0].name;
    console.log(nameFile1);

    this.fifthFormGroup.controls.file1.setValue(nameFile1);
    // let mFileSize = this.chkUploadFile.maxSize;
    
    // let fileExtn = selectedFiles.files[0].name.split('.')[1];
    // let chkFileExtn = this.resFileExtn.filter(fData => fData === fileExtn.toLowerCase());
    // if (selectedFiles.status === Ng4FilesStatus.STATUS_SUCCESS) {      
    //   if (selectedFiles.files.length > 0 && mFileSize) {        
    //     if (selectedFiles.files[0].size <= mFileSize) {
    //       // Check File extn  
    //       if (chkFileExtn.length > 0){
   
    //         this.mediaFileUpForm.controls.mediaFileEn.setValue(this.selectedFilesEn);
    
    //        }else {
    //         this.toastr.error('File Extension not match');
    //        }    
    //     }else{
    //       this.toastr.error('File Size Exceed maximum file size');
    //     }
    //   }      
    // }
  }

  uploadFile2(selectedFiles: Ng4FilesSelected, lan): void {    

    console.log(selectedFiles.files.length);

    let nameFile1 = selectedFiles.files[0].name;
    console.log(nameFile1);

    this.fifthFormGroup.controls.file2.setValue(nameFile1);
  }

  getUserData(){
    if(!environment.staging){
      //this.getPerPostCodeFlag = false;
      this.protectedService.getUser().subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          console.log(data);
          if(data.user){
            
            // this.userTypeId = data.user.userType.userTypeId;

            // this.protectedService.getProfile(data.user.pid).subscribe(
            // data => {
            //   this.sharedService.errorHandling(data, (function(){
            //     if(data.user) {
            //       this.userId = data.user.userId;
            //       this.fullname = data.user.fullName;
            //       this.accountStatus = data.user.accountStatus.accountStatusId;
            //       this.nationality = data.user.country.countryName;
            //       this.countryId = data.user.country.countryId;
            //       if(data.user.country.countryId == 152){
            //         this.isLocal = true;
            //       }else{
            //         this.isLocal = false;
            //       }
            //       this.passport = data.user.passportNo;
            //       this.idno = data.user.pid;
            //       this.regemail = data.user.email;
            //       this.regdate = data.user.registrationDate;
            //       this.isStaff = data.user.isStaff;
            //       this.isMyIdentityVerfied = data.user.isMyIdentityVerified;
            //       this.isMyIdentityValid = data.user.isMyIdentityValid;
            //       this.agencyForwardUrl = data.user.agencyForwardUrl;
            //       this.roles = data.user.roles;      

            //     }
            //   }).bind(this));
            // },
            // error => {
            // });
          }else{
          }
        }).bind(this));

      },
      error => {
          location.href = this.config.urlUAP +'uapsso/Logout';
          //location.href = this.config.urlUAP+'portal/index';
      });
    }
  }

  getNationality(lang){
    this.protectedService.getNationalityPerhilitan('perhilitan/dropdown/nationality',lang).subscribe(
      data => {
        this.nationality = data.perhilitanNationalityResourceList;     
    });
  }

  getJIC(lang){
    this.protectedService.getJenisIC('perhilitan/dropdown/ictype/1',lang).subscribe(
      data => {
        this.listjic = data.dropdownResourceList;     
    });
  }

  step1(e){
    console.log(e);
    console.log(e.value);
  }

}
