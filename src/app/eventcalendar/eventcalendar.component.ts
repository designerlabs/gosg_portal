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

@Component({
  selector: 'gosg-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventCalendarComponent implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked{
  
  options: Object;
  event: any = [];
  langId = localStorage.getItem('langID');
  localeVal: string;
  languageId = this.languageId;

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
        });
  
      }
      if (myLang == 'ms') {
        translate.get('HOME').subscribe((res: any) => {
            this.lang = 'ms';
            this.languageId = 2;
            this.localeVal = 'ms-my';
        });
      }
      // console.log(this.localeVal)
      // console.log(this.options)

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
        events: this.event,
        eventClick: function(events) {

          if(events.ext == true)
            $('#titleHeader').css({'background': '#0aaaaa','border-radius':'6px 6px 0px 0px', 'border-bottom':'1px #666 solid'});
          else
            $('#titleHeader').css({'background': '#3a87ad','border-radius':'6px 6px 0px 0px', 'border-bottom':'1px #333 solid'});
          
          $('#title').html(events.title);
          $('#loc').html(events.location);
          $('#start').html(datePipe.transform(events.start._d, 'dd/MM/yyyy h:mm aa'));
          $('#end').html(datePipe.transform(events.end._d, 'dd/MM/yyyy h:mm aa'));
          $('#desc').html(events.desc);
          
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

      // $('<div class="col-md-5 pull-right" style="border: 0px solid #000; text-align: right; margin-right: -6.5%; margin-top: -2%">'
        // +'<div class="col-md-2" style="text-align: right"><label>'+this.translate.instant('calendar.view.note')+'</label>:</div>'
        // +'<div class="col-md-5" style="text-align: center; background: #3a87ad; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.internaldata')+'</div>'
        // +'<div class="col-md-5" style="text-align: center; background: #0aaaaa; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.externaldata')+'</div>'
        // +'</div>').insertBefore($('.fc-view-container'));
      // alert(this.localeVal)
    });
    
  }
  lang = this.lang;

  ngOnInit() {

    this.localeVal = 'en-us';
    console.log(this.localeVal)
    this.getEvents();

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
      events: this.event,
      eventClick: function(events) {

        if(events.ext == true)
          $('#titleHeader').css({'background': '#0aaaaa','border-radius':'6px 6px 0px 0px', 'border-bottom':'1px #666 solid'});
        else
          $('#titleHeader').css({'background': '#3a87ad','border-radius':'6px 6px 0px 0px', 'border-bottom':'1px #333 solid'});
        
        $('#title').html(events.title);
        $('#loc').html(events.location);
        $('#start').html(this.datePipe.transform(events.start._d, 'dd/MM/yyyy h:mm aa'));
        $('#end').html(this.datePipe.transform(events.end._d, 'dd/MM/yyyy h:mm aa'));
        $('#desc').html(events.desc);
        
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

    // $('<div class="col-md-5 pull-right" style="border: 0px solid #000; text-align: right; margin-right: -6.5%; margin-top: -2%">'
      // +'<div class="col-md-2" style="text-align: right"><label>'+this.translate.instant('calendar.view.note')+'</label>:</div>'
      // +'<div class="col-md-5" style="text-align: center; background: #3a87ad; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.internaldata')+'</div>'
      // +'<div class="col-md-5" style="text-align: center; background: #0aaaaa; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.externaldata')+'</div>'
      // +'</div>').insertBefore($('.fc-view-container'));
    // alert(this.localeVal)
  }

  ngAfterViewInit() {
    setTimeout(()=>{

      console.log(this.options)
      // console.log("100ms after ngAfterViewInit ");
      $('#calendar').fullCalendar('destroy');
      $('#calendar').fullCalendar(this.options);

      $('<div class="col-md-5 pull-right" style="border: 0px solid #000; text-align: right; position:absolute; top:0px; right:0px;">'
        +'<div class="col-md-2" style="text-align: right"><label>'+this.translate.instant('calendar.view.note')+'</label>:</div>'
        +'<div class="col-md-5" style="text-align: center; background: #3a87ad; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.internaldata')+'</div>'
        +'<div class="col-md-5" style="text-align: center; background: #0aaaaa; color: #fafafa; width: 150px; height: 20px">'+this.translate.instant('calendar.view.externaldata')+'</div>'
        +'</div>').insertAfter($('.fc-view-container'));
    }, 100);
    
  }

  getEvents() {
    let sDate;
    let eDate;

    this.portalService.getCalendarEvents().subscribe(data => {
  
      // this.sharedService.errorHandling(data, (function(){
        
        for(var item of data['list']) {

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
            'ext': null
          };

          sDate = new Date(item.eventStart);
          eDate = new Date(item.eventEnd);

          body.id = item.id;
          body.title = item.eventName;
          body.start = sDate;
          body.end = eDate;
          // body.startTime = item.startTime;
          // body.endTime = item.endTime;
          body.ext = item.externalData;
          body.desc = item.eventDescription;
          body.location = item.eventLocation;
          if(item.externalData == true)
            body.color = '#0aaaaa';
          // else
          //   body.color = '#7e9e00';

          this.event.push(body)
        }
        
      // });
    });
  }

  closePopup() {
    $('#details').css('display','none');
    $('.overlay').css('display','none');
  }

  ngAfterContentChecked() {
    
  }

  ngAfterViewChecked() {
    
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

