import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { TopnavService } from './topnav.service';
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

  ngAfterViewInit() {
    $(function () {
      if (localStorage.getItem('themeColor') == '' || localStorage.getItem('themeColor') == null || localStorage.getItem('themeColor') == '#00bdbb') {
        $('#confBar li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
        localStorage.setItem('themeColor', '#00bdbb');
      } else {
        $('#confBar li > input.bgColorBtn:nth(0)').removeClass('colorPaletteActive');
      }

      if (localStorage.getItem('themeIndex') == '' || localStorage.getItem('themeIndex') == null || localStorage.getItem('themeIndex') == '0') {
        $('#confBar li > input.bgColorBtn').removeClass('colorPaletteActive');
        $('#confBar li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
      } else {
        $('#confBar li > input.bgColorBtn').removeClass('colorPaletteActive');
        $('#confBar li > input.bgColorBtn:nth(' + localStorage.getItem('themeIndex') + ')').addClass('colorPaletteActive');
      }
    });

    if (localStorage.getItem('customFontType')) {
      $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', localStorage.getItem('customFontType'));
      $('#fontOpt option[value="' + localStorage.getItem('customFontType') + '"]').attr('selected', 'selected');
    } else {
      $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
      $('#fontOpt option[value="Roboto"]').attr('selected', 'selected');
    }

  }

  @Input() edited = true;
  @Input() profileShow = true;
  @Input() sidenavShow = true;

  @Input() state:string;
  debugger;

  @Output() topNavClick = new EventEmitter();

  @Output() showProfile = new EventEmitter();

  @Output() showsidenav = new EventEmitter();

  constructor(private translate: TranslateService, private topnavservice: TopnavService) {
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

  isActive = true;

  currlang: string = this.currlang;
  currlangMOB: string = this.currlangMOB;
  

  ngOnInit() {
    this.getLangID();
    console.log('topnav.comp.ts');
    this.colors = this.topnavservice.getColors();
    this.getUserProfile();
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



  showConfBar() {
    this.edited = !(this.edited);
    this.topNavClick.emit(this.edited);
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
    localStorage.setItem('themeColor', this.colors[index].bgColor);
    localStorage.setItem('themeIndex', index);
    this.selectedRow = index;
    this.firstItem = firstItem;
  }

  resetBgColor() {
    localStorage.setItem('themeColor', '#00bdbb');
    localStorage.setItem('themeIndex', '0');
    $('#confBar li > input.bgColorBtn').removeClass('colorPaletteActive');
    $('#confBar li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
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
    $('#fontOpt').val('Roboto');
    $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
    //$('#fontOpt option[value="Roboto"]').attr("selected", "selected");
    localStorage.setItem('customFontType', 'Roboto');
  }

}
