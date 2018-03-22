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

@Component({
  selector: 'gosg-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventCalendarComponent implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked{
  
  // text: string;
  // calendarInitiated:boolean;
  options: Object;
  event: any = [];
  // eventItem: string;
  // eventUrl: string = this.config.urlEvent;

  // @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(
    private http: Http, 
    @Inject(APP_CONFIG) private config: AppConfig, 
    private portalService:PortalService,
    private toastr: ToastrService,
    private element:ElementRef,
    private datePipe:DatePipe,
    private sharedService :SharedService
  ) { 
    this.options = {
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
  
        $('#title').html(events.title);
        $('#loc').html(events.location);
        $('#start').html(datePipe.transform(events.start._d, 'dd/MM/yyyy hh:mm a'));
        $('#end').html(datePipe.transform(events.end._d, 'dd/MM/yyyy hh:mm a'));
        $('#desc').html(events.desc);
  
        $('#details').css('display','block');
        $('.overlay').css('display','block');
  
        console.log(events)
        console.log(events.start._d)
        console.log(events.end._d)
      }
      
    };
  }

  ngOnInit() {
    // const dateObj = new Date();
    // const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

    this.getEvents();
    // console.log(this.event)
  }

  ngAfterViewInit() {
    setTimeout(()=>{

      // console.log("100ms after ngAfterViewInit ");
      $('#calendar').fullCalendar(this.options);
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
            'color': null
          };

          sDate = new Date(item.eventStart);
          eDate = new Date(item.eventEnd);

          body.id = item.id;
          body.title = item.eventName;
          body.start = sDate;
          body.end = eDate;
          // body.startTime = item.startTime;
          // body.endTime = item.endTime;
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

  /**
    *
    * @param event
    * @param isStick: needed because event object not have stick value, we need to set it natively
    *
    * renderEvent 1.3
    * Renders a new event on the calendar.
    * .fullCalendar( 'renderEvent', event [, stick ] )
    * event must be an Event Object with a title and start at the very least.
    * Normally, the event will disappear once the calendar refetches its event sources (example: when prev/next is clicked). However, specifying stick as true will cause the event to be permanently fixed to the calendar.
    */
 
   renderEvent(event:any,isStick:boolean){
     if(isStick == true){
       event.stick = true ;
     }
     console.log('FullCalendar renderEvent',{event});
     $('#calendar').fullCalendar('renderEvent',event);
   }

  // clickButton(model: any) {
  //   this.isOpen = false;
  //   this.displayEvent = model;
  // }

  getSpecificEvent(e) {
    // let model: any;

    // model = {
    //   event: {
    //     // id: model.event.id,
    //     start: model.events.start,
    //     end: model.events.end,
    //     title: model.events.title,
    //     desc: model.events.desc,
    //     location: model.events.location,
    //     // sTime: model.event.startTime,
    //     // eTime: model.event.endTime
    //     // allDay: model.event.allDay,
    //     // eventId: model.event.eventID,
    //     // other params
    //   },
    //   duration: {}
    // // }
    // this.displayEvent = e;
    // this.isOpen = true;
    // console.log(this.displayEvent)
    // alert(this.isOpen)
    // console.log(this.displayEvent.event.desc);
    // return this.displayEvent;
          
    // this.portalService.getCalendarEventsByID(e.id).subscribe(
    //   data => {

    //   this.sharedService.errorHandling(data, (function(){
    //       console.log(e);
    //       this.displayEvent = e;
    //       this.isOpen = true;
    //       $('#details').css('display','block');
    //       // console.log(this.displayEvent);
    //       // change the border color just for fun
    //       // return this.displayEvent;
    //       $(this).css('border-color', 'red');     
    //       this.toastr.success(this.translate.instant('feedback.msgsubmit'), '');            
    //     }).bind(this));  
    //   },
    //   error => {
    //     this.toastr.error(JSON.parse(error._body).statusDesc, ''); 
    //   });
  }

  // updateEvent(model: any) {
  //   model = {
  //     event: {
  //       id: model.event.id,
  //       start: model.event.start,
  //       end: model.event.end,
  //       title: model.event.title
  //       // other params
  //     },
  //     duration: {
  //       _data: model.duration._data
  //     }
  //   }
  //   this.displayEvent = model;
  // }

}

