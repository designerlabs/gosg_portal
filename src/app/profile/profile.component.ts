import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../common/shared.service';
import { ValidateService } from '../common/validate.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ProtectedService } from '../services/protected.service';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogsService } from '../dialogs/dialogs.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { debounce } from 'rxjs/operators/debounce';
import { debug } from 'util';
import { ToastrService } from "ngx-toastr";
// import { SlicePipe } from '@angular/common/src/pipes';
// import { ControlBase } from '../common/controlbase'
 
@Component({
  templateUrl: './profile.component.html',
  selector: 'myprofile',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  selectedCity: any;
  selectedState: any;
  maskDateFormat: any;
  maskForeigner: any;
  maskPostcode: any;
  
  @ViewChild('perhomephone') homephone: ElementRef 
  @ViewChild('perPost') perPost: ElementRef
  @ViewChild('corsPost') corsPost: ElementRef
  @ViewChild('corshomephone') corshomephone : ElementRef
  @ViewChild('corsmobile') corsmobile : ElementRef

  events: string[] = [];
  dt:number;
  proFields: any[]
  genderData: any[]
  profileForm: FormGroup
  temp: any
  resProfileFieldsData: any[]
  initial = true
  countries:any[]
  fullname:string;
  countryCode:string;
  countryName:any[];
  nationality:any;
  birthdate:any;
  isRegLocal: boolean;
  isLocal: boolean;
  isCorrsLocal: boolean;
  getRaceData: any;
  getStateData: any;
  getPerCityData: any;
  getCorrsCityData: any;
  getReligionData:any;
  isActive: boolean = false;
  perAddStateId: number;
  corrsAddStateId: number;
  maxDate: any;
  
  date = new Date();
  public dob: FormControl
  public gender: FormControl
  public race: FormControl
  public religion: FormControl
  public perAddress1 : FormControl
  public perAddress2 : FormControl
  public perAddress3 : FormControl
  public perCountry: FormControl
  public perState: FormControl
  public perCity: FormControl
  public perPostcode: FormControl
  public perTelephone: FormControl
  public corrsAddress1: FormControl
  public corrsAddress2: FormControl
  public corrsAddress3: FormControl
  public corrsCountry: FormControl
  public corrsState: FormControl
  public checkboxValue: FormControl
  public corrsCity: FormControl
  public corrsPostcode: FormControl
  public corrsTelephone: FormControl
  public corrsMobile: FormControl
  public uid: any
  public regData: any[]
  countryList:string;
  idno:string;
  mobileNo: any;
  regemail:string;
  regdate:string;
  lang = this.lang;

  // private myDatePickerOptions: IMyDpOptions = {
  //       // other options...
  //       // Initialized to specific date (09/10/2018).
  //       dateFormat: 'dd/mm/yyyy',
  // };

  constructor(
    private router: Router, 
    textMask:TextMaskModule, 
    private validateService:ValidateService, 
    private protectedService:ProtectedService, 
    private sharedService:SharedService, 
    private translate: TranslateService, 
    private elementRef: ElementRef, 
    private activatedRoute: ActivatedRoute, 
    private toastr: ToastrService,
    // private slice: SlicePipe
    ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
                  const myLang = translate.currentLang;
      
                  if (myLang == 'en') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                      });
      
                  }
                  if (myLang == 'ms') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                      });
                  }
                  this.getRace();
                  this.getReligion();
              });
              
  }

  ngOnInit() {
    this.date = new Date();
    this.getRace();
    this.getGenderVal();
    this.getReligion();
    this.maskForeigner = this.validateService.getMask().telephonef;
    this.maskPostcode = this.validateService.getMask().postcode;
    this.maskDateFormat = this.validateService.getMask().dateFormat;
    
    this.getUserProfile()
    this.getCountry();
    this.dob = new FormControl()
    this.gender = new FormControl()
    this.race = new FormControl()
    this.religion = new FormControl()
    this.perAddress1 = new FormControl()
    this.perAddress2 = new FormControl()
    this.perAddress3 = new FormControl()
    this.perCountry = new FormControl()
    this.perState = new FormControl()
    this.perCity = new FormControl()
    this.perPostcode = new FormControl()
    this.perTelephone = new FormControl()
    this.corrsAddress1 = new FormControl()
    this.corrsAddress2 = new FormControl()
    this.corrsAddress3 = new FormControl()
    this.corrsCountry = new FormControl()
    this.corrsState = new FormControl()
    this.checkboxValue = new FormControl()
    this.corrsCity = new FormControl()
    this.corrsPostcode = new FormControl()
    this.corrsTelephone = new FormControl()
    this.corrsMobile = new FormControl()

    this.profileForm = new FormGroup({
      dob: this.dob,
      gender: this.gender,
      race: this.race,
      religion: this.religion,
      perAddress1: this.perAddress1,
      perAddress2:this.perAddress2,
      perAddress3: this.perAddress3,
      perCountry: this.perCountry,
      perState: this.perState,
      perCity: this.perCity,
      perPostcode: this.perPostcode,
      perTelephone: this.perTelephone,
      corrsAddress1: this.corrsAddress1,
      corrsAddress2: this.corrsAddress2,
      corrsAddress3: this.corrsAddress3,
      corrsCountry: this.corrsCountry,
      corrsState: this.corrsState,
      checkboxValue:this.checkboxValue,
      corrsCity: this.corrsCity,
      corrsPostcode: this.corrsPostcode,
      corrsTelephone: this.corrsTelephone,
      corrsMobile: this.corrsMobile,
    });

    this.profileForm.disable();
  }
  
  getUserProfile(){
    let getUsrID = localStorage.getItem('usrID');
    // debugger;
    this.protectedService.getProfile(getUsrID).subscribe(
      data => {
        console.log(data);
        this.fullname = data[0].fullname;
        this.countryCode = data[0].permanent_country;
        this.getCountryByCode(this.countryCode);
      
      this.isUserRegLocal(this.countryCode);
      this.isMalaysian(this.countryCode);
      this.isMalaysianChk(this.countryCode);

        this.idno = data[0].ic_number;
        if(this.isLocal == true) 
          this.maxDate = this.getMinDobDate(this.idno);

        this.regemail = data[0].email;
        this.regdate = data[0].date_joined;
        this.mobileNo = data[0].mobile_phone;
        this.profileForm.get('gender').setValue(data[0].gender);
        this.profileForm.get('race').setValue(data[0].race);
        this.profileForm.get('religion').setValue(data[0].religion);
        this.profileForm.get('perAddress1').setValue(data[0].permanent_address1);
        this.profileForm.get('perAddress2').setValue(data[0].permanent_address2);
        this.profileForm.get('perAddress3').setValue(data[0].permanent_address3);
        this.profileForm.get('perCountry').setValue(data[0].permanent_country);


        if(data[0].permanent_state !== null) {
          this.getCitiesByStateC(data[0].permanent_state);
          this.profileForm.get('perState').setValue(data[0].permanent_state);
          this.profileForm.get('perCity').setValue(data[0].permanent_city); 
        }


        
        this.profileForm.get('perPostcode').setValue(data[0].permanent_postcode);
        this.profileForm.get('perTelephone').setValue(data[0].corresponding_home_phone);
        this.profileForm.get('corrsAddress1').setValue(data[0].corresponding_address1);
        this.profileForm.get('corrsAddress2').setValue(data[0].corresponding_address2);
        this.profileForm.get('corrsAddress3').setValue(data[0].corresponding_address3);
        this.profileForm.get('corrsCountry').setValue(data[0].corresponding_country);
        this.profileForm.get('corrsCity').setValue(data[0].corresponding_city);
        this.profileForm.get('corrsState').setValue(data[0].corresponding_state);
        this.profileForm.get('corrsPostcode').setValue(data[0].corresponding_postcode);
        this.profileForm.get('corrsMobile').setValue(data[0].mobile_phone);
        // this.corrsMobile = data[0].mobile_phone;
        //this.nationality = this.getCountryByCode(this.countryCode);
          // console.log("isLocal");
          // console.log(this.isLocal);
      },
      error => {
        console.log(error)
      }
    )
  }

  ngAfterViewInit() {
    
    this.maskForeigner = this.validateService.getMask().telephonef;
    this.maskPostcode = this.validateService.getMask().postcode;
    this.maskDateFormat = this.validateService.getMask().dateFormat;
  } 

  isUserRegLocal(regCountry) {

    if(regCountry == "MY") 
      this.isRegLocal = true;
    else
      this.isRegLocal = false;
  }
  
  isMalaysian(val) {

    this.isChanged();
    if(val == "MY") {
      this.getState();
      this.isLocal = true;
    } else {
      this.isLocal = false;
      this.profileForm.get('perState').setValue("");
      this.profileForm.get('perCity').setValue("");
    }
    // this.toastr.info(this.translate.instant('this.isLocal: '+this.isLocal), ''); 
  }

  isMalaysianChk(val) {

    this.isChanged();
    if(val == "MY") {
      this.isCorrsLocal = true;
    } else {
        this.isCorrsLocal = false;
        this.profileForm.get('corrsState').setValue("");
        this.profileForm.get('corrsCity').setValue("");

    }
    // this.toastr.info(this.translate.instant('this.isCorrsLocal: '+this.isCorrsLocal), ''); 
  }

  getMinDobDate(ic){
    ic = ic.split("-");
    let century;
    let res;
    let display;
    let firstDigit = ic[0].slice(0,1);
    let year = ic[0].slice(0,2);
    let month = ic[0].slice(2,4);
    let day = ic[0].slice(4,6);
    
    if(firstDigit != "0")
      century = "19";
    else
      century = "20";
   
    res = new Date(year, month-1, day);

    year = century+year;
    display = month+"/"+day+"/"+year;
    // console.log(display);
    if(this.isLocal == true) {
      this.profileForm.get('dob').setValue(new Date(year,month-1,day));
      this.dt= new Date(display).getTime();
    }

    return res;
  }

  getGenderVal() {
    let langID = localStorage.getItem('langID');
    this.sharedService.getGender(langID)
      .subscribe(resGenderData => {
        this.genderData = resGenderData
      },
      Error => {
       this.toastr.error(this.translate.instant('Server is down!'), '');            
     });
  }

  getCountryByCode(cntyCode){
      return this.sharedService.getCountrybyCode(cntyCode)
        .subscribe(resCountryData => {
          this.countryName = resCountryData;
        },
        Error => {
         this.toastr.error(this.translate.instant('Server is down!'), '');            
       });
  }
  
  getCitiesByState(e){
      this.isStateChanged();
      this.selectedState = e.value;
      return this.sharedService.getCitiesbyState(e.value)
        .subscribe(resCityData => {
          if(e.source.ngControl.name == "perState") {
            this.getPerCityData = resCityData;
          } else {
            this.getCorrsCityData = resCityData;
          }
        },
        Error => {
         this.toastr.error(this.translate.instant('Server is down!'), '');            
       });
  }

  getCitiesByStateC(e){
    if(e){
      return this.sharedService.getCitiesbyState(e)
      .subscribe(resCityData => {
        this.getCorrsCityData = resCityData;
      },
      Error => {
       this.toastr.error(this.translate.instant('Server is down!'), '');            
     });
    }
  }

  getCity(e){
    this.selectedCity = e.value;
  }

  getCountry(){
        return this.sharedService.getCountryData()
         .subscribe(resCountryData => {
            this.countries = resCountryData;
          },
          Error => {
           this.toastr.error(this.translate.instant('Server is down!'), '');            
         });
  }
  
  getState(){
    return this.sharedService.getStateData()
     .subscribe(resStateData => {
        this.getStateData = resStateData;
      },
      Error => {
       this.toastr.error(this.translate.instant('Server is down!'), '');            
     });
  }

  getReligion(){
    return this.sharedService.getReligion(localStorage.getItem('langID'))
    .subscribe(religionData => {
      this.getReligionData = religionData
    },
    Error => {
     this.toastr.error(this.translate.instant('Server is down!'), '');            
   });
  }

  getRace(){
    return this.sharedService.getRace(localStorage.getItem('langID'))
      .subscribe(raceData => {
        this.getRaceData = raceData
      },
      Error => {
       this.toastr.error(this.translate.instant('Server is down!'), '');            
     });
  }
  
  validateFirstName(obj) {
    return obj.valid || obj.untouched
  }

  validateCtrlChk(ctrl: FormControl){
        // return ctrl.valid || ctrl.untouched
        return this.validateService.validateCtrl(ctrl);
  }
  
  isChanged() {
    if(this.profileForm.get('checkboxValue').value == true)
      this.profileForm.get('checkboxValue').setValue(false);
  }

  isStateChanged() {
    this.isChanged();
  }

  isChecked(e) {

    if(e.checked)
    {
      this.isCorrsLocal = this.isLocal;
      this.profileForm.get('corrsAddress1').setValue(this.perAddress1.value);
      this.profileForm.get('corrsAddress2').setValue(this.perAddress2.value);
      this.profileForm.get('corrsAddress3').setValue(this.perAddress3.value);
      this.profileForm.get('corrsCountry').setValue(this.perCountry.value);
      this.profileForm.get('corrsState').setValue(this.perState.value);
      
      this.getCitiesByStateC(this.selectedState);
     
      this.profileForm.get('corrsCity').setValue(this.perCity.value);
      this.profileForm.get('corrsPostcode').setValue(this.perPostcode.value);
      this.profileForm.get('corrsTelephone').setValue(this.perTelephone.value);
      // this.isMalaysianChk(this.countryCode);
    }
    else
    {
      this.profileForm.get('corrsAddress1').setValue("");
      this.profileForm.get('corrsAddress2').setValue("");
      this.profileForm.get('corrsAddress3').setValue("");
      this.profileForm.get('corrsCountry').setValue("");
      this.profileForm.get('corrsState').setValue("");
      this.profileForm.get('corrsCity').setValue("");
      this.profileForm.get('corrsPostcode').setValue("");
      this.profileForm.get('corrsTelephone').setValue("");
    }
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = [];
    this.events.push(`${event.value}`);
    this.dt = new Date(this.events[0]).getTime();
    // console.log(this.dt)
  }

  edit(){
    // console.log(this.isActive)
    // debugger
    this.isActive = !this.isActive;
    
    if(this.isActive != false) {
      this.toastr.info(this.translate.instant('profile.msg.editbtnE'), '');
      this.initial = false
      this.profileForm.enable()
      this.dob.enable();
    } else {
      this.toastr.info(this.translate.instant('profile.msg.editbtnD'), '');
      this.initial = true
      this.profileForm.disable()
      this.dob.disable();
    }
  }
  
  updateProfile(formValues:any) {
    let getUsrID = localStorage.getItem('usrID');

    let body = {
      "date_joined": null,
      "fullname": null,
      "ic_number": null,
      "email": null,
      "dob": null,
      "gender": null,
      "race": null,
      "religion": null,
      "corresponding_address1": null,
      "corresponding_address2": null,
      "corresponding_address3": null,
      "corresponding_postcode":null,
      "corresponding_country":null,
      "corresponding_state":null,
      "corresponding_city":null,
      "corresponding_home_phone":null,
      "mobile_phone":null,
      "permanent_address1":null,
      "permanent_address2":null,
      "permanent_address3":null,
      "permanent_postcode":null,
      "permanent_city":null,
      "permanent_state":null,
      "permanent_country":null,
      "permanent_home_phone":null,
      "dateTime": null,
      "lang": null,
      "citizenType":null,
      "user_id": null
    };
  
    body.date_joined = this.regdate;
    body.fullname = this.fullname;
    body.ic_number = this.idno;
    body.email = this.regemail;
    body.dob = this.dt;
    body.race = formValues.race;
    body.gender = formValues.gender;
    body.religion = formValues.religion;
    body.permanent_address1 = formValues.perAddress1;
    body.permanent_address2 = formValues.perAddress2;
    body.permanent_address3 = formValues.perAddress3;
    body.permanent_postcode = formValues.perPostcode;
    body.permanent_country = formValues.perCountry;
    body.permanent_state = formValues.perState;
    body.permanent_city = formValues.perCity;
    body.permanent_home_phone = formValues.perTelephone;
    body.corresponding_address1 = formValues.corrsAddress1;
    body.corresponding_address2 = formValues.corrsAddress2;
    body.corresponding_address3 = formValues.corrsAddress3;
    body.corresponding_country = formValues.corrsCountry;
    body.corresponding_state = formValues.corrsState;
    body.corresponding_city = formValues.corrsCity;
    body.corresponding_postcode = formValues.corrsPostcode;
    body.corresponding_home_phone = formValues.corrsTelephone;
    body.mobile_phone = formValues.corrsMobile;
    body.dateTime = new Date().getTime();
    body.user_id = localStorage.getItem('usrID');
    body.lang = localStorage.getItem("langID");
  
    // console.log(JSON.stringify(body));
    // console.log(body);
    // window.rel

    this.protectedService.updateProfile(body)
    .subscribe(
      data => {
        this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        this.profileForm.disable();
      },
      error => {
        this.toastr.error(this.translate.instant('profile.err.updatefail'), '');
      });
  }

  toFormGroup(data: any) {
    let group: any = {}
    data.forEach(itm => {
      group[itm.id] = itm.validation[0].required ? new FormControl(itm.value || '', Validators.required)
        : new FormControl(itm.value || '');
    });
    return new FormGroup(group)
  }
  
  
} 