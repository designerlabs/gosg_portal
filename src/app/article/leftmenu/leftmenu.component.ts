import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { NavService } from '../../header/nav/nav.service';
import { ContentComponent } from '../../article/content/content.component';

@Component({
  selector: 'gosg-leftmenu',
  template: `
  <button class="visible-xs btn btn-sm" style="overflow: hidden;
  border: none;
  outline: none;
  position: absolute;
  top: -100px;
  right: 0px;
  margin-right: 0px;"
  mat-fab color="accent"  (click)="menuModal.show()">
    <i class="fa fa-bars" aria-hidden="true"></i>
  </button>
  <div class="hidden-xs" *ngIf="templateName !== 'lifeevent'" >
    <mat-expansion-panel *ngFor="let content of sessions; let i = index"  multi="false" displayMode="flat" [hideToggle]="content?.subCategories?.length==0 ? true: null"  [expanded]="content.activeMenu  || (i == statusID) || sessions.length <= 1" class="specific-class">
      <mat-expansion-panel-header>
        <mat-panel-title class="pointer" (click)="clickSideMenu(content, i, $event)">
        <a class="warna_font sideBarMenu--link font-size-s" [routerLinkActive]="['active']"  [style.font-weight]="content?.activeMenu ? 'bold' : 'normal'"  [style.color]="content?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'" >
            {{content.categoryName}}
          </a>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <div *ngFor="let getContent of content?.contents" class="submenu" (click)="clickContentFromMenu(content.parentCode, getContent.contentCode, i, $event)">
       <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="getContent?.activeMenu ? 'bold' : 'normal'"  [style.color]="getContent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">{{getContent?.contentTitle}}</a>
      </div>


      <mat-expansion-panel *ngFor="let subcontent of content?.subCategories; let j = index" multi="false" displayMode="flat" [hideToggle]="subcontent?.subCategories?.length==0 ? true: null"  [expanded]="subcontent.activeMenu  || (j == statusID) || subcontent.length <= 1"  class="submenu" >
        <mat-expansion-panel-header>
          <mat-panel-title class="pointer" (click)="clickSideMenu(subcontent, j, $event)">
            <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="subcontent?.activeMenu ? 'bold' : 'normal'"  [style.color]="subcontent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">
              {{subcontent.categoryName}}
            </a>
          </mat-panel-title>
        </mat-expansion-panel-header>

        <div *ngFor="let getContent of subcontent?.contents" class="submenu" (click)="clickContentFromMenu(content.parentCode, getContent.contentCode, j, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="getContent?.activeMenu ? 'bold' : 'normal'"  [style.color]="getContent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">
            {{getContent?.contentTitle}}
          </a>
        </div>

        <gosg-leftmenu [sessions]="subcontent?.subCategories"></gosg-leftmenu>

      </mat-expansion-panel>




      </mat-expansion-panel>
    </div>



    <div class="hidden-xs" *ngIf="templateName === 'lifeevent'" >
    <mat-expansion-panel *ngFor="let content of sessions; let i = index"  multi="false" displayMode="flat" [hideToggle]="content?.contents?.length==0 ? true: null" [disabled]="true" [expanded]="content.activeMenu  || (i == statusID) || sessions.length <= 1" class="specific-class">
      <mat-expansion-panel-header>
        <mat-panel-title class="pointer" (click)="clickSideMenu(content, i, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" [routerLinkActive]="['active']"  [style.font-weight]="content?.activeMenu ? 'bold' : 'normal'"  [style.color]="content?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'" >
            {{content.categoryName}}
          </a>
        </mat-panel-title>
      </mat-expansion-panel-header>



      <mat-expansion-panel *ngFor="let subcontent of content?.subCategories; let j = index" multi="false" displayMode="flat" [hideToggle]="subcontent?.contents?.length==0 ? true: null"  [expanded]="subcontent.activeMenu  || (j == statusID) || subcontent.length <= 1"  class="submenu" >
        <mat-expansion-panel-header>
          <mat-panel-title class="pointer" (click)="clickSideMenu(subcontent, j, $event)">
            <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="subcontent?.activeMenu ? 'bold' : 'normal'"  [style.color]="subcontent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">
              {{subcontent.categoryName}}
            </a>
          </mat-panel-title>
        </mat-expansion-panel-header>



        <gosg-leftmenu [sessions]="subcontent?.subCategories"></gosg-leftmenu>

      </mat-expansion-panel>




      </mat-expansion-panel>
    </div>

    <div class="modal fade" bsModal #menuModal="bs-modal" [config]="{backdrop: 'static'}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
    aria-hidden="true">
      <div class="modal-dialog modal-sm" style="top: 100px;">
        <div class="modal-content">
          <div class="modal-body">



          <div *ngIf="templateName !== 'lifeevent'" >
          <mat-expansion-panel *ngFor="let content of sessions; let i = index"  multi="false" displayMode="flat" [hideToggle]="content?.subCategories?.length==0 ? true: null"  [expanded]="content.activeMenu  || (i == statusID) || sessions.length <= 1" class="specific-class">
            <mat-expansion-panel-header>
              <mat-panel-title class="pointer" (click)="clickSideMenu(content, i, $event)">
              <a class="warna_font sideBarMenu--link font-size-s" [routerLinkActive]="['active']"  [style.font-weight]="content?.activeMenu ? 'bold' : 'normal'"  [style.color]="content?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'" >
                  {{content.categoryName}}
                </a>
              </mat-panel-title>
            </mat-expansion-panel-header>
            <div *ngFor="let getContent of content?.contents" class="submenu" (click)="clickContentFromMenu(content.parentCode, getContent.contentCode, i, $event)">
             <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="getContent?.activeMenu ? 'bold' : 'normal'"  [style.color]="getContent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">{{getContent?.contentTitle}}</a>
            </div>


            <mat-expansion-panel *ngFor="let subcontent of content?.subCategories; let j = index" multi="false" displayMode="flat" [hideToggle]="subcontent?.subCategories?.length==0 ? true: null"  [expanded]="subcontent.activeMenu  || (j == statusID) || subcontent.length <= 1"  class="submenu" >
              <mat-expansion-panel-header>
                <mat-panel-title class="pointer" (click)="clickSideMenu(subcontent, j, $event)">
                  <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="subcontent?.activeMenu ? 'bold' : 'normal'"  [style.color]="subcontent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">
                    {{subcontent.categoryName}}
                  </a>
                </mat-panel-title>
              </mat-expansion-panel-header>

              <div *ngFor="let getContent of subcontent?.contents" class="submenu" (click)="clickContentFromMenu(content.parentCode, getContent.contentCode, j, $event)">
                <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="getContent?.activeMenu ? 'bold' : 'normal'"  [style.color]="getContent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">
                  {{getContent?.contentTitle}}
                </a>
              </div>

              <gosg-leftmenu [sessions]="subcontent?.subCategories"></gosg-leftmenu>

            </mat-expansion-panel>




            </mat-expansion-panel>
          </div>



    <div *ngIf="templateName === 'lifeevent'" >
    <mat-expansion-panel *ngFor="let content of sessions; let i = index"  multi="false" displayMode="flat" [hideToggle]="content?.contents?.length==0 ? true: null" [disabled]="true" [expanded]="content.activeMenu  || (i == statusID) || sessions.length <= 1" class="specific-class">
      <mat-expansion-panel-header>
        <mat-panel-title class="pointer" (click)="clickSideMenu(content, i, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" [routerLinkActive]="['active']"  [style.font-weight]="content?.activeMenu ? 'bold' : 'normal'"  [style.color]="content?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'" >
            {{content.categoryName}}
          </a>
        </mat-panel-title>
      </mat-expansion-panel-header>



      <mat-expansion-panel *ngFor="let subcontent of content?.subCategories; let j = index" multi="false" displayMode="flat" [hideToggle]="subcontent?.contents?.length==0 ? true: null"  [expanded]="subcontent.activeMenu  || (j == statusID) || subcontent.length <= 1"  class="submenu" >
        <mat-expansion-panel-header>
          <mat-panel-title class="pointer" (click)="clickSideMenu(subcontent, j, $event)">
            <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="subcontent?.activeMenu ? 'bold' : 'normal'"  [style.color]="subcontent?.activeMenu ? getTheme() ? getTheme() : 'rgb(0, 189, 187)' : '#333'">
              {{subcontent.categoryName}}
            </a>
          </mat-panel-title>
        </mat-expansion-panel-header>



        <gosg-leftmenu [sessions]="subcontent?.subCategories"></gosg-leftmenu>

      </mat-expansion-panel>




      </mat-expansion-panel>
    </div>



            <button style="margin-top: 30px;" type="button" mat-fab color="warn" aria-label="Close" (click)="menuModal.hide()">
              <span aria-hidden="true" style="font-size: 30px; bottom: 3px; position: relative;"> <i class="fa fa-times" aria-hidden="true"></i> </span>
            </button>
          </div>
        </div>
      </div>
    </div>

`,
styleUrls:['./leftmenu.component.css']
})
export class LeftmenuComponent {
  agencyActive: boolean = false;
  statusID: any;
  paramURL: any;
  paramURL_Next: any;
  @Input() sessions: any;
  @Input() menuType: any;
  @Input() templateName: any;
  loading: boolean = false;

