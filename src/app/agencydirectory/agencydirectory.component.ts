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
// import { tileLayer, latLng, circle, polygon } from 'leaflet';

@Component({
  selector: 'gosg-agencydirectory',
  templateUrl: './agencydirectory.component.html',
  styleUrls: ['./agencydirectory.component.css']
})
export class AgencydirectoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  
  pageSize = 10;
  pageCount = 1;
  totalRec = 0;
  noPrevData = true;
  noNextData = false;
  recordList: Object;
  ministryList: Object;
  langId = localStorage.getItem('langID');
  languageId = this.languageId;
  recordTable = null;
  letters = this.genCharArray('a','z');
  ministry: any = '';
  letter: any = '';

  showNoData = false

  step = 0;

  // options = {
  //   layers: [
  //     tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
  //   ],
  //   zoom: 5,
  //   center: latLng(46.879966, -121.726909)
  // };
  
  // layersControl = {
  //   baseLayers: {
  //     'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
  //     'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
  //   },
  //   overlays: {
  //     'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
  //     'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
  //   }
  // }

  genCharArray(charA, charZ) {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
  }
  
  setStep(index: number) {
    this.step = index;
  }
  
  nextStep() {
    this.step++;
  }
  
  prevStep() {
    this.step--;
  }
  
  applySearchFilter(keyword?) {
    
    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.getSearchData(this.pageCount, this.pageSize, keyword);
    } else {
      this.recordList = null;
      this.getAgencyData(this.pageCount, this.pageSize);
    }
  }

  applyFilter(type,filter?) {

    console.log(filter)
    
      if(type == 'ministry') {
        if(filter) {
          this.ministry = filter;
        } else {
          this.ministry = '';
          filter = '';
        }
      } else if(type == 'letter') {
        if(filter) {
          this.letter = filter;
        } else {
          this.letter = '';
          filter = '';
        }
      } 
      this.getSearchData(this.pageCount, this.pageSize, null, filter != 0?filter:'');

    // else {
    //   this.recordList = null;
    //   this.getAgencyData(this.pageCount, this.pageSize);
    // }
  }
  
  resetSearch() {
    this.step = 0;
    this.recordList = null;
    this.getAgencyData(this.pageCount, this.pageSize);
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
          this.getAgencyData(this.pageCount, this.pageSize);
          this.getMinistry();
    
        }
        if (myLang == 'ms') {
          translate.get('HOME').subscribe((res: any) => {
              this.lang = 'ms';
              this.languageId = 2;
          });
        }
        this.getAgencyData(this.pageCount, this.pageSize);
        this.getMinistry();
      });
    }
    lang = this.lang;

  ngOnInit() {
  }

  // get agencyType Data 
  getAgencyData(count, size) {

    console.log('get')
    // this.loading = true;
    this.portalservice.readPortal('agency/language/'+this.languageId, count, size).subscribe(
      // this.http.get(this.dataUrl).subscribe(
      data => {
        this.portalservice.errorHandling(data, (function(){
          this.recordList = data;
          console.log(this.recordList)

          if(this.recordList.agencyList.length > 0){
            // this.dataSource.data = this.recordList.list;
            this.seqPageNum = this.recordList.pageNumber;
            this.seqPageSize = this.recordList.pageSize;
            this.totalRec = this.recordList.totalElements;
            this.recordTable = this.recordList.agencyList;
            this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
            // console.log(this.seqPageNum)
            // console.log(this.seqPageSize)
            console.log(this.recordTable)
            // console.log(this.recordTable[0])

            this.showNoData = false;
          } else {
            // this.dataSource.data = []; 
            this.showNoData = true;
          }
        }).bind(this)); 
        // this.loading = false;
      }, err => {
        // this.loading = false;
      });
  }

  pageChange(event, totalPages) {
    console.log(event)
    this.getAgencyData(this.pageCount, event.value);
    this.pageSize = event.value;
    this.noPrevData = true;
  }

  getSearchData(count, size, keyword?, filter?){
    let searchUrl;
    let wPaging = '&page='+count+'&size='+size;
    console.log('search')

    if(keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {

      this.portalservice.readPortal('agency/language/'+this.languageId,count, size, keyword).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function(){
            this.recordList = data;
            console.log(this.recordList)
  
            if(this.recordList.agencyList.length > 0){
              // this.dataSource.data = this.recordList.list;
              this.seqPageNum = this.recordList.pageNumber;
              this.seqPageSize = this.recordList.pageSize;
              this.totalRec = this.recordList.totalElements;
              this.recordTable = this.recordList.agencyList;
              this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
              // console.log(this.seqPageNum)
              // console.log(this.seqPageSize)
              console.log(this.recordTable)
              // console.log(this.recordTable[0])
  
              this.showNoData = false;
            } else {
              // this.dataSource.data = []; 
              this.showNoData = true;
            }
          }).bind(this)); 
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        // this.loading = false;
        console.log(error);
      });
      
    } else if(this.letter || this.ministry || (this.letter && this.ministry)) {

      let custom = 'letter='+this.letter+'&ministryId='+this.ministry+'&page=' + count + '&size=' + size;

      searchUrl = 'agency/search';

      console.log(custom);

      this.portalservice.readPortal(searchUrl, null, null, null, custom).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function(){
            this.recordList = data;
            console.log(this.recordList)
  
            if(this.recordList.agencyList.length > 0){
              // this.dataSource.data = this.recordList.list;
              this.seqPageNum = this.recordList.pageNumber;
              this.seqPageSize = this.recordList.pageSize;
              this.totalRec = this.recordList.totalElements;
              this.recordTable = this.recordList.agencyList;
              this.noNextData = this.recordList.pageNumber === this.recordList.totalPages;
              // console.log(this.seqPageNum)
              // console.log(this.seqPageSize)
              console.log(this.recordTable)
              // console.log(this.recordTable[0])
  
              this.showNoData = false;
            } else {
              // this.dataSource.data = []; 
              this.showNoData = true;
            }
          }).bind(this)); 
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');  
        // this.loading = false;
        console.log(error);
      });
    }
    console.log(searchUrl)
    
  }
  
  // GET MINISTRY
  getMinistry() {

    this.portalservice.readPortal('ministry/language/'+this.languageId)
    .subscribe(
      data => {
        this.portalservice.errorHandling(data, (function(){
          this.ministryList = data['list'];
          console.log(this.ministryList)

        }).bind(this)); 
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');  
      // this.loading = false;
      console.log(error);
    });
  }

}
