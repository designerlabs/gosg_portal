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
  getPerPostData: any[];
  getCorrsPostData: any[];
  getCorrsData: any;
  perPostCode:any;
  corrsPostCode: any;
  getPostData: any;
  initialBtn: boolean;
  isSameAddressValue: any;
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
 getPerPostCodeFlag = false;

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
  
  date = new FormControl(new Date());
  serializedDate;
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
  public percodeTele: FormControl
  public corrsAddress1: FormControl
  public corrsAddress2: FormControl
  public corrsAddress3: FormControl
  public corrsCountry: FormControl
  public corrsStateLocal: FormControl
  public corrsStateNotLocal: FormControl
  public corrsCityLocal: FormControl
  public corrsCityNotLocal: FormControl
  public checkboxValue: FormControl
  public corrsCity: FormControl
  public corrsPostcode: FormControl
  public corrsTelephone: FormControl
  public corrscodeTelefon: FormControl
  public corrsMobile: FormControl
  public mobilecodeTelefon: FormControl
  public uid: any
  public regData: any[]
  countryList:string;
  idno:string;
  userId:any;
  mobileNo: any;
  regemail:string;
  regdate:string;
  lang = this.lang;
  languageId = this.languageId;


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
   
    ) {
      this.lang = translate.currentLang;
      this.languageId = 2;
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
                  this.getRace(this.languageId);
                  this.getReligion(this.languageId );
                  this.getGenderVal(this.languageId);
              });
              
  }

  ngOnInit() {
    this.initialBtn = true;
   
    let today = new Date();
    let todayDt = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth();

    this.maxDate = new Date(year, month, todayDt);
    this.getRace(this.languageId );
    this.getGenderVal(this.languageId );
    this.getReligion(this.languageId );
    this.maskForeigner = this.validateService.getMask().telephone;
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
    this.percodeTele = new FormControl()
    this.corrsAddress1 = new FormControl()
    this.corrsAddress2 = new FormControl()
    this.corrsAddress3 = new FormControl()
    this.corrsCountry = new FormControl()
    this.corrsStateLocal = new FormControl()
    this.corrsStateNotLocal = new FormControl()
    this.corrsCityLocal = new FormControl()
    this.corrsCityNotLocal = new FormControl()
    this.checkboxValue = new FormControl()
    this.corrsCity = new FormControl()
    this.corrsPostcode = new FormControl()
    this.corrsTelephone = new FormControl()
    this.corrscodeTelefon = new FormControl()
    this.corrsMobile = new FormControl()
    this.mobilecodeTelefon = new FormControl()

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
      percodeTele: this.percodeTele,
      corrsAddress1: this.corrsAddress1,
      corrsAddress2: this.corrsAddress2,
      corrsAddress3: this.corrsAddress3,
      corrsCountry: this.corrsCountry,
      corrsStateLocal: this.corrsStateLocal,
      corrsStateNotLocal: this.corrsStateNotLocal,
      corrsCityLocal: this.corrsCityLocal,
      corrsCityNotLocal: this.corrsCityNotLocal,
      checkboxValue: this.checkboxValue,
      corrsCity: this.corrsCity,
      corrsPostcode: this.corrsPostcode,
      corrsTelephone: this.corrsTelephone,
      corrscodeTelefon: this.corrscodeTelefon,
      corrsMobile: this.corrsMobile,
      mobilecodeTelefon: this.mobilecodeTelefon
    });

    this.profileForm.disable();
  }

  getUserData(){
    this.getPerPostCodeFlag = false;
    this.protectedService.getUser().subscribe(
      data => {
        if(data.user){
          debugger;
          // this.fullname = data.user.fullName;
          this.userTypeId = data.user.userType.userTypeId;

          this.protectedService.getProfile(data.user.pid).subscribe(
            data => {
              if(data.user) {
                this.userId = data.user.userId;
                this.fullname = data.user.fullName;
                this.accountStatus = data.user.accountStatus.accountStatusId;
                this.nationality = data.user.country.countryName;
                this.countryId = data.user.country.countryId;
                this.passport = data.user.passportNo;
                this.idno = data.user.pid;
                this.regemail = data.user.email;
                this.regdate = data.user.registrationDate;
                this.isStaff = data.user.isStaff;
                this.isMyIdentityVerfied = data.user.isMyIdentityVerified;
                this.isMyIdentityValid = data.user.isMyIdentityValid;
                this.agencyForwardUrl = data.user.agencyForwardUrl;
                this.roles = data.user.roles;

    
                if (data.user.mobilePhoneNo && (data.user.mobilePhoneNo).split('*').length > 1) {
                  const telenum = (data.user.mobilePhoneNo).split('*')[1];
                  this.profileForm.get('corrsMobile').setValue(telenum);
                  const telecode = (data.user.mobilePhoneNo).split('*')[0];
                  this.profileForm.get('mobilecodeTelefon').setValue(telecode);
                }else {
                  this.profileForm.get('corrsMobile').setValue((data.user.mobilePhoneNo));
                }

                if(data.user.gender){
                  this.profileForm.get('gender').setValue(data.user.gender.genderCode);
                }

                if(data.user.race){
                  this.profileForm.get('race').setValue(data.user.race.raceCode);
                }
              
                if(data.user.dateOfBirth){
                  //this.serializedDate = new FormControl((new Date(data.user.dateOfBirth)).toISOString());
                  this.dt = data.user.dateOfBirth;
                  //let dobVal = new FormControl((new Date(data.user.dateOfBirth)).toISOString());
                  //this.profileForm.get('dob').setValue(dobVal);
                }
                if(data.user.religion){
                  this.profileForm.get('religion').setValue(data.user.religion.religionCode);
                }
                
                if(data.user.address){
                  this.isSameAddressValue = data.user.address.sameAddressFlag;
                  this.isSameAddressChk();
                  this.addressId = data.user.address.addressId;
                  this.profileForm.get('perAddress1').setValue(data.user.address.permanentAddress1);
                  this.profileForm.get('perAddress2').setValue(data.user.address.permanentAddress2);
                  this.profileForm.get('perAddress3').setValue(data.user.address.permanentAddress3);
                  // this.profileForm.get('perPostcode').setValue(data.user.address.permanentAddressPostcode);
                  // this.profileForm.get('perTelephone').setValue(data.user.address.permanentAddressHomePhoneNo);
                  // if corressponding address have Country code
                  if (data.user.address.permanentAddressHomePhoneNo && (data.user.address.permanentAddressHomePhoneNo).split('*').length > 1) {
                    const perTelenum = (data.user.address.permanentAddressHomePhoneNo).split('*')[1];
                    this.profileForm.get('perTelephone').setValue(perTelenum);
                    const perTeleCode = (data.user.address.permanentAddressHomePhoneNo).split('*')[0];
                    this.profileForm.get('percodeTele').setValue(perTeleCode);
                  }else {
                    this.profileForm.get('perTelephone').setValue(data.user.address.permanentAddressHomePhoneNo);
                  }

                  if(data.user.address.permanentAddressCountry){
                    this.profileForm.get('perCountry').setValue(data.user.address.permanentAddressCountry.countryId);
                    if(data.user.address.permanentAddressCountry.countryId == 152) {
                      this.isLocal = true;
                      this.getState();
                      if(data.user.address.permanentAddressState){
                        this.profileForm.get('perStateLocal').setValue(data.user.address.permanentAddressState.stateId);
                      }

                      if(data.user.address.permanentAddressPostcode){
                        this.getPerPostCodeFlag = true;
                        this.perPostCode = data.user.address.permanentAddressCity.cityId;
                        //this.profileForm.get('perPostcode').setValue(data.user.address.permanentAddressPostcode.postcodeId);    
                      }
                      this.getCitiesByStateP(data.user.address.permanentAddressState.stateId);
                      if(data.user.address.permanentAddressCity){
                        this.profileForm.get('perCityLocal').setValue(data.user.address.permanentAddressCity.cityId);
                        
                      }
                       //this.getPostCodeByCityId(data.user.address.permanentAddressCity.cityId);                     

                      

                    }else{
                      this.isLocal = false;
                      if(data.user.address.optionalPermanentAddressState){
                        this.profileForm.get('perStateNotLocal').setValue(data.user.address.optionalPermanentAddressState);
                      }
                      if(data.user.address.optionalPermanentAddressCity){
                        this.profileForm.get('perCityNotLocal').setValue(data.user.address.optionalPermanentAddressCity); 
                      }
  
                      if(data.user.address.optionalPermanentAddressPostcode){
                        this.profileForm.get('perPostcode').setValue(data.user.address.optionalPermanentAddressPostcode); 
                      }

                      if(data.user.address.permanentAddressPostcode){
                        this.profileForm.get('perPostcode').setValue(data.user.address.permanentAddressPostcode);
                      }

                      
                    }
                  }
                  
                  

                  this.profileForm.get('corrsAddress1').setValue(data.user.address.correspondingAddress1);
                  this.profileForm.get('corrsAddress2').setValue(data.user.address.correspondingAddress2);
                  this.profileForm.get('corrsAddress3').setValue(data.user.address.correspondingAddress3);
                  this.profileForm.get('corrsPostcode').setValue(data.user.address.correspondingAddressPostcode);
                  // if corressponding address have Country code
                  if (data.user.address.correspondingAddressHomePhoneNo && (data.user.address.correspondingAddressHomePhoneNo).split('*').length > 1) {
                    const corrTeleNum = (data.user.address.correspondingAddressHomePhoneNo).split('*')[1];
                    this.profileForm.get('corrsTelephone').setValue(corrTeleNum);
                    const corrsTeleCode = (data.user.address.correspondingAddressHomePhoneNo).split('*')[0];
                    this.profileForm.get('corrscodeTelefon').setValue(corrsTeleCode);

                  }else {
                    this.profileForm.get('corrsTelephone').setValue(data.user.address.correspondingAddressHomePhoneNo);
                  }


                  if(data.user.address.correspondingAddressCountry){
                    this.profileForm.get('corrsCountry').setValue(data.user.address.correspondingAddressCountry.countryId);
                    if(data.user.address.correspondingAddressCountry.countryId == 152) {
                      this.isCorrsLocal = true;
                      
                      if(data.user.address.correspondingAddressState){
                        this.getState();
                        this.profileForm.get('corrsStateLocal').setValue(data.user.address.correspondingAddressState.stateId);
                      }

                      if(data.user.address.correspondingAddressCity){
                        this.getCitiesByStateC(data.user.address.correspondingAddressState.stateId);
                        this.profileForm.get('corrsCityLocal').setValue(data.user.address.correspondingAddressCity.cityId);
                        // this.postCodeObj2 = {value: data.user.address.correspondingAddressCity.cityId};
                      }
                      
                      
                    }else{
                      this.isCorrsLocal = false;
                      if(data.user.address.optionalCorrespondingAddressState){
                        this.profileForm.get('corrsStateNotLocal').setValue(data.user.address.optionalCorrespondingAddressState);
                      }
                      if(data.user.address.optionalCorrespondingAddressCity){
                        this.profileForm.get('corrsCityNotLocal').setValue(data.user.address.optionalCorrespondingAddressCity); 
                      }
  
                      if(data.user.address.optionalCorrespondingAddressPostcode){
                        this.profileForm.get('corrsPostcode').setValue(data.user.address.optionalCorrespondingAddressPostcode); 
                      }
                      
                    }
                  }
                  
                
                }
              }
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


  ngAfterViewInit() {
    
    this.maskForeigner = this.validateService.getMask().telephone;
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
    this.isChanged();
    if(val == 152) {
      this.isLocal = true;
      this.addLocalCtrl();
      this.getState();
    } else {
      this.isLocal = false;
      this.RemoveLocalCtrl();
    }
    let flr = this.countries.filter((element, index) => {
      return (element.countryId == val);
   });
   this.profileForm.get('percodeTele').setValue(flr[0].countryDialCode);
  }

  isMalaysianCorrs(val) {
    this.selectedCountry = val;
    // this.profileForm.get('perCountry').setValue(this.selectedCountry);
    this.isChanged();
    if(val == 152) {
      this.isCorrsLocal = true;
      this.addLocalCtrlCorrs();
      this.getState();
    } else {
      this.isCorrsLocal = false;
      this.RemoveLocalCtrlCorrs();
      this.profileForm.get('corrsStateLocal').setValue("");
      this.profileForm.get('corrsCityLocal').setValue("");
      this.profileForm.get('corrsPostcode').setValue("");
      // this.profileForm.get('perStateNotLocal').setValue("");
      // this.profileForm.get('perCityNotLocal').setValue("");
    }
    let flr = this.countries.filter((element, index) => {
      return (element.countryId == val);
   });
   this.profileForm.get('corrscodeTelefon').setValue(flr[0].countryDialCode);
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

  getRace(lang){
    return this.sharedService.getRace(lang)
      .subscribe(raceData => {
        this.getRaceData = raceData
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  getGenderVal(lang) {
    return this.sharedService.getGender(lang)
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



  getPostcodeByCityP(e){
    debugger;
    this.getPerPostCodeFlag = false;
    if(e){
      this.getPostCodeByCityId(e.value);
    }
  }

  getPostCodeByCityId(valId){

    let getCode = this.getPerCityData.filter(function(ele){
      return ele.cityId == valId;
    });
    return this.sharedService.getPostCodeData(getCode[0].cityCode)
    .subscribe(resCityData => {
      this.getPerPostData = resCityData;
      if (this.getPerPostCodeFlag){ //load post code
      this.profileForm.get('perPostcode').setValue(this.perPostCode);  
      }
    },
    Error => {
     this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
   });
  }

  getPostcodeByCityC(e){
    if(e){
      let getCode = this.getCorrsCityData.filter(function(ele){
        return ele.cityId == e.value;
      });
      return this.sharedService.getPostCodeData(getCode[0].cityCode)
      .subscribe(resCityData => {
        this.getCorrsPostData = resCityData;
        // this.profileForm.get('corrsPostcode').setValue(this.postCodeObj2.value);
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
    }
  }


  getCitiesByStateP(e){
    if(e){
      return this.sharedService.getCitiesbyState(e)
      .subscribe(resCityData => {
        this.getPerCityData = resCityData;  
        if (this.getPerPostCodeFlag){
          this.getPostCodeByCityId(this.perPostCode);
        }
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
        // this.getPostcodeByCityC(this.postCodeObj2);
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
    }
  }

  
  getState(id?){
    return this.sharedService.getStateData()
     .subscribe(resStateData => {
        this.getStateData = resStateData;
        if(id){
          this.profileForm.get('perStateLocal').setValue(id);
        }
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  getReligion(lang){
    return this.sharedService.getReligion(lang)
    .subscribe(religionData => {
      this.getReligionData = religionData
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
    if(this.profileForm.get('checkboxValue').value == true) {
      this.profileForm.get('checkboxValue').setValue(false);
      this.checkReqValues();
    }
  }

  isStateChanged() {
    this.isChanged();
    this.checkReqValues();
  }

  isSameAddressChk(){
    if(this.isSameAddressValue){
      this.profileForm.get('checkboxValue').setValue(true)
    }else{
      this.profileForm.get('checkboxValue').setValue(false);
    }
  }

  isSameAddress(){
    if(this.profileForm.get('checkboxValue').value == null) {
      this.profileForm.get('checkboxValue').setValue(false);
    }
  }

  isChecked(e) {

    if(e.checked)
    {
      this.isCorrsLocal = this.isLocal;
      this.profileForm.get('corrsAddress1').setValue(this.perAddress1.value);
      this.profileForm.get('corrsAddress2').setValue(this.perAddress2.value);
      this.profileForm.get('corrsAddress3').setValue(this.perAddress3.value);
      this.profileForm.get('corrsCountry').setValue(this.perCountry.value);

      if(this.perStateLocal.value){
        this.profileForm.get('corrsStateLocal').setValue(this.perStateLocal.value);
      }else if(this.perStateNotLocal.value){
        this.profileForm.get('corrsStateNotLocal').setValue(this.perStateNotLocal.value);
      }

      if(this.perCityLocal.value){
        this.profileForm.get('corrsCityLocal').setValue(this.perCityLocal.value);
      }else if(this.perStateNotLocal.value){
        this.profileForm.get('corrsCityNotLocal').setValue(this.perCityNotLocal.value);
      }
      
      this.profileForm.get('corrsPostcode').setValue(this.perPostcode.value);
      this.profileForm.get('corrsTelephone').setValue(this.perTelephone.value);
      // this.profileForm.get('percodeTele').setValue(this.percodeTele.value);

      if(this.isLocal)
        this.getCitiesByStateC(this.perStateLocal.value);
     


      // this.isMalaysianChk(this.countryCode);
    }
    else
    {
      this.profileForm.get('corrsAddress1').setValue("");
      this.profileForm.get('corrsAddress2').setValue("");
      this.profileForm.get('corrsAddress3').setValue("");
      this.profileForm.get('corrsCountry').setValue("");
      this.profileForm.get('corrsStateLocal').setValue("");
      this.profileForm.get('corrsCityLocal').setValue("");
      this.profileForm.get('corrsPostcode').setValue("");
      this.profileForm.get('corrsTelephone').setValue("");
      this.profileForm.get('corrsCityNotLocal').setValue("");
      this.profileForm.get('corrsStateNotLocal').setValue("");
      this.isCorrsLocal = false;
    }
    console.log(e.checked);
    this.checkReqValues();
  }
  
  
  addLocalCtrl() {
    if(this.isLocal){
      this.profileForm.get('perStateLocal').setValue("");
      this.profileForm.get('perCityLocal').setValue("");
      this.profileForm.get('perPostcode').setValue("");
      this.profileForm.removeControl('perStateLocal');
      this.profileForm.removeControl('perCityLocal');
      // this.profileForm.removeControl('perPostcode');
    }
    
    this.profileForm.addControl('perStateLocal', this.perStateLocal);
    this.profileForm.addControl('perCityLocal', this.perCityLocal);

    if(this.isActive && this.isLocal) {
      this.profileForm.get('perStateLocal').enable();
      this.profileForm.get('perCityLocal').enable();
    }
   
    // this.resetCitizenCtrl();
  }


  addLocalCtrlCorrs() {
    if(this.isCorrsLocal){
      this.profileForm.get('corrsStateLocal').setValue("");
      this.profileForm.get('corrsCityLocal').setValue("");
      this.profileForm.get('corrsPostcode').setValue("");
  
      this.profileForm.removeControl('corrsStateLocal');
      this.profileForm.removeControl('corrsCityLocal');
      // this.profileForm.removeControl('corrsPostcode');
    }
    
   

    this.profileForm.addControl('corrsStateLocal', this.corrsStateLocal);
    this.profileForm.addControl('corrsCityLocal', this.corrsCityLocal);

    if(this.isActive && this.isCorrsLocal) {
      this.profileForm.get('corrsStateLocal').enable();
      this.profileForm.get('corrsCityLocal').enable();
    }
   
    // this.resetCitizenCtrl();
  }
  

  RemoveLocalCtrl() {
    if(!this.isLocal){
      this.profileForm.get('perStateNotLocal').setValue("");
      this.profileForm.get('perCityNotLocal').setValue("");
      this.profileForm.get('perPostcode').setValue("");

      this.profileForm.removeControl('perStateNotLocal');
      this.profileForm.removeControl('perCityNotLocal');
      // this.profileForm.removeControl('perPostcode');
    }


      this.profileForm.addControl('perStateNotLocal',this.perStateNotLocal);
      this.profileForm.addControl('perCityNotLocal', this.perCityNotLocal);

      if(this.isActive && !this.isLocal) {
        this.profileForm.get('perStateNotLocal').enable();
        this.profileForm.get('perCityNotLocal').enable();
      }
  }



  RemoveLocalCtrlCorrs() {

    if(!this.isCorrsLocal){
      this.profileForm.get('corrsStateNotLocal').setValue("");
      this.profileForm.get('corrsCityNotLocal').setValue("");
      this.profileForm.get('corrsPostcode').setValue("");
  
      this.profileForm.removeControl('corrsStateNotLocal');
      this.profileForm.removeControl('corrsCityNotLocal');
      // this.profileForm.removeControl('corrsPostcode');
    }
    

      this.profileForm.addControl('corrsStateNotLocal',this.corrsStateNotLocal);
      this.profileForm.addControl('corrsCityNotLocal', this.corrsCityNotLocal);
      if(this.isActive && !this.isCorrsLocal) {
        this.profileForm.get('corrsStateNotLocal').enable();
        this.profileForm.get('corrsCityNotLocal').enable();
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
      this.initialBtn = false
      this.profileForm.enable()
      // this.dob.enable();
      this.checkReqValues();
    } else {
      console.log(this.profileForm.value);
      // this.toastr.info(this.translate.instant('profile.msg.editbtnD'), '');

      this.initialBtn = true
      // if((!!this.profileForm.get('gender').value.length && !!this.profileForm.get('race').value.length)){
      //   this.initialBtn = false;
      // }else{
      //   this.initialBtn = true
      // }
      //this.profileForm.get('race').setValue("");
      
      this.profileForm.disable()
      // this.dob.disable();
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

    if(formValues.checkboxValue == null){
      formValues.checkboxValue = false;
    }
let bodyUpdate = 

    {
      "userId": null,
      "pid": null,
      "userType": {
        "userTypeId": null
      },
      "fullName": null,
      "firstName": "",
      "lastName": "",
      "dateOfBirth": null,
      "country": {
          "countryId": null
      },
      "gender": {
          "genderCode": ""
      },
      "race": {
          "raceCode": ""
      },
      "religion": {
          "religionCode":""
      },
      "email": null,
      "mobilePhoneNo": null,
      "registrationDate": null,

      "accountStatus":{
        "accountStatusId":null
      },
      "identificationNo":null,
      "isStaff": null,
      "isMyIdentityVerified": null,
      "isMyIdentityValid": null,
      "agencyForwardUrl": null,
      "roles":null,
      "passportNo":null,
      "address": {
          "addressId": null,
          "permanentAddress1":"",
          "permanentAddress2":"",
          "permanentAddress3":"",
          "correspondingAddress1":"",
          "correspondingAddress2": "",
          "correspondingAddress3": "",
          "optionalCorrespondingAddressCity":"",
          "optionalCorrespondingAddressPostcode":"",
          "optionalCorrespondingAddressState":"",
          "optionalPermanentAddressCity":"",
          "optionalPermanentAddressPostcode":"",
          "optionalPermanentAddressState":"",
          
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
          "permanentAddressPostcode": {
            "postcodeId":null
          },
          "correspondingAddressPostcode": {
            "postcodeId":null
          },
          "permanentAddressHomePhoneNo": "",
          "correspondingAddressHomePhoneNo": "",
          "sameAddressFlag": false
      }
  };


    bodyUpdate.accountStatus.accountStatusId = this.accountStatus; 
    bodyUpdate.userId = this.userId;
    bodyUpdate.pid = this.idno;
    bodyUpdate.userType.userTypeId = this.userTypeId;
    bodyUpdate.fullName = this.fullname;
    bodyUpdate.dateOfBirth = new Date(this.dt).getTime();
    bodyUpdate.country.countryId = this.countryId;
    bodyUpdate.gender.genderCode = formValues.gender;
    bodyUpdate.race.raceCode = formValues.race;
    bodyUpdate.religion.religionCode = formValues.religion;
    bodyUpdate.isStaff = this.isStaff;
    bodyUpdate.isMyIdentityValid = this.isMyIdentityValid;
    bodyUpdate.isMyIdentityVerified = this.isMyIdentityVerfied;
    bodyUpdate.agencyForwardUrl = this.agencyForwardUrl;
    bodyUpdate.roles = this.roles;
    bodyUpdate.email = this.regemail;
    bodyUpdate.mobilePhoneNo = formValues.mobilecodeTelefon + '*' + formValues.corrsMobile;
    bodyUpdate.registrationDate = this.regdate;
    bodyUpdate.address.addressId = this.addressId;
    bodyUpdate.address.permanentAddress1 = formValues.perAddress1;
    bodyUpdate.address.permanentAddress2 = formValues.perAddress2;
    bodyUpdate.address.permanentAddress3 = formValues.perAddress3;
    bodyUpdate.address.correspondingAddress1 = formValues.corrsAddress1;
    bodyUpdate.address.correspondingAddress2 = formValues.corrsAddress2;
    bodyUpdate.address.correspondingAddress3 = formValues.corrsAddress3;
    bodyUpdate.address.permanentAddressCountry.countryId = formValues.perCountry;
    
    if(this.isLocal) {
      bodyUpdate.address.permanentAddressState.stateId = formValues.perStateLocal;
      bodyUpdate.address.permanentAddressCity.cityId = formValues.perCityLocal;
      bodyUpdate.address.permanentAddressPostcode.postcodeId = formValues.perPostcode;
    } else {
      bodyUpdate.address.optionalPermanentAddressState = formValues.perStateNotLocal;
      bodyUpdate.address.optionalPermanentAddressCity =  formValues.perCityNotLocal;
      bodyUpdate.address.optionalPermanentAddressPostcode = formValues.perPostcode;
    }

    if(this.isCorrsLocal) {
      bodyUpdate.address.correspondingAddressState.stateId = formValues.corrsStateLocal;
      bodyUpdate.address.correspondingAddressCity.cityId = formValues.corrsCityLocal;
      bodyUpdate.address.correspondingAddressPostcode.postcodeId = formValues.corrsPostcode;
    } else {
      bodyUpdate.address.optionalCorrespondingAddressState = formValues.corrsStateNotLocal;
      bodyUpdate.address.optionalCorrespondingAddressCity = formValues.corrsCityNotLocal;
      bodyUpdate.address.optionalCorrespondingAddressPostcode = formValues.corrsPostcode;
    }

    bodyUpdate.address.correspondingAddressCountry.countryId = formValues.corrsCountry;

    if(formValues.percodeTele && formValues.perTelephone) {
      bodyUpdate.address.permanentAddressHomePhoneNo = formValues.percodeTele + '*' + formValues.perTelephone;
    } else {
      bodyUpdate.address.permanentAddressHomePhoneNo = '';
    }

    if(formValues.corrscodeTelefon && formValues.corrsTelephone) {
      bodyUpdate.address.correspondingAddressHomePhoneNo = formValues.corrscodeTelefon + '*' + formValues.corrsTelephone;
    }else {
      bodyUpdate.address.correspondingAddressHomePhoneNo = '';
    }
    bodyUpdate.address.sameAddressFlag = formValues.checkboxValue;


    this.isSameAddress();
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
        this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
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
