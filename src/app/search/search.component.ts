import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    constructor(private router: Router, private searchService:SearchService) { }

    getTheme() {
        return localStorage.getItem('themeColor');
    }

    mainSearch(key) {
        this.router.navigate(['search/searchResult']);
        this.internal(key); 
    }
    
    internal(key) {
        
        let body = {
               size: 10,
               from: 0,
               responseFields:[
                  'category_name',
                  'topic_name',
                  'article_name',
                  'category_name_en',
                  'topic_name_en',
                  'article_name_en',
                  'author_name',
                  'article_insert_date',
                  'idarticle',
                  'article_text_clean',
                  'article_text_en_clean'
               ],
               keywordMap:{
                  exact:[key],
                  fields:[
                     'article_text_clean',
                     'article_text_en_clean',
                     'article_name',
                     'article_name_en',
                     'category_name',
                     'category_name_en',
                     'topic_name',
                     'topic_name_en'
                  ]
               },
               aggregations:[
                  {
                     name:"category_name",
                     type:"terms",
                     field:"category_name.raw"
                  },
                  {
                     name:"topic_name",
                     type:"terms",
                     field:"topic_name.raw"
                  },
                  {
                     name:"category_name_en",
                     type:"terms",
                     field:"category_name_en.raw"
                  },
                  {
                     name:"topic_name_en",
                     type:"terms",
                     field:"topic_name_en.raw"
                  },
                  {
                     name:"author_name",
                     type:"terms",
                     field:"author_name.raw"
                  },
                  {
                     name:"histogram",
                     type:"dateHistogram",
                     field:"article_insert_date",
                     interval:"month"
                  }
               ]
        }

        this.searchService.getInternal(JSON.stringify(body)).subscribe(data => {   
            this.searchService.setIntData(data);
        });
        
        
    }

    //autocomplete test data
    public autoCompleteArr = ['lesen', 'pendidikan', 'myGovernment'];

    ngOnInit() {
        console.log('search.comp.ts');
    }

}
