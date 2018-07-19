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

  pemohonForm: FormGroup;
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
  

  pemilik1Form: FormGroup;
  namaPemilik: FormControl;
  


  pemilik2Form: FormGroup;

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

    this.pemohonForm = this._formBuilder.group({
      namaPemohon: [''],
      icPemohon: [''],
      phonePemohon: [''],
      emailPemohon: [''],
      add1: [''],
      add2: [''],
      add3: [''],
      poskodPemohon: [''],
      daerahPemohon: [''],
      negeriPemohon: ['']
    });

    this.pemilik1Form = this._formBuilder.group({
      namaPemilik: ['']
    });

    this.firstFormGroup = this.pemohonForm;
    this.secondFormGroup = this.pemilik1Form;

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  step1(e){
    console.log(e);
    console.log(e.value);
  }



}
