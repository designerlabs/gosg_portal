import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { NavService } from '../../header/nav/nav.service';

@Component({
  selector: 'gosg-leftmenu',
  template: `
  <mat-accordion>
  <mat-expansion-panel  *ngFor="let content of sessions; let i = index" multi="false" displayMode="flat" [hideToggle]="content.subMenuLeft.length==0 ? true: null"  [expanded]="content.activeMenu  || (i == statusID) || sessions.length <= 1">
      <mat-expansion-panel-header>
        <mat-panel-title class="pointer" (click)="clickSideMenu(content, i, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" [routerLinkActive]="['active']"  [style.font-weight]="content.activeMenu ? 'bold' : 'normal'"  [style.color]="content.activeMenu ? getTheme() : '#333'" >{{content.categoryName}}</a>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <div *ngFor="let subcontent of content.subCategories" class="submenu" >
        <div class="pointer" (click)="clickContentFromMenu(content.parentCode, subcontent.contentCode, i, $event)">
          <a class="warna_font sideBarMenu--link font-size-s" #subContent [style.font-weight]="subcontent.activeMenu ? 'bold' : 'normal'"  [style.color]="subcontent.activeMenu ? getTheme() : '#333'">
          {{subcontent.categoryName}}
          </a>
        </div>
      </div>

  </mat-expansion-panel>

  <mat-expansion-panel hideToggle="true" *ngIf="templateName === 'publication'" multi="true" displayMode="flat">
      <mat-expansion-panel-header>
          <mat-panel-title class="pointer" (click)="clickSideMenuByAgency(content, i, $event)">
              <a class="warna_font sideBarMenu--link font-size-s" [style.font-weight]="agencyActive ? 'bold' : 'normal'" [style.color]="agencyActive ? getTheme() : '#333'"
                  [routerLinkActive]="['active']">{{'common.byagency' | translate}}</a>
          </mat-panel-title>
      </mat-expansion-panel-header>
  </mat-expansion-panel>
  </mat-accordion>


`,
styleUrls:['./leftmenu.component.css']
})
export class LeftmenuComponent {
  agencyActive: boolean = false;
  statusID: any;
  paramURL: any;
  @Input() sessions: any;
  @Input() menuType: any;
  @Input() templateName: any;

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
    }else{
      this.navService.triggerContent(aId, localStorage.getItem('langID'));
      this.navService.getContentUrl( aId, localStorage.getItem('langID'));

      this.router.navigate(['/content', aId]);
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
