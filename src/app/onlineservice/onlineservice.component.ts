import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../common/shared.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { APP_CONFIG, AppConfig } from '../config/app.config.module';

@Component({
  selector: 'gosg-onlineservice',
  templateUrl: './onlineservice.component.html',
  styleUrls: ['./onlineservice.component.css']
})
export class OnlineserviceComponent implements OnInit {

  lang = this.lang;
  languageId = this.languageId;

  pageCount = 1;
  pageSize = 10;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0;

  listAgency = [];
  datatblAgency = [];
  dataPage = [];
  inxlan = 0;
  public loading = false;

  constructor(
    private router: Router,
    private sharedService:SharedService, 
    private translate: TranslateService,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig,

  ) { 
    this.lang = translate.currentLang;
      this.languageId = 2;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
                  const myLang = translate.currentLang;
      
                  if (myLang == 'en') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'en';
                          this.languageId = 1;
                          this.inxlan = 0;
                      });
      
                  }
                  if (myLang == 'ms') {
                      translate.get('HOME').subscribe((res: any) => {
                          this.lang = 'ms';
                          this.languageId = 2;
                          this.inxlan = 1;
                      });
                  }
                  this.getAgencyList();                  
              });
  }

  ngOnInit() {
    this.getAgencyList();
    this.selAllAgency(this.pageCount,this.pageSize);
  }

  
  
  getAgencyList(){
    debugger;
    return this.sharedService.readPortal('agency')
      .subscribe(rData => {
        this.listAgency = rData['list'];
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  selByAgency(eve){
    console.log(eve.value);
    return this.sharedService.readPortal('agency/application/agencyid/os/' + eve.value, this.pageCount, this.pageSize)
      .subscribe(rData => {
        this.dataPage = rData;
        this.datatblAgency = rData['agencyApplicationList'];
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  selAllAgency(page, pagesize){
    debugger;
    return this.sharedService.readPortal('agency/application/all/agencyapp/os', this.pageCount, this.pageSize)
      .subscribe(rData => {
        this.dataPage = rData;
        this.datatblAgency = rData['agencyApplicationList'];
      },
      Error => {
       this.toastr.error(this.translate.instant('common.err.servicedown'), '');            
     });
  }

  paginatorL(page) {    
    this.selAllAgency(page - 1, this.pageSize);
    this.noPrevData = page <= 2 ? true : false; 
    this.noNextData = false;
  }

  paginatorR(page, totalPages) {
    this.noPrevData = page >= 1 ? false : true;
    let pageInc: any;
    pageInc = page + 1;
    this.selAllAgency(pageInc , this.pageSize);
  }

  pageChange(event, totalPages) {   
    this.pageSize = event.value;   
    this.selAllAgency(this.pageCount, event.value);    
    this.noPrevData = true;
  }

}
