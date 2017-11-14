import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'gosg-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  displayedColumns = ['position', 'subject', 'action'];
  dataSource = new ExampleDataSource();
  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  subject: string;
  position: number;
  action: string;
}

const data: Element[] = [
  { position: 1, subject: 'Hydrogen', action: 'H' },
  { position: 2, subject: 'Helium', action: 'H' },
  { position: 3, subject: 'Lithium', action: 'H'},
  { position: 4, subject: 'Beryllium', action: 'H' },
  { position: 5, subject: 'Boron', action: 'H' },
  { position: 6, subject: 'Carbon', action: 'H' },
  { position: 7, subject: 'Nitrogen', action: 'H'},
  { position: 8, subject: 'Oxygen', action: 'H' },
  { position: 9, subject: 'Fluorine',action: 'H'},
  { position: 10, subject: 'Neon', action: 'H' },
  { position: 11, subject: 'Sodium', action: 'H' },
  { position: 12, subject: 'Magnesium', action: 'H' },
  { position: 13, subject: 'Aluminum', action: 'H' },
  { position: 14, subject: 'Silicon', action: 'H' },
  { position: 15, subject: 'Phosphorus', action: 'H' },
  { position: 16, subject: 'Sulfur', action: 'H' },
  { position: 17, subject: 'Chlorine', action: 'H' },
  { position: 18, subject: 'Argon', action: 'H' },
  { position: 19, subject: 'Potassium', action: 'H' },
  { position: 20, subject: 'Calcium', action: 'H' },
];

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() { }
}
