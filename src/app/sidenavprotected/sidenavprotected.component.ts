import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { TopnavService } from '../header/topnav/topnav.service';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Router } from '@angular/router';
import {SharedService } from '../common/shared.service';
import { NavService } from '../header/nav/nav.service';
import * as $ from 'jquery';

let num = 0;
@Component({
  selector: 'gosg-sidenavprotected',
  templateUrl: './sidenavprotected.component.html',
  styleUrls: [
    './sidenavprotected.component.css'
  ]
})
export class SidenavprotectedComponent implements OnInit {
  public bgColor;
  getThemeFonts: any;
  defaultFonts: any;
  fontTy(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  getThemeColors: any;
  defaultColors: any;
  translatedText: string;
  supportedLanguages: any[];
  colors: any[];
  selectedRow: Number;
  firstItem: boolean;
  minusBtn = false;
  plusBtn = false;
  admin: boolean;
  langId = this.langId;

  @Output()
  openSlide:EventEmitter<string> = new EventEmitter();
  constructor( private topnavservice: TopnavService,
     @Inject(APP_CONFIG) private config: AppConfig,
     private navService: NavService,
     private router: Router,
     private sharedservice: SharedService) { }

  @Input() state:string;

  ngOnInit() {
    this.colors = this.topnavservice.getColors();
    // this.loadFont();
    // this.loadColor();
    // this.loadDefaultFonts();
    // this.loadDefaultColor();
    this.loadCustomFontType();
  }

  openNav() {
    document.getElementById("mySidenavProtected").style.width = "250px";
  }

  callApiProtected()
  {
    this.loadFont();
    this.loadColor();
    // this.loadDefaultFonts();
    // this.loadDefaultColor();
  }

  closeNav() {
    document.getElementById("mySidenavProtected").style.width = "0";
  }

  setClickedColor(index, firstItem) {
    localStorage.setItem('themeColor', firstItem);
    $('#confBar2 .settingBtm input').removeClass('colorPaletteActive');
    $('#confBar2 .settingBtm input:nth('+index+')').addClass('colorPaletteActive');
    localStorage.setItem('themeIndex', index);
    this.selectedRow = index;
    this.firstItem = firstItem;
  }

  logout(e)
  {
    e.preventDefault();
    location.href= this.config.urlUAP +'uapsso/Logout?return='+this.config.urlUAP+'portal/index';
  }

  ngAfterViewInit() {
    this.loadCustomFontType();

  }

  getUrl(ele){    
          
    this.navService.triggerContent(ele, localStorage.getItem('langID'));
    this.navService.getContentUrl(ele, localStorage.getItem('langID'));
    this.router.navigate(['/content', ele]);
    event.preventDefault();
  
  }

  loadCustomFontType(){
    if (localStorage.getItem('customFontType')) {
      $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', localStorage.getItem('customFontType'));
      $('#fontOptSideMenu3 option[value="' + localStorage.getItem('customFontType') + '"]').attr('selected', 'selected');
      $('#fontOptSideMenu3').val(localStorage.getItem('customFontType'));
    }
    if (localStorage.getItem('themeIndex')) {
      $('#confBar2 .settingBtm input').removeClass('colorPaletteActive');
      $('#confBar2 .settingBtm input:nth('+localStorage.getItem('themeIndex')+')').addClass('colorPaletteActive');
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
            $('#confBar2 .settingBtm input').removeClass('colorPaletteActive');
            $('#confBar2 .settingBtm input:nth('+index+')').addClass('colorPaletteActive');
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

  loadFont(){
    this.sharedservice.getThemeFont().subscribe(
      data => {
        this.getThemeFonts = data;
      }, err => {

      })
  }

  loadDefaultFonts(){
    this.sharedservice.getThemeFont().subscribe(
      data => {
        this.defaultFonts = data;
        data.filter(function(font){
          if(font.defaultFont == true){
            if (!localStorage.getItem('customFontType')) {
              $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', font.fontName);
            }
          }
        })
      }, err => {

      })
  }

  loadColor(){
    this.sharedservice.getThemeColor().subscribe(
      data => {
        this.getThemeColors = data;
      }, err => {

      })
  }

  loadDefaultColor(){
    this.sharedservice.getThemeColor().subscribe(
      data => {
        this.defaultColors = data;
        data.filter(function(color, index){
          if(color.defaultColor == true){
            if (!localStorage.getItem('themeColor')) {
              localStorage.setItem('themeColor', color.colorCode);
              localStorage.setItem('themeIndex', index);
              $('#confBar2 .settingBtm input').removeClass('colorPaletteActive');
              $('#confBar2 .settingBtm input:nth('+index+')').addClass('colorPaletteActive');
            }
          }
        })
      }, err => {

      })
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
            $('#fontOptSideMenu3').val(font.fontName);
              $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', font.fontName);
              localStorage.setItem('customFontType', font.fontName);

          }
        })
      }, err => {

      })
  }

}
