import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { NavService } from '../../header/nav/nav.service';

@Component({
  selector: 'gosg-leftmenu',
  template: `
  <mat-expansion-panel  *ngFor="let content of sessions; let i = index" multi="false" displayMode="flat" [hideToggle]="content.subMenuLeft.length==0 ? true: null"  [expanded]="content.activeMenu  || (i == statusID) || sessions.length <= 1">
      <mat-expansion-panel-header>
        <mat-panel-title class="pointer" (click)="clickSideMenu(content, i, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" [routerLinkActive]="['active']"  [style.font-weight]="content.activeMenu ? 'bold' : 'normal'"  [style.color]="content.activeMenu ? getTheme() : '#333'" >{{content.categoryName}}</a>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <div *ngFor="let subcontent of content.subMenuLeft" class="submenu" >
        <div class="pointer" (click)="clickContentFromMenu(content.parentCode, subcontent.contentCode, i, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="subcontent.activeMenu ? 'bold' : 'normal'"  [style.color]="subcontent.activeMenu ? getTheme() : '#333'">
          {{subcontent.contentTitle}}
          </a>
        </div>
      </div>
  </mat-expansion-panel>
`
})
export class LeftmenuComponent {
  statusID: any;
  paramURL: any;
  @Input() sessions: any;
  @Input() menuType: any;

  constructor(private router:Router, private navService: NavService, private activatedRoute: ActivatedRoute){

    this.activatedRoute.queryParams.subscribe(params => {
      this.paramURL = this.activatedRoute.snapshot.url[0].path;
  });

  }


  getTheme() {
    return localStorage.getItem('themeColor');
  }

  clickSideMenu(e, status, event) {
    //alert( this.paramURL = this.activatedRoute.snapshot.url[0].path)
    debugger;
    this.statusID = status;
    this.router.navigate(['/subcategory', e.categoryCode]);
    event.preventDefault();
  }

  clickContentFromMenu(pId, aId, status, event) {
    //alert( this.paramURL = this.activatedRoute.snapshot.url[0].path)
    this.statusID = status;
    this.router.navigate(['/content', aId]);
    event.preventDefault();
  }

  clickSideMenuByAgency(e, status, event) {
    //alert( this.paramURL = this.activatedRoute.snapshot.url[0].path)
    this.navService.getSubArticleUrlByAgency(localStorage.getItem('langID'));
    this.navService.triggerSubArticleAgency(localStorage.getItem('langID'));
    this.router.navigate(['/subcategory', 'agency']);
    event.preventDefault();
  }

}
