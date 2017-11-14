import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'int-search',
    template: '<div *ngFor="let int of intData"><h4>{{int.article_name}}</h4><span class="label primary">{{int.category_name}}</span><p>{{int.article_text_clean | slice:0:100}}</p></div>'
})
export class SearchIntComponent implements OnInit {
    
    constructor(private router: Router, private searchService:SearchService) { }
    
    getTheme(){
        return localStorage.getItem('themeColor');
    }
    
    intData: any[];
    getDataInt() {
        this.searchService.getIntData().subscribe(data => {
            this.intData = data.data;
        });
    }
    
    ngOnInit() {
        console.log('searchInt.comp.ts');
        this.getDataInt();
    }
    
}