import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';

@Injectable()
export class GalleryService {
    @Output() menuClick = new EventEmitter();
    galleries: any[];
    breadcrumb: any;
    isValid: any;

    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private route: ActivatedRoute,private breadcrumbService: BreadcrumbService, private router: Router) { }

    getGallery() {
        return this.galleries;
    }

    public article = {
        name: 'hello'
    };

    private galleryUrl: string = this.config.urlGallery;

    triggerContent(subID, lang) {
        // alert("Trigger sub acrticle");
        if (!isNaN(subID)) {
            this.galleries = [''];
            return this.route.paramMap
                .switchMap((params: ParamMap) =>
                    this.getContentUrl(subID, lang))
                .subscribe(resSliderData => {
                    this.galleries = resSliderData;
                    this.breadcrumb = this.breadcrumbService.getBreadcrumb();
                    this.isValid = this.breadcrumbService.isValid = true;
                    this.breadcrumb = this.breadcrumb.name = '';
                });
        }
    }

    getContentUrl(subID: number, lang) {
        if (!isNaN(subID)) {
            return this.http.get(this.config.urlPortal + 'content/' + subID + '?language=' + lang)
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
}
