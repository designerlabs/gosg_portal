import { Component, Inject, Input, TemplateRef,  OnInit, Output, EventEmitter, ViewChild, ElementRef, InjectionToken, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { SharedService } from '../common/shared.service';
import { ValidateService } from '../common/validate.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute  } from '@angular/router'
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { PortalService } from "../services/portal.service";
import { TextMaskModule } from 'angular2-text-mask';
import { DialogsService } from '../dialogs/dialogs.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { ToastrService } from "ngx-toastr";
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
declare var System: any;
declare function unescape(s:string): string;
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    animations:[
        trigger('myAwesomeAnimation',[
            state('small', style({
                transform: 'scale(1)',
            })),
            state('large', style({
                transform: 'scale(1.2)',
            })),
            transition('small => large', animate('300ms ease-in')),
        ]),
    ]
})

export class RegisterComponent implements OnInit, AfterViewInit {
    refUrl: string;
    errMsg: string;
    getEmail: any;
    content: any;
    message: string;

    @ViewChild(ModalDirective) modal: ModalDirective;
    @ViewChild('staticModal') public staticModal:ModalDirective;
    @ViewChild('infoModal') public infoModal:ModalDirective;
    getUserData: any;
    maskICNo: any;
    state:string = 'small';

    
    nonCiti: boolean;
    citi: boolean;
    permanentResident: boolean;
    modalRef: BsModalRef;
    maskCitizen: any;
    maskForeigner: any;
    handleErrorObservable(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    extractData(arg0: any): any {
        throw new Error("Method not implemented.");
    }

      
    breadcrumb: any;
    isValid: any;
    topicID: number;
    public translatedText: string;
    public supportedLanguages: any[];
    result: any[];
    getResult:any;
    @Output() langChange = new EventEmitter();

    @ViewChild('tele') tele: ElementRef;
    @ViewChild('capt') capt: ElementRef;
    @ViewChild('icnum') icnum: ElementRef;
    @ViewChild('telefori') telefori: ElementRef;
    @ViewChild('name') name: ElementRef;
    @ViewChild('namefori') namefori: ElementRef;
    @ViewChild('psport') psport: ElementRef;
    countries: any[];
    registration_Form: FormGroup;
    public citizenFormGrp: FormGroup;
    public noncitizenFormGrp: FormGroup;
    private kad_pengenalan: FormControl;
    private nama_penuh: FormControl;
    private emel: FormControl;
    private telefon: FormControl;
    private country: FormControl;
    private passport: FormControl;
    private country_pr: FormControl;
    private passport_pr: FormControl;
    private nama_penuhf: FormControl;
    private emelf: FormControl;
    private telefonf: FormControl;
    public captcha: FormControl;
    public flagGetCaptcha;
    citizenValue:any;
    changeCitizen = true;
    country_my = '';
    resetCap = false;
    public supportedLangs: any[];
    UAPLang;
    lang = this.lang;
    languageId = this.languageId;
    fnCaptch: any;
 
  
    ngAfterViewInit(){

        if (this.fnCaptch != undefined){
            this.fnCaptch.CreateCaptchas();
            this.fnCaptch.getCaptcha();
        }
        this.maskCitizen = this.validateService.getMask().telephone;
        this.maskForeigner = this.validateService.getMask().telephonef;
        this.maskICNo = this.validateService.getMask().icno;
    }
    constructor(fb: FormBuilder,
                @Inject(APP_CONFIG) private config: AppConfig,
                private breadcrumbService: BreadcrumbService,
                private translate: TranslateService,
                private sharedService: SharedService,
                private elementRef: ElementRef,
                private validateService: ValidateService,
                private http:  HttpClient,
                private router: Router,
                private portalservice: PortalService,
                textMask:TextMaskModule,
                private dialogsService: DialogsService,
                private toastr: ToastrService,
                private modalService: BsModalService
            ) {
                this.lang = translate.currentLang;
                this.languageId = 2;
                this.registration_Form = fb.group({
                    "Name": this.nama_penuh,
                    "Email": this.emel,
                    "Phone": this.telefon,
                    "icNo": this.kad_pengenalan,
                    "captcha": this.captcha
                });

                
                translate.onLangChange.subscribe((event: LangChangeEvent) => {

                    const myLang = translate.currentLang;

                    if (myLang == 'en') {
                        translate.get('HOME').subscribe((res: any) => {
                            this.lang = 'en';
                            this.languageId = 1;
                        });

                    }
                    if (myLang == 'ms') {
                        translate.get('HOME').subscribe((res: any) => {
                            this.lang = 'ms';
                            this.languageId = 2;
                        });
                    }
                    this.getUserType();
                });
            }

             
              confirm(): void {
                this.message = 'Confirmed!';
                this.modal.hide();
              }
             
              decline(): void {
                this.message = 'Declined!';
                this.modal.hide();
              }

    getUserType(){
        this.portalservice.getUserType(this.languageId)
            .subscribe(
                userData => {
                    this.getUserData = userData.userTypeList
                },Error => {
                    this.toastr.error(this.translate.instant('common.err.servicedown'), '');
                }
            );
    }

    openModal(template: TemplateRef<any>, content) {
        this.modalRef = this.modalService.show(template);
        this.content = content;
      }
    
    
    private registerUrl: string = this.config.urlRegister;
    private uapstagingUrl: string = this.config.urlUapStaging;
    
    ngOnInit() {

        this.refUrl =  location.search.split('refUrl=')[1];
        console.log(unescape(this.refUrl));
        
        this.getUserType();
        this.maskCitizen = this.validateService.getMask().telephone;
        this.maskForeigner = this.validateService.getMask().telephonef;
        this.maskICNo = this.validateService.getMask().icno;
        this.getCountry();
        this.breadcrumb = this.breadcrumbService.getBreadcrumb();
        this.breadcrumb = this.breadcrumb.name = '';
        this.isValid = this.breadcrumbService.getValid();
        this.isValid = this.isValid.value = true;
        this.kad_pengenalan = new FormControl('', [Validators.required, Validators.pattern('^[0-9-]{14}$')]),
        this.nama_penuh = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern(2,60).name)]),
            this.emel = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern().email)]),
            this.telefon = new FormControl('', [Validators.required]),
            this.country = new FormControl('', [Validators.required]),
            this.passport = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern(6,10).passport)]), //A1234567 or AB123456
            this.country_pr = new FormControl(''),
            this.passport_pr = new FormControl('', [Validators.pattern(this.validateService.getPattern(6,10).passport)]), //A1234567 or AB123456
            this.nama_penuhf = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern(2,60).name)]), 
            this.emelf = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern().email)]),
            this.telefonf = new FormControl('', [Validators.required]),
            this.captcha = new FormControl('', [Validators.required]),
            this.citizenFormGrp = new FormGroup({
                kad_pengenalan: this.kad_pengenalan,
                nama_penuh: this.nama_penuh,
                emel: this.emel,
                telefon: this.telefon,
                country: this.country,
                passport: this.passport,
                country_pr: this.country_pr,
                passport_pr: this.passport_pr,
                nama_penuhf: this.nama_penuhf,
                emelf: this.emelf,
                telefonf: this.telefonf,
                captcha: this.captcha,
            });
        this.flagGetCaptcha = true;
    
        this.RemoveNonCitizenCtrl();
    }
    
    openDialog() {
        this.dialogsService
            .confirm('Success!', 'Registeration successful!')
            .subscribe(res => this.getResult = res);
        }

    animateMe(){
        this.state = (this.state === 'small' ? 'large' : 'small');
    }

    isCurrentLang(lang: string) {
        return lang === this.translate.currentLang;
    }
    loadCaptcha() {
        this.fnCaptch.CreateCaptchas(); //-- pending
        this.fnCaptch.getCaptcha();
        this.resetCap = false;
    }

    
    ReCreateCaptchas() {
        this.resetCap = true;
        this.capt.nativeElement.value = '';
        document.getElementById('rCaptcha').setAttribute('data-val', '');
        this.flagGetCaptcha = true;
        this.loadCaptcha();
        this.captcha.reset();
    }
    getCaptchaVal() {
        // new getCaptcha() // -- pending
    }
    show = true;
    chgeCitizen() {
        this.fnCaptch.CreateCaptchas();
        this.fnCaptch.getCaptcha();
        this.changeCitizen = this.citizenValue;
        this.ReCreateCaptchas();
        if ((this.citizenValue == 2) || (this.citizenValue  ==6)) {
            this.citi = false;
            this.permanentResident = false;
            this.nonCiti = true;
            this.RemoveCitizenCtrl();
            this.addNonCitizenCtrl();
        } else {
            this.citi = true;
            this.permanentResident = false;
            this.nonCiti = false;
            this.RemoveNonCitizenCtrl();
            this.addCitizenCtrl();
        }
    }

    addCitizenCtrl() {
        this.citizenFormGrp.addControl('kad_pengenalan', this.kad_pengenalan);
        this.citizenFormGrp.addControl('nama_penuh', this.nama_penuh);
        this.citizenFormGrp.addControl('emel', this.emel);
        this.citizenFormGrp.addControl('telefon', this.telefon);
        this.resetCitizenCtrl();
    }

    RemoveCitizenCtrl() {
        this.citizenFormGrp.removeControl('kad_pengenalan');
        this.citizenFormGrp.removeControl('nama_penuh');
        this.citizenFormGrp.removeControl('emel');
        this.citizenFormGrp.removeControl('telefon');
    }

    resetCitizenCtrl() {
        this.kad_pengenalan.reset();
        this.nama_penuh.reset();
        this.emel.reset();
        this.telefon.reset();
    }
    


    addPRTRCtrl() {
        this.citizenFormGrp.addControl('kad_pengenalan', this.kad_pengenalan);
        this.citizenFormGrp.addControl('nama_penuh', this.nama_penuh);
        this.citizenFormGrp.addControl('emel', this.emel);
        this.citizenFormGrp.addControl('telefon', this.telefon);
        this.citizenFormGrp.addControl('country_pr', this.country_pr);
        this.citizenFormGrp.addControl('passport_pr', this.passport_pr);
        this.resetPRTRCtrl();
    }

    RemovePRTRCtrl() {
        this.citizenFormGrp.removeControl('kad_pengenalan');
        this.citizenFormGrp.removeControl('nama_penuh');
        this.citizenFormGrp.removeControl('emel');
        this.citizenFormGrp.removeControl('telefon');
        this.citizenFormGrp.removeControl('country_pr');
        this.citizenFormGrp.removeControl('passport_pr');
    }

    resetPRTRCtrl() {
        this.kad_pengenalan.reset();
        this.nama_penuh.reset();
        this.emel.reset();
        this.telefon.reset();
        this.country_pr.reset();
        this.passport_pr.reset();
    }

    

    addNonCitizenCtrl() {
        this.citizenFormGrp.addControl('country', this.country);
        this.citizenFormGrp.addControl('passport', this.passport);
        this.citizenFormGrp.addControl('nama_penuhf', this.nama_penuhf);
        this.citizenFormGrp.addControl('emelf', this.emelf);
        this.citizenFormGrp.addControl('telefonf', this.telefonf);
        this.resetNonCitizenCtrl();
    }

    RemoveNonCitizenCtrl() {
        this.citizenFormGrp.removeControl('country');
        this.citizenFormGrp.removeControl('passport');
        this.citizenFormGrp.removeControl('nama_penuhf');
        this.citizenFormGrp.removeControl('emelf');
        this.citizenFormGrp.removeControl('telefonf');
    }

    resetNonCitizenCtrl() {
        this.country.reset();
        this.passport.reset();
        this.nama_penuhf.reset();
        this.emelf.reset();
        this.telefonf.reset();
    }

    resetForm() {
        if (this.isCitizen()) {
            this.resetCitizenCtrl();
            this.resetPRTRCtrl();
        } else {
            this.resetNonCitizenCtrl();
           
        }
        this.captcha.reset();
    }
    
    citizenReg(formValues:any) {
       
        let body = {
            "country":{  
                "countryId":null
             },
            "identificationNo":null,
            "phoneNo":null,
            "email":null,
            "fullName": null,
            "userType":{  
                "userTypeId":null
             },
             "passportNo":null
        };

        

        // let profileBody = {
        //     "date_joined": null,
        //     "fullname": null,
        //     "ic_number": null,
        //     "dob": null,
        //     "gender": null,
        //     "email": null,
        //     "race": null,
        //     "religion": null,
        //     "corresponding_address1": null,
        //     "corresponding_address2": null,
        //     "corresponding_address3": null,
        //     "corresponding_postcode":null,
        //     "corresponding_city":null,
        //     "corresponding_state":null,
        //     "corresponding_country":null,
        //     "corresponding_home_phone":null,
        //     "mobile_phone":null,
        //     "permanent_address1":null,
        //     "permanent_address2":null,
        //     "permanent_address3":null,
        //     "permanent_postcode":null,
        //     "permanent_city":null,
        //     "permanent_state":null,
        //     "permanent_country":null,
        //     "permanent_home_phone":null,
        //     "dateTime": null,
        //     "lang": null,
        //     "citizenType":null,
        //     "user_id": null
        // };
        if((formValues.kad_pengenalan ) && (formValues.passport_pr)){
            body.country.countryId = formValues.country_pr;
            body.userType.userTypeId = this.citizenValue;
            body.identificationNo = formValues.kad_pengenalan;
            body.email = formValues.emel;
            body.phoneNo = formValues.telefon;
            body.fullName = formValues.nama_penuh;
            body.passportNo = formValues.passport_pr;

        } else if(formValues.country){
            body.country.countryId = formValues.country;
            body.userType.userTypeId = this.citizenValue;
            body.identificationNo = formValues.passport;
            body.email = formValues.emelf;
            body.phoneNo = formValues.telefonf;
            body.fullName = formValues.nama_penuhf;
       
        }else{
            body.country.countryId = 152;
            body.userType.userTypeId = this.citizenValue;
            body.identificationNo = formValues.kad_pengenalan;
            body.email = formValues.emel;
            body.phoneNo = formValues.telefon;
            body.fullName = formValues.nama_penuh;
        };


        if(this.refUrl){
            this.portalservice.createForAgency(body,unescape(this.refUrl))
            .subscribe(
                data => {
                    if(this.lang == 'ms'){
                        this.UAPLang = 'my';
                    }else{
                        this.UAPLang = 'en';
                    }
                    if(!!data.user){
                        window.location.href = this.uapstagingUrl+this.UAPLang+"&tag="+data.user.tag;
                    }else{
                        this.errMsg = data.statusDesc;
                        this.infoModal.show();
                    }
                    
                },
                error => {
                    this.toastr.error(this.translate.instant('common.err.servicedown'), '');
                });
        }else{

            this.portalservice.create(body)
            .subscribe(
                data => {
                    if(this.lang == 'ms'){
                        this.UAPLang = 'my';
                    }else{
                        this.UAPLang = 'en';
                    }
                    if(!!data.user){
                        window.location.href = this.uapstagingUrl+this.UAPLang+"&tag="+data.user.tag;
                    }else{
                        this.errMsg = data.statusDesc;
                        this.infoModal.show();
                    }
                    
                },
                error => {
                    this.toastr.error(this.translate.instant('common.err.servicedown'), '');
                    //this.alertService.error(error);
                    //this.loading = false;
                });

        }

        
    
    }

    noncitizenReg(formValues) {
        console.log(formValues);
    }

    isCitizen() {
        if((this.citizenValue == 2 )|| (this.citizenValue == 6)){
            return false;
        }else{
            return true;
        }
        
    }


    isPRTR() {
        if((this.citizenValue == 3 )|| (this.citizenValue == 4)||(this.citizenValue == 7 )|| (this.citizenValue == 8)){
            return true;
        }else{
            return false;
        }
        
    }

    getCountry() {
        return this.sharedService.getCountryData()
            .subscribe(resCountryData => {
                this.countries = resCountryData;
            });
    }

    validateCtrlChk(ctrl: FormControl) {
        // return ctrl.valid || ctrl.untouched
        return this.validateService.validateCtrl(ctrl);
    }

    resetMethod(event) {
        this.resetForm();
      }

    verifyCaptcha() {
        const real = document.getElementById('rCaptcha').getAttribute('data-val');
        const userCap = this.capt.nativeElement.value;

        if (userCap.length > 0) {
            if (real === userCap) {
                return true;
            } else {
                // this.captcha.errors.valid = false
                return false;
            }
        } else {
            return true;
        }
    }


}


System.import('../common/captcha.js')
    .then(MyModule => {
        MyModule.CreateCaptchas();
        MyModule.getCaptcha();
        RegisterComponent.prototype.fnCaptch = MyModule;
    });


