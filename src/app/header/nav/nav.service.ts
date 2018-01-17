import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { Http, Response} from '@angular/http';
import { IMenu, IUrl } from './nav.model';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ArticleService } from '../../article/article.service';
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
    test: any;
    resultAnnouncement:any;
    announcesSub: any[];

    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private route: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService, private articleService: ArticleService) {
      this.topicStatus = true;
    }

    private menuUrl: string = this.config.urlMenu;
    private articleUrl: string = this.config.urlArticle;
    private urlAnnouncement: string = this.config.urlAnnouncementSub;
    private subUrl: string = this.config.urlSubtopic;


    getMenuData(lang: string): Observable<IMenu[]>{
        return this.http.get(this.menuUrl + '-' + lang + '.json')
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }


    getArticleData(moduleName, lang: string, ID: number): Observable<boolean[]> {

      if (!isNaN(ID)){
        
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
  
    // getAnnouncementDataAll(moduleName, lang: string, id1?: number, id2?: number): Observable<boolean[]> {
    //     let url = "http://10.1.17.12:3000/"+moduleName;
    //     if(id1){
    //       url = url+"/" +id1;
    //     }else if(id2){
    //       url = url+"/" +id1+"/"+id2;
    //     }
    //     debugger;
    //     console.log(url);
    //     return this.http.get(url)
    //         .take(1)
    //         .map((response: Response) => response.json())
    //         .catch(
    //     (err: Response, caught: Observable<any[]>) => {
    //         if (err !== undefined) {
    //           this.router.navigate(['/404']);
    //           return Observable.throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
    //         }
    //         return Observable.throw(caught); // <-----
    //       }
    //     );   
    // }

    getAnnouncementDataAll(moduleName, lang: number, id1?: number, id2?: number): Observable<boolean[]> {
      let url = this.urlAnnouncement;
      let lg = "?langId="+  lang;

      if(id1 && !id2){
        url = url+"/id/" +id1;
      }else if(id1 && id2){
        url = url+"/id/" +id1+"/"+id2;
      }

      let contUrl = url+lg 
      console.log(contUrl);
      debugger;
      return this.http.get(contUrl)
          .take(1)
          .map((response: Response) => response.json())
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

    getSubArticleUrl(topicID, subID: number, lang){
        if (!isNaN(subID)){
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

    triggerSubArticle(topicID, subID, lang){

      if (!isNaN(subID)){
          return this.route.paramMap
          .switchMap((params: ParamMap) =>
          this.getSubArticleUrl(topicID, subID, lang))
          .subscribe(resSliderData => {
              this.articleService.articles = resSliderData;
              this.articles = resSliderData;
              this.breadcrumb = this.breadcrumbService.getBreadcrumb();
              this.isValid = this.breadcrumbService.isValid = true;
              this.breadcrumb = this.breadcrumb.name = '';
              //console.log(this.articleService.articles)

          });
      }
    }

    triggerArticle(moduleName,lang, topicID){

      if (!isNaN(topicID)){
          return this.route.paramMap
          .switchMap((params: ParamMap) =>
          this.getArticleData(moduleName,lang, topicID))
          .subscribe(resSliderData => {
              console.log(resSliderData);
              this.articleService.articles = resSliderData;
              this.articles = resSliderData;
              this.breadcrumb = this.breadcrumbService.getBreadcrumb();
              this.isValid = this.breadcrumbService.isValid = true;
              this.breadcrumb = this.breadcrumb.name = '';
              //console.log(this.articleService.articles)

          });
      }
    }

}
