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
  getUserData: any;
  userId:string;
  rndNo:string;

  constructor(
    private protectedservice: ProtectedService,
    private activatedRoute: ActivatedRoute
  ) { }
 @Input() loginfirst:boolean;

  ngOnInit() {
  }


  getConfirmation(){


    //this.rndNo = this.activatedRoute.snapshot.queryParams["rnd"];
    this.rndNo = location.search.split('rnd=')[1]
    this.protectedservice.completeTran(this.rndNo)
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
