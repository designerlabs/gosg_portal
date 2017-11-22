import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {Http} from '@angular/http';
import { ProtectedService } from '../services/protected.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: 'gosg-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  dataSource = new UserDataSource(this.protectedService);
  mailData: any;
  rerender = false;
  displayedColumns = ['name', 'email', 'phone', 'company', 'action'];
  
  constructor(private protectedService: ProtectedService, private cdRef:ChangeDetectorRef) { }
  
  ngOnInit() {
    this.getMail();
  }


  getMail(){
    this.protectedService.getMails().
    subscribe(data => {
      this.mailData  = data;
    });
  }
  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.dataSource.connect();
    this.rerender = false;
  }

  deleteMail(msgId){
    this.protectedService.deleteMail(msgId).
    subscribe(
      success => {
        this.getMail();
      }
    )
  }
}


export class UserDataSource extends DataSource<any> {
  private dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  
  constructor(private protectedService: ProtectedService) {
    super();
  }
  connect(): Observable<any[]> {
    return this.protectedService.getMails();
  }
  disconnect() {}

  refresh(): void {
    this.dataChange.next([]);
  }
}