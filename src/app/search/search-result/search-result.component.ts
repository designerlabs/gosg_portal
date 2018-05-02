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
  languageId : any;
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

  // CONTENT FILTER FIELDS

  // LOCAL SEARCH
  category_topic: String = "category_topic";
  category_sub_topic: String = "category_sub_topic";
  ref_language_id: String = "ref_language_id";


  private internalUrl: string = this.config.urlIntSearch;
  private osUrl: string = this.config.urlOsSearch;

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
    this.languageId = 1;
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
    
    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      //this.getData();
    }else{
      this.languageId = 1;
    }
    console.log(this.languageId)
  }

  public local = true;
  public os = false;
  public global = false;

  // public keywordType = [
  //   { id: 1, nameEn: 'Exact word', nameMs: 'Perkataan yang tepat' },
  //   { id: 2, nameEn: 'All word', nameMs: 'Semua dari perkataan' },
  //   { id: 3, nameEn: 'Any word', nameMs: 'Mana-mana dari perkataan' }
  // ];

  // public internalSpec = [
  //   { id: 11, nameEn: 'Topics', nameMs: 'Topik' },
  //   { id: 12, nameEn: 'Sub Topics', nameMs: 'Sub Topik' },
  //   { id: 13, nameEn: 'Title', nameMs: 'Tajuk' },
  //   { id: 14, nameEn: 'Description', nameMs: 'Deskripsi' },

  //   { id: 15, nameEn: 'Ministries', nameMs: 'Kementerian' },
  //   { id: 16, nameEn: 'Agencies', nameMs: 'Agensi' },
  //   { id: 17, nameEn: 'Title', nameMs: 'Tajuk' },
  //   { id: 18, nameEn: 'Description', nameMs: 'Deskripsi' }
  // ];
  // public internalFilter = [
  //   { id: 21, nameEn: 'Month Published', nameMs: 'Bulan Diterbitkan' },
  //   { id: 22, nameEn: 'Author', nameMs: 'Penulis' },
  //   { id: 23, nameEn: 'Topics', nameMs: 'Topik' },
  //   { id: 24, nameEn: 'Sub Topics', nameMs: 'Sub Topik'  }
  // ];

  dataGlobe = ['gov.my','edu.my','org.my','.my']

  // MAIN OBJ
  public mainObj: any = {
    "size": this.pagesize,
    "from": this.pagefrom,
    "keyword": "",
    "filters":{
        "category": {"is_active": true},
        "ref_language_id": this.languageId
    },
    "aggregations": [
        {
          "name": "histogram",
          "type": "dateHistogram",
          "field": "publish_date",
          "interval": "month",
          "time_zone": "+08:00",
          "minDocCount": 1,
          "size": 10
        }
      ]
  }
  
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

