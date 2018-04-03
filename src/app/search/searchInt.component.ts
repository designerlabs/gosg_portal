import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { HtmlParser } from '@angular/compiler';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'int-search',
    // template: '<div *ngFor="let int of intData"><h4>{{int.article_name}}</h4><span class="label primary">{{int.category_name}}</span><p>{{int.article_text_clean | slice:0:100}}</p></div>'
    template: `<h4>
                  <a class="titleSer warna_title_color font-size-m">{{showdata.article_name}}</a>
                </h4>
                <span class="cat">{{showdata.category_name}}</span>
                <p style="padding-top:15px" class="font-size-s sertxt" id="{{showdata.idarticle}}" [innerHtml]="dataHilight"> 
                </p>`,
    styleUrls: ['./search-result/search-result.component.css'],
    // template: `<h4>Hello</h4>`
})
export class SearchIntComponent implements OnInit {
    // @Input() showdata = new EventEmitter();
    @Input() showdata : any;
    @Input() indx = 0;
    dataHilight;
    span = document.createElement("span");
    constructor(private router: Router, private searchService:SearchService) { }
    
    getTheme(){
        return localStorage.getItem('themeColor');
    }
    
    intData1: any[];
    getDataInt() {
        
        // this.searchService.getIntData().subscribe(data => {
        //     this.intData = data.data;
        // });
        
        // need to do highlight operations 
        // this.showdata.emit(this.intData);
    }
    
    ngOnInit() {
        console.log('searchInt.comp.ts');
        this.addHighlight();
        // this.getDataInt();
    }

    addHighlight(){
      let span1 = document.createElement("span");
      
      let maintxt = this.showdata.article_text_clean;
      // this.dataHilight = maintxt.replace('Malaysia','<b>Malaysia</b>')
      let nameNode = document.createTextNode(maintxt); 
      span1.appendChild(nameNode);
      // $('#intSearch .sertxt')[this.indx].append(span);
      let resStr = this.highlight_words("Malaysia", span1);
      if(resStr.trim().length > 200){
        this.dataHilight = resStr.slice(0,200) + '...';
      }else{
        this.dataHilight = resStr;
      }
      
      // document.getElementsByClassName('sertxt').appendChild(span); 
      // let element: HTMLElement = document.getElementsByClassName('sertxt');
      // $('#intSearch .sertxt').appendChild(span);
     
    }
    highlight_words(word, element) {
      if(word) {
          var textNodes;
          var resData;
          word = word.replace(/\W/g, '');
          var str = word.split(" ");
          $(str).each(function() {
              var term = "Malaysia";
              var textNodes = $(element).contents().filter(function() { return this.nodeType === 3 });
              textNodes.each(function() {
                var content = $(this).text();
                var regex = new RegExp(term, "gi");
                resData = content.replace(regex, '<span class="highlightWord">' + term + '</span>');
                // $(this).replaceWith(content);
                // this.dataHilight = content;                
              });
          });
          return resData;
      }
  }

    
}