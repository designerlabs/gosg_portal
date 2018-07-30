import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { NavService } from '../../header/nav/nav.service';
import { ContentProdComponent } from '../../article/content/contentprod.component';

@Component({
  selector: 'gosg-leftmenu',
  template: `
    <mat-expansion-panel *ngFor="let content of sessions; let i = index"  multi="false" displayMode="flat" [hideToggle]="content?.contents?.length==0 ? true: null"  [expanded]="content.activeMenu  || (i == statusID) || sessions.length <= 1" class="specific-class">
      <mat-expansion-panel-header>
        <mat-panel-title class="pointer" (click)="clickSideMenu(content, i, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" [routerLinkActive]="['active']"  [style.font-weight]="content?.activeMenu ? 'bold' : 'normal'"  [style.color]="content?.activeMenu ? getTheme() : '#333'" >
            {{content.categoryName}}
          </a>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <div *ngFor="let getContent of content?.contents" class="submenu" (click)="clickContentFromMenu(content.parentCode, getContent.contentCode, i, $event)">
       <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="getContent?.activeMenu ? 'bold' : 'normal'"  [style.color]="getContent?.activeMenu ? getTheme() : '#333'">{{getContent?.contentTitle}}</a>
      </div>


      <mat-expansion-panel *ngFor="let subcontent of content?.subCategories; let j = index" multi="false" displayMode="flat" [hideToggle]="subcontent?.contents?.length==0 ? true: null"  [expanded]="subcontent.activeMenu  || (j == statusID) || subcontent.length <= 1"  class="submenu" >
        <mat-expansion-panel-header>
          <mat-panel-title class="pointer" (click)="clickSideMenu(subcontent, j, $event)">
            <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="subcontent?.activeMenu ? 'bold' : 'normal'"  [style.color]="subcontent?.activeMenu ? getTheme() : '#333'">
              {{subcontent.categoryName}}
            </a>
          </mat-panel-title>
        </mat-expansion-panel-header>

        <div *ngFor="let getContent of subcontent?.contents" class="submenu" (click)="clickContentFromMenu(content.parentCode, getContent.contentCode, j, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="getContent?.activeMenu ? 'bold' : 'normal'"  [style.color]="getContent?.activeMenu ? getTheme() : '#333'">
            {{getContent?.contentTitle}}
          </a>
        </div>

        <gosg-leftmenu [sessions]="subcontent?.subCategories"></gosg-leftmenu>

      </mat-expansion-panel>




    </mat-expansion-panel>

    <mat-expansion-panel hideToggle="true" *ngIf="templateName === 'publication'" multi="true" displayMode="flat">
      <mat-expansion-panel-header>
          <mat-panel-title class="pointer" (click)="clickSideMenuByAgency(content, i, $event)">
              <a class="warna_font sideBarMenu--link font-size-s" [style.font-weight]="agencyActive ? 'bold' : 'normal'" [style.color]="agencyActive ? getTheme() : '#333'"
                  [routerLinkActive]="['active']">{{'common.byagency' | translate}}</a>
          </mat-panel-title>
      </mat-expansion-panel-header>
    </mat-expansion-panel>
`,
styleUrls:['./leftmenu.component.css']
})
export class LeftmenuProdComponent {
  agencyActive: boolean = false;
  statusID: any;
  paramURL: any;
  @Input() sessions: any;
  @Input() menuType: any;
  @Input() templateName: any;

  constructor(private router:Router, private navService: NavService, private activatedRoute: ActivatedRoute, private content:ContentProdComponent){
    this.activatedRoute.queryParams.subscribe(params => {
      this.paramURL = this.activatedRoute.snapshot.url[0].path;
    });
  }


  getTheme() {
    return localStorage.getItem('themeColor');
  }

  clickSideMenu(e, status, event) {
    this.statusID = status;
    this.agencyActive = false;
    if(this.paramURL == 'category'){
      this.router.navigate(['/subcategory', e.categoryCode]);
    }else if(this.paramURL == 'subcategory'){

      this.navService.getSubArticleUrl(e.categoryId, localStorage.getItem('langID'));
      this.navService.triggerSubArticle(e.categoryCode, localStorage.getItem('langID'));
      this.router.navigate(['/subcategory', e.categoryCode]);
    }else{
      this.router.navigate(['/subcategory', e.categoryCode]);
    }
    event.preventDefault();
  }

  clickContentFromMenu(pId, aId, status, event) {
    this.statusID = status;
    if(this.paramURL == 'category'){
      this.router.navigate(['/content', aId]);
    }else if(this.paramURL == 'subcategory'){
      this.router.navigate(['/content', aId]);
      // this.content.getRateReset();
    }else{
      this.navService.triggerContent(aId, localStorage.getItem('langID'));
      this.navService.getContentUrl(aId, localStorage.getItem('langID'));

      this.router.navigate(['/content',  aId]);
      this.content.getRateReset();
    }



    event.preventDefault();
  }

  clickSideMenuByAgency(e, status, event) {
    this.agencyActive = true;
    if(this.paramURL == 'category'){
      this.router.navigate(['/subcategory', 'agency']);
    }else if(this.paramURL == 'subcategory'){
      this.navService.getSubArticleUrlByAgency(localStorage.getItem('langID'));
      this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
      this.router.navigate(['/subcategory', 'agency']);
    }else{
      this.router.navigate(['/subcategory', 'agency']);
    }

    event.preventDefault();
  }

}
