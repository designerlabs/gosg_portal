import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { NavService } from '../../header/nav/nav.service';
import { ContentProdComponent } from '../../article/content/contentprod.component';

@Component({
  selector: 'gosg-leftmenu',
  templateUrl: './leftmenu.component.html',
styleUrls:['./leftmenu.component.css']
})
export class LeftmenuProdComponent {
  agencyActive: boolean = false;
  statusID: any;
  paramURL: any;
  paramURL_Next: any;
  @Input() sessions: any;
  @Input() menuType: any;
  @Input() templateName: any;
  loading: boolean = false;

  constructor(private router:Router,  public articleService: ArticleService, private navService: NavService, private activatedRoute: ActivatedRoute, private content:ContentProdComponent){
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
    this.articleService.leContent = "";
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
    this.articleService.leContent = "";
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
    this.articleService.leContent = "";
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
