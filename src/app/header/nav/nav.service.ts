import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { IMenu, IUrl } from './nav.model';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ArticleService } from '../../article/article.service';
import { AnnouncementlistService } from '../../announcementlist/announcementlist.service';
import { BreadcrumbService } from '../../header/breadcrumb/breadcrumb.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class NavService {

  articles: any[];
  breadcrumb: any;
  isValid: any;
  topicStatus: any;
  dataT: any;

  announces: any[];

  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private route: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService, private articleService: ArticleService, private announceService: AnnouncementlistService) {
    this.topicStatus = true;
  }

  private menuUrl: string = this.config.urlMenu;
  private articleUrl: string = this.config.urlArticle;
  private urlAnnouncement: string = this.config.urlAnnouncementSub;
  private subUrl: string = this.config.urlSubtopic;


  getMenuData(lang: string): Observable<IMenu[]> {
    return this.http.get(this.menuUrl + '-' + lang + '.json')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getArticleData(moduleName, lang: string, ID: number): Observable<boolean[]> {

    if (!isNaN(ID)) {

      return this.http.get(this.articleUrl + '-' + ID + '-' + lang + '.json')
        .take(1)
        .map((response: Response) => response.json())

        // .catch((error:any) =>
        // Observable.throw(error.json().error || 'Server error')
        // );
        .catch(
        (err: Response, caught: Observable<any[]>) => {
          if (err !== undefined) {
            this.router.navigate(['/404']);
            return Observable.throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
          }
          return Observable.throw(caught); // <-----
        }
        );
    }
  }

  getSubArticleUrl(topicID, subID: number, lang) {
   // alert("Test");

    let urlA = this.subUrl + '-' + subID + '-' + lang + '.json';
    console.log(urlA);

    if (!isNaN(subID)) {
      return this.http.get(this.subUrl + '-' + subID + '-' + lang + '.json')
        .take(1)
        .map((response: Response) => response.json())
        // .catch((error:any) =>
        // Observable.throw(error.json().error || 'Server error')
        // );
        .catch(
        (err: Response, caught: Observable<any[]>) => {
          if (err !== undefined) {
            this.router.navigate(['/404']);
            return Observable.throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
          }
          return Observable.throw(caught); // <-----
        }
        );
    }
  }

  triggerSubArticle(topicID, subID, lang) {
   // alert("Trigger sub acrticle");
    if (!isNaN(subID)) {
      return this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.getSubArticleUrl(topicID, subID, lang))
        .subscribe(resSliderData => {
          this.articleService.articles = resSliderData;
          this.articles = resSliderData;
          this.breadcrumb = this.breadcrumbService.getBreadcrumb();
          this.isValid = this.breadcrumbService.isValid = true;
          this.breadcrumb = this.breadcrumb.name = '';

        });
    }
  }

  triggerArticle(moduleName, lang, topicID) {

    if (!isNaN(topicID)) {
      return this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.getArticleData(moduleName, lang, topicID))
        .subscribe(resSliderData => {
          console.log(resSliderData);
          this.articleService.articles = resSliderData;
          this.articles = resSliderData;
          this.breadcrumb = this.breadcrumbService.getBreadcrumb();
          this.isValid = this.breadcrumbService.isValid = true;
          this.breadcrumb = this.breadcrumb.name = '';
        });
    }
  }

  getAnnouncement(moduleName, lang: number): Observable<boolean[]> {
    console.log('ANNOUNCEMENT: ');
    console.log(this.urlAnnouncement + '?langId=' + lang);

    return this.http.get(this.urlAnnouncement + '?langId=' + lang)
    .take(1)
    .map((response: Response) => response.json())
    .catch(
    (err: Response, caught: Observable<any[]>) => {
      if (err !== undefined) {
        this.router.navigate(['/404']);
        // tslint:disable-next-line:max-line-length
        return Observable.throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
      }
      return Observable.throw(caught);
    });
  }

  getAnnouncementList(moduleName, lang: number, id1?: string) {
    if (id1) {
      return this.http.get(this.urlAnnouncement + '/id/' + id1 + '?langId=' + lang)
      .take(1)
      .map((response: Response) => response.json())
      .catch(
      (err: Response, caught: Observable<any[]>) => {
        if (err !== undefined) {
          this.router.navigate(['/404']);
          // tslint:disable-next-line:max-line-length
          return Observable.throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
        }
        return Observable.throw(caught);
      });
    }
    //console.log(this.urlAnnouncement+"/id/"+id1+"?langId="+lang);
  }

  triggerAnnouncementList(lang, id1) {
        if (lang === 'ms') {
            lang = 2;
        }
        if (lang === 'en') {
            lang = 1;
        }
        if (id1) {
            this.route.paramMap
        .switchMap((params: ParamMap) =>
        this.getAnnouncementList('announcement', lang, id1))
        .subscribe(resAllAnnounce => {
            // this.announceRes = resAllAnnounce;
            //convert object to array
            // const temp1 = this.announceRes[0];
            // const temp = Object.keys(temp1).map(key => temp1[key]);
            // this.announces = temp;
            this.announceService.announces = resAllAnnounce;
            this.breadcrumb = this.breadcrumbService.getBreadcrumb();
            this.isValid = this.breadcrumbService.isValid = true;
            this.breadcrumb = this.breadcrumb.name = '';
        });
        }
    }

  getAnnouncementDetails(moduleName, lang: number, id1?: string, id2?: string):Observable<boolean[]> {

    console.log('DETAILS: ');
    console.log(this.urlAnnouncement + '/id/' + id1 + '?langId=' + lang);

    return this.http.get(this.urlAnnouncement + '/id/' + id1 + '/' + id2 + '?langId=' + lang)
    .take(1)
    .map((response: Response) => response.json())
    .catch(
    (err: Response, caught: Observable<any[]>) => {
      if (err !== undefined) {
        this.router.navigate(['/404']);
        return Observable.throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
      }
      return Observable.throw(caught);
    });
  }
}
