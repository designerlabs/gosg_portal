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
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})

export class SearchResultComponent implements OnInit {
  
  errorMessage: any;
  observableGlobalItem: any;
  globVal: any;
  chknoncitizen: any;
  chkcitizen: any;
  lang = this.lang;
  languageId: any;
  public loading = false;
  date: moment.Moment;
  dataEach = '';
  panelOpenState: boolean = false;
  selKey = "yes";
  align: string;
  tabIndex = 0;
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
  valAuthor: any[];
  valTopic: any[];
  valSubTopic: any[];
  valMinistry: any[];
  valAgency: any[];
  selMonPubDisp = "";
  selAuthDisp = "";
  selTopicDisp = "";
  selSubTopicDisp = "";
  selMinisDisp = "";
  selAgencyDisp = "";
  ser_word = "";
  chkKeyValue = "1";
  inpExcWord = '';
  chktopic = true;
  chksubtopic = true;
  chktitle = true;
  chkdes = true;
  chkosminis = true;
  chkosagency = true;
  chkostitle = true;
  chkosdes = true;
  chkGlobValue = 'gov.my';

  // CONTENT FILTER FIELDS

  // LOCAL SEARCH
  category_topic: String = "category_topic";
  category_sub_topic: String = "category_sub_topic";
  ref_language_id: String = "ref_language_id";


  private internalUrl: string = this.config.urlIntSearch;
  private osUrl: string = this.config.urlOsSearch;
  private globalUrl: string = this.config.urlGlobalSearch;

