import { Component, OnInit, ViewChild, Inject, AfterViewInit, AfterContentChecked, AfterViewChecked, Input, ElementRef } from '@angular/core';
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

@Component({
  selector: 'gosg-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventCalendarComponent implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked{
  
  initLoad: boolean = true;
  langChge: boolean = false;
  options: Object;
  event: any = [];
  langId = localStorage.getItem('langID');
  localeVal: string;
  languageId = this.languageId;
  mediaUrl: any = this.config.externalMediaURL +'/images/';

  constructor(
    private http: Http, 
    @Inject(APP_CONFIG) private config: AppConfig, 
    private portalService:PortalService,
    private toastr: ToastrService,
    private element:ElementRef,
    private datePipe:DatePipe,
    private translate: TranslateService,
    private sharedService :SharedService
  ) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
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

        // alert(this.initLoad + " language")
        
      if(this.langChge == true) {
        this.getEvents();
        this.options = this.getOptions(this.event,this.mediaUrl);
        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar(this.options);
      }
    });

    
  }
  lang = this.lang;
  
  ngOnInit() {
    // alert(this.initLoad + " onInit")
    // this.localeVal = 'en-us';
    // console.log(this.localeVal)
      this.getEvents();
      $('#calendar').fullCalendar('destroy');
      $('#calendar').fullCalendar(this.getOptions(this.event,this.mediaUrl));

  }

  ngAfterViewInit() { 
    
  }

  getEvents() {
    this.initLoad = true;
    let sDate;
    let eDate;
    let sT;
    let eT;

    this.portalService.getCalendarEvents().subscribe(data => {
  
      // this.sharedService.errorHandling(data, (function(){
        // console.log(data['list'])
        for(var item of data['list']) {
          // console.log(item)

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
          } else {
            body.image = item.image.mediaFile;
          }
          //   body.color = '#7e9e00';
          
          this.event.push(body)
        }
        // console.log(this.event)
        this.event = [''];
     
        
      // });
    });
  }

  getOptions(calEvent, mediaPath) {

    setTimeout(()=>{
      // this.getEvents();
      
      // console.log(this.options)
      // console.log("100ms after ngAfterViewInit ");
      
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
        $('#organizer').html(events.organizer);
        $('#organizerEmail').html(events.organizerEmail);
        $('#organizerAddress').html(events.organizerAddress);
        $('#organizerUrl').html(events.organizerUrl);
        $('#organizerFb').html(events.organizerFb);
        $('#organizerPhone').html(events.organizerPhone);
        $('#agency').html(events.agency);
        
        if(events.image)
          $("#eventImage").attr("src", mediaPath+events.image);

        $('#details').css('display','block');
        $('.overlay').css('display','block');
        
        console.log(events)
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

      $('<div class="col-md-5 pull-right" style="border: 0px solid #000; text-align: right; position:absolute; top:0px; right:0px;">'
        +'<div class="col-md-2" style="text-align: right"><label>'+this.translate.instant('calendar.view.note')+'</label>:</div>'
        +'<div class="col-md-5" style="text-align: center; background: #3a87ad; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.internaldata')+'</div>'
        +'<div class="col-md-5" style="text-align: center; background: #0aaaaa; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.externaldata')+'</div>'
        +'</div>').insertAfter($('.fc-view-container'));
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

