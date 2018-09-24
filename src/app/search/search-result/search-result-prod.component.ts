import { Component, OnInit, Input, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../common/shared.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { Http } from '@angular/http';
import { SearchService } from '../../search/search.service';
import * as moment from 'moment';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../../header/topnav/topnav.service';
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

export class SearchResultProdComponent implements OnInit, OnDestroy {

  errorMessage: any;
  observableGlobalItem: any;
  globVal: any;
  chknoncitizen: boolean = false;
  chkcitizen: boolean = false;
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

  locUnchecked:any = 0;
  osUnchecked:any = 0;

  dLocTopic: boolean = false;
  dLocSubtopic: boolean = false;
  dLocTitle: boolean = false;
  dLocDesc: boolean = false;

  dOsMministry: boolean = false;
  dOsAgency: boolean = false;
  dOsTopic: boolean = false;
  dOsDesc: boolean = false;

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

  curr_data_lang: string = "Bahasa Malaysia";

  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private router: Router,
    public sharedService: SharedService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private topnavservice: TopnavService,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private serchService: SearchService,
    private location : Location
  ) {
    this.subscriptionLang = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // this.sharedService.errorHandling(event, (function(){
        const myLang = this.translate.currentLang;
        if (myLang === 'en') {
           this.lang = 'en';
           this.languageId = 1;
        }
        if (myLang === 'ms') {
          this.lang = 'ms';
          this.languageId = 2;
        }

        if(this.topnavservice.flagLang){
          this.searchByKeyword(this.ser_word);
        }

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
    "is_active": true,
    "is_citizen_event": false,
    "is_noncitizen_event": false,
    "is_document": false,
    "enabled": true
  }

  public refLangObj: any = {
    "ref_language_id": this.languageId
  }

  public lifeEventFiltersObj: any = {
    "category": {
      "is_active": true,
      "is_citizen_event": false,
      "is_noncitizen_event": false
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

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
    }else{
      this.languageId = 1;
    }

    this.getSearchUrl();

    this.date = moment();

    this.ser_word = localStorage.getItem('ser_word');
    if(this.ser_word.length > 0) {
      this.searchByKeyword(this.ser_word);
    }
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  btnSubmit() {
    this.searchByKeyword(this.ser_word);
  }

  changeCurrDataLang() {
    if(this.mainObj.filters.ref_language_id == "1") {
      this.mainObj.filters.ref_language_id = "2"
      this.curr_data_lang = "English";
    } else if(this.mainObj.filters.ref_language_id == "2") {
      this.mainObj.filters.ref_language_id = "1"
      this.curr_data_lang = "Bahasa Malaysia";
    }
  }

  addFilterAry(ary, resObj, type?) {

    // 

    if (ary.length > 0) {

      let res = [];
      ary.forEach(ele => {
        // 
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

  addSpecFiltr(methodNm, field) {
    let key = field;
    // 

    let res_ary = this.mainObj.filters;
    // 
    // 

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

    // 

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
    // 
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

      this.intData = [];
      // this.btnFilterReset();
      //In Local tab
      this.chktopic = true;
      this.chksubtopic = true;
      this.chktitle = true;
      this.chkdes = true;
      // this.mainObj.keywordMap.fields = this.locFields.slice();

      delete this.mainObj.aggregations;
      this.mainObj.aggregations = this.locAggregations;
      // 
      // 
      // this.mainObj.aggregations = {};
      // 

      this.resetPage();
      this.searchByKeyword(k_word);
    } else if (tabInx === 1) {

      this.intData = [];
      // this.btnFilterReset();
      //In Online Service tab
      this.chkosminis = true;
      this.chkosagency = true;
      this.chkostitle = true;
      this.chkosdes = true;
      // this.mainObj.filters = this.agencyDefaultFilterObj.slice();

      delete this.mainObj.aggregations;
      delete this.mainObj.filters.category;
      this.mainObj.aggregations = this.osAggregations;
      // 
      // 
      // this.mainObj.aggregations = {};
      // 

      // jQuery.extend(this.mainObj.filters, this.agencyDefaultFilterObj);
      // this.mainObj.keywordMap.fields = this.osFields.slice();
      this.resetPage();
      this.searchByKeyword(k_word);
    } else if (tabInx === 2) {

      this.intData = [];
      this.totalElements = 0;

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
    // 
    let res: any = [];

    str = str.split(" ");
    str.forEach(el => {
      // 
      res.push(el);
    });
    // res = str;
    // 
    return res;
  }

  searchByKeyword(valkeyword, opt?) {
    // this.router.navigate(['search/searchResult/' + valkeyword]);
    let locStrgKword = localStorage.getItem('ser_word');
    let navKword = this.router.url.split("/")[2];

    if(decodeURI(navKword) != locStrgKword) {
      localStorage.setItem('ser_word', decodeURI(navKword));
      this.loading = true;
      location.href = './search/'+navKword;
      this.mainObj.keyword(decodeURI(navKword));
    } else if(valkeyword != locStrgKword) {
      localStorage.setItem('ser_word', decodeURI(valkeyword));
      this.loading = true;
      location.href = './search/'+valkeyword;
      this.mainObj.keyword(decodeURI(valkeyword));
    }

    let arrKeyword: any = [];
    let arrKeywordeySetting: any = [];
    let nullObj = {};
    let payloadObj: Object;

    let env = window.location.hostname;
    let envOrigin = window.location.origin;
    let localURL = envOrigin+'/gosg/';
          
    this.totalElements = 0;
    let num;
    let dataLength = 0;

    if (localStorage.getItem('ser_word').length === 0) {
      localStorage.setItem('ser_word', valkeyword);
    }

    if (valkeyword.trim().length > 0) {
      // this.loading = true;
      if (this.tabIndex == 0 || this.tabIndex == 1) {
        this.mainObj.keyword = valkeyword;
        this.mainObj.from = this.pagefrom;
        this.mainObj.size = this.pagesize;

        if(opt) {
          this.changeCurrDataLang();
        } else {

          if(this.languageId)
            this.mainObj.filters.ref_language_id = this.languageId.toString();
          else
            this.mainObj.filters.ref_language_id = "1"
        }

      }
      let dataUrl = '';

      // KEYWORD MAP AREA

      // 
      // 
      // if (this.inpExcWord)
        // 

      // 

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
        // 
        this.mainObj.keywordMap = this.keywordMap;
      } else if (this.chkKeyValue == "2" && this.inpExcWord) {
        arrKeywordeySetting = this.keywordSplitter(this.inpExcWord);
        this.keywordMap.all = arrKeyword;
        this.keywordMap.not = arrKeywordeySetting;
        delete this.keywordMap.exact;
        delete this.keywordMap.any;
        // 
        this.mainObj.keywordMap = this.keywordMap;
      } else if (this.chkKeyValue == "3" && this.inpExcWord) {
        arrKeywordeySetting = this.keywordSplitter(this.inpExcWord)
        this.keywordMap.any = arrKeyword;
        this.keywordMap.not = arrKeywordeySetting;
        delete this.keywordMap.all;
        delete this.keywordMap.exact;
        // 
        this.mainObj.keywordMap = this.keywordMap;
      }

      // KEYWORD MAP AREA END

      if (this.tabIndex === 0) { // LOCAL SEARCH

        delete this.mainObj.aggregations;
        // delete this.mainObj.filters.category;

        this.mainObj.aggregations = this.locAggregations;
        // 

        if(env == 'localhost')
          dataUrl = this.internalUrl;
        else
          dataUrl = localURL+'content';

        // Search Specification
        if ((this.valTopic && this.valTopic.length >= 1) && this.category_topic) {
          this.checkCurrObj(this.category_topic);
          this.addFilterAry(this.valTopic, this.category_topic);
        }

        if ((this.valSubTopic && this.valSubTopic.length >= 1) && this.category_sub_topic) {
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

        if(this.chkcitizen) {
          this.mainObj.filters.category.is_citizen_event = this.chkcitizen;
        }

        if(this.chknoncitizen) {
          this.mainObj.filters.category.is_noncitizen_event = this.chknoncitizen;
        }

        jQuery.extend(this.mainObj.filters, this.lifeEventFiltersObj);
        payloadObj = this.mainObj;

        // 

      } else if (this.tabIndex === 1) { // ONLINE SERVICE SEARCH

        delete this.mainObj.aggregations;
        this.mainObj.aggregations = this.osAggregations;

        if(env == 'localhost')
          dataUrl = this.osUrl;
        else
          dataUrl = localURL+'agency';

        // Ministry Filter
        if (this.valMinistry) {
          this.addFilterAry(this.valMinistry, 'ministry_name');
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

      this.loading = true;
      // this.arymonth = [];

      if (this.tabIndex == 0 || this.tabIndex == 1) { // INTERNAL & ONLINE SERVICES SEARCH

      return this.http.post(dataUrl, payloadObj)
        .map(res => res.json())
        .subscribe(rData => {

          if(rData.stats.hits) {
            this.totalElements = rData.stats.hits;
            num = (rData.stats.hits) / (this.pagesize);
            dataLength = rData.data.length;
          }
          this.millisec = rData.stats.tookMillis;
          this.intData = rData.data;

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

          if (dataLength > 0) {

            if (this.tabIndex == 0) { // LOCAL
              let topic: any = {};
              let subtopic: any = {};

              if (rData.aggregations.histogram) {
                this.ddmonthPub = this.changeAryVal(rData.aggregations.histogram[0],'generic');
              }

              // 
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

              // 
              // 

            } else if (this.tabIndex == 1) { // ONLINE SERVICES
              let ministry: any = {};
              let agency: any = {};

              rData.aggregations.ministryAgg.forEach(item => {
                item = this.changeAryVal(item,'generic');
                // 
                ministry = { "name": item[0].name, "val": item[0].val }
                this.ddministry.push(ministry);
              });

              rData.aggregations.agencyAgg.forEach(item => {
                item = this.changeAryVal(item,'generic');
                // 
                agency = { "name": item[0].name, "val": item[0].val }
                this.ddagency.push(agency);
              });

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

            if(num && num > 999)
              this.totalPages = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            this.showNoData = false;
            
          } else {
            this.showNoData = true;
            this.sKeyword = false; //side menu
            this.sSpeci = false; //side menu
            this.sFilter = false; //side menu
          }
          this.loading = false;
          rData = null;
        },
        error => {
          this.loading = false;
          this.toastr.error(this.translate.instant('common.err.servicedown'), '');
        });

      } else { // GLOBAL SEARCH

        return this.http.get(dataUrl, payloadObj)
          .map(res => res.json())
          .subscribe(rData => {
          
            this.totalElements = rData.data.countinfo;
            num = (rData.data.countinfo) / (this.pagesize);
            delete rData.data.countinfo;
            dataLength = Object.keys(rData.data).length;
            // this.millisec = rData.data.tookMillis;

            this.intData = this.changeAryVal(rData.data,'global')
  
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
  
            if (dataLength > 0) {
  
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
  
              if(num && num > 999)
                this.totalPages = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
              // this.totalElements.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
              //   this.serchService.searchResData = rData.data;
              this.showNoData = false;
              
            } else {
              this.showNoData = true;
              this.sKeyword = false; //side menu
              this.sSpeci = false; //side menu
              this.sFilter = false; //side menu
            }
            this.loading = false;
            rData = null;
          },
          error => {
            this.loading = false;
            this.toastr.error(this.translate.instant('common.err.servicedown'), '');
          });

      }

    } else {
      this.toastr.error(this.translate.instant('common.msg.searchKeyword'), '');
    }

  }

  getSearchUrl() {

    return this.http.get(this.config.urlGlobalSearch)
    .map(res => res.json())
    .subscribe(data => {
        this.globalUrl = data.resource.searchUrl;
    });
  }

  changeGlob(eve, val) {
    this.chkGlobValue = val;
    this.searchByKeyword(this.ser_word);
    // 
  }

  chkKeyword(eve, id) {
    // 
    // 
    // this.inpExcWord = '';
    // this.toastr.success(id);
  }


  chkSpeci(e, type, elemName) {
    // 
    // 

    switch (type) {

      case "content_topic":
        this.chktopic = e.checked
        if(e.checked == false) {
          this.selTopicDisp = "";
          this.valTopic = [];
          this.locUnchecked = this.locUnchecked+1;
        } else if(e.checked == true) {
          this.locUnchecked = this.locUnchecked-1;
        }
        break;

      case "content_sub_topic":
        this.chksubtopic = e.checked
        if(e.checked == false) {
          this.selSubTopicDisp = "";
          this.valSubTopic = [];
          this.locUnchecked = this.locUnchecked+1;
        } else if(e.checked == true) {
          this.locUnchecked = this.locUnchecked-1;
        }

        break;

      case "content_title":
        this.chktitle = e.checked
        if(e.checked == false) {
          this.locUnchecked = this.locUnchecked+1;
        } else if(e.checked == true) {
          this.locUnchecked = this.locUnchecked-1;
        }

        break;

      case "content_description":
        this.chkdes = e.checked
        if(e.checked == false) {
          this.locUnchecked = this.locUnchecked+1;
        } else if(e.checked == true) {
          this.locUnchecked = this.locUnchecked-1;
        }

        break;

      case "title":
        this.chkostitle = e.checked
        if(e.checked == false) {
          this.osUnchecked = this.osUnchecked+1;
        } else if(e.checked == true) {
          this.osUnchecked = this.osUnchecked-1;
        }

        break;

      case "description":
        this.chkosdes = e.checked
        if(e.checked == false) {
          this.osUnchecked = this.osUnchecked+1;
        } else if(e.checked == true) {
          this.osUnchecked = this.osUnchecked-1;
        }

        break;

      case "ministry_name":
        this.chkosminis = e.checked
        if(e.checked == false) {
          this.selMinisDisp = "";
          this.valMinistry = [];
          this.osUnchecked = this.osUnchecked+1;
        } else if(e.checked == true) {
          this.osUnchecked = this.osUnchecked-1;
        }

        break;

      case "agency_name":
        this.chkosagency = e.checked
        if(e.checked == false) {
          this.selAgencyDisp = "";
          this.valAgency = [];
          this.osUnchecked = this.osUnchecked+1;
        } else if(e.checked == true) {
          this.osUnchecked = this.osUnchecked-1;
        }

        break;

      case "citizen":
        this.chkcitizen = e.checked
        break;

      case "noncitizen":
        this.chknoncitizen = e.checked
        break;

    }
    this.chkSpec(type, e.source);

    // 
    // 
    // this.toastr.success(id);
  }

  chkSpec(type, src) {
    let found, foundIndex, tot;

    // 
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
    // 
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
    this.locUnchecked = 0;
    this.osUnchecked = 0;

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

    if (this.tabIndex == 0) {
      this.mainObj.filters = this.defaultFiltersObj;
      jQuery.extend(this.mainObj.filters, this.lifeEventFiltersObj);

      this.mainObj.filters.category.is_citizen_event = false;
      this.mainObj.filters.category.is_noncitizen_event = false;

      this.chkcitizen = false;
      this.chknoncitizen = false;
    } else if (this.tabIndex == 1) {
      this.mainObj.aggregations = this.osAggregations;
    }

    // 
    // 
    this.searchByKeyword(this.ser_word);
  }
}