  // Paggination
  totalElements = 0; noPrevData = true; noNextData = false; pagefrom = 0; pageNumber = 1; totalPages = 0; pagesize = 10;
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

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
    } else {
      this.languageId = 1;
    }
    // console.log(this.languageId)
  }

  public local = true;
  public os = false;
  public global = false;

  public keywordType = [
    { id: 1, nameEn: 'Exact word', nameMs: 'Perkataan yang tepat' },
    { id: 2, nameEn: 'All word', nameMs: 'Semua dari perkataan' },
    { id: 3, nameEn: 'Any word', nameMs: 'Mana-mana dari perkataan' }
  ];

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

  dataGlobe = ['gov.my', 'edu.my', 'org.my', '.my']

  // MAIN OBJ
  public mainObj: any = {
    "size": this.pagesize,
    "from": this.pagefrom,
    "keyword": "",
    "filters": {
      "ref_language_id": this.languageId
    }
  }

  // KEYOWRD MAP
  public keywordMap: any = {
    "fields": null,
    "exact": null,
    "all": null,
    "any": null,
    "not": null
  };

  // KEYWORD MAP FIELDS
  public locFields: any = [
    "content_description",
    "content_title",
    "content_topic",
    "content_sub_topic"
  ];

  // LOCAL AGGREGATIONS OBJ
  public locAggregations: any = [
    {
      "name": "histogram",
      "type": "dateHistogram",
      "field": "publish_date",
      "interval": "month",
      "time_zone": "+08:00",
      "minDocCount": 1,
      "size": 10
    },
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

  osFields: any = [
    "ministry_name",
    "agency_name",
    "title",
    "description"
  ];

  osAggregations: any = [
    {
      "name": "ministryAgg",
      "type": "terms",
      "field": "ministry_name.raw",
      "size": "10"
    },
    {
      "name": "agencyAgg",
      "type": "terms",
      "field": "agency_name.raw",
      "size": "10"
    }
  ];

  // -------------------------------- //

  // FILTERS
  public defaultFiltersObj: any = {
    "life_event_citizen_flag": false,
    "life_event_non_citizen_flag": false,
    "ref_language_id": this.languageId
  };

  public rangesEndDateObj: any = {
      "ranges":
      {
        "end_date": [
          {
            "gte": "now/d",
            "time_zone": "+08:00"
          }
        ]
      }
  }

  public agencyDefaultFilterObj: any = {
    "life_event_citizen_flag": false,
    "life_event_non_citizen_flag": false,
    "is_document": false,
    "enabled": true
  }

  public refLangObj: any = {
    "ref_language_id": this.languageId
  }

  public lifeEventFiltersObj: any = {
    "life_event_citizen_flag": false,
    "life_event_non_citizen_flag": false,
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
    if (this.ser_word.length > 0) {
      this.searchByKeyword(this.ser_word);
    }
  }

  btnSubmit() {
    this.searchByKeyword(this.ser_word);
  }

  addFilterAry(ary, resObj, type?) {

    // console.log(ary);

    if (ary.length > 0) {

      let res = [];
      ary.forEach(ele => {
        // console.log(ele)
        if (ele.name) {
          res.push(ele.name);
        } else {
          res.push(ele);
        }
      });

      if (type == "fields") {

      } else {
        this.mainObj.filters[resObj] = res;
      }
    }
  }

  // addKeySettings(keyVal){
  //   let key_ary : any;
  //   // key_ary = this.mainObj.keywordMap;
  //   let inxall = $.inArray('all', Object.keys(key_ary));
  //   let inxany = $.inArray('any', Object.keys(key_ary));
  //   let inxexact = $.inArray('exact', Object.keys(key_ary));

  //   if(keyVal === "1"){         // exact
  //     if(inxall >= 0){
  //       delete key_ary.all;
  //     }
  //     if(inxany >= 0){
  //       delete key_ary.any;
  //     }
  //     if(inxexact < 0){
  //       let ele = {'exact': []};
  //       ele.exact = [this.ser_word];
  //       jQuery.extend(key_ary, ele);
  //     }else{
  //       key_ary.exact = [this.ser_word];
  //     }      
  //     key_ary.not = [this.inpExcWord]; 
  //   }else if(keyVal === "2"){     //all
  //     if(inxexact >= 0){
  //       delete key_ary.exact;
  //     }
  //     if(inxany >= 0){
  //       delete key_ary.any;
  //     }
  //     if(inxall < 0){
  //       let ele = {'all': []};
  //       ele.all = [this.ser_word];
  //       jQuery.extend(key_ary, ele);
  //     }else{
  //       key_ary.all = [this.ser_word];
  //     }
  //     key_ary.not = [this.inpExcWord];
  //   }else if(keyVal === "3"){     //any
  //     if(inxexact >= 0){
  //       delete key_ary.exact;
  //     }
  //     if(inxall >= 0){
  //       delete key_ary.all;
  //     }
  //     if(inxany < 0){
  //       let ele = {'any': []};
  //       ele.any = [this.ser_word];
  //       jQuery.extend(key_ary, ele);
  //     }else{
  //       key_ary.any = [this.ser_word];
  //     }
  //     key_ary.not = [this.inpExcWord];
  //   }

  // }

  addSpecFiltr(methodNm, field) {
    let key = field;
    // console.log(this.mainObj)

    let res_ary = this.mainObj.filters;
    // console.log(res_ary)
    // console.log(field)

    // let inx = jQuery.inArray(field, res_ary);      
    if (methodNm === 'add') {
      res_ary[field] = [];
      // res_ary.push(enField);
    } else if (methodNm === 'remove') {
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

  changeAryVal(objs, type) {

    // console.log(objs)

    let aryObj: any;
    let retn = [];

    if(type != 'global') {
      aryObj = {
        name: "",
        val: ""
      };

    } else {
      aryObj = {
        title: "",
        description: "",
        url: "",
        date: ""
      };

    }
    Object.keys(objs).map(function (inx) {
      aryObj = new Object;
      if(type != 'global') {
        aryObj.name = inx;
        aryObj.val = objs[inx];
      } else {
        aryObj.title = objs[inx].title;
        aryObj.description = objs[inx].description;
        aryObj.url = objs[inx].url;
        aryObj.date = objs[inx].date;
      }

      // do something with person
      retn.push(aryObj);
    });
    // console.log(retn)
    return retn;
  }

  changeTab(e) {

    let tabInx = e.index;
    this.tabIndex = e.index;
    let k_word = '';
    if (this.ser_word.trim().length > 0) {
      k_word = this.ser_word.trim()
    } else {
      k_word = this.router.url.split('=')[1];
    }
    this.inpExcWord = '';
    if (tabInx === 0) {
      this.btnFilterReset();
      //In Local tab      
      this.chktopic = true;
      this.chksubtopic = true;
      this.chktitle = true;
      this.chkdes = true;
      // this.mainObj.keywordMap.fields = this.locFields.slice();

      delete this.mainObj.aggregations;
      this.mainObj.aggregations = this.locAggregations;
      // console.log("LOCAL : ")
      // console.log(this.mainObj)
      // this.mainObj.aggregations = {};
      // console.log(this.mainObj)

      this.resetPage();
      this.searchByKeyword(k_word);
    } else if (tabInx === 1) {
      this.btnFilterReset();
      //In Online Service tab
      this.chkosminis = true;
      this.chkosagency = true;
      this.chkostitle = true;
      this.chkosdes = true;
      // this.mainObj.filters = this.agencyDefaultFilterObj.slice();

      delete this.mainObj.aggregations;
      this.mainObj.aggregations = this.osAggregations;
      // console.log("OS : ")
      // console.log(this.mainObj)
      // this.mainObj.aggregations = {};
      // console.log(this.mainObj)

      // jQuery.extend(this.mainObj.filters, this.agencyDefaultFilterObj);
      // this.mainObj.keywordMap.fields = this.osFields.slice();
      this.resetPage();
      this.searchByKeyword(k_word);
    } else if (tabInx === 2) {
      //In Global tab
      this.btnFilterReset();
      this.resetPage();
      // this.searchByKeyword(k_word);
    }

  }

  checkCurrObj(objName) {

    let objElem;

    switch (objName) {

      case this.category_topic:
        objElem = this.category_topic
        break;

      case this.category_sub_topic:
        objElem = this.category_sub_topic
        break;

      case this.ref_language_id:
        objElem = this.ref_language_id
        break;

    }

    if (this.mainObj.filters.hasOwnProperty(objElem)) {
      this.addSpecFiltr('remove', objElem);
    } else {
      this.addSpecFiltr('add', objElem);
    }
  }

  keywordSplitter(str) {
    // console.log(str)
    let res: any = [];

    str = str.split(" ");
    str.forEach(el => {
      // console.log(el)
      res.push(el);
    });
    // res = str;
    // console.log(res)
    return res;
  }

  searchByKeyword(valkeyword) {
    let arrKeyword: any = [];
    let arrKeywordeySetting: any = [];
    let nullObj = {};
    let payloadObj: Object;

    // console.log(valkeyword)
    // console.log(this.date)

    if (localStorage.getItem('ser_word').length === 0) {
      localStorage.setItem('ser_word', valkeyword);
    }

    if (valkeyword.trim().length > 0) {
      this.loading = true;
      if (this.tabIndex == 0 || this.tabIndex == 1) {
        this.mainObj.keyword = valkeyword;
        this.mainObj.from = this.pagefrom;
        this.mainObj.size = this.pagesize;

        if (this.languageId)
          this.mainObj.filters.ref_language_id = this.languageId.toString();
        else
          this.mainObj.filters.ref_language_id = "1"

      }
      let dataUrl = '';

      // KEYWORD MAP AREA

      // console.log(this.chkKeyValue)
      // console.log(this.inpExcWord)
      if (this.inpExcWord)
        // console.log(this.keywordSplitter(this.inpExcWord))

      // console.log(this.locFields)

      if (this.tabIndex == 0)
        this.keywordMap.fields = this.locFields;
      else if (this.tabIndex == 1)
        this.keywordMap.fields = this.osFields;

      arrKeyword = this.keywordSplitter(this.ser_word)

      if (this.chkKeyValue == "1" && this.inpExcWord) {
        arrKeywordeySetting = this.keywordSplitter(this.inpExcWord)
        this.keywordMap.exact = arrKeyword;
        this.keywordMap.not = arrKeywordeySetting;
        delete this.keywordMap.all;
        delete this.keywordMap.any;
        // console.log(this.keywordMap)
        this.mainObj.keywordMap = this.keywordMap;
      } else if (this.chkKeyValue == "2" && this.inpExcWord) {
        arrKeywordeySetting = this.keywordSplitter(this.inpExcWord);
        this.keywordMap.all = arrKeyword;
        this.keywordMap.not = arrKeywordeySetting;
        delete this.keywordMap.exact;
        delete this.keywordMap.any;
        // console.log(this.keywordMap)
        this.mainObj.keywordMap = this.keywordMap;
      } else if (this.chkKeyValue == "3" && this.inpExcWord) {
        arrKeywordeySetting = this.keywordSplitter(this.inpExcWord)
        this.keywordMap.any = arrKeyword;
        this.keywordMap.not = arrKeywordeySetting;
        delete this.keywordMap.all;
        delete this.keywordMap.exact;
        // console.log(this.keywordMap)
        this.mainObj.keywordMap = this.keywordMap;
      }

      // KEYWORD MAP AREA END

      if (this.tabIndex === 0) { // LOCAL SEARCH

        delete this.mainObj.aggregations;
        this.mainObj.aggregations = this.locAggregations;
        // console.log(this.mainObj)

        dataUrl = this.internalUrl;

        // Search Specification
        if (this.valTopic && this.category_topic) {
          this.checkCurrObj(this.category_topic);
          this.addFilterAry(this.valTopic, this.category_topic);
        }

        if (this.valSubTopic && this.category_sub_topic) {
          this.checkCurrObj(this.category_sub_topic);
          this.addFilterAry(this.valSubTopic, this.category_sub_topic);
        }

        // Filter - Month Filter
        if (this.valMonPub) {
          if (this.valMonPub.length > 0) {
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
            if ($.inArray('ranges', Object.keys(this.mainObj.filters)) >= 0) {
              // If the range filter exist already
              this.mainObj.filters["ranges"]["publish_date"] = article_insert_date;
            } else {
              let range = {
                'ranges': {
                  'publish_date': []
                }
              }
              range.ranges.publish_date = article_insert_date;
              jQuery.extend(this.mainObj.filters, range);
            }
          }
        }
        payloadObj = this.mainObj;

      } else if (this.tabIndex === 1) { // ONLINE SERVICE SEARCH

        delete this.mainObj.aggregations;
        this.mainObj.aggregations = this.osAggregations;

        dataUrl = this.osUrl;

        // Ministry Filter
        if (this.valMinistry) {
          this.addFilterAry(this.valMinistry, 'ministry_name');
          // this.checkCurrObj(this.category_topic);
          // this.addFilterAry(this.valTopic, this.category_topic);   
        }
        // Agency Filter
        if (this.valAgency) {
          this.addFilterAry(this.valAgency, 'agency_name');
        }

        payloadObj = this.mainObj;
      } else if (this.tabIndex == 2) { // GLOBAL SEARCH

        dataUrl = this.globalUrl + "?keywords=" + this.ser_word + "&site=" + this.chkGlobValue + "&pagecount=" + this.pageNumber;

        payloadObj = nullObj;
      }

      console.log("CURRENT SEARCH OBJECT:")
      console.log(this.mainObj)
      // console.log("CURRENT SEARCH OBJECT IN JSON:")
      // console.log(JSON.stringify(this.mainObj))

      // debugger;

      this.loading = true;
      // this.arymonth = [];
      return this.http.post(dataUrl, payloadObj)
        .map(res => res.json())
        .subscribe(rData => {
          console.log("CURRENT SEARCH RESULT:")
          console.log(rData);

          let num;

          if (this.tabIndex == 0 || this.tabIndex == 1) {
            if(rData.stats.hits) {
              this.totalElements = rData.stats.hits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              num = (rData.stats.hits) / (this.pagesize);
            }
            this.millisec = rData.stats.tookMillis;
            this.intData = rData.data;
          } else {
            this.totalElements = rData.data.countinfo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            num = (rData.data.countinfo) / (this.pagesize);
            delete rData.data.countinfo;
            // this.millisec = rData.data.tookMillis;
            
            this.intData = this.changeAryVal(rData.data,'global')
          }

          if(num)
            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          
          // console.log(num)
          // console.log(this.totalElements.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

          // console.log(this.intData)

          this.selMonPubDisp = '';
          this.selAuthDisp = '';
          this.selTopicDisp = '';
          this.selSubTopicDisp = '';
          this.selMinisDisp = '';
          this.selAgencyDisp = '';
          this.ddauthor = [];
          this.ddtopics = [];
          this.ddmonthPub = [];
          this.ddsubTopics = [];
          this.ddministry = [];
          this.ddagency = [];

          this.valMonPub = [];
          this.valAuthor = [];
          this.valTopic = [];
          this.valSubTopic = [];
          this.valMinistry = [];
          this.valAgency = [];

          if (rData.data.length > 0) {

            if (this.tabIndex == 0) { // LOCAL
              let topic: any = {};
              let subtopic: any = {};

              if (rData.aggregations.histogram) {
                this.ddmonthPub = this.changeAryVal(rData.aggregations.histogram[0],'generic');
              }

              // console.log(rData.aggregations['filter_topic.category'][0].active_cat)
              rData.aggregations['filter_topic.category'][0].active_cat.forEach(item => {
                item = this.changeAryVal(item,'generic')
                topic = { "name": item[0].name, "val": item[0].val }
                this.ddtopics.push(topic)
              });
              rData.aggregations['filter_sub_topic.category'][0].active_cat.forEach(item => {
                item = this.changeAryVal(item,'generic')
                topic = { "name": item[0].name, "val": item[0].val }
                this.ddsubTopics.push(topic)
              });

              // console.log(this.ddtopics)
              // console.log(this.ddsubTopics)

            } else if (this.tabIndex == 1) { // ONLINE SERVICES
              let ministry: any = {};
              let agency: any = {};

              rData.aggregations.ministryAgg.forEach(item => {
                item = this.changeAryVal(item,'generic');
                // console.log(item)
                ministry = { "name": item[0].name, "val": item[0].val }
                this.ddministry.push(ministry);
              });

              rData.aggregations.agencyAgg.forEach(item => {
                item = this.changeAryVal(item,'generic');
                // console.log(item)
                agency = { "name": item[0].name, "val": item[0].val }
                this.ddagency.push(agency);
              });

              // console.log(this.ddministry)
              // console.log(this.ddagency)

            }

            if (this.totalElements % this.pagesize > 0) {
              this.totalPages = Math.floor(num) + 1;
            } else {
              this.totalPages = num;
            }
            if (this.totalPages > 0) {
              this.noNextData = this.pageNumber === this.totalPages;
            } else {
              this.noNextData = true;
            }
  
  
            //   this.serchService.searchResData = rData.data;
            this.showNoData = false;
            this.loading = false;

          } else {
            this.showNoData = true;
            this.sKeyword = false; //side menu 
            this.sSpeci = false; //side menu
            this.sFilter = false; //side menu
          }
        },
          error => {
            this.loading = false;
            this.toastr.error(this.translate.instant('common.err.servicedown'), '');
          });
    } else {
      this.toastr.error("Please enter a word to search");
    }

  }

  changeGlob(eve, val) {
    this.chkGlobValue = val;
    this.searchByKeyword(this.ser_word);
    // console.log(this.chkGlobValue)
  }

  chkKeyword(eve, id) {
    // console.log(eve)
    // console.log(this.inpExcWord)
    // this.inpExcWord = '';
    // this.toastr.success(id);
  }

  chkSpeci(e, type, elemName) {
    console.log(e)
    // console.log(type)

    switch (type) {

      case "content_topic":
        this.chktopic = e.checked
        if(e.checked == false)
          this.selTopicDisp = "";
          this.valTopic = [];
        break;

      case "content_sub_topic":
        this.chksubtopic = e.checked
        if(e.checked == false)
          this.selSubTopicDisp = "";
          this.valSubTopic = [];
        break;

      case "content_title":
        this.chktitle = e.checked
        break;

      case "content_description":
        this.chkdes = e.checked
        break;

      case "title":
        this.chkostitle = e.checked
        break;

      case "description":
        this.chkosdes = e.checked
        break;

      case "ministry_name":
        this.chkosminis = e.checked
        if(e.checked == false)
          this.selMinisDisp = "";
          this.valMinistry = [];
        break;

      case "agency_name":
        this.chkosagency = e.checked
        if(e.checked == false)
          this.selAgencyDisp = "";
          this.valAgency = [];
        break;

      case "citizen":
        this.chkcitizen = e.checked
        break;

      case "noncitizen":
        this.chknoncitizen = e.checked
        break;

    }
    this.chkSpec(type, e.source);

    // console.log(this.locFields)
    // console.log(this.osFields)
    // this.toastr.success(id);
  }

  chkSpec(type, src) {
    let found, foundIndex, tot;

    // console.log(this.locFields.length-1)
    if (this.tabIndex == 0) {
      found = this.locFields.find(k => k == type);
      foundIndex = this.locFields.findIndex(k => k == type);
      tot = this.locFields.length - 1;

      if (!found) {
        this.locFields.push(type);
      } else {
        if (this.locFields.length != 0)
          this.locFields.splice(foundIndex, 1);
      }

    } else if (this.tabIndex == 1) {
      found = this.osFields.find(k => k == type);
      foundIndex = this.osFields.findIndex(k => k == type);
      tot = this.osFields.length - 1;

      if (!found) {
        this.osFields.push(type);
      } else {
        if (this.osFields.length != 0)
          this.osFields.splice(foundIndex, 1);
      }
    }

    // if(tot != 1) {
    //   this.chktopic = true;
    //   this.chksubtopic = true;
    //   this.chktitle = true;
    //   this.chkdes = true;
    // }

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

  resetPage() {
    this.pageNumber = 1;
    this.pagefrom = 0;
    this.noNextData = false;
    this.noPrevData = true;
    this.pagesize = 10;
  }

  btnFilterReset() {
    this.inpExcWord = '';
    this.chktopic = true;
    this.chksubtopic = true;
    this.chktitle = true;
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

    // console.log(this.ser_word)

    // console.log(this.mainObj)

    if (this.tabIndex == 0) {
      if (this.mainObj.filters.category_sub_topic)
        delete this.mainObj.filters.category_sub_topic;

      if (this.mainObj.filters.category_topic)
        delete this.mainObj.filters.category_topic;

      delete this.mainObj.filters.ranges;
    } else if (this.tabIndex == 1) {
      delete this.mainObj.filters.agency_name;
      delete this.mainObj.filters.ministry_name;
      delete this.mainObj.filters.enabled;
      delete this.mainObj.filters.is_document;
      delete this.mainObj.aggregations;
    }
    delete this.mainObj.filters;
    this.mainObj.filters = {};

    if (this.mainObj.keywordMap)
      delete this.mainObj.keywordMap

    // console.log(this.mainObj)
    // debugger;
    // console.log(this.rangesObj)
    // console.log(this.refLangObj)
    if (this.tabIndex == 0) {
      this.mainObj.filters = this.defaultFiltersObj;
    } else if (this.tabIndex == 1) {
      // this.mainObj.filters = this.agencyDefaultFilterObj;
      this.mainObj.aggregations = this.osAggregations;
    }
    // debugger;

    this.searchByKeyword(this.ser_word);
    // debugger;
  }
}