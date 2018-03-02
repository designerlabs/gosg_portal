import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'gosg-eventcalendar',
  templateUrl: './eventcalendar.component.html',
  styleUrls: ['./eventcalendar.component.css']
})
export class EventCalendarComponent implements OnInit {

  calendarOptions: Options;
  displayEvent: any;
  isOpen: boolean;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor() { }

  ngOnInit() {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    this.isOpen = false;

    console.log(dateObj)
    console.log(yearMonth)

    this.calendarOptions = {
       editable: false,
       eventLimit: false,
       header: {
         left: 'prev,next today',
         center: 'title',
         right: null
        //  right: 'month,agendaWeek,agendaDay,listMonth'
       },
       events: [{
        "title": yearMonth+'-01\n '+"All Day Event",
        "start": "2018-03-01",
        "desc": "hahahahahahaha"
      }, {
        "title": "Long Event",
        "start": "2018-03-07",
        "end": "2018-03-10"
      }, {
        "id": "999",
        "title": "Repeating Event",
        "start": "2018-03-09T21:00:00+00:00"
      }, {
        "id": "999",
        "title": "Repeating Event",
        "start": "2018-03-16T21:00:00+00:00"
      }, {
        "title": "Conference",
        "start": "2018-03-11",
        "end": "2018-03-13"
      }, {
        "title": "Meeting",
        "start": "2018-03-12T15:30:00+00:00",
        "end": "2018-03-12T17:30:00+00:00"
      }, {
        "title": "Lunch",
        "start": "2018-03-12T19:00:00+00:00"
      }, {
        "title": "Meeting",
        "start": "2018-03-12T19:30:00+00:00"
      }, {
        "title": "Happy Hour",
        "start": "2018-03-12T22:30:00+00:00"
      }, {
        "title": "Dinner",
        "start": "2018-03-12T20:00:00+00:00"
      }, {
        "title": "Birthday Party",
        "start": "2018-03-13T12:00:00+00:00"
      }, {
        "url": "http:\/\/google.com\/",
        "title": "Click for Google",
        "start": "2018-02-28"
      }]
      
     };
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

