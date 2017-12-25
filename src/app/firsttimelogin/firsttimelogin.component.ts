import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ProtectedService } from "../services/protected.service";
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'gosg-firsttimelogin',
  templateUrl: './firsttimelogin.component.html',
  styleUrls: ['./firsttimelogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirsttimeloginComponent implements OnInit {
  varArray: string[];
  queryString: string;
  getUserData: any;
  userId:string;
  rndNo:any;

  constructor(
    private protectedservice: ProtectedService,
    private activatedRoute: ActivatedRoute
  ) { 

    this.activatedRoute.params.subscribe(params => {
      let randNo = params['rnd'];
      console.log(randNo); // Print the parameter to the console. 
  });
  }
 @Input() loginfirst:boolean;

  ngOnInit() {
  }


  getConfirmation(){


    this.queryString = window.location.search;
    this.varArray = this.queryString.split("?");
    for (let i=0;i<this.varArray.length;i++) {
      this.rndNo = this.varArray[i].split("=");
        //parameter-value pair
    }
    

    //this.rndNo = this.activatedRoute.snapshot.queryParams["rnd"];
    //this.rndNo = location.search.split('rnd=')[1]
    this.protectedservice.completeTran(this.rndNo[1])
        .subscribe(
            userData => {
                this.getUserData = userData.userTypeList;
                debugger;
            },Error => {
              debugger;  
              //this.toastr.error(this.translate.instant('feedback.err.subject'), '');
            }
        );
}

  userIsLogged(){
   return true; 
  }

}