  constructor(private router:Router, private navService: NavService, private activatedRoute: ActivatedRoute, private content:ContentComponent){
    this.activatedRoute.queryParams.subscribe(params => {
      this.paramURL = this.activatedRoute.snapshot.url[0].path;
      this.paramURL_Next = this.paramURL + '/' +this.activatedRoute.snapshot.url[1].path;
    });
  }

  boolCallback = (result: boolean) : void => {
    this.loading = result;
  }

  getTheme() {
    return localStorage.getItem('themeColor');
  }

  clickSideMenu(e, status, event) {
    this.navService.loader = true;
    this.statusID = status;
    this.agencyActive = false;
    if(this.paramURL_Next == 'archive/category'){
      this.router.navigate(['/archive/subcategory', e.categoryCode]);
    }else if(this.paramURL == 'category'){
      this.router.navigate(['/subcategory', e.categoryCode]);
    }else if(this.paramURL == 'subcategory'){

      this.navService.getSubArticleUrl(e.categoryId, localStorage.getItem('langID'));
      this.navService.triggerSubArticle(e.categoryCode, localStorage.getItem('langID'));
      this.router.navigate(['/subcategory', e.categoryCode]);
    }else if(this.paramURL_Next == 'archive/subcategory'){

      this.navService.getSubArticleUrlOthers(e.categoryId, localStorage.getItem('langID'),'archive');
      this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'),'archive');
      this.router.navigate(['/archive/subcategory', e.categoryCode]);
    }else if(this.paramURL_Next == 'archive/content'){

      this.navService.getSubArticleUrlOthers(e.categoryId, localStorage.getItem('langID'),'archive');
      this.navService.triggerSubArticleOther(e.categoryCode, localStorage.getItem('langID'),'archive');
      this.router.navigate(['/archive/subcategory', e.categoryCode]);
    }else{
      this.router.navigate(['/subcategory', e.categoryCode]);
    }
    event.preventDefault();
  }

  clickContentFromMenu(pId, aId, status, event) {
    this.navService.loader = true;
    this.statusID = status;
    if(this.paramURL == 'category'){
      this.router.navigate(['/content', aId]);
    }else if(this.paramURL_Next == 'archive/category'){
      this.router.navigate(['/archive/content', aId]);
    }else if(this.paramURL == 'subcategory'){
      this.router.navigate(['/content', aId]);
      // this.content.getRateReset();
    }else if(this.paramURL_Next == 'archive/subcategory'){
      this.router.navigate(['/archive/content', aId]);
      // this.content.getRateReset();
    }else if(this.paramURL_Next == 'archive/content'){
      this.navService.triggerContentOther(aId, localStorage.getItem('langID'),'archive');
      this.navService.getContentUrlOther(aId, localStorage.getItem('langID'), 'archive');
      this.router.navigate(['/archive/content', aId]);
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
    this.navService.loader = true;
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
