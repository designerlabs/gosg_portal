import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { SharedService } from '../../common/shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
    lang = this.lang;
    languageId = this.languageId;
    public loading = false;
    intData: any[];
    dataEach = '';
    constructor(
    private router: Router,
    private sharedService: SharedService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private serchService: SearchService
    ) { 
        this.lang = translate.currentLang;
    this.languageId = 2;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'en';
          this.languageId = 1;
        });

      }
      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
          this.lang = 'ms';
          this.languageId = 2;
        });
      }      
      // this.getAgencyList();     
    });
    }

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

    public obj = {
        "size":10,
        "from":0,
        "responseFields":[
           "category_name",
           "topic_name",
           "article_name",
           "category_name_en",
           "topic_name_en",
           "article_name_en",
           "author_name",
           "article_insert_date",
           "idarticle",
           "article_text_clean",
           "article_text_en_clean"
        ],
        "keyword":"malaysia",
        "keywordMap":{
           "exact":[
              "malaysia"
           ],
           "fields":[
              "article_text_clean",
              "article_text_en_clean",
              "article_name",
              "article_name_en",
              "category_name",
              "category_name_en",
              "topic_name",
              "topic_name_en"
           ]
        },
        "aggregations":[
           {
              "name":"category_name",
              "type":"terms",
              "field":"category_name.raw"
           },
           {
              "name":"topic_name",
              "type":"terms",
              "field":"topic_name.raw"
           },
           {
              "name":"category_name_en",
              "type":"terms",
              "field":"category_name_en.raw"
           },
           {
              "name":"topic_name_en",
              "type":"terms",
              "field":"topic_name_en.raw"
           },
           {
              "name":"author_name",
              "type":"terms",
              "field":"author_name.raw"
           },
           {
              "name":"histogram",
              "type":"dateHistogram",
              "field":"article_insert_date",
              "interval":"month"
           }
        ],
        "filters":{
     
        }
     }

    ngOnInit() {
        // debugger;
    this.searchByKeyword('malaysia');
    }
    ngAfterViewInit(){
        // debugger;
        // this.highlight_words('Malaysia','#intSearch');
    }

    // highlight_words(word, element) {
    //     if(word) {
    //         let textNodes;
    //         word = word.replace(/\W/g, '');
    //         let str = word.split(" ");
    //         $(str).each(function() {
    //             let term = this;
    //             let textNodes = $(element).contents().filter(function() { return this.nodeType === 3 });
    //             textNodes.each(function() {
    //                 let content = $(this).text();
    //                 let regex = new RegExp(this.term, "gi");
    //               content = content.replace(regex, '<span class="highlight">' + term + '</span>');
    //               $(this).replaceWith(content);
    //             }.bind(this));
    //         });
    //     }
    // }

    searchByKeyword(valkeyword) {
        this.loading = true;
        this.obj.keyword = valkeyword;
        this.obj.keywordMap.exact = [valkeyword];
        let dataUrl='https://www.malaysia.gov.my/public/query/0/internal';
        return this.http.post( dataUrl, this.obj )
        .map(res => res.json())
        .subscribe(rData => {
          console.log(rData);
          this.intData = rData.data;
        //   this.serchService.searchResData = rData.data;
          this.loading = false;
        },
          error => {
            this.loading = false;
            this.toastr.error(this.translate.instant('common.err.servicedown'), '');
          });
    }

    showdatafn(val) {
        this.dataEach = val;
        this.serchService.searchResData = val;
    }

}
