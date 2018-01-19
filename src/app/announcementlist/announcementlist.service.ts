import { Injectable, Inject, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Http, Response} from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AnnouncementlistService {
  @Output() menuClick = new EventEmitter();
  announces: any[];

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig,
  route: ActivatedRoute, private router: Router) { }

  getAnnounces(){
      return this.anounce;
  }

  public anounce = {
      name: 'hello'
  };

  private announceUrl: string = this.config.urlAnnouncementSub;

}
