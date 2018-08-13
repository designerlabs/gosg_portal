import { Component, OnInit, ViewChild, Inject, AfterViewInit, AfterContentChecked, AfterViewChecked, Input, ElementRef, OnDestroy } from '@angular/core';
// import { CalendarComponent } from 'ng-fullcalendar';
import * as $ from 'jquery';
import 'fullcalendar';
// import {Options} from "fullcalendar";
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { PortalService } from '../services/portal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../common/shared.service';
import { DatePipe } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'gosg-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventCalendarComponent implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, OnDestroy{

  @Input()
  agencySel: String

  loading: boolean = false;
  searchAgencyResult(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  agencyData: any;
  isActiveList: boolean = false;
  initLoad: boolean = true;
  langChge: boolean = false;
  options: Object;
  event: any = [];
  langId = localStorage.getItem('langID');
  localeVal: string;
  languageId = this.languageId;
  mediaUrl: any = this.config.externalMediaURL +'/images/';
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private portalService:PortalService,
    private toastr: ToastrService,
    private element:ElementRef,
    private datePipe:DatePipe,
    private topnavservice: TopnavService,
    private translate: TranslateService,
    private sharedService :SharedService
  ) {

    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const myLang = translate.currentLang;

      if (myLang == 'en') {
        translate.get('HOME').subscribe((res: any) => {
            this.lang = 'en';
            this.languageId = 1;
            this.localeVal = this.lang;
            this.langChge = true;
          });
        }

        if (myLang == 'ms') {
          translate.get('HOME').subscribe((res: any) => {
            this.lang = 'ms';
            this.languageId = 2;
            this.localeVal = 'ms-my';
            this.langChge = true;
        });
        // alert(this.languageId + ',' + this.localeVal)
      }

      if(this.topnavservice.flagLang){

        if(this.langChge == true) {
          this.agencySel = "";
          this.getEvents();
          this.options = this.getOptions(this.event,this.mediaUrl);
          $('#calendar').fullCalendar('destroy');
          $('#calendar').fullCalendar(this.options);
        }
      }

        // alert(this.initLoad + " language")
    });

  }
  lang = this.lang;

  ngOnInit() {

    if(!this.languageId){
      this.languageId = localStorage.getItem('langID');
      //this.getData();
    }else{
      this.languageId = 1;
    }
    // alert(this.initLoad + " onInit")
    // this.localeVal = 'en-us';
    //
      this.getEvents();
      $('#calendar').fullCalendar('destroy');
      $('#calendar').fullCalendar(this.getOptions(this.event,this.mediaUrl));

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  onScroll(event){

    //
    if(event.target.scrollTop >= (event.target.scrollHeight - 250)) {
      //
      //

      let keywordVal;

      this.getSearchData(keywordVal, this.languageId, 1, this.searchAgencyResult.length+10)
      //
    }
  }

  resetSearch() {
    this.isActiveList = false;
    this.getEvents();
    $('#calendar').fullCalendar('destroy');
    $('#calendar').fullCalendar(this.getOptions(this.event,this.mediaUrl));
    // this.getModuleData(this.pageCount, this.pageSize);
  }

  getSearchData(keyword, langId?, count?, page?){

    // if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      //
      //
      // this.isActive = true;
      this.loading = true;

    setTimeout(()=>{
      this.portalService.readPortal('agency/language/'+this.languageId, count, page, keyword).subscribe(
        data => {

        this.portalService.errorHandling(data, (function(){

          //
          //

          if(data['agencyList'].length != 0) {
              this.searchAgencyResult = data['agencyList'];

            this.isActiveList = true;
          } else {
            this.isActiveList = false;
          }
        }).bind(this));
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.isActiveList = false;
        this.loading = false;
  
      });
      this.loading = false;
    }, 2000);
    // } else {
    //   this.isActiveListEn = false;
    //   this.isActiveListBm = false;
    // }
  }

  getValue(aId,aName,mName, refCode){

    //
    this.agencySel = aName;
    this.isActiveList = false;

    this.getEventByAgency(aId);

    //
    $('#calendar').fullCalendar('destroy');
    $('#calendar').fullCalendar(this.getOptions(this.event,this.mediaUrl));

    //

  }

  getEvents() {
    this.initLoad = false;
    let sDate;
    let eDate;
    let sT;
    let eT;
    this.loading = true;

    this.portalService.getCalendarEvents().subscribe(data => {

      // this.sharedService.errorHandling(data, (function(){
        //
        for(var item of data['list']) {
          //

          let body = {
            'id': null,
            'title': null,
            'start': null,
            'end': null,
            'startTime': null,
            'endTime': null,
            'desc': null,
            'location': null,
            'color': null,
            'image': null,
            'organizer': null,
            'organizerEmail': null,
            'organizerAddress': null,
            'organizerUrl': null,
            'organizerFb': null,
            'organizerPhone': null,
            'agency': null,
            'ext': null
          };

          sDate = new Date(item.eventStart);
          eDate = new Date(item.eventEnd);
          sT = this.changeDateFormat(item.eventStart)
          eT = this.changeDateFormat(item.eventEnd)

          body.id = item.id;
          body.title = item.eventName;
          body.start = sDate;
          body.end = eDate;
          body.startTime = sT;
          body.endTime = eT;
          body.ext = item.externalData;
          body.desc = item.eventDescription;
          body.location = item.eventLocation;

          if(item.agency)
            body.agency = item.agency.agencyName;

          // ORGANIZER DETAILS
          body.organizer = item.organizer;
          body.organizerEmail = item.organizerEmail;
          body.organizerAddress = item.organizerAddress;
          body.organizerUrl = item.organizerUrl;
          body.organizerFb = item.organizerFb;
          body.organizerPhone = item.organizerPhone;

          if(item.externalData == true) {
            body.color = '#0aaaaa';
            body.image = null;
            // alert(item.image.mediaFile)
          } else {
            if(item.image)
              body.image = item.image.mediaFile;
          }
          //   body.color = '#7e9e00';

          this.event.push(body)
        }
        //
        this.event = [];
        this.loading = false;

      // });
    });
  }

  getEventByAgency(aId) {
    this.initLoad = true;
    let sDate;
    let eDate;
    let sT;
    let eT;
    this.loading = true;

    this.portalService.getCalendarEventsByAgencyID(aId).subscribe(data => {

      // this.sharedService.errorHandling(data, (function(){
        //
        for(var item of data['list']) {
          //

          let body = {
            'id': null,
            'title': null,
            'start': null,
            'end': null,
            'startTime': null,
            'endTime': null,
            'desc': null,
            'location': null,
            'color': null,
            'image': null,
            'organizer': null,
            'organizerEmail': null,
            'organizerAddress': null,
            'organizerUrl': null,
            'organizerFb': null,
            'organizerPhone': null,
            'agency': null,
            'ext': null
          };

          sDate = new Date(item.eventStart);
          eDate = new Date(item.eventEnd);
          sT = this.changeDateFormat(item.eventStart)
          eT = this.changeDateFormat(item.eventEnd)

          body.id = item.id;
          body.title = item.eventName;
          body.start = sDate;
          body.end = eDate;
          body.startTime = sT;
          body.endTime = eT;
          body.ext = item.externalData;
          body.desc = item.eventDescription;
          body.location = item.eventLocation;

          if(item.agency)
            body.agency = item.agency.agencyName;

          // ORGANIZER DETAILS
          body.organizer = item.organizer;
          body.organizerEmail = item.organizerEmail;
          body.organizerAddress = item.organizerAddress;
          body.organizerUrl = item.organizerUrl;
          body.organizerFb = item.organizerFb;
          body.organizerPhone = item.organizerPhone;

          if(item.externalData == true) {
            body.color = '#0aaaaa';
            body.image = null;
          } else {
            if(item.image)
              body.image = item.image.mediaFile;
          }
          //   body.color = '#7e9e00';

          this.event.push(body)
        }
        //
        this.event = [];
        this.loading = false;

      // });
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
      this.loading = false;

    });
  }

  getOptions(calEvent, mediaPath) {

    setTimeout(()=>{

      this.options = {
        locale: this.localeVal?this.localeVal: this.lang,
        editable: false,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: null
          //  right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: calEvent,
        firstDay: 0,
        eventClick: function(events) {

        if(events.ext == true)
          $('#titleHeader').css({'background': '#0aaaaa','border-radius':'6px 6px 0px 0px', 'border-bottom':'1px #666 solid'});
        else
          $('#titleHeader').css({'background': '#3a87ad','border-radius':'6px 6px 0px 0px', 'border-bottom':'1px #333 solid'});

        $('#title').html(events.title);
        $('#loc').html(events.location);
        $('#start').html(events.startTime);
        $('#end').html(events.endTime);
        $('#desc').html(events.desc);
        $('#organizer').html(events.organizer?events.organizer:'-');
        $('#organizerEmail').html(events.organizerEmail?events.organizerEmail:'-');
        $('#organizerAddress').html(events.organizerAddress?events.organizerAddress:'-');
        $('#organizerUrl').html(events.organizerUrl?events.organizerUrl:'-');
        $('#organizerFb').html(events.organizerFb?events.organizerFb:'-');
        $('#organizerPhone').html(events.organizerPhone?events.organizerPhone:'-');
        $('#agency').html(events.agency?events.agency:'-');

        if(events.image && !events.ext ) {
          // alert(events.title)
          $("#imageContainer").css('display','block');
          $("#eventImage").attr("src", mediaPath+events.image);
        } else {
          $("#imageContainer").css('display','none');
        }

        $('#details').css('display','block');
        $('.overlay').css('display','block');

        //
      },
      eventMouseover: function(events) {
        $('.fc-event').attr('title', events.title);
      },
      buttonText: {
        today: this.translate.instant('calendar.view.today')
      },
      timeFormat: 'hh:mm a'

    };

    $('#calendar').fullCalendar('destroy');
    $('#calendar').fullCalendar(this.options);

      // $(''
      //   +''+this.translate.instant('')+''
      //   +''+this.translate.instant()+'</div>'
      //   +''+this.translate.instant()+'</div>'
      //   +'</div>').insertAfter($('.fc-view-container'));
    }, 1000);

    return this.options;
  }

  closePopup() {
    $('#details').css('display','none');
    $('.overlay').css('display','none');
  }

  ngAfterContentChecked() {

  }

  ngAfterViewChecked() {

  }

  changeDateFormat(dateVal) {
    let res;
    res = this.datePipe.transform(dateVal, 'dd/MM/yyyy h:mm a')

    return res;
  }
  // transform(value: string) {
  //   let datePipe = new DatePipe("en-US");
  //    value = datePipe.transform(value, 'dd/MM/yyyy hh:mm a');
  //    return value;
  // }

  // updateEvent(event) {
  //   return $(this.element.nativeElement).fullCalendar('updateEvent', event);
  // }

  // clientEvents(idOrFilter) {
  //   return $(this.element.nativeElement).fullCalendar('clientEvents', idOrFilter);
  // }

  // change(changes: any) {
  //   $('#calendar').fullCalendar('changeView',changes.options.currentValue.defaultView);
  //   let locale = $('#calendar').fullCalendar('option', 'locale');
  // }


}

