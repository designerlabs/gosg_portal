import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'gosg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uid: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }
  
  
  
  private portalURL: string = this.config.portalURL;
  ngOnInit() {
  }

  sendtoParent(){
    
  }

}
  