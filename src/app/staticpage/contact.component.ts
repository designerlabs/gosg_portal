import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { tileLayer, latLng, circle, polygon, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';

@Component({
    selector: 'app-contact',
    templateUrl: 'contact.component.html',
    styles: [
        `
        .map-responsive {
            border-top:2px solid #1ebebc;
        }

        p {
          color:black;
          font-size:14px;
        }

        .glyphicon{
            color:white;
        }

        body {
            font-family: Roboto, sans-serif;
        }

        .mapstyle {
            width:100%;
            height:400px;
            frameborder:0;
            border:0;
        }

        `
    ]
})

export class ContactComponent{
       getTheme(){
        return localStorage.getItem('themeColor');
    }

    langID = 1;
    lang: any;
    footer = [];
    dataContact= [];
    tltContact;
    mymap;
    marker;
    markers: Layer[] = [];
    popup= L.popup();
    defaultIcon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [40, 41], // size of the shadow
        iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [12, 0] // point from which the popup should open relative to the iconAnchor
    });
    private footerUrl: string = this.config.urlFooter;

    constructor(private translate: TranslateService, 
        private router: Router, 
        private http: Http, 
        @Inject(APP_CONFIG) private config: AppConfig) {

        this.lang = translate.currentLang;

        translate.onLangChange.subscribe((event: LangChangeEvent) => {
    
            const myLang = translate.currentLang;
        
            if (myLang == 'en') {
        
                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'en';
                    this.langID = 1;
                    this.getContactUs(this.langID);
                });
            }

            if (myLang == 'ms') {
        
                translate.get('HOME').subscribe((res: any) => {
                    this.lang = 'ms';
                    this.langID = 2;
                    this.getContactUs(this.langID);
                });
            }

           // this.mymap.setView([5.8142568, 108.5806004], 6);
            this.mymap.setView([2.9414613,101.6575362], 13);
    
        });
    }

    ngOnInit() {
        this.langID = 0;
        if (this.lang === 'ms') {
          this.langID = 2;
        }else {
          this.langID = 1;
        }

        this.getDefaultMap();
        this.getContactUs(this.langID);
        
    }

    getContactUs(lang){
        return this.http.get(this.footerUrl + '?language=' + lang )
        .map((response: Response) => response.json())
        .subscribe(resSliderData => {
            this.footer = resSliderData['footerResourceList'];        

            if(lang == 2){
                this.tltContact = this.footer.filter(fdata => fdata.title === 'HUBUNGI KAMI')[0];
            }

            else{
                this.tltContact = this.footer.filter(fdata => fdata.title === 'CONTACT US')[0];
            }
            this.dataContact = this.tltContact.footerContents;
            let latlong = this.dataContact[2].footerContentName;          
            var partsOfStr = latlong.split(',');
            console.log(latlong);
            console.log(partsOfStr);


            this.addMarker(
                parseFloat(partsOfStr[0]),
                parseFloat(partsOfStr[1]),                
                this.dataContact[0].footerContentName,
                this.dataContact[1].footerContentName,
                this.dataContact[5].footerContentName,
                this.dataContact[4].footerContentName,
                this.dataContact[3].footerContentName
            );
            

            console.log(this.dataContact);
        });
    }

    getDefaultMap(){
        this.mymap = L.map('dirmap').setView([2.9414613,101.6575362], 13);
        //this.mymap = L.map('map', { zoomControl:false });
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 20,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicmVkemEiLCJhIjoiY2pmcGZxNzRrMjYzbzMwcG83bGRxY2FtZyJ9.uMHQpYc0Pvjl4us27nHH8w'
        }).addTo(this.mymap);
    }

    addMarker(agcLat, agcLong, mName?, mAddress?, mEmail?, mFax?, mPhone?) {
    
        this.marker = L.marker([agcLat, agcLong], {icon:this.defaultIcon})
        .bindPopup("<div class='row'>"
        +"<div class='col-md-12'>"
        +"<h4>"+mName+"<h4>"
        +"</div>"
        +"<div class='col-md-2'>"
        +"<i class='fa fa-home' style='font-size: 1.2em; margin-top: 90%'></i>"
        +"</div>"
        +"<div class='col-md-10'>"
        +"<p style='font-size: 1em'>"+mAddress+"</p>"
        +"</div>"
        +"<div class='col-md-2'>"
        +"<i class='fa fa-map-marker' style='font-size: 1.2em; margin-top: 85%'></i>"
        +"</div>"
        +"<div class='col-md-10'>"
        +"<p>"+agcLat+","+agcLong+"</p>"
        +"</div>"
        +"<div class='col-md-2'>"
        +"<i class='fa fa-phone' style='font-size: 1.2em; margin-top: 90%'></i>"
        +"</div>"
        +"<div class='col-md-10'>"
        +"<p style='font-size: 1em'>"+mPhone+"</p>"
        +"</div>"
        +"<div class='col-md-2'>"
        +"<i class='fa fa-fax' style='font-size: 1.2em; margin-top: 90%'></i>"
        +"</div>"
        +"<div class='col-md-10'>"
        +"<p style='font-size: 1em'>"+mFax+"</p>"
        +"</div>"
        +"<div class='col-md-2'>"
        +"<i class='fa fa-envelope' style='font-size: 1.2em; margin-top: 90%'></i>"
        +"</div>"
        +"<div class='col-md-10'>"
        +"<p style='font-size: 1em'>"+mEmail+"</p>"
        +"</div>"
        +"</div>")
        // .setLatLng([agcLat,agcLong])
        .addTo(this.mymap);
    
        //this.marker.on('click',this.onMapClick)
      }
}

