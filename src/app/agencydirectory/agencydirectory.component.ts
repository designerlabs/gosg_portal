import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { DialogsService } from '../dialogs/dialogs.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from '../services/portal.service';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatPaginator, MatSort
} from '@angular/material';
import { tileLayer, latLng, circle, polygon, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';
import { ISubscription } from 'rxjs/Subscription';
import { TopnavService } from '../header/topnav/topnav.service';

@Component({
  selector: 'gosg-agencydirectory',
  templateUrl: './agencydirectory.component.html',
  styleUrls: ['./agencydirectory.component.css']
})
export class AgencydirectoryComponent implements OnInit, AfterViewInit, OnDestroy {

  dataAlpha = [];
  keyword: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  pageSize = 10;
  pageCount = 1;
  totalRec = 0;
  noPrevData = true;
  noNextData = false;
  recordList: Object;
  agencyList: Object;
  ministryList: Object;
  lang = this.lang;
  langId = localStorage.getItem('langID');
  languageId = this.languageId;
  recordTable = null;
  letters = this.genCharArray('a', 'z');
  ministry: any = '';
  letter: any = '';
  custom: any;
  // allMarkers: any = [];
  markers: Layer[] = [];

  showNoData = false

  step = 0;

  mymap;
  marker;
  popup = L.popup();
  defaultIcon = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41], // size of the icon
    shadowSize: [40, 41], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor: [12, 0] // point from which the popup should open relative to the iconAnchor
  });
  private subscription: ISubscription;
  private subscriptionLang: ISubscription;

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

    if (keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {
      this.ministry = '';
      this.letter = '';
      this.loadAlpha(undefined, keyword);
      this.getSearchData(this.pageCount, 10, keyword);
    } else {
      this.recordList = null;
      this.loadAlpha();
      this.getAgencyData(this.pageCount, 10);
    }
  }

  applyFilter(type, filter?) {
    if (type != 'letter') {
      this.loadAlpha(filter);
    }
    console.log(filter);

    if (filter != 0) {
      if (type == 'ministry') {
        if (filter) {
          this.ministry = filter;
          this.pageCount = 1;
          this.letter = '';
          this.keyword = '';
        } else {
          this.ministry = '';
          filter = '';
          this.keyword = '';
        }
      } else if (type == 'letter') {



        if (filter) {
          this.letter = filter;
          this.pageCount = 1;
        } else {
          this.letter = '';
          filter = '';
          this.keyword = '';
        }
      }

      if (this.keyword && filter) {
        this.getSearchData(this.pageCount, this.pageSize, this.keyword, filter);
      } else {
        this.getSearchData(this.pageCount, this.pageSize, null, filter != 0 ? filter : '');
      }
    } else {
      if (this.ministry) {
        this.keyword = '';
        this.getSearchData(this.pageCount, this.pageSize);
      } else {
        this.letter = '';
        this.keyword = '';
        this.mymap.setView([5.8142568, 108.5806004], 5.2);
        this.popup.remove();
        this.getAgencyData(this.pageCount, this.pageSize);
      }

    }

  }

  resetSearch() {
    this.step = 0;
    this.recordList = null;
    this.getAgencyData(this.pageCount, this.pageSize);
    this.loadAlpha();
    // this.getDefaultMap();
    this.ministry = '';
    this.letter = '';
    this.mymap.setView([5.8142568, 108.5806004], 5.2);
    this.popup.remove();
  }

  constructor(
    private http: Http,
    private portalservice: PortalService,
    private dialogsService: DialogsService,
    private translate: TranslateService,
    private topnavservice: TopnavService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(APP_CONFIG) private config: AppConfig) {

    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // this.sharedService.errorHandling(event, (function(){
      const myLang = this.translate.currentLang;
      if (myLang === 'en') {
        this.lang = 'en';
        this.languageId = 1;
        if (this.popup.isPopupOpen)
          this.popup.closePopup()
      }
      if (myLang === 'ms') {
        this.lang = 'ms';
        this.languageId = 2;
        if (this.popup.isPopupOpen)
          this.popup.closePopup()
      }

      if (this.topnavservice.flagLang) {
        this.getAgencyData(this.pageCount, this.pageSize);
        this.getMinistry();
        this.getAllAgenciesMarkers()
      }

      this.letter = '';
      this.keyword = '';
      this.ministry = '';
      this.pageCount = 1;
      this.mymap.setView([5.8142568, 108.5806004], 5.2);
      this.popup.remove();

    });
  }

  ngOnInit() {

    if (!this.languageId) {
      this.languageId = localStorage.getItem('langID');
      //this.getData();
    } else {
      this.languageId = 1;
    }

    this.getDefaultMap();
    this.loadAlpha();
    // this.getMinistry();
    // this.getAllAgenciesMarkers()
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }


  loadAlpha(ministryCode?, keyword?) {
    let dataUrl;
    if (keyword && (typeof ministryCode !== 'undefined')) {
      dataUrl = 'agency/search/alpha?keyword=' + keyword + '&ministryRefCode=' + ministryCode + '&language=' + this.languageId;
    } else if (typeof ministryCode !== 'undefined') {
      if (ministryCode) {
        dataUrl = 'agency/search/alpha?ministryRefCode=' + ministryCode + '&language=' + this.languageId;
      } else {
        dataUrl = 'agency/search/alpha?language=' + this.languageId;
      }

    } else if (keyword) {
      dataUrl = 'agency/search/alpha?keyword=' + keyword + '&language=' + this.languageId;
    } else {
      dataUrl = 'agency/search/alpha?language=' + this.languageId;
    }
    return this.http.get(this.config.urlPortal + dataUrl)
      .map(res => res.json())
      .subscribe(rData => {
        this.dataAlpha = rData.letters;
      })
  }

  getDefaultMap() {
    this.mymap = L.map('dirmap').setView([5.8142568, 108.5806004], 5.2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 15,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicmVkemEiLCJhIjoiY2pmcGZxNzRrMjYzbzMwcG83bGRxY2FtZyJ9.uMHQpYc0Pvjl4us27nHH8w'
    }).addTo(this.mymap);
  }


  ngAfterViewInit() {
    this.getAgencyData(this.pageCount, this.pageSize);
    this.getMinistry();
    this.getAllAgenciesMarkers()
  }

  goToMarkerPoint(dLat, dLong, dName, dAddress, dEmail, dFax, dPhone) {
    if (dLat && dLong) {
      this.mymap.setView([dLat, dLong], 13);

      this.popup = L.popup()
        .setLatLng([dLat, dLong])
        .setContent(`
        <div class='row'>
        <div class='col-md-12'>
          <h4>${dName}
            <h4>
        </div>
        <div class='col-md-2'>
          <i class='fa fa-home' style='font-size: 1.2em; margin-top: 90%'></i>
        </div>
        <div class='col-md-10'>
          <p style='font-size: 1em'>${dAddress}</p>
        </div>
        <div class='col-md-2'>
          <i class='fa fa-map-marker' style='font-size: 1.2em; margin-top: 85%'></i>
        </div>
        <div class='col-md-10'>
          <p>${dLat},${dLong}</p>
        </div>
        <div class='col-md-2'>
          <i class='fa fa-phone' style='font-size: 1.2em; margin-top: 90%'></i>
        </div>
        <div class='col-md-10'>
          <p style='font-size: 1em'>${dPhone}</p>
        </div>
        <div class='col-md-2'>
          <i class='fa fa-fax' style='font-size: 1.2em; margin-top: 90%'></i>
        </div>
        <div class='col-md-10'>
          <p style='font-size: 1em'>${dFax}</p>
        </div>
        <div class='col-md-2'>
          <i class='fa fa-envelope' style='font-size: 1.2em; margin-top: 90%'></i>
        </div>
        <div class='col-md-10'>
          <p style='font-size: 1em'>${dEmail}</p>
        </div>
      </div>
        `)
        .openOn(this.mymap);

    } else
      console.log('latlong are NULL')
  }

  onMapClick(e) {
    // this.popup.setLatLng(e.latlng)
    // .setContent("You clicked the map at " + e.latlng.toString())
    // .openOn(this.mymap);
    // this.mymap.setView([agcLat, agcLong], 15);
    console.log(e);

  }

  addMarker(agcLat, agcLong, mName, mAddress, mEmail, mFax, mPhone) {

    if (!isNaN(agcLat)) {
      if (agcLat !== "NaN") {
        console.log(typeof (agcLat), 'in');
        this.marker = L.marker([agcLat, agcLong], { icon: this.defaultIcon })
          .bindPopup(`
          <div class='row'>
          <div class='col-md-12'>
            <h4>${mName}
              <h4>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-home' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${mAddress}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-map-marker' style='font-size: 1.2em; margin-top: 85%'></i>
          </div>
          <div class='col-md-10'>
            <p>${agcLat},${agcLong}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-phone' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${mPhone}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-fax' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${mFax}</p>
          </div>
          <div class='col-md-2'>
            <i class='fa fa-envelope' style='font-size: 1.2em; margin-top: 90%'></i>
          </div>
          <div class='col-md-10'>
            <p style='font-size: 1em'>${mEmail}</p>
          </div>
        </div>
      `)
          // .setLatLng([agcLat,agcLong])
          .addTo(this.mymap);

        this.marker.on('click', this.onMapClick)
      }
    }

  }

  getAllAgenciesMarkers() {
    let i;
    this.portalservice.readPortal('agency/map').subscribe(
      data => {
        this.portalservice.errorHandling(data, (function () {
          this.agencyList = data['agencyList'];
          // console.log(this.agencyList)
          // console.log(this.agencyList.length)

          for (i = 0; i <= this.agencyList.length - 1; i++) {
            // console.log(i)
            // console.log(this.agencyList[i].ministryName)
            // console.log(mLat + ',' + mLong)
            // console.log(parseFloat(this.agencyList[i].ministryLatitude))
            // console.log(parseFloat(this.agencyList[i].ministryLongitude))

            this.addMarker(
              parseFloat(this.malformedDataHandler(this.agencyList[i].agencyLatitude)),
              parseFloat(this.malformedDataHandler(this.agencyList[i].agencyLongitude)),
              this.agencyList[i].agencyName,
              this.agencyList[i].agencyAddress,
              this.agencyList[i].agencyEmail,
              this.agencyList[i].agencyFax,
              this.agencyList[i].agencyPhoneNo
            );
          }

        }).bind(this));
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        // this.loading = false;
        console.log(error);
      });
  }

  // get agencyType Data
  getAgencyData(count, size) {
      this.portalservice.readPortal('agency/language/' + this.languageId, count, size).subscribe(
        // this.http.get(this.dataUrl).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function () {
            this.recordList = data;
            // console.log(this.recordList)

            if (this.recordList.agencyList.length > 0) {
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
              this.recordTable = [];
              this.showNoData = true;
            }
          }).bind(this));
          // this.loading = false;
        }, err => {
          // this.loading = false;
        });


  }

  pageChange(event, totalPages) {
    // console.log(event)
    if (this.ministry) {
      this.getSearchData(this.pageCount, 10);
    } else {
      if(this.keyword ){
        this.getSearchData(this.pageCount, 10, this.keyword);
      }else if(this.letter){
        this.getSearchData(this.pageCount, 10);
      }else{
        this.getAgencyData(this.pageCount, 10);
      }

    }

    this.pageSize = 10;
    this.noPrevData = true;
  }

  getSearchData(count, size, keyword?, filter?) {
    let searchUrl;
    let wPaging = '&page=' + count + '&size=' + size;
    console.log('search')
    console.log(this.letter);
    if (keyword != "" && keyword != null && keyword.length != null && keyword.length >= 3) {

      this.portalservice.readPortal('agency/language/' + this.languageId, count, size, keyword).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function () {
            this.recordList = data;
            // console.log(this.recordList)

            if (this.recordList.agencyList.length > 0) {
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
              this.recordTable = [];
              this.showNoData = true;
            }
          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          // this.loading = false;
          console.log(error);
        });

    } else if (this.letter || this.ministry || (this.letter && this.ministry)) {
      if (this.letter !== 0) {
        if (this.ministry) {
          this.custom = 'letter=' + this.letter + '&ministryRefCode=' + this.ministry + '&page=' + count + '&size=' + size;
        } else {
          this.custom = 'letter=' + this.letter + '&page=' + count + '&size=' + size;
        }

      } else {
        if (this.ministry) {
          this.custom = 'ministryRefCode=' + this.ministry + '&page=' + count + '&size=' + size;
        } else {
          this.custom = 'page=' + count + '&size=' + size;
        }

      }


      searchUrl = 'agency/search';

      console.log(this.custom);

      this.portalservice.readPortal(searchUrl, null, null, null, this.custom).subscribe(
        data => {
          this.portalservice.errorHandling(data, (function () {
            this.recordList = data;
            console.log(this.recordList)

            if (this.recordList.agencyList.length > 0) {
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
    let i;
    this.portalservice.readPortal('ministry/language/' + this.languageId)
      .subscribe(
        data => {
          this.portalservice.errorHandling(data, (function () {
            this.ministryList = data['list'];
            console.log(this.ministryList)
            // console.log(this.ministryList.length)

            for (i = 0; i <= this.ministryList.length - 1; i++) {
              // console.log(i)
              // console.log(this.ministryList[i].ministryName)
              // console.log(mLat + ',' + mLong)
              // console.log(parseFloat(this.ministryList[i].ministryLatitude))
              // console.log(parseFloat(this.ministryList[i].ministryLongitude))

              this.addMarker(
                parseFloat(this.malformedDataHandler(this.ministryList[i].ministryLatitude)),
                parseFloat(this.malformedDataHandler(this.ministryList[i].ministryLongitude)),
                this.ministryList[i].ministryName,
                this.ministryList[i].ministryAddress,
                this.ministryList[i].ministryEmail,
                this.ministryList[i].ministryFax,
                this.ministryList[i].ministryPhone
              );
            }

          }).bind(this));
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          // this.loading = false;
          console.log(error);
        });
  }

  malformedDataHandler(data) {
    let tData;

    if (!data || data === 'undefined' || data == "")
      tData = "0.0"
    else
      tData = data;

    return tData
  }

}
