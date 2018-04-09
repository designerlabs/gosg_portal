import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SharedService } from '../../common/shared.service';

@Component({
  selector: 'gosg-setactive',
  templateUrl: './setactive.component.html',
  styleUrls: ['./setactive.component.css']
})
export class SetactiveComponent implements OnInit {
  languageId: any;
  val_token;

  constructor( private route: ActivatedRoute, private router: Router, private translate: TranslateService, private sharedservice: SharedService, ) { 
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('HOME').subscribe((res: any) => {
        this.sharedservice.readPortal('language/all').subscribe((data:any) => {
          let getLang = data.list;
          let myLangData =  getLang.filter(function(val) {
            if(val.languageCode == translate.currentLang){
              this.lang = val.languageCode;
              this.languageId = val.languageId;
            }
          }.bind(this));
        })
      });
    });
    if(!this.languageId){
      if(localStorage.getItem('langID')){
        this.languageId = localStorage.getItem('langID');
      }else{
        this.languageId = 1;
      }
      
    }
  }

  ngOnInit() {
    this.val_token = this.router.url.split('/')[3];
    console.log(this.val_token);
  }

}
