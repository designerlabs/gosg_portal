import { Component, OnInit, ViewChild, Inject } from '@angular/core';
// import { CalendarComponent } from 'ng-fullcalendar';
// import { Options } from 'fullcalendar';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'gosg-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventCalendarComponent implements OnInit {

  // calendarOptions: Options;
  displayEvent: any;
  isOpen: boolean;
  event: any[];
  eventUrl: string = this.config.urlEvent;

  // @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    this.isOpen = false;

    // console.log(dateObj)
    // console.log(yearMonth)

    this.getEvents();
    console.log(this.event)

    // this.calendarOptions = {
    //    editable: false,
    //    eventLimit: false,
    //    header: {
    //      left: 'prev,next today',
    //      center: 'title',
    //      right: null
    //     //  right: 'month,agendaWeek,agendaDay,listMonth'
    //    },
    //    events: this.event
      
    //  };
  }

  getEvents() {
    return this.http.get('./app/apidata/event.json')
      .map(res => res.json())
      .subscribe(resEventData => {
        this.event = resEventData;
        console.log(this.event)
      });
  }

  closePopup() {
    this.isOpen = false;
  }

  clickButton(model: any) {
    this.isOpen = false;
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        desc: model.event.desc,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    this.isOpen = true;
    console.log(this.displayEvent.event.desc);
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

}

