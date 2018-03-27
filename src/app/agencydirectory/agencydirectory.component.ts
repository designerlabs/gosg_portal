import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AppConfig } from '../config/app.config.module';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from '../services/portal.service';
import { HttpClient } from '@angular/common/http';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'gosg-agencydirectory',
  templateUrl: './agencydirectory.component.html',
  styleUrls: ['./agencydirectory.component.css']
})
export class AgencydirectoryComponent implements OnInit {

  // course:Course;

  // dataSource: LessonsDataSource;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild(MatSort) sort: MatSort;
  
  @ViewChild('input') input: ElementRef;
  
  searchAgencyResultEn: Object;
  searchAgencyResultBm: Object;
  displayedColumns= ["seqNo", "description", "duration"];
  pageSize = 10;
  pageCount = 1;
  noPrevData = true;
  noNextData = false;
  seqNo = 0;
  seqPageNum = 0;
  seqPageSize = 0 ;
  agencyList: Object;
  isActiveListEn: boolean;
  isActiveListBm: boolean;
  isActive: boolean;
  ministryNameEn:any;
  ministryNameBm:any;
  langId = localStorage.getItem('langID');
  languageId = this.languageId;
  recordTable = null;
  recordList = null;

  showNoData = false

  // dataSource = new MatTableDataSource<object>(this.agencyList);

  step = 0;
  
  setStep(index: number) {
    this.step = index;
  }
  
  nextStep() {
    this.step++;
  }
  
  prevStep() {
    this.step--;
  }
  
  applyFilter(keyword) {   
    
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
        this.getSearchData(keyword,this.langId);
      } else {
        this.agencyList = null;
        // this.getAgencyData(this.pageCount, this.pageSize);
      }
  }
  
  resetSearch() {
    this.step = 0;
    this.agencyList = null;
  }

  constructor(
    private http: HttpClient, 
    private portalservice: PortalService, 
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService) {

      translate.onLangChange.subscribe((event: LangChangeEvent) => {
        const myLang = translate.currentLang;
        if (myLang == 'en') {
          translate.get('HOME').subscribe((res: any) => {
              this.lang = 'en';
              this.languageId = 1;
          });
    
        }
        if (myLang == 'ms') {
          translate.get('HOME').subscribe((res: any) => {
              this.lang = 'ms';
              this.languageId = 2;
          });
        }
      });
    }
    lang = this.lang;

  ngOnInit() {
  }

  // get agencyType Data 
  getAgencyData(count, size) {
    // this.loading = true;
    this.portalservice.readPortal('agency/type/code', count, size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.portalservice.errorHandling(data, (function(){
          this.agencyTypeList = data;

          if(this.agencyTypeList.list.length > 0){
            console.log(this.agencyTypeList)
            this.dataSource.data = this.agencyTypeList.list;
            this.seqPageNum = this.agencyTypeList.pageNumber;
            this.seqPageSize = this.agencyTypeList.pageSize;
            this.recordTable = this.agencyTypeList;
            this.noNextData = this.agencyTypeList.pageNumber === this.agencyTypeList.totalPages;

            this.showNoData = false;
          } else {
            this.dataSource.data = []; 
            this.showNoData = true;
          }
          console.log(this.agencyTypeList)
        }).bind(this)); 
        // this.loading = false;
      }, err => {
        // this.loading = false;
      });
  }

  getSearchData(keyword, langId){

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      console.log(keyword)
      console.log(keyword.length)
      this.isActive = true;
      // this.loading = true;
      this.portalservice.getAgenciesByKeyword(keyword).subscribe(
        data => {

        this.portalservice.errorHandling(data, (function(){

          // console.log(data['list'].length)

            this.agencyList = data;
            console.log(this.agencyList)
            this.step = 1;

        }).bind(this));
          // this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        // this.loading = false;
        console.log(error);
      });
    } else {
      // this.isActiveListEn = false;
      // this.isActiveListBm = false;
    }
  }
  
  getValue(aId,aName,mName, refCode, langId){

    if(langId == 1) {
      this.isActiveListEn = false;
      this.searchAgencyResultEn = [''];
      this.ministryNameEn = mName;

    } else {
      this.isActive = false;
      this.isActiveListBm = false;
      this.ministryNameBm = mName;

    }

    // console.log(mName)
  }

}
