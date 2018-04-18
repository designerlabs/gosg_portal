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
// import * as moment_ from 'moment';
import * as moment from 'moment';
// const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;
// import { SharedModule } from '../../shared/shared.module';
// import { MatTabsModule } from '@angular/material/tabs';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  lang = this.lang;
  languageId = this.languageId;
  public loading = false;
  date: moment.Moment;
  dataEach = '';
  panelOpenState: boolean = false;
  selKey = "yes";
  align: string;
  tabIndex =0;
  sKeyword = false; //side menu 
  sSpeci = false; //side menu
  sFilter = false; //side menu
  intData: any[];
  aggrData: any[];
  ddauthor: any[];
  ddtopics: any[];
  ddmonthPub: any[];
  // arymonth: any[];
  ddsubTopics: any[];
  ddministry: any[];
  ddagency: any[];
  valMonPub: any[];
  valAuthor:any[];
  valTopic:any[];
  valSubTopic:any[];
  valMinistry:any[];
  valAgency:any[];
  selMonPubDisp="";
  selAuthDisp="";
  selTopicDisp="";
  selSubTopicDisp="";
  selMinisDisp ="";
  selAgencyDisp="";
  ser_word = "";
  chkKeyValue = "1";
  inpExcWord = '';
  chktopic = true;
  chksubtopic = true;
  chktitle= true;
  chkdes = true;
  chkosminis = true;
  chkosagency = true;
  chkostitle = true;
  chkosdes = true;
  chkGlobValue = '';

