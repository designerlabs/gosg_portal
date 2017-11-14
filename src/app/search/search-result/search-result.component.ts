import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
    
    constructor(private router: Router) { }

    public local = true;
    public os = false;
    public global = false;


    public keywordType = [
        {id: 1, nameEn: 'Exact word', nameMs: 'Perkataan yang tepat'},
        {id: 2, nameEn: 'All word', nameMs: 'Semua dari perkataan'},
        {id: 3, nameEn: 'Any word', nameMs: 'Mana-mana dari perkataan'}
    ];

    public internalSpec = [
        {id: 11, nameEn: 'Topics', nameMs: 'Topik'},
        {id: 12, nameEn: 'Sub Topics', nameMs: 'Sub Topik'},
        {id: 13, nameEn: 'Title', nameMs: 'Tajuk'},
        {id: 14, nameEn: 'Description', nameMs: 'Deskripsi'}
    ];


    ngOnInit() {
        
    }

}
