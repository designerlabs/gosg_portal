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
  myMethod$: Observable<any>;
  articles: any[];
  breadcrumb: any;
  isValid: any;
  topicStatus: any;
  dataT: any;
  private myMethodSubject = new Subject<any>();
  announces: any[];

  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private route: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService, private articleService: ArticleService, private announceService: AnnouncementlistService) {
    this.topicStatus = true;
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  private menuUrl: string = this.config.urlMenu;
  private articleUrl: string = this.config.urlArticle;
  private urlAnnouncement: string = this.config.urlAnnouncementSub;
  private subUrl: string = this.config.urlSubtopic;
  private popularUrl: string = this.config.urlPopularSearch;



  getMenuData(lang): Observable<IMenu[]> {

    return this.http.get(this.config.urlPortal + 'cp/menu?language=' + lang)
      .map((response: Response) => response.json().corePortalMenuList)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getPopularData(body) {
    let dataUrl;
    let env = window.location.hostname;
    let envOrigin = window.location.origin;
    let localURL = envOrigin+'/gosg/';

    // console.log(window.location)

    if(env == 'localhost')
      dataUrl = this.popularUrl;
    else
      dataUrl = localURL+'popular';

    // console.log(dataUrl)

    return this.http.post(dataUrl, body)
      .map((response: Response) => response.json().data[0].term)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


  getArticleData(moduleName, lang: string, ID: number): Observable<boolean[]> {

    if (!isNaN(ID)) {

      return this.http.get(this.config.urlPortal + moduleName + '/' +ID + '?language=' + lang)
        .take(1)
        .map((response: Response) => response.json().contentCategoryResource.results)

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

  getSubArticleUrl(subID: number, lang) {
    if (!isNaN(subID)) {
      return this.http.get(this.config.urlPortal  + 'subcategory/'+subID + '?language=' + lang)
        .take(1)
        .map((response: Response) => response.json().contentCategoryResource.results)
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

  getContentUrl(subID: number, lang) {
    if (!isNaN(subID)) {
      return this.http.get(this.config.urlPortal  + 'content/' +subID + '?language=' + lang)
        .take(1)
        .map((response: Response) => response.json().contentCategoryResource.results)
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


  getSubRss(moduleName, subID: number, lang) {
    // alert("Test");


     if (!isNaN(subID)) {
       return this.http.get(this.config.urlPortal  + moduleName +'/id/'+ subID + '?language=' + lang)
         .take(1)
         .map((response: Response) => response.json().results)
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

  triggerSubArticle(subID, lang) {
   // alert("Trigger sub acrticle");
    if (!isNaN(subID)) {
      this.articleService.articles = [''];
      this.articles = [''];
      return this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.getSubArticleUrl(subID, lang))
        .subscribe(resSliderData => {
          this.articleService.articles = resSliderData;
          this.articles = resSliderData;
          this.breadcrumb = this.breadcrumbService.getBreadcrumb();
          this.isValid = this.breadcrumbService.isValid = true;
          this.breadcrumb = this.breadcrumb.name = '';

        });
    }
  }

  triggerContent( subID, lang) {
    // alert("Trigger sub acrticle");
     if (!isNaN(subID)) {
       this.articleService.articles = [''];
       this.articles = [''];
       return this.route.paramMap
         .switchMap((params: ParamMap) =>
           this.getContentUrl(subID, lang))
         .subscribe(resSliderData => {
           this.articleService.articles = resSliderData;
           this.articles = resSliderData;
           this.breadcrumb = this.breadcrumbService.getBreadcrumb();
           this.isValid = this.breadcrumbService.isValid = true;
           this.breadcrumb = this.breadcrumb.name = '';

         });
     }
   }


  triggerSubRss(topicID, subID, lang) {
    // alert("Trigger sub acrticle");
     if (!isNaN(subID)) {
      this.articleService.articles = [''];
      this.articles = [''];
       return this.route.paramMap
         .switchMap((params: ParamMap) =>
           this.getSubRss(topicID, subID, lang))
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
      this.articles = [''];
      this.articleService.articles = [''];
      return this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.getArticleData(moduleName, lang, topicID))
        .subscribe(resSliderData => {
          this.articleService.articles = resSliderData;
          this.articles = resSliderData;
          this.breadcrumb = this.breadcrumbService.getBreadcrumb();
          this.isValid = this.breadcrumbService.isValid = true;
          this.breadcrumb = this.breadcrumb.name = '';
        });
    }
  }

  getAnnouncement(moduleName, lang: number): Observable<boolean[]> {
 
    return this.http.get(this.urlAnnouncement + '?language=' + lang)
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

  getAnnouncementList(moduleName, lang: number, id1?: string): Observable<boolean[]> {
    if (id1) {
      return this.http.get(this.urlAnnouncement + '/id/' + id1 + '?language=' + lang)
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
  }

  triggerAnnouncementList(lang, id1) {
        if (lang === 'ms') {
            lang = 2;
        }
        if (lang === 'en') {
            lang = 1;
        }
        if (id1) {
          return this.route.paramMap
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

    triggerAnnouncementDetails(moduleName, lang, id1, id2) {
        if (lang === 'ms') {
            lang = 2;
        }
        if (lang === 'en') {
            lang = 1;
        }
        return this.route.paramMap
        .switchMap((params: ParamMap) =>
        this.getAnnouncementDetails(moduleName, lang, id1, id2))
        .subscribe(resAllAnnounce => {
            this.announceService.announceDetails = resAllAnnounce;
            this.breadcrumb = this.breadcrumbService.getBreadcrumb();
            this.isValid = this.breadcrumbService.isValid = true;
            this.breadcrumb = this.breadcrumb.name = '';
        });
    }

  getAnnouncementDetails(moduleName, lang: number, id1?: string, id2?: string): Observable<boolean[]> {
    return this.http.get(this.articleUrl + '/' + id1 + '/' + id2 + '?language=' + lang)
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