// Paggination
  totalElements=0; noPrevData = true; noNextData = false; pagefrom = 0;pageNumber = 1; totalPages = 0; pagesize = 10;
  millisec = 0;
  showNoData = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private serchService: SearchService,
    // private moment : Moment
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
      this.searchByKeyword(this.ser_word); 
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

  dataGlobe = ['gov.my','edu.my','org.my','.my']

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
  // finalFields = this.locFields;
  finalAggregations= this.locAggregations;  

  public obj = {
    "size": this.pagesize,
    "from": this.pagefrom,
    "responseFields": this.finalResFields,
    "keyword": "",
    "keywordMap": {
      "exact": [""],
      "fields": this.locFields.slice(),
      "not": [""],
      // "all": [""],
      // "any": [""]
    },
    "aggregations": this.finalAggregations,
    "filters": {
    }
  }

  ngOnInit() {
    // this.searchByKeyword('malaysia');
    // let q_word = this.router.url.split('=')[1];
    // if(q_word){
    //   this.searchByKeyword(q_word);
    // }else {
    //   // this.toastr.error("Please enter a word to search");
    // }  
    // localStorage.setItem('ser_word', this.ser_word);
    this.date = moment();

    this.ser_word = localStorage.getItem('ser_word');
    if(this.ser_word.length > 0){      
      this.searchByKeyword(this.ser_word);
    }
  }

  btnSubmit(){
    this.searchByKeyword(this.ser_word);
  }

  addFilterAry(ary, resObjen, resObjms){
    if(ary.length > 0){
      let res = [];
      ary.forEach(ele =>{
        if(ele.name){
          res.push(ele.name);
        }else{
          res.push(ele);
        }      
      });
      if(this.languageId === 1){          
        this.obj.filters[resObjen] = res;
      }else if(this.languageId === 2){          
        this.obj.filters[resObjms] = res;
      }  
    }
  }

  addKeySettings(keyVal){
    let key_ary : any;
    key_ary = this.obj.keywordMap;
    let inxall = $.inArray('all', Object.keys(key_ary));
    let inxany = $.inArray('any', Object.keys(key_ary));
    let inxexact = $.inArray('exact', Object.keys(key_ary));

    if(keyVal === "1"){         // exact
      if(inxall >= 0){
        delete key_ary.all;
      }
      if(inxany >= 0){
        delete key_ary.any;
      }
      if(inxexact < 0){
        let ele = {'exact': []};
        ele.exact = [this.ser_word];
        jQuery.extend(key_ary, ele);
      }else{
        key_ary.exact = [this.ser_word];
      }      
      key_ary.not = [this.inpExcWord]; 
    }else if(keyVal === "2"){     //all
      if(inxexact >= 0){
        delete key_ary.exact;
      }
      if(inxany >= 0){
        delete key_ary.any;
      }
      if(inxall < 0){
        let ele = {'all': []};
        ele.all = [this.ser_word];
        jQuery.extend(key_ary, ele);
      }else{
        key_ary.all = [this.ser_word];
      }
      key_ary.not = [this.inpExcWord];
    }else if(keyVal === "3"){     //any
      if(inxexact >= 0){
        delete key_ary.exact;
      }
      if(inxall >= 0){
        delete key_ary.all;
      }
      if(inxany < 0){
        let ele = {'any': []};
        ele.any = [this.ser_word];
        jQuery.extend(key_ary, ele);
      }else{
        key_ary.any = [this.ser_word];
      }
      key_ary.not = [this.inpExcWord];
    }

  }

  addSpecFiltr(methodNm, msField, enField){
    let res_ary = this.obj.keywordMap.fields;
    let inx_ms; let inx_en;

    inx_ms = jQuery.inArray(msField, res_ary);      
    if(methodNm === 'add' && inx_ms < 0){
      res_ary.push(msField);
      res_ary.push(enField);
    }else if(methodNm === 'remove' && inx_ms >= 0){
      res_ary.splice(inx_ms,1);
      inx_en = jQuery.inArray(enField, res_ary);
      res_ary.splice(inx_en,1);
    }
  }
  
  chkmonpub(eve) {
    this.selMonPubDisp = eve.source.triggerValue.split(',')[0];
    // let d = moment.
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
  chkministry(eve) {
    this.selMinisDisp = eve.source.triggerValue.split(',')[0];
  }
  chkagency(eve) {
    this.selAgencyDisp = eve.source.triggerValue.split(',')[0];
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
    this.inpExcWord = '';
    if (tabInx === 0){
      //In Local tab      
      this.chktopic = true;
      this.chksubtopic = true;
      this.chktitle= true;
      this.chkdes = true;     
      this.obj.keywordMap.fields = this.locFields.slice();
      this.resetPage();
      this.searchByKeyword(k_word);
    }else if (tabInx === 1){
      //In Online Service tab
      this.chkosminis = true;
      this.chkosagency = true;
      this.chkostitle = true;
      this.chkosdes = true;
      this.obj.keywordMap.fields = this.osFields.slice();
      this.resetPage();
      this.searchByKeyword(k_word);
    }else if(tabInx === 2){
      //In Global tab
    }
    
  }

  searchByKeyword(valkeyword) {
    if(localStorage.getItem('ser_word').length === 0){
      localStorage.setItem('ser_word',valkeyword);
    }
    if(valkeyword.trim().length > 0){
      this.loading = true;
      this.obj.keyword = valkeyword;
      if(this.inpExcWord.length === 0){
        this.obj.keywordMap.exact = [valkeyword];
      }
      
      this.obj.from = this.pagefrom;
      this.obj.size = this.pagesize;
      let dataUrl = '';
      if(this.tabIndex === 0){
        this.obj.responseFields = this.locResFields.slice();
        // this.obj.keywordMap.fields = this.locFields;
        this.obj.aggregations = this.locAggregations.slice(); 
        this.obj.filters = {};
        dataUrl = 'https://www.malaysia.gov.my/public/query/0/internal'; 

        // Search Specification
        if(this.chktopic){       
          this.addSpecFiltr('add','category_name', 'category_name_en');
        }else {
            this.addSpecFiltr('remove', 'category_name', 'category_name_en');
        }

        if(this.chksubtopic){
          this.addSpecFiltr('add','topic_name', 'topic_name_en');
        }else {
          this.addSpecFiltr('remove', 'topic_name', 'topic_name_en');
        }

        if(this.chktitle){
          this.addSpecFiltr('add','article_name', 'article_name_en');
        }else {
          this.addSpecFiltr('remove', 'article_name', 'article_name_en');
        }

        if(this.chkdes){
          this.addSpecFiltr('add','article_text_clean', 'article_text_en_clean');
        }else {
          this.addSpecFiltr('remove', 'article_text_clean', 'article_text_en_clean');
        }

        // Filter - Month Filter
      if(this.valMonPub){
        if(this.valMonPub.length > 0){        
          let article_insert_date = [];        
          let selmon = this.valMonPub;        
          selmon.forEach(ele => {
            let mFrom = moment(ele).format('YYYY-MM-DD');
            let addDays = moment(ele).add(30, 'days'); 
            let mTo = moment(addDays.toDate()).format('YYYY-MM-DD');      
            let objloc = {
              'gte': mFrom,
              'lte': mTo
            }     
            article_insert_date.push(objloc);
          });
          if($.inArray('ranges',Object.keys(this.obj.filters)) >= 0){
            // If the range filter exist already
            this.obj.filters["ranges"]["article_insert_date"] = article_insert_date;
          }else {
            let range = {
              'ranges':{
                'article_insert_date':[]
              }
            }  
            range.ranges.article_insert_date = article_insert_date;
            jQuery.extend(this.obj.filters, range);
          }
        }
      }
        //Author Filter
      if(this.valAuthor){       
        this.addFilterAry(this.valAuthor, 'author_name', 'author_name');
      }  
      // Topics Filter
      if(this.valTopic){
        this.addFilterAry(this.valTopic, 'category_name_en', 'category_name');        
      }

      // Sub Topics Filter
      if(this.valSubTopic){
        this.addFilterAry(this.valSubTopic, 'topic_name_en', 'topic_name');        
      }


      }else if(this.tabIndex === 1){
        this.obj.responseFields = this.osResFields.slice();
        // this.obj.keywordMap.fields = this.osFields;
        this.obj.aggregations = this.osAggregations.slice();
        this.obj.filters = {};
        dataUrl = 'https://www.malaysia.gov.my/public/query/5/';

        if(this.chkosminis){
          this.addSpecFiltr('add','ministry_name', 'ministry_name_en');
        }else {
          this.addSpecFiltr('remove', 'ministry_name', 'ministry_name_en');
        }
  
        if(this.chkosagency){
          this.addSpecFiltr('add','agency_name', 'agency_name_en');
        }else {
          this.addSpecFiltr('remove', 'agency_name', 'agency_name_en');
        }
        if(this.chkostitle){
          this.addSpecFiltr('add','title_ms', 'title_en');
        }else {
          this.addSpecFiltr('remove', 'title_ms', 'title_en');
        }
        if(this.chkosdes){
          this.addSpecFiltr('add','desc_ms', 'desc_en');
        }else {
          this.addSpecFiltr('remove', 'desc_ms', 'desc_en');
        }
  
        // Ministry Filter
        if(this.valMinistry){
          this.addFilterAry(this.valMinistry, 'ministry_name_en', 'ministry_name');
        }
        // Agency Filter
        if(this.valAgency){
          this.addFilterAry(this.valAgency, 'agency_name_en', 'agency_name');
        }
      }
      // Local tab or Online services tab
    if(this.tabIndex === 0 || this.tabIndex === 1){ 
      if(this.inpExcWord.length > 0){     
        this.addKeySettings(this.chkKeyValue);      
      }
    }
      
      // this.arymonth = [];
      return this.http.post(dataUrl, this.obj)
        .map(res => res.json())
        .subscribe(rData => {
          console.log(rData);
          this.intData = rData.data;
          //   this.aggrData = rData.aggregations;
          this.selMonPubDisp = '';
          this.selAuthDisp = '';
          this.selTopicDisp = '';
          this.selSubTopicDisp = '';
          this.selMinisDisp = '';
          this.selAgencyDisp = '';
          this.ddauthor = [];
          this.ddtopics = [];
          this.ddmonthPub = [];
          // this.arymonth = [];
          this.ddsubTopics = [];
          this.ddministry = [];
          this.ddagency = [];

          this.valMonPub = [];
          this.valAuthor = [];
          this.valTopic = [];
          this.valSubTopic = [];
          this.valMinistry = [];
          this.valAgency = [];
          if(rData.data.length>0){            
            if(this.tabIndex==0){              
              this.ddauthor = this.changeAryVal(rData.aggregations.author_name);
              this.ddmonthPub = this.changeAryVal(rData.aggregations.histogram);
              if (this.languageId === 1) {
                this.ddtopics = this.changeAryVal(rData.aggregations.category_name_en);
                this.ddsubTopics = this.changeAryVal(rData.aggregations.topic_name_en);
              } else if (this.languageId === 2){
                this.ddtopics = this.changeAryVal(rData.aggregations.category_name);
                this.ddsubTopics = this.changeAryVal(rData.aggregations.topic_name);
              }
            }else if(this.tabIndex==1){
              if (this.languageId === 1) {
                this.ddministry = this.changeAryVal(rData.aggregations.ministry_name_en);
                this.ddagency = this.changeAryVal(rData.aggregations.agency_name_en);
              }else if (this.languageId === 2){
                this.ddministry = this.changeAryVal(rData.aggregations.ministry_name);
                this.ddagency = this.changeAryVal(rData.aggregations.agency_name);
              }            
            }
            this.showNoData = false;
          }else {
            this.showNoData = true;
            this.sKeyword = false; //side menu 
            this.sSpeci = false; //side menu
            this.sFilter = false; //side menu
          }

          this.totalElements = rData.stats.hits;
           let num = (rData.stats.hits)/(this.pagesize);
           if(this.totalElements % this.pagesize > 0){
            this.totalPages = Math.floor(num) + 1;
           }else{
            this.totalPages = num;
           }
           if(this.totalPages > 0){
            this.noNextData = this.pageNumber === this.totalPages;
           }else{
            this.noNextData = true;
           }
           
           this.millisec = rData.stats.tookMillis;
           
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

  changeGlob(eve, val){

  }

  chkKeyword(eve, id) {
    this.inpExcWord = '';
    // this.toastr.success(id);
  }

  chkSpeci($eve, id) {
    // this.toastr.success(id);
  }

  showdatafn(val) {
    this.dataEach = val;
    this.serchService.searchResData = val;
  }

  paginatorL() {
    this.pageNumber = this.pageNumber - 1;
    this.pagefrom = this.pagefrom - this.pagesize;
    this.noPrevData = this.pagefrom === 0;
    this.searchByKeyword(this.ser_word);
  }

  paginatorR() {
    this.pageNumber = this.pageNumber + 1;
    this.pagefrom = this.pagefrom + this.pagesize;
    this.noNextData = (this.pagefrom + this.pagesize) < this.totalElements ? false : true;
    this.noPrevData = false;
    this.searchByKeyword(this.ser_word);
  }

  pageChange(evt) {
    this.resetPage();
    this.pagesize = evt.value; 
    this.searchByKeyword(this.ser_word);
  }

  resetPage(){
    this.pageNumber = 1;
    this.pagefrom = 0;
    this.noNextData = false;
    this.noPrevData = true;
    this.pagesize = 10;
  }

  btnFilterReset(){
    this.inpExcWord = '';
    this.chktopic = true;
    this.chksubtopic = true;
    this.chktitle= true;
    this.chkdes = true;
    this.chkosminis = true;
    this.chkosagency = true;
    this.chkostitle = true;
    this.chkosdes = true;

    this.valMonPub = [];
    this.valAuthor = [];
    this.valTopic = [];
    this.valSubTopic = [];

    this.valMinistry = [];
    this.valAgency = [];
    this.searchByKeyword(this.ser_word);
  }
}