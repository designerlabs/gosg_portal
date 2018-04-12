import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { HtmlParser } from '@angular/compiler';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'int-search',
    // template: '<div *ngFor="let int of intData"><h4>{{int.article_name}}</h4><span class="label primary">{{int.category_name}}</span><p>{{int.article_text_clean | slice:0:100}}</p></div>'
    template: `<div *ngIf='tabInx==0'><h4><span class="font-size-m">{{pageNo}}. </span>
    <a *ngIf='lang==2' class="titleSer warna_title_color font-size-m">{{showdata.article_name}}</a>
    <a *ngIf='lang==1' class="titleSer warna_title_color font-size-m">{{showdata.article_name_en}}</a></h4>
    <span *ngIf='lang==2' class="cat">{{showdata.category_name}}</span>
    <span *ngIf='lang==1' class="cat">{{showdata.category_name_en}}</span>
    <p style="padding-top:15px" class="font-size-s sertxt" id="{{showdata.idarticle}}" [innerHtml]="dataHilight"> 
    </p></div>
    <div *ngIf='tabInx==1'><h4><span class="font-size-m">{{pageNo}}. </span>
      <a *ngIf='lang==2' class="titleSer warna_title_color font-size-m" href='{{showdata.url_ms}}' target='_blank'>{{showdata.title_ms}}</a>
      <a *ngIf='lang==1' class="titleSer warna_title_color font-size-m" href='{{showdata.url_en}}' target='_blank'>{{showdata.title_en}}</a>
    </h4>
    <span *ngIf='lang==2' class="cat">{{showdata.agency_name}}</span>
    <span *ngIf='lang==1' class="cat">{{showdata.agency_name_en}}</span>
    <p style="padding-top:15px" class="font-size-s sertxt" [innerHtml]="dataHilight"> 
    </p></div>
                `,
    styleUrls: ['./search-result/search-result.component.css'],
})
export class SearchIntComponent implements OnInit {
    @Input() showdata : any;
    @Input() indx = 0;
    @Input() keyw = '';
    @Input() tabInx = 0;    
    @Input() pageNo = 1;
    lang = localStorage.getItem('langID');
    dataHilight;
    span = document.createElement("span");
    constructor(private router: Router, private searchService:SearchService) { }
    
    getTheme(){
        return localStorage.getItem('themeColor');
    }
    
    intData1: any[];
    getDataInt() {        
        
    }
    
    ngOnInit() {
        // console.log(this.showdata);
        this.addHighlight(this.keyw);
    }

    addHighlight(keyword){
      let span1 = document.createElement("span");      
      let maintxt;
      if(this.lang == '1'){ //english
        if(this.tabInx == 0){ // local tab
          maintxt = this.showdata.article_text_en_clean;
        }else if(this.tabInx ==1){ //os tab
          maintxt = this.showdata.desc_en;
        }
      }else if(this.lang == '2'){ //malay
        if(this.tabInx == 0){ // local tab
          maintxt = this.showdata.article_text_clean;
        }else if(this.tabInx ==1){ //os tab
          maintxt = this.showdata.desc_ms;
        }
      }
      if(maintxt !=="null"){
        let nameNode = document.createTextNode(maintxt); 
        span1.appendChild(nameNode);
        let resStr = this.highlight_words(keyword, span1);
        if(resStr.trim().length > 300){
          this.dataHilight = resStr.slice(0,300) + '...';
        }else{
          this.dataHilight = resStr;
        } 
      }else{
        this.dataHilight = '';
      }
       
    }
    highlight_words(word, element) {
      if(word) {
          var textNodes;
          var resData;
          word = word.replace(/\W/g, '');
          var str = word.split(" ");
          $(str).each(function() {
              var term = word;
              var textNodes = $(element).contents().filter(function() { return this.nodeType === 3 });
              textNodes.each(function() {
                var content = $(this).text();
                var regex = new RegExp(term, "gi");
                resData = content.replace(regex, '<span class="highlightWord">' + term + '</span>');
              });
          });
          return resData;
      }
  }
    
}