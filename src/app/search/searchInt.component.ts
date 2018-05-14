import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { HtmlParser } from '@angular/compiler';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'int-search',
    // template: '<div *ngFor="let int of intData"><h4>{{int.article_name}}</h4><span class="label primary">{{int.category_name}}</span><p>{{int.article_text_clean | slice:0:100}}</p></div>'
    template: `<div *ngIf='tabInx==0' style='padding: 10px'><h4><span class="font-size-m">{{pageNo}}. </span>
    <a href='{{showdata.content_url}}' class="titleSer warna_title_color font-size-m">{{showdata.content_title}}</a></h4>
    <span class="cat">{{showdata.content_keywords}}</span>
    <p style="padding-top:15px" class="font-size-s sertxt" id="{{showdata.content_id}}" [innerHtml]="dataHilight"> 
    </p><span class="font-size-s">{{showdata.publish_date | date:'dd/MM/yyyy hh:mm a'}} </span></div>
    <div *ngIf='tabInx==1'><h4><span class="font-size-m">{{pageNo}}. </span>
      <a class="titleSer warna_title_color font-size-m" href='{{showdata.agency_application_url }}' target='_blank'>{{showdata.title }}</a>
    </h4>
    <span class="cat">{{showdata.agency_name}}</span>
    <p style="padding-top:15px" class="font-size-s sertxt" [innerHtml]="dataHilight"> 
    </p>
    <span class="font-size-s">{{showdata.publish_date | date:'dd/MM/yyyy hh:mm a'}} </span>
    </div>
    <div *ngIf='tabInx==2'><h4><span class="font-size-m">{{pageNo}}. </span>
    <a class="titleSer warna_title_color font-size-m" href='{{showdata.url }}' target='_blank'>{{showdata.title }}</a>
  </h4>
  <p style="padding-top:15px" class="font-size-s sertxt" [innerHtml]="dataHilight"> 
  </p>
  <span class="font-size-s">{{showdata.date}} </span>
  </div>
    
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
      
        if(this.tabInx == 0){ // local tab
          maintxt = this.showdata.content_description;
        }else if(this.tabInx ==1 || this.tabInx ==2){ //os tab
          maintxt = this.showdata.description;
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