import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { SharedService } from '../../common/shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { MatPaginator, MatSort, MatTabChangeEvent } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Response } from '@angular/http';
import { SearchService } from '../../search/search.service';
// import { SharedModule } from '../../shared/shared.module';
// import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  lang = this.lang;
  languageId = this.languageId;
  public loading = false;

  dataEach = '';
  panelOpenState: boolean = false;
  selKey = "yes";
  align: string;
  tabIndex =0;
  sKeyword = false;
  sSpeci = false;
  sFilter = false;
  intData: any[];
  aggrData: any[];
  author: any[];
  topics: any[];
  monthPub: any[];
  arymonth: any[];
  subTopics: any[];
  valMonPub="";
  valAuthor="";
  valTopic="";
  valSubTopic="";
  selMonPubDisp="";
  selAuthDisp="";
  selTopicDisp="";
  selSubTopicDisp="";
  ser_word = "";
  chkKeyValue = "1";
  chktopic = true;
  chksubtopic = true;
  chktitle= true;
  chkdes = true;
  chkosminis = false;
  chkosagency = false;
  chkostitle = false;
  chkosdes = false;

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
    { id: 1, nameEn: 'Exact word', nameMs: 'Perkataan yang tepat' },
    { id: 2, nameEn: 'All word', nameMs: 'Semua dari perkataan' },
    { id: 3, nameEn: 'Any word', nameMs: 'Mana-mana dari perkataan' }
  ];

  public internalSpec = [
    { id: 11, nameEn: 'Topics', nameMs: 'Topik' },
    { id: 12, nameEn: 'Sub Topics', nameMs: 'Sub Topik' },
    { id: 13, nameEn: 'Title', nameMs: 'Tajuk' },
    { id: 14, nameEn: 'Description', nameMs: 'Deskripsi' },

    { id: 15, nameEn: 'Ministries', nameMs: 'Kementerian' },
    { id: 16, nameEn: 'Agencies', nameMs: 'Agensi' },
    { id: 17, nameEn: 'Title', nameMs: 'Tajuk' },
    { id: 18, nameEn: 'Description', nameMs: 'Deskripsi' }
  ];
  public internalFilter = [
    { id: 21, nameEn: 'Month Published', nameMs: 'Bulan Diterbitkan' },
    { id: 22, nameEn: 'Author', nameMs: 'Penulis' },
    { id: 23, nameEn: 'Topics', nameMs: 'Topik' },
    { id: 24, nameEn: 'Sub Topics', nameMs: 'Sub Topik'  }
  ];

  locResFields = [
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
  ];

  locFields = [
    "article_text_clean",
    "article_text_en_clean",
    "article_name",
    "article_name_en",
    "category_name",
    "category_name_en",
    "topic_name",
    "topic_name_en"
  ];

  locAggregations = [
    {
        "name": "category_name",
        "type": "terms",
        "field": "category_name.raw"
    },
    {
        "name": "topic_name",
        "type": "terms",
        "field": "topic_name.raw"
    },
    {
        "name": "category_name_en",
        "type": "terms",
        "field": "category_name_en.raw"
    },
    {
        "name": "topic_name_en",
        "type": "terms",
        "field": "topic_name_en.raw"
    },
    {
        "name": "author_name",
        "type": "terms",
        "field": "author_name.raw"
    },
    {
        "name": "histogram",
        "type": "dateHistogram",
        "field": "article_insert_date",
        "interval": "month"
    }
  ];

  osResFields = [
    "ministry_name",
    "agency_name",
    "title_ms",
    "desc_ms",
    "url_ms",
    "ministry_name_en",
    "agency_name_en",
    "title_en",
    "desc_en",
    "url_en"
  ];

  osFields = [
    "title_ms",
    "title_en",
    "desc_ms",
    "desc_en",
    "agency_name",
    "agency_name_en",
    "ministry_name",
    "ministry_name_en"
  ];

  osAggregations = [
    {
        "name": "ministry_name",
        "type": "terms",
        "field": "ministry_name.raw"
    },
    {
        "name": "agency_name",
        "type": "terms",
        "field": "agency_name.raw"
    },
    {
        "name": "ministry_name_en",
        "type": "terms",
        "field": "ministry_name_en.raw"
    },
    {
        "name": "agency_name_en",
        "type": "terms",
        "field": "agency_name_en.raw"
    }
  ];

  finalResFields = this.locResFields;
  finalFields = this.locFields;
  finalAggregations= this.locAggregations;  

  public obj = {
    "size": 10,
    "from": 0,
    "responseFields": this.finalResFields,
    "keyword": "",
    "keywordMap": {
      "exact": [
        ""
      ],
      "fields": this.finalFields,
    },
    "aggregations": this.finalAggregations,
    "filters": {
    }
  }

  ngOnInit() {
    // this.searchByKeyword('malaysia');
    let q_word = this.router.url.split('=')[1];
    if(q_word){
      this.searchByKeyword(q_word);
    }else {
      this.toastr.error("Please enter a word to search");
    }
    
    
  }

  ngAfterViewInit() {
    // debugger;
    // this.highlight_words('Malaysia','#intSearch');
  }
  chkmonpub(eve) {
    this.selMonPubDisp = eve.source.triggerValue.split(',')[0];
  }
  chkauth(eve) {
    this.selAuthDisp = eve.source.triggerValue.split(',')[0];
  }
  chkfiltrtopic(eve) {
    this.selTopicDisp = eve.source.triggerValue.split(',')[0];
  }
  chksubtop(eve) {
    this.selSubTopicDisp = eve.source.triggerValue.split(',')[0];
  }

  changeAryVal(objs){
    let aryObj : any;

    aryObj = {
      name: "",
      val: ""
    };let retn = [];
    Object.keys(objs).map(function (inx) {
      aryObj = new Object;
      aryObj.name = inx;
      aryObj.val = objs[inx];
      // do something with person
      retn.push(aryObj);
    });
    return retn;
  }
  

  changeTab(e){
    let tabInx = e.index;
    this.tabIndex = e.index;
    let k_word='';
    if(this.ser_word.trim().length > 0){
      k_word = this.ser_word.trim()
    }else {
      k_word = this.router.url.split('=')[1];
    }
    if (tabInx === 0){
      //In Local tab
      
    }else if (tabInx === 1){
      //In Online Service tab
    }else if(tabInx === 2){
      //In Global tab
    }
    this.searchByKeyword(k_word);
  }

  searchByKeyword(valkeyword) {
    if(valkeyword.trim().length > 0){
      this.loading = true;
      this.obj.keyword = valkeyword;
      this.obj.keywordMap.exact = [valkeyword];
      let dataUrl = '';
      if(this.tabIndex === 0){
        this.obj.responseFields = this.locResFields;
        this.obj.keywordMap.fields = this.locFields;
        this.obj.aggregations = this.locAggregations; 
        dataUrl = 'https://www.malaysia.gov.my/public/query/0/internal'; 
      }else if(this.tabIndex === 1){
        this.obj.responseFields = this.osResFields
        this.obj.keywordMap.fields = this.osFields
        this.obj.aggregations = this.osAggregations
        dataUrl = 'https://www.malaysia.gov.my/public/query/5/';
      }
      // debugger;
      // let dataUrl = 'https://www.malaysia.gov.my/public/query/0/internal';
      // https://www.malaysia.gov.my/public/query/5/ --------- for Online services
      
      this.arymonth = [];
      return this.http.post(dataUrl, this.obj)
        .map(res => res.json())
        .subscribe(rData => {
          console.log(rData);
          this.intData = rData.data;
          //   this.aggrData = rData.aggregations;
          this.author = this.changeAryVal(rData.aggregations.author_name);        
          this.monthPub = this.changeAryVal(rData.aggregations.histogram);       
  
          if (this.languageId === 1) {
            this.topics = this.changeAryVal(rData.aggregations.category_name_en);
            this.subTopics = this.changeAryVal(rData.aggregations.topic_name_en);
          } else {
            this.topics = this.changeAryVal(rData.aggregations.category_name);
            this.subTopics = this.changeAryVal(rData.aggregations.topic_name);
          }
          //   this.serchService.searchResData = rData.data;
          this.loading = false;
        },
          error => {
            this.loading = false;
            this.toastr.error(this.translate.instant('common.err.servicedown'), '');
          });
    }else{
      this.toastr.error("Please enter a word to search");
    }
    
  }

  chkKeyword(eve, id) {
    // this.toastr.success(id);
  }

  chkSpeci($eve, id) {
    // this.toastr.success(id);
  }

  showdatafn(val) {
    this.dataEach = val;
    this.serchService.searchResData = val;
  }

}
