import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";


@Component({
  selector: 'gosg-gareports',
  templateUrl: './gareports.component.html',
  styleUrls: ['./gareports.component.css']
})
export class GareportsComponent implements OnInit {
  result: any;

  constructor(private http:  HttpClient) { }


  headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});

  ngOnInit() {


    this.getGA();
  }

  getGACode(){
    return this.http.get('https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://gosgstag.malaysia.gov.my/portal/index&prompt=consent&response_type=code&client_id=416088092941-sfsmok024hga24lu058dp2qqq9a1bl70.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics&access_type=offline')
      .subscribe(
        data => {
          console.log(data);
        }, error => {
          console.log(error);
        }
      )
  }

  getGA(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    return this.http.post('https://www.googleapis.com/oauth2/v4/token?client_id=416088092941-sfsmok024hga24lu058dp2qqq9a1bl70.apps.googleusercontent.com&client_secret=5MMkSNzeprFRLvVXj7dQ_e-R&grant_type=refresh_token&refresh_token=1/tEnJY667GemBRAJ-MPXmI1CNnTgs-2wfs8oSrlFpXi8','', httpOptions)
    .subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }



}
