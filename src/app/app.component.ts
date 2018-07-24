import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'gosg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isSideNav = false;
    clientHeight: number;
    title = 'app';
    showLoader: boolean;
    breadcrumb: any;
    txtColor = '#333';
    childData: string;
    translatedText: string;
    supportedLanguages: any[];
    @Input() langChange: string;
    zIndex = '8888';
    zIndex2 = '9999';
    bHeight = '70px';
    bTop = '35px';

    loading: any;

    constructor() {
        this.clientHeight = window.innerHeight - 200;
    }
    getExpand(data) {
        if (data) {
            this.zIndex = '8888';
            this.zIndex2 = '9999';
            this.bHeight = '70px';
            this.bTop = '35px';

        } else {
            this.zIndex = '8888';
            this.zIndex2 = '9999';
            this.bHeight = '105px';
            this.bTop = '85px';
        }
    }

    showsidenav(data){
        
        document.getElementById("mySidenav").style.width = "250px";
        this.isSideNav = data;
        
        if(localStorage.getItem('customFontType')){
            $('#fontOptSideMenu2').val(localStorage.getItem('customFontType'));
        }

        if (localStorage.getItem('themeIndex')) {
            $('#confBar1 .settingBtm input').removeClass('colorPaletteActive');
            $('#confBar1 .settingBtm input:nth('+localStorage.getItem('themeIndex')+')').addClass('colorPaletteActive');
            localStorage.setItem('themeIndex', localStorage.getItem('themeIndex'));
          }
        
      }

    getTheme() {
        return localStorage.getItem('themeColor');
    }
    OnInit() {
        
    }

}




