import { Component, OnInit,  TemplateRef, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { TopnavService } from '../header/topnav/topnav.service';
import {SharedService } from '../common/shared.service';
import * as $ from 'jquery';

let num = 0;
@Component({
  selector: 'gosg-sidenavmain',
  templateUrl: './sidenavmain.component.html',
  styleUrls: [
    './sidenavmain.component.css'
  ]
})
export class SidenavmainComponent implements OnInit {
  defaultColors: any;
  defaultFonts: any;
  fontTy(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  getThemeColors: any;
  getThemeFonts: any;
  translatedText: string;
  supportedLanguages: any[];
  colors: any[];
  selectedRow: Number;
  firstItem: boolean;
  minusBtn = false;
  plusBtn = false;
  admin: boolean;
  langId = this.langId;
  panelOpenState: any;
  @Output()
  openSlide:EventEmitter<string> = new EventEmitter();
  constructor(
    private topnavservice: TopnavService,
    private sharedservice: SharedService
  ) { }

  ngOnInit() {
    this.colors = this.topnavservice.getColors();

      // this.loadFont(); 
      // this.loadColor();
      // this.loadDefaultFonts();
      // this.loadDefaultColor();   
    
  }

  callApi(){
    
    this.loadFont(); 
    this.loadColor();
    // this.loadDefaultFonts();
    // this.loadDefaultColor(); 
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  setClickedColor(index, firstItem) {
    localStorage.setItem('themeColor', firstItem);
    $('#confBar1 .settingBtm input').removeClass('colorPaletteActive');
    $('#confBar1 .settingBtm input:nth('+index+')').addClass('colorPaletteActive');
    localStorage.setItem('themeIndex', index);
    this.selectedRow = index;
    this.firstItem = firstItem;
  }

  ngAfterViewInit() {
    this.loadCustomFontType();
  }

  loadCustomFontType(){
    if (localStorage.getItem('customFontType')) {
      $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', localStorage.getItem('customFontType'));
      $('#fontOptSideMenu2 option[value="' + localStorage.getItem('customFontType') + '"]').attr('selected', 'selected');
      $('#fontOptSideMenu2').val(localStorage.getItem('customFontType'));
    }
    if (localStorage.getItem('themeIndex')) {
      $('#confBar1 .settingBtm input').removeClass('colorPaletteActive');
      $('#confBar1 .settingBtm input:nth('+localStorage.getItem('themeIndex')+')').addClass('colorPaletteActive');
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
            $('#confBar1 .settingBtm input').removeClass('colorPaletteActive');
            $('#confBar1 .settingBtm input:nth('+index+')').addClass('colorPaletteActive');
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
              $('#confBar1 .settingBtm input').removeClass('colorPaletteActive');
              $('#confBar1 .settingBtm input:nth('+index+')').addClass('colorPaletteActive');
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
            $('#fontOptSideMenu2').val(font.fontName);
              $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', font.fontName);
              localStorage.setItem('customFontType', font.fontName);

          }
        })
      }, err => {

      })
  }

}
