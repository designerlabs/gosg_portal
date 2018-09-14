import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from '../header/nav/nav.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    keyword1: any;
    public popData: any = [];
    loading: boolean = false;

    constructor(
        private translate: TranslateService,
        private router: Router,
        private navService: NavService,
        private searchService: SearchService,
        private toastr: ToastrService
    ) {

        if (!this.languageId) {
            this.languageId = localStorage.getItem('langID');
        } else {
            this.languageId = 1;
        }

    }

    lang = this.lang;
    languageId = this.languageId;
    getTheme() {
        return localStorage.getItem('themeColor');
    }

    mainSearch(key) {

        if (key) {
            $('#searchDDown').css({ 'display': 'none' });
            localStorage.setItem('ser_word', key);
            this.router.navigate(['search/' + key]);
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
            "size": 10,
            "from": 0,
            "keyword": key,
            "filters": {
                "ranges":
                {
                    "end_date": [
                        {
                            "gte": "now/d",
                            "time_zone": "+08:00"
                        }
                    ]
                },
                "ref_language_id": this.languageId
            }
        }

        this.loading = true;
        this.searchService.getInternal(JSON.stringify(body)).subscribe(
            data => {
                this.searchService.setIntData(data);
                this.loading = false;
            });


    }

    //autocomplete data
    public autoCompleteArr = this.popData;

    ngOnInit() {
    }

    getPop() {
        let body = {
            "size": 10,
            "filters": {
            }
        };
        // this.loading = true;
        this.navService.getPopularData(body)
            .subscribe(resPopularData => {
                this.popData = resPopularData;
                this.autoCompleteArr = this.popData;
                // this.loading = false;
            });
    }

}
