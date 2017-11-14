import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../common/shared.service';
import { ValidateService } from '../common/validate.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ProtectedService } from '../-services/protected.service';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogsService } from '../dialogs/dialogs.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { ControlBase } from '../common/controlbase'

@Component({
  templateUrl: './profile.component.html',
  selector: 'myprofile',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  
  @ViewChild('perhomephone') homephone: ElementRef 
  @ViewChild('perPost') perPost: ElementRef
  @ViewChild('corsPost') corsPost: ElementRef
  @ViewChild('corshomephone') corshomephone : ElementRef
  @ViewChild('corsmobile') corsmobile : ElementRef

  
  
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
  isLocal: boolean;
  sameAsPermAdd: boolean;

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

  constructor(private router: Router, private validateService:ValidateService, private protectedService:ProtectedService, private sharedService:SharedService, private translate: TranslateService, private elementRef: ElementRef,private activatedRoute: ActivatedRoute) {
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
              });
              
  }

  ngOnInit() {

    this.getUserProfile()
    this.getCountry();
    // this.getCountryByCode();
    this.dob = new FormControl('',[Validators.required])
    this.gender = new FormControl()
    this.race = new FormControl()
    this.religion = new FormControl()
    this.perAddress1 = new FormControl('',[Validators.required])
    this.perAddress2 = new FormControl()
    this.perAddress3 = new FormControl()
    this.perCountry = new FormControl('',[Validators.required])
    this.perState = new FormControl()
    this.perCity = new FormControl()
    this.perPostcode = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern(5,5).numberOnly)])
    this.perTelephone = new FormControl('', [Validators.pattern(this.validateService.getPattern(10,14).numberOnly)])
    this.corrsAddress1 = new FormControl()
    this.corrsAddress2 = new FormControl()
    this.corrsAddress3 = new FormControl()
    this.corrsCountry = new FormControl()
    this.corrsState = new FormControl()
    this.checkboxValue = new FormControl()
    this.corrsCity = new FormControl()
    this.corrsPostcode = new FormControl('', [Validators.required, Validators.pattern(this.validateService.getPattern(5,5).numberOnly)])
    this.corrsTelephone = new FormControl('', [Validators.pattern(this.validateService.getPattern(10,14).numberOnly)])
    this.corrsMobile = new FormControl('', [Validators.pattern(this.validateService.getPattern(10,14).numberOnly)])

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

    // this.getGenderVal()
    this.profileForm.disable();
    // this.sameAsPermAdd = this.profileForm.get('PermAddCopy').value;
  }
  
  getUserProfile(){
    let getUsrID = localStorage.getItem('usrID');
    // debugger;
    this.protectedService.getProfile(getUsrID).subscribe(
      data => {
        console.log(data);
        this.fullname = data[0].fullname;
        this.countryCode = data[0].permanent_country;
        this.idno = data[0].ic_number;
        this.regemail = data[0].email;
        this.regdate = data[0].date_joined;
        this.mobileNo = data[0].mobile_phone;
        this.profileForm.get('perAddress1').setValue(data[0].permanent_address1);
        this.profileForm.get('perAddress2').setValue(data[0].permanent_address2);
        this.profileForm.get('perAddress3').setValue(data[0].permanent_address3);
        this.profileForm.get('perCity').setValue(data[0].permanent_city);
        this.profileForm.get('perState').setValue(data[0].permanent_state);
        this.profileForm.get('perCountry').setValue(data[0].perCountry);
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

        this.isLocal = this.isMalaysian(this.countryCode);
        if(this.isLocal == true) {
          this.birthdate = this.idno.split("-");
          this.birthdate = this.birthdate[0];
          console.log("isLocal");
        } else {
          console.log("isNotLocal");
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  ngAfterViewInit() {
    // this.profileService.toFormGroup(this.ctrlbase)
  }

  getGenderVal() {
    this.sharedService.getGender()
      .subscribe(resGenderData => {
        this.genderData = resGenderData
      })
  }

  getCountryByCode(){
      return this.sharedService.getCountrybyCode('MY')
        .subscribe(resCountryData => {
          this.countryName = resCountryData;
        })
  }

  getCountry(){
        return this.sharedService.getCountryData()
         .subscribe(resCountryData => {
            this.countries = resCountryData;
          });
  }
  

  validateFirstName(obj) {
    return obj.valid || obj.untouched
  }

  validateCtrlChk(ctrl: FormControl){
        // return ctrl.valid || ctrl.untouched
        return this.validateService.validateCtrl(ctrl);
  } 

  isMalaysian(cc) {
    if(cc == "MY") {
      return true;
    } else {
      return false;
    }
  }

  isChecked(e) {

    if(e.target.checked)
    {
      console.log('true')
    }
    else
    {
      console.log('false')
    }
  }
  
  updateProfile(formValues) {
    let getUsrID = localStorage.getItem('usrID');

    let body = {
      "dob": null,
      "gender": null,
      "race": null,
      "religion": null,
      "corresponding_address1": null,
      "corresponding_address2": null,
      "corresponding_address3": null,
      "corresponding_postcode":null,
      "corresponding_city":null,
      "corresponding_state":null,
      "corresponding_country":null,
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
  
    body.user_id = getUsrID;
    body.corresponding_address1 = formValues.corrsAddress1;
    body.corresponding_address2 = formValues.corrsAddress2;
    body.corresponding_address3 = formValues.corrsAddress3;
    body.corresponding_postcode = formValues.corrsPostcode;
    body.corresponding_home_phone = formValues.perTelephone;
    body.mobile_phone = formValues.corrsMobile;
    body.permanent_address1 = formValues.perAddress1;
    body.permanent_address2 = formValues.perAddress2;
    body.permanent_address3 = formValues.perAddress3;
    body.permanent_postcode = formValues.perPostcode;
    body.permanent_country = formValues.perCountry;
  
    // console.log(JSON.stringify(body));

    this.protectedService.updateProfile(body)
    .subscribe(
      data => {
        alert("Success");
        //  this.alertService.success('Registration successful', true);
          // this.router.navigate(['/portal/login']);
      },
      error => {
          alert('error');
          //this.alertService.error(error);
          //this.loading = false;
      });
  }

  edit(){
    // debugger
    this.initial = false
    this.profileForm.enable()
  }

  cancel() {
    console.log('hi')
    // this.router.navigate(['public'])
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