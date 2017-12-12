import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopnavService } from '../header/topnav/topnav.service';
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
  constructor( private topnavservice: TopnavService) { }

  ngOnInit() {
    this.colors = this.topnavservice.getColors();
  }

  openNav() {
    document.getElementById("mySidenavProtected").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenavProtected").style.width = "0";
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
    $('#fontOptSideMenu1').val('Roboto');
    $('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
    //$('#fontOpt option[value="Roboto"]').attr("selected", "selected");
    localStorage.setItem('customFontType', 'Roboto');
  }

}
