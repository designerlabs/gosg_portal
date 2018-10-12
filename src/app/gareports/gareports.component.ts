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

  getGAReport(frmDt, endDt, opt, token){

    return this.http.get(`https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A173733410&start-date=${frmDt}&end-date=${endDt}&metrics=ga%3Ausers&dimensions=${opt}&access_token=${token}`)
      .subscribe(
        data => {
          debugger;
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
        this.getGAReport('2018-09-09', '2018-10-10', 'ga%3Acountry', data['access_token']);
      }, error => {
        console.log(error);
      }
    )
  }



}
