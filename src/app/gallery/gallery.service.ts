import { Injectable, Inject, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Http, Response} from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class GalleryService {
  @Output() menuClick = new EventEmitter();
  gallery: any[];

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, route: ActivatedRoute, private router: Router) { }

  getGallery(){
        return this.gallery;
    }

   public article = {
        name: 'hello'
    };

    private galleryUrl: string = this.config.urlGallery;
}
