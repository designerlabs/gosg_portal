import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    keyword1: any;

    constructor(
        private translate: TranslateService,
        private router: Router,
        private searchService:SearchService,
        private toastr: ToastrService
    ) {

        if(!this.languageId){
        this.languageId = localStorage.getItem('langID');
        }else{
        this.languageId = 1;
        }

    }

    lang = this.lang;
    languageId = this.languageId;
    keyword1:any;
    getTheme() {
        return localStorage.getItem('themeColor');
    }

    mainSearch(key) {
        if(key) {
            $('#searchDDown').css({ 'display': 'none' });
            localStorage.setItem('ser_word', key);
            this.router.navigate(['search/searchResult/'+key]);
            this.internal(key);
        } else {
            this.toastr.error(this.translate.instant('common.msg.searchKeyword'), '');
        }
        // localStorage.setItem('ser_word', key);
        // this.router.navigate(['search/searchResult']);
        // this.internal(key);
    }

    internal(key) {

        let body = {
            "size":10,
            "from":0,
            "keyword": key,
            "filters":{
                "ranges":
                {
                    "end_date": [
                        {
                            "gte": "now/d",
                            "time_zone":"+08:00"
                        }
                    ]
                },
                "ref_language_id": this.languageId
            }
        }


        this.searchService.getInternal(JSON.stringify(body)).subscribe(
            data => {
            this.searchService.setIntData(data);
        });


    }

    //autocomplete test data
    public autoCompleteArr = ['lesen', 'pendidikan', 'myGovernment'];

    ngOnInit() {

    }

}