// LOCAL AGGREGATIONS OBJ
  public locAggregations: any = [
    {
        "name": "filter_topic.category",
        "type": "filter",
        "field": "category.is_active",
        "filter": {
          "category.is_active": true
        },
        "subAggregation": {
          "name": "active_cat",
          "type": "terms",
          "field": "category.topic.raw",
          "size": "10"
        }
      },
      {
        "name": "filter_sub_topic.category",
        "type": "filter",
        "field": "category.is_active",
        "filter": {
          "category.is_active": true
        },
        "subAggregation": {
          "name": "active_cat",
          "type": "terms",
          "field": "category.sub_topic.raw",
          "size": "10"
        }
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

// -------------------------------- //

  // FILTERS
  public defaultFiltersObj: any = {
      "category": {"is_active": true},
      "ref_language_id": this.languageId
  };

  public rangesEndDateObj: any = {
    "ranges":
    {
        "end_date": [
            {
                "gte": "now/d",
                "time_zone":"+08:00"
            }
        ]
    }
  }

  public agencyDefaultFilterObj: any = {
    "is_document": false,
		"enabled": true
  }

  public refLangObj: any = {
    "ref_language_id": this.languageId
  }

  public extraFiltersObj: any = {
    "content_is_approved_flag": true,
    "content_is_active_flag": true,
    "life_event_citizen_flag": false,
    "life_event_non_citizen_flag": false,
    "category": {"is_active": true}
  }

  public approvedFlagObj: any = {
    "content_is_approved_flag": true
  }

  public activeFlagObj: any = {
    "content_is_active_flag": true
  }

  public lifeEventCitizenFlagObj: any = {
    "life_event_citizen_flag": false
  }

  public lifeEventNonCitizenFlagObj: any = {
    "life_event_non_citizen_flag": false
  }

  public categoryFlagObj: any = {
    "category": {"is_active": true}
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

  addFilterAry(ary, resObj){

    // console.log(ary);

    if(ary.length > 0){

      let res = [];
      ary.forEach(ele =>{
        // console.log(ele)
        if(ele.name){
          res.push(ele.name);
        }else{
          res.push(ele);
        }      
      });

      this.mainObj.filters[resObj] = res;
    }
  }

  addKeySettings(keyVal){
    let key_ary : any;
    // key_ary = this.mainObj.keywordMap;
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

  addSpecFiltr(methodNm, field){
    let key = field;
    // console.log(this.mainObj)
    
    let res_ary = this.mainObj.filters;
    // console.log(res_ary)
    // console.log(field)

    // let inx = jQuery.inArray(field, res_ary);      
    if(methodNm === 'add'){
      res_ary[field] = [];
      // res_ary.push(enField);
    }else if(methodNm === 'remove'){
      delete res_ary[field];
      // res_ary.splice(2,2);
      // inx = jQuery.inArray(field, res_ary);
      // res_ary.splice(inx_en,1);
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

    // console.log(objs)
    let aryObj : any;

    aryObj = {
      name: "",
      val: ""
    };
    let retn = [];
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
      this.btnFilterReset();
      //In Local tab      
      this.chktopic = true;
      this.chksubtopic = true;
      this.chktitle= true;
      this.chkdes = true;     
      // this.mainObj.keywordMap.fields = this.locFields.slice();
      this.resetPage();
      this.searchByKeyword(k_word);
    }else if (tabInx === 1){
      this.btnFilterReset();
      //In Online Service tab
      this.chkosminis = true;
      this.chkosagency = true;
      this.chkostitle = true;
      this.chkosdes = true;
      // this.mainObj.filters = this.agencyDefaultFilterObj.slice();
      jQuery.extend(this.mainObj.filters, this.agencyDefaultFilterObj);
      // this.mainObj.keywordMap.fields = this.osFields.slice();
      this.resetPage();
      this.searchByKeyword(k_word);
    }else if(tabInx === 2){
      //In Global tab
    }
    
  }

  checkCurrObj(objName) {

    let objElem;

    switch(objName) {

      case this.category_topic:
        objElem = this.category_topic
        break;

      case this.category_sub_topic:
        objElem = this.category_sub_topic
        break;

      case this.ref_language_id:
        objElem = this.ref_language_id
        break;

      // default:
      //   objElem = null;
    
    }
    
    if(this.mainObj.filters.hasOwnProperty(objElem)) {
      this.addSpecFiltr('remove', objElem);
    } else {
      this.addSpecFiltr('add',objElem);
    }
  }

  searchByKeyword(valkeyword) {

    // console.log(valkeyword)
    // console.log(this.date)

    if(localStorage.getItem('ser_word').length === 0){
      localStorage.setItem('ser_word',valkeyword);
    }

    if(valkeyword.trim().length > 0){
      this.loading = true;
      this.mainObj.keyword = valkeyword;
      // if(this.inpExcWord.length === 0){
      //   this.mainObj.keywordMap.exact = [valkeyword];
      // }
      
      this.mainObj.from = this.pagefrom;
      this.mainObj.size = this.pagesize;

      if(this.languageId)
        this.mainObj.filters.ref_language_id = this.languageId.toString();
      else
        this.mainObj.filters.ref_language_id = "1"

      let dataUrl = '';

      if(this.tabIndex === 0){

          // this.mainObj.responseFields = this.locResFields.slice();
          // this.mainObj.keywordMap.fields = this.locFields;
          // this.mainObj.aggregations = this.locAggregations.slice(); 
          // this.mainObj.filters = {};
          dataUrl = this.internalUrl;

          // console.log(this.valTopic)
          // console.log(this.mainObj)

          // Search Specification
          if(this.valTopic) {
            this.checkCurrObj(this.category_topic);
            this.addFilterAry(this.valTopic, this.category_topic);   
          }

          if(this.valSubTopic) {
            this.checkCurrObj(this.category_sub_topic);
            this.addFilterAry(this.valSubTopic, this.category_sub_topic);   
          }

          // if(this.chktopic){
          //   this.addSpecFiltr('add','category_topic');
          //   alert('add')
          // }else {
          //   this.addSpecFiltr('remove', 'category_topic');
          // }

          // if(this.chksubtopic){
          //   this.addSpecFiltr('add','category_subtopic');
          // }else {
          //   this.addSpecFiltr('remove', 'category_subtopic');
          // }

          // if(this.chktitle){
          //   this.addSpecFiltr('add','article_name');
          // }else {
          //   this.addSpecFiltr('remove', 'article_name');
          // }

          // if(this.chkdes){
          //   this.addSpecFiltr('add','article_text_clean');
          // }else {
          //   this.addSpecFiltr('remove', 'article_text_clean');
          // }

        // console.log(this.valMonPub);

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
            if($.inArray('ranges',Object.keys(this.mainObj.filters)) >= 0){
              // If the range filter exist already
              this.mainObj.filters["ranges"]["end_date"] = article_insert_date;
            }else {
              let range = {
                'ranges':{
                  'end_date':[]
                }
              }  
              range.ranges.end_date = article_insert_date;
              jQuery.extend(this.mainObj.filters, range);
            }
          }
        }
          //Author Filter
        if(this.valAuthor){       
          this.addFilterAry(this.valAuthor, 'author_name');
        }  

        // console.log(this.valTopic)
        // console.log(this.valSubTopic)
        
        // Topics Filter
        // if(this.valTopic){
        //   this.addFilterAry(this.valTopic, this.category_topic);        
        // }

        // Sub Topics Filter
        // if(this.valSubTopic){
        //   this.addFilterAry(this.valSubTopic, this.category_sub_topic);        
        // }

      }else if(this.tabIndex === 1){

        // this.mainObj.responseFields = this.osResFields.slice();
        // this.mainObj.keywordMap.fields = this.osFields;
        // this.mainObj.aggregations = this.osAggregations.slice();
        // this.mainObj.filters = {};
        dataUrl = this.osUrl;

        // if(this.chkosminis){
        //   this.addSpecFiltr('add','ministry_name');
        // }else {
        //   this.addSpecFiltr('remove', 'ministry_name');
        // }
  
        // if(this.chkosagency){
        //   this.addSpecFiltr('add','agency_name');
        // }else {
        //   this.addSpecFiltr('remove', 'agency_name');
        // }
        // if(this.chkostitle){
        //   this.addSpecFiltr('add','title_ms');
        // }else {
        //   this.addSpecFiltr('remove', 'title_ms');
        // }
        // if(this.chkosdes){
        //   this.addSpecFiltr('add','desc_ms');
        // }else {
        //   this.addSpecFiltr('remove', 'desc_ms');
        // }
  
        // Ministry Filter
        if(this.valMinistry){
          this.addFilterAry(this.valMinistry, 'ministry_name_en');
          // this.checkCurrObj(this.category_topic);
          // this.addFilterAry(this.valTopic, this.category_topic);   
        }
        // Agency Filter
        if(this.valAgency){
          this.addFilterAry(this.valAgency, 'agency_name_en');
        }
      }
      // Local tab or Online services tab
    if(this.tabIndex === 0 || this.tabIndex === 1){ 
      if(this.inpExcWord.length > 0){     
        this.addKeySettings(this.chkKeyValue);      
      }
    }

    console.log("CURRENT SEARCH OBJECT:")
    console.log(this.mainObj)
    console.log("CURRENT SEARCH OBJECT IN JSON:")
    console.log(JSON.stringify(this.mainObj))

    // debugger;
      
      // this.arymonth = [];
      return this.http.post(dataUrl, this.mainObj)
        .map(res => res.json())
        .subscribe(rData => {
          console.log("CURRENT SEARCH RESULT:")
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
            
            
            if(this.tabIndex==0){ // LOCAL

              // this.ddauthor = this.changeAryVal(rData.aggregations.author_name);
              if(rData.aggregations.histogram)
                this.ddmonthPub = this.changeAryVal(rData.aggregations.histogram);
              // if (this.languageId === 1) {

              // console.log(this.intData.length)

              rData.data.forEach(item => {
                // console.log(item.category[0].sub_topic)
                this.ddtopics.push(item.category[0].topic)
                this.ddsubTopics.push(item.category[0].sub_topic)
              })
              // console.log(this.ddtopics)
              // console.log(rData.data)

                this.ddtopics = this.changeAryVal(this.ddtopics);
                this.ddsubTopics = this.changeAryVal(this.ddsubTopics);
              // } 
              // else if (this.languageId === 2){
              //   this.ddtopics = this.changeAryVal(rData.aggregations.category_name);
              //   this.ddsubTopics = this.changeAryVal(rData.aggregations.topic_name);
              // }

            }else if(this.tabIndex==1){ // ONLINE SERVICES

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
    
    console.log(this.ser_word)

    // console.log(this.mainObj)
    
    if(this.tabIndex == 0) {
    delete this.mainObj.filters.category_sub_topic;
    delete this.mainObj.filters.category_topic;
    delete this.mainObj.filters.ranges;
    } else if(this.tabIndex == 1) {
      delete this.mainObj.filters.enabled;
      delete this.mainObj.filters.is_document;
    }
    delete this.mainObj.filters;
    this.mainObj.filters = {};

    console.log(this.mainObj)
    // debugger;
    // console.log(this.rangesObj)
    // console.log(this.refLangObj)
    if(this.tabIndex == 0) {
      this.mainObj.filters = this.defaultFiltersObj;
    } else if(this.tabIndex == 1) {
      this.mainObj.filters = this.agencyDefaultFilterObj;
    }
    // debugger;

    this.searchByKeyword(this.ser_word);
    // debugger;
  }
}