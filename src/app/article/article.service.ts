import { Injectable, Inject, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Http, Response} from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class ArticleService {
  @Output() menuClick = new EventEmitter();
  articles: any[];
  archives: any[];

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, route: ActivatedRoute, private router: Router) { }

  getArticle(){
        return this.article;
    }

  getArchive(){
        return this.archives;
    }

   public article = {
        name: 'hello'
    };

    public loading = {
      name: false
    }

    public leContent = "";

    public archive = {};

    private articleUrl: string = this.config.urlArticle;
}
