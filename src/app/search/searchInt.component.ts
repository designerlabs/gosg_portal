import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'int-search',
    // template: '<div *ngFor="let int of intData"><h4>{{int.article_name}}</h4><span class="label primary">{{int.category_name}}</span><p>{{int.article_text_clean | slice:0:100}}</p></div>'
    template: `<h4>
                  <a class="titleSer warna_title_color font-size-m">{{showdata.article_name}}</a>
                </h4>
                <span class="cat">{{showdata.category_name}}</span>
                <p style="padding-top:15px" class="font-size-s sertxt">{{showdata.article_text_clean.trim() | slice:0:200}}
                <span *ngIf="showdata.article_text_clean.trim().length > 200">...</span></p>`,
    styleUrls: ['./search-result/search-result.component.css'],
    // template: `<h4>Hello</h4>`
})
export class SearchIntComponent implements OnInit {
    // @Input() showdata = new EventEmitter();
    @Input() showdata = [];
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
      debugger;
        console.log('searchInt.comp.ts');
        this.addHighlight();
        // this.getDataInt();
    }

    addHighlight(){

    }
    
}