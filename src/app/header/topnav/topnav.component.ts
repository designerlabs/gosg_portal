import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { TopnavService } from './topnav.service';
import { NavService } from '../../header/nav/nav.service';
import {SharedService } from '../../common/shared.service';
import { debug } from 'util';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
let num = 0;
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit, AfterViewInit {
  
  translatedText: string;
  supportedLanguages: any[];
  colors: any[];
  selectedRow: Number;
  firstItem: boolean;
  minusBtn = false;
  plusBtn = false;
  admin: boolean;
  langId = this.langId;
  defaultColors: any;
  defaultFonts: any;
  fontTy(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  getThemeColors: any;
  getThemeFonts: any;

  ngAfterViewInit() {
      // this.loadCustomFontType();
  }

  @Input() edited = true;
  @Input() profileShow = true;
  @Input() sidenavShow = true;

  @Input() state:string;
  debugger;

  @Output() topNavClick = new EventEmitter();

  @Output() showProfile = new EventEmitter();

  @Output() showsidenav = new EventEmitter();

  constructor(private translate: TranslateService, 
    private topnavservice: TopnavService, 
    private sharedservice: SharedService, 
    private route: ActivatedRoute,
    private router: Router,
    private navService: NavService) {
    translate.addLangs(['en', 'ms']);

    if(localStorage.getItem('langID') == "2"){
      translate.setDefaultLang('ms');
      translate.use('ms');
    }else{
      translate.setDefaultLang('en');
      translate.use('en');
    }
    


    if (translate.getDefaultLang() == 'ms') {
      this.currlang = 'English';
      this.currlangMOB = 'EN';
      this.langId = 2;
    } else {
      this.currlang = 'Bahasa Malaysia';
      this.currlangMOB = 'BM';
      this.langId = 1;
    }
  }

  isActive;

  currlang: string = this.currlang;
  currlangMOB: string = this.currlangMOB;
  

  ngOnInit() {

    this.colors = this.topnavservice.getColors();
    this.loadFont();
    this.loadColor();
    this.loadDefaultFonts();
    this.loadDefaultColor();
    this.getLangID();
   
    console.log('topnav.comp.ts');

    this.getUserProfile();

    if(this.currlang == 'English'){
      this.isActive = true;
    }else{
      this.isActive = false;
    }
  }


  loadFont(){
    this.sharedservice.getThemeFont().subscribe(
      data => {
        this.getThemeFonts = data;
      }, err => {
        
      })
  }
  

  getLangID(){
    if(!localStorage.getItem('langID')){
      localStorage.setItem('langID', this.langId);
    }
  }

  getUserProfile(){
    console.log(this.state);
    let getUsrID = localStorage.getItem('usrID');
    if(getUsrID){
      this.admin = true;
    }else{
      this.admin = false;
    }
  }

  loadDefaultFonts(){
    this.sharedservice.getThemeFont().subscribe(
      data => {
        this.defaultFonts = data;
        data.filter(function(font){
          if(font.defaultFont == true){
            console.log(font.fontName);
            if (!localStorage.getItem('customFontType')) {
              $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', font.fontName);
            }
          }
        })
      }, err => {
        
      })
  }

  loadDefaultColor(){
    this.sharedservice.getThemeColor().subscribe(
      data => {
        this.defaultColors = data;
        data.filter(function(color, index){ 
          if(color.defaultColor == true){
            console.log(color.colorCode);
            if (!localStorage.getItem('themeColor')) {
              localStorage.setItem('themeColor', color.colorCode);
              localStorage.setItem('themeIndex', index);
              $('#confBar #themeContainer ul li.settingBtm input').removeClass('colorPaletteActive');
              $('#confBar #themeContainer ul li.settingBtm input:nth('+index+')').addClass('colorPaletteActive');
            }
          }
        })
      }, err => {
        
      })
  }


  toggle() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.currlang = 'English';
      this.currlangMOB = 'EN';
      this.translate.use('ms');
      this.langId = 2;
    }
    else {
      this.currlang = 'Bahasa Malaysia';
      this.currlangMOB = 'BM';
      this.langId = 1;
      this.translate.use('en');
    }
    localStorage.setItem('langID', this.langId);
 
  }

  loadColor(){
    this.sharedservice.getThemeColor().subscribe(
      data => {
        this.getThemeColors = data;
      }, err => {
        
      })
  }


  

  showConfBar() {
    this.edited = !(this.edited);
    this.topNavClick.emit(this.edited);
    this.loadCustomFontType();
  }

  showProfileMenu(){
    //this.profileShow = !(this.profileShow);
    this.showProfile.emit(this.profileShow);
  }  

  showSidenavMenu(){
    this.showsidenav.emit(this.sidenavShow);
  }

  langEventChange(data) {
    console.log(data);
  }

  setClickedColor(index, firstItem) {
    localStorage.setItem('themeColor', firstItem);
    $('#confBar #themeContainer ul li.settingBtm input').removeClass('colorPaletteActive');
    $('#confBar #themeContainer ul li.settingBtm input:nth('+index+')').addClass('colorPaletteActive');
    localStorage.setItem('themeIndex', index);
    this.selectedRow = index;
    this.firstItem = firstItem;
  }

  loadCustomFontType(){
    if (localStorage.getItem('customFontType')) {
      $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', localStorage.getItem('customFontType'));
      $('#fontOptSideMenu2 option[value="' + localStorage.getItem('customFontType') + '"]').attr('selected', 'selected');
      $('#fontOptSideMenu2').val(localStorage.getItem('customFontType'));
    }
    if (localStorage.getItem('themeIndex')) {
      $('#confBar #themeContainer ul li.settingBtm input').removeClass('colorPaletteActive');
      $('#confBar #themeContainer ul li.settingBtm input:nth('+localStorage.getItem('themeIndex')+')').addClass('colorPaletteActive');
      localStorage.setItem('themeIndex', localStorage.getItem('themeIndex'));
    }
  }

  resetBgColor() {

    this.sharedservice.getThemeColor().subscribe(
      data => {
        this.defaultColors = data;
        data.filter(function(color, index){
          if(color.defaultColor == true){
            localStorage.setItem('themeColor', color.colorCode);
            localStorage.setItem('themeIndex', index);
            $('#confBar #themeContainer ul li.settingBtm input').removeClass('colorPaletteActive');
            $('#confBar #themeContainer ul li.settingBtm input:nth('+index+')').addClass('colorPaletteActive');
          }
        })
      }, err => {
        
      })

  }

  fontminus() {
    this.plusBtn = false;
    num = num - 1;
    this.fn_changeFont(num);
    if (num < -3) {
      this.minusBtn = true;
      this.plusBtn = false;
    } else if (num > -3) {
      this.minusBtn = false;
      //this.plusBtn = true
    }
  }

  fontplus() {
    this.minusBtn = false;
    num = num + 1;
    this.fn_changeFont(num);
    if (num > 3) {
      this.plusBtn = true;
      this.minusBtn = false;
    } else if (num < 3) {
      this.plusBtn = false;
      //this.minusBtn = true
    }
  }

  fontreset() {
    this.minusBtn = false;
    this.plusBtn = false;
    num = 0;
    this.fn_changeFont(num);
  }

  fn_changeFont(dynum) {
    $('.font-size-s').css('font-size', 14 + dynum + 'px');
  }

  onChange($event, deviceValue) {
    $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', deviceValue);
    localStorage.setItem('customFontType', deviceValue);
  }

  resetFontStyle() {

    this.sharedservice.getThemeFont().subscribe(
      data => {
        this.defaultFonts = data;
        data.filter(function(font){
          if(font.defaultFont == true){
            console.log(font.fontName);
            $('#fontOptSideMenu2').val(font.fontName);
              $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', font.fontName);
              localStorage.setItem('customFontType', font.fontName);

          }
        })
      }, err => {
        
      })
  }

  clickManual(){
    //location.reload();
    this.navService.triggerContent(811, 15021, localStorage.getItem('langID'));
    this.navService.getContentUrl(811, 15021, localStorage.getItem('langID'));
    this.router.navigate(['/article', 811, 15021]);
    event.preventDefault();
  }

  clickAboutus(){
    //location.reload();
    this.navService.triggerContent(811, 15019, localStorage.getItem('langID'));
    this.navService.getContentUrl(811, 15019, localStorage.getItem('langID'));
    this.router.navigate(['/article', 811, 15019]);
    event.preventDefault();
  }
}
