import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'gosg-firsttimelogin',
  templateUrl: './firsttimelogin.component.html',
  styleUrls: ['./firsttimelogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirsttimeloginComponent implements OnInit {

  constructor() { }
 @Input() loginfirst:boolean;

  ngOnInit() {
    
  }

  getRnd(){
    let url_string = location.href;
    let url = new URL(url_string);
    let rnd = url.searchParams.get("rnd");
    console.log(rnd);
  }

  userIsLogged(){
   return true; 
  }

}
