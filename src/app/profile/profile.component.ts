import { Component, OnInit, Inject, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
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
//import { debug } from 'util';
import { ToastrService } from "ngx-toastr";
import { forEach } from '@angular/router/src/utils/collection';
// import { SlicePipe } from '@angular/common/src/pipes';
// import { ControlBase } from '../common/controlbase'
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
@Component({
  templateUrl: './profile.component.html',
  selector: 'myprofile',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  addressId: any;
  roles: any;
  agencyForwardUrl: any;
  isMyIdentityValid: any;
  isMyIdentityVerfied: any;
  isStaff: any;
  accountStatus: any;
  countryId: any;
  userTypeId: any;
  selectedCountry: any;
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
  initial = true;
  countries:any[]
  fullname:string;
  countryCode:string;
  countryName:any[];
  nationality:any;
  passport:any;
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
  dateFormatExample: string;
  
  date = new Date();
  public dob: FormControl
  public gender: FormControl
  public race: FormControl
  public religion: FormControl
  public perAddress1 : FormControl
  public perAddress2 : FormControl
  public perAddress3 : FormControl
  public perCountry: FormControl
  public perStateLocal: FormControl
  public perStateNotLocal: FormControl
  public perCityLocal: FormControl
  public perCityNotLocal: FormControl
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
  userId:any;
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
    @Inject(APP_CONFIG) private config: AppConfig, 
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
    
    this.getUserData();
    // this.getUserProfile();
    this.getCountry();
    this.dob = new FormControl()
    this.gender = new FormControl()
    this.race = new FormControl()
    this.religion = new FormControl()
    this.perAddress1 = new FormControl()
    this.perAddress2 = new FormControl()
    this.perAddress3 = new FormControl()
    this.perCountry = new FormControl()
    this.perStateLocal = new FormControl()
    this.perStateNotLocal = new FormControl()
    this.perCityLocal = new FormControl()
    this.perCityNotLocal = new FormControl()
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
      perStateLocal: this.perStateLocal,
      perStateNotLocal: this.perStateNotLocal,
      perCityLocal: this.perCityLocal,
      perCityNotLocal: this.perCityNotLocal,
      perPostcode: this.perPostcode,
      perTelephone: this.perTelephone,
      corrsAddress1: this.corrsAddress1,
      corrsAddress2: this.corrsAddress2,
      corrsAddress3: this.corrsAddress3,
      corrsCountry: this.corrsCountry,
      corrsState: this.corrsState,
      checkboxValue: this.checkboxValue,
      corrsCity: this.corrsCity,
      corrsPostcode: this.corrsPostcode,
      corrsTelephone: this.corrsTelephone,
      corrsMobile: this.corrsMobile,
    });

    this.profileForm.disable();
  }

  getUserData(){
    this.protectedService.getUser().subscribe(
      data => {
        if(data.user){
          // this.fullname = data.user.fullName;
          this.userTypeId = data.user.userType.userTypeId;

          this.protectedService.getProfile(data.user.pid).subscribe(
            data => {
              console.log(data);
              this.fullname = data.user.fullName;
              this.accountStatus = data.user.accountStatus.accountStatusId
              this.nationality = data.user.country.countryName;
              this.countryCode = data.user.country.countryCode;
              this.passport = data.user.passportNo;
              this.countryId = data.user.country.countryId;
              this.isStaff = data.user.isStaff;
              this.isMyIdentityVerfied = data.user.isMyIdentityVerified;
              this.isMyIdentityValid = data.user.isMyIdentityValid;
              this.agencyForwardUrl = data.user.agencyForwardUrl;
              this.roles = data.user.roles;
              this.addressId = data.user.address.addressId;
              this.isMalaysian(this.countryCode);
              this.isMalaysianChk(this.countryCode);
              // this.getCountryByCode(getUsrNationality);
              // this.isUserRegLocal(getUsrNationality);
              this.userId = data.user.userId;
              this.idno = data.user.pid;
              if(this.isRegLocal == true) 
                this.maxDate = this.getMinDobDate(this.idno);
              
              this.regemail = data.user.email;
              this.regdate = data.user.registrationDate;
              this.mobileNo = data.user.mobilePhoneNo;
              
              if(data.user.gender)
                  this.profileForm.get('gender').setValue(data.user.gender.genderId);
              
              if(data.user.race)
                  this.profileForm.get('race').setValue(data.user.race.raceId);

              if(data.user.religion)
                  this.profileForm.get('religion').setValue(data.user.religion.religionId);

              if(data.user.address){
                this.profileForm.get('perAddress1').setValue(data.user.address.permanentAddress1);
                this.profileForm.get('perAddress2').setValue(data.user.address.permanentAddress2);
                this.profileForm.get('perAddress3').setValue(data.user.address.permanentAddress3);
                this.selectedCountry = data.user.address.permanentAddressCountry.countryCode;
                this.profileForm.get('perCountry').setValue(data.user.address.permanentAddressCountry.countryId);
                this.profileForm.get('perPostcode').setValue(data.user.address.permanentAddressPostcode);
                this.profileForm.get('perTelephone').setValue(data.user.address.homePhoneNo);
      
                if(data.user.address.permanentAddressState != null) {
                  if(data.user.address.permanentAddressCountry.countryId == 152) {
                    debugger;
                    // this.isLocal = true;
                    // this.getState(data.user.address.permanentAddressState.stateId);
                    // this.getCitiesByStateP(data.user.address.permanentAddressCity.cityId);
                    // debugger;
                    // // this.profileForm.get('perStateLocal').setValue(data.user.address.permanentAddressState.stateId);
                    // this.selectedState = this.profileForm.get('perStateLocal').value;
                    // this.profileForm.get('perCityLocal').setValue(data.user.address.permanentAddressCity.cityId); 
                    // this.selectedCity = this.profileForm.get('perCityLocal').value;
                  } else {
                    // this.isLocal = false;
                    // this.profileForm.get('perStateNotLocal').setValue(data.user.address.permanentAddressState.stateId);
                    // this.selectedState = this.profileForm.get('perStateNotLocal').value;
                    // this.profileForm.get('perCityNotLocal').setValue(data.user.address.permanentAddressCity.cityId); 
                    // this.selectedCity = this.profileForm.get('perCityNotLocal').value;
                  }
                }
              }
              
              
              // if(data.user.same_address != true) {
              //   this.profileForm.get('corrsAddress1').setValue(data[0].corresponding_address1);
              //   this.profileForm.get('corrsAddress2').setValue(data[0].corresponding_address2);
              //   this.profileForm.get('corrsAddress3').setValue(data[0].corresponding_address3);
              //   this.profileForm.get('corrsCountry').setValue(data[0].corresponding_country);
              //   this.profileForm.get('corrsCity').setValue(data[0].corresponding_city);
      
              //   if(this.isCorrsLocal)
              //     this.getCitiesByStateC(data[0].corresponding_state);
      
              //   this.profileForm.get('corrsState').setValue(data[0].corresponding_state);
              //   this.profileForm.get('corrsPostcode').setValue(data[0].corresponding_postcode);
              //   this.profileForm.get('corrsMobile').setValue(data[0].mobile_phone);
              //   this.profileForm.get('corrsTelephone').setValue(data[0].corresponding_home_phone
              //   );
              // } else {
              //   this.profileForm.get('checkboxValue').setValue(data[0].same_address);
              //   this.profileForm.get('corrsTelephone').setValue(data[0].permanent_home_phone);
              //   this.profileForm.get('corrsAddress1').setValue(data[0].permanent_address1);
              //   this.profileForm.get('corrsAddress2').setValue(data[0].permanent_address2);
              //   this.profileForm.get('corrsAddress3').setValue(data[0].permanent_address3);
              //   this.profileForm.get('corrsCountry').setValue(data[0].permanent_country);
              //   this.profileForm.get('corrsState').setValue(data[0].permanent_state);
                
              //   if(this.isCorrsLocal)
              //     this.getCitiesByStateC(data[0].permanent_state);
      
              //   this.profileForm.get('corrsCity').setValue(data[0].permanent_city);
              //   this.profileForm.get('corrsPostcode').setValue(data[0].permanent_postcode);
              //   this.profileForm.get('corrsMobile').setValue(data[0].mobile_phone);
              // }
      
            },
            error => {
              console.log(error)
            }
          )
        }else{
          
        }
        
      },
    error => {
        location.href = this.config.urlUAP +'uapsso/Logout';
        //location.href = this.config.urlUAP+'portal/index';
      }
    )
  }

  
  getUserProfile(){
    let getUsrID = localStorage.getItem('usrID');
    let getUsrNationality = localStorage.getItem('userNationality');
    // console.log(getUsrNationality);
    // debugger;
    this.protectedService.getProfile(getUsrID).subscribe(
      data => {
        console.log(data);
        this.fullname = data[0].fullname;
        this.nationality = data[0].country.countryName;
        this.countryCode = data[0].permanent_country;

        this.isMalaysian(this.countryCode);
        this.isMalaysianChk(data[0].corresponding_country);
        this.getCountryByCode(getUsrNationality);
        this.isUserRegLocal(getUsrNationality);
        
        this.idno = data[0].pid;
        if(this.isRegLocal == true) 
          this.maxDate = this.getMinDobDate(this.idno);
        
        this.regemail = data[0].email;
        this.regdate = data[0].date_joined;
        this.mobileNo = data[0].mobile_phone;
        this.profileForm.get('gender').setValue(data[0].gender);
        // this.profileForm.get('dob').setValue(data[0].dob);
        this.profileForm.get('race').setValue(data[0].race);
        this.profileForm.get('religion').setValue(data[0].religion);
        this.profileForm.get('perAddress1').setValue(data[0].permanent_address1);
        this.profileForm.get('perAddress2').setValue(data[0].permanent_address2);
        this.profileForm.get('perAddress3').setValue(data[0].permanent_address3);
        this.selectedCountry = data[0].permanent_country;
        this.profileForm.get('perCountry').setValue(this.selectedCountry);
        this.profileForm.get('perPostcode').setValue(data[0].permanent_postcode);
        this.profileForm.get('perTelephone').setValue(data[0].permanent_home_phone);

        if(data[0].permanent_state != null) {
          if(data[0].permanent_country == "MY") {
            this.getCitiesByStateP(data[0].permanent_state);

            this.profileForm.get('perStateLocal').setValue(data[0].permanent_state);
            this.selectedState = this.profileForm.get('perStateLocal').value;
            this.profileForm.get('perCityLocal').setValue(data[0].permanent_city); 
            this.selectedCity = this.profileForm.get('perCityLocal').value;
          } else {
            this.profileForm.get('perStateNotLocal').setValue(data[0].permanent_state);
            this.selectedState = this.profileForm.get('perStateNotLocal').value;
            this.profileForm.get('perCityNotLocal').setValue(data[0].permanent_city); 
            this.selectedCity = this.profileForm.get('perCityNotLocal').value;
          }
        }
        
        if(data[0].same_address != true) {
          this.profileForm.get('corrsAddress1').setValue(data[0].corresponding_address1);
          this.profileForm.get('corrsAddress2').setValue(data[0].corresponding_address2);
          this.profileForm.get('corrsAddress3').setValue(data[0].corresponding_address3);
          this.profileForm.get('corrsCountry').setValue(data[0].corresponding_country);
          this.profileForm.get('corrsCity').setValue(data[0].corresponding_city);

          if(this.isCorrsLocal)
            this.getCitiesByStateC(data[0].corresponding_state);

          this.profileForm.get('corrsState').setValue(data[0].corresponding_state);
          this.profileForm.get('corrsPostcode').setValue(data[0].corresponding_postcode);
          this.profileForm.get('corrsMobile').setValue(data[0].mobile_phone);
          this.profileForm.get('corrsTelephone').setValue(data[0].corresponding_home_phone
          );
        } else {
          this.profileForm.get('checkboxValue').setValue(data[0].same_address);
          this.profileForm.get('corrsTelephone').setValue(data[0].permanent_home_phone);
          this.profileForm.get('corrsAddress1').setValue(data[0].permanent_address1);
          this.profileForm.get('corrsAddress2').setValue(data[0].permanent_address2);
          this.profileForm.get('corrsAddress3').setValue(data[0].permanent_address3);
          this.profileForm.get('corrsCountry').setValue(data[0].permanent_country);
          this.profileForm.get('corrsState').setValue(data[0].permanent_state);
          
          if(this.isCorrsLocal)
            this.getCitiesByStateC(data[0].permanent_state);

          this.profileForm.get('corrsCity').setValue(data[0].permanent_city);
          this.profileForm.get('corrsPostcode').setValue(data[0].permanent_postcode);
          this.profileForm.get('corrsMobile').setValue(data[0].mobile_phone);
        }

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
    // console.log(regCountry);

    if(regCountry == "MY") {
      this.isRegLocal = true;
      this.dateFormatExample = " ";
    } else {
      this.isRegLocal = false;
      this.dateFormatExample = "dd/mm/yyyy";
    }
  }
  
  isMalaysian(val) {
    this.selectedCountry = val;
    // this.profileForm.get('perCountry').setValue(this.selectedCountry);
    
    this.isChanged();
    if(val == 152) {
      this.isLocal = true;
      this.addLocalCtrl();
      // this.profileForm.get('perStateLocal').setValue("");
      // this.profileForm.get('perCityLocal').setValue("");
      // this.toastr.info(this.translate.instant('this.isLocal: '+this.isLocal), '');
      this.getState();
    } else {
      this.isLocal = false;
      this.RemoveLocalCtrl();
      // this.profileForm.get('perStateNotLocal').setValue("");
      // this.profileForm.get('perCityNotLocal').setValue("");
    }
  }

  isMalaysianChk(val) {
    // console.log(val);

    this.isChanged();
    if(val == 152) {
      this.isLocal = true;
      this.getState();
      this.isCorrsLocal = true;
    } else {
      this.isLocal = false;
      this.isCorrsLocal = false;
      this.profileForm.get('corrsState').setValue("");
      this.profileForm.get('corrsCity').setValue("");

    }
    this.checkReqValues();
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
    if(this.isRegLocal == true) {
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
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }
  
  getCountry(){
        return this.sharedService.getCountryData()
          .subscribe(resCountryData => {
            this.countries = resCountryData;
          },
          Error => {
            this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
          });
  }

  getCountryByCode(cntyCode){
      return this.sharedService.getCountrybyCode(cntyCode)
        .subscribe(resCountryData => {
          this.countryName = resCountryData;
        },
        Error => {
         this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
       });
  }
  
  getCitiesByState(e){
      this.isStateChanged();
      this.selectedState = e.value;
      return this.sharedService.getCitiesbyState(e.value)
        .subscribe(resCityData => {
          if(e.source.ngControl.name == "perStateLocal") {
            this.getPerCityData = resCityData;
          } else {
            this.getCorrsCityData = resCityData;
          }
        },
        Error => {
         this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
       });
  }

  getCitiesByStateP(e){
    if(e){
      return this.sharedService.getCitiesbyState(e)
      .subscribe(resCityData => {
        this.getPerCityData = resCityData;
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
    }
  }

  getCitiesByStateC(e){
    if(e){
      return this.sharedService.getCitiesbyState(e)
      .subscribe(resCityData => {
        this.getCorrsCityData = resCityData;
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
    }
  }

  getCity(e){
    this.selectedCity = e.value;
  }
  
  getState(id?){
    return this.sharedService.getStateData()
     .subscribe(resStateData => {
        this.getStateData = resStateData;
        if(id){
          debugger;
          this.profileForm.get('perStateLocal').setValue(id);
        }
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  getReligion(){
    return this.sharedService.getReligion(localStorage.getItem('langID'))
    .subscribe(religionData => {
      this.getReligionData = religionData
    },
    Error => {
     this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
   });
  }

  getRace(){
    return this.sharedService.getRace(localStorage.getItem('langID'))
      .subscribe(raceData => {
        this.getRaceData = raceData
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
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
      this.checkReqValues();
  }

  isStateChanged() {
    this.isChanged();
    this.checkReqValues();
  }

  isChecked(e) {

    if(e.checked)
    {
      this.isCorrsLocal = this.isLocal;
      this.profileForm.get('corrsAddress1').setValue(this.perAddress1.value);
      this.profileForm.get('corrsAddress2').setValue(this.perAddress2.value);
      this.profileForm.get('corrsAddress3').setValue(this.perAddress3.value);
      this.profileForm.get('corrsCountry').setValue(this.perCountry.value);
      this.profileForm.get('corrsState').setValue(this.perStateLocal.value);
      
      if(this.isLocal)
        this.getCitiesByStateC(this.perStateLocal.value);
     
      this.profileForm.get('corrsCity').setValue(this.perCityLocal.value);
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
    console.log(e.checked);
    this.checkReqValues();
  }
  
  addLocalCtrl() {
    this.profileForm.addControl('perStateLocal', this.perStateLocal);
    this.profileForm.addControl('perCityLocal', this.perCityLocal);
    if(this.isActive && this.isLocal) {
      this.profileForm.get('perStateLocal').enable();
      this.profileForm.get('perCityLocal').enable();
    }
    this.profileForm.removeControl('perStateNotLocal');
    this.profileForm.removeControl('perCityNotLocal');
    // this.resetCitizenCtrl();
  }

  RemoveLocalCtrl() {
      this.profileForm.removeControl('perStateLocal');
      this.profileForm.removeControl('perCityLocal');
      this.profileForm.addControl('perStateNotLocal',this.perStateLocal);
      this.profileForm.addControl('perCityNotLocal', this.perCityLocal);
      if(this.isActive && !this.isLocal) {
        this.profileForm.get('perStateNotLocal').enable();
        this.profileForm.get('perCityNotLocal').enable();
      }
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = [];
    this.events.push(`${event.value}`);
    this.dt = new Date(this.events[0]).getTime();
    this.dateFormatExample = "";
    // console.log(this.dt)
  }

  edit(){
    // debugger
    this.isActive = !this.isActive;
    
    if(this.isActive != false) {
      console.log("edit enabled")
      console.log(this.selectedCountry + " | " + this.selectedState  + " | " + this.selectedCity)

      this.toastr.info(this.translate.instant('profile.msg.editbtnE'), '');
      // this.initial = false
      this.profileForm.enable()
      this.dob.enable();
      this.checkReqValues();
    } else {
      console.log(this.profileForm.value);
      // this.toastr.info(this.translate.instant('profile.msg.editbtnD'), '');
      this.initial = true
      this.profileForm.disable()
      this.dob.disable();
    }
  }

  checkReqValues() {
    let gdr = this.profileForm.get('gender').value;
    let pAdd1 = this.profileForm.get('perAddress1').value;
    let pCountry = this.profileForm.get('perCountry').value;
    let pPCode = this.profileForm.get('perPostcode').value;
    let pState;
    let pCity;

    if(this.isLocal){
      pState = this.profileForm.get('perStateLocal').value;
      pCity = this.profileForm.get('perCityLocal').value;
    } else {
      pState = this.profileForm.get('perStateNotLocal').value;
      pCity = this.profileForm.get('perCityNotLocal').value;
    }

    let reqVal:any = [ gdr, pAdd1, pCountry, pState, pCity, pPCode ];

    // if(gdr != null && pAdd1 != null && pCountry != null && pCity != null && pState != 0 && pPCode != null) {
    if(pCountry !== null) {
      
      if(this.isActive)
      this.initial = false;
    } else {
      // this.toastr.error(this.translate.instant('Country error!'), '');
      this.initial = true;
    }

    // if(this.isActive)
    //   console.log(reqVal);

  }
  
  updateProfile(formValues:any) {
    let getUsrID = localStorage.getItem('usrID');

let bodyUpdate = 

    {
      "userId": null,
      "pid": null,
      "userType": {
        "userTypeId": null
      },
      "fullName": null,
      "firstName": null,
      "lastName": null,
      "dateOfBirth": null,
      "country": {
          "countryId": null
      },
      "gender": {
          "genderId": null
      },
      "race": {
          "raceId": null
      },
      "religion": {
          "religionId":null
      },
      "email": null,
      "mobilePhoneNo": null,
      "registrationDate": null,

      "accountStatus":{
        "accountStatusId":null
      },
     
      "isStaff": null,
      "isMyIdentityVerified": null,
      "isMyIdentityValid": null,
      "agencyForwardUrl": null,
      "roles":null,
      
      "address": {
          "addressId": null,
          "permanentAddress1":null,
          "permanentAddress2":null,
          "permanentAddress3":null,
          "correspondingAddress1":null,
          "correspondingAddress2": null,
          "correspondingAddress3": null,
          "permanentAddressCountry": {
              "countryId":null
          },
          "permanentAddressState": {
              "stateId": null    
          },
          "permanentAddressCity": {
              "cityId": null
          },
          "correspondingAddressCountry": {
              "countryId": null
          },
          "correspondingAddressState": {
              "stateId": null
          },
          "correspondingAddressCity": {
              "cityId": null
          },
          "permanentAddressPostcode": null,
          "correspondingAddressPostcode": null,
          "permanentAddressHomePhoneNo": null,
          "correspondingAddressHomePhoneNo": null,
          "sameAddressFlag": null
      }
  };


    bodyUpdate.accountStatus.accountStatusId = this.accountStatus; 
    bodyUpdate.userId = this.userId;
    bodyUpdate.pid = this.idno;
    bodyUpdate.userType.userTypeId = this.userTypeId;
    bodyUpdate.fullName = this.fullname;
    bodyUpdate.dateOfBirth = new Date(formValues.dob).getTime();
    bodyUpdate.country.countryId = this.countryId;
    bodyUpdate.gender.genderId = formValues.gender;
    bodyUpdate.race.raceId = formValues.race;
    bodyUpdate.religion.religionId = formValues.religion;
    bodyUpdate.isStaff = this.isStaff;
    bodyUpdate.isMyIdentityValid = this.isMyIdentityValid;
    bodyUpdate.isMyIdentityVerified = this.isMyIdentityVerfied;
    bodyUpdate.agencyForwardUrl = this.agencyForwardUrl;
    bodyUpdate.roles = this.roles;
    bodyUpdate.email = this.regemail;
    bodyUpdate.mobilePhoneNo = formValues.corrsMobile;
    bodyUpdate.registrationDate = this.regdate;
    bodyUpdate.address.addressId = this.addressId;
    bodyUpdate.address.permanentAddress1 = formValues.perAddress1;
    bodyUpdate.address.permanentAddress2 = formValues.perAddress2;
    bodyUpdate.address.permanentAddress3 = formValues.perAddress3;
    bodyUpdate.address.correspondingAddress1 = formValues.corresponding_address1;
    bodyUpdate.address.correspondingAddress2 = formValues.corresponding_address2;
    bodyUpdate.address.correspondingAddress3 = formValues.corresponding_address3;
    bodyUpdate.address.permanentAddressCountry.countryId = formValues.perCountry;
    
    if(this.isLocal) {
      bodyUpdate.address.permanentAddressState.stateId = formValues.perStateLocal;
      bodyUpdate.address.permanentAddressCity.cityId = formValues.perCityLocal;
    } else {
      bodyUpdate.address.permanentAddressState.stateId = formValues.perStateNotLocal;
      bodyUpdate.address.permanentAddressCity.cityId =  formValues.perCityNotLocal;
    }

    bodyUpdate.address.correspondingAddressCountry.countryId = formValues.corrsCountry;
    bodyUpdate.address.correspondingAddressState.stateId = formValues.corrsState;
    bodyUpdate.address.correspondingAddressCity.cityId = formValues.corrsCity;
    bodyUpdate.address.permanentAddressPostcode = formValues.perPostcode;
    bodyUpdate.address.correspondingAddressPostcode = formValues.corrsPostcode;
    bodyUpdate.address.permanentAddressHomePhoneNo = formValues.perTelephone;
    bodyUpdate.address.correspondingAddressHomePhoneNo = formValues.corrsTelephone;
    bodyUpdate.address.sameAddressFlag = formValues.checkboxValue;



    this.checkReqValues();

    console.log(this.initial);
    console.log(this.profileForm.invalid)
        console.log(formValues);
        console.log(this.profileForm.value);
    this.protectedService.updateProfile(bodyUpdate)
    .subscribe(
      data => {
        this.isActive = false;
        this.initial = true;
        this.profileForm.invalid;
        // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
        this.profileForm.disable();
      },
      error => {
        this.toastr.error(this.translate.instant('profile.err.updateFail'), '');
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
