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


  userIsLogged(){
   return true; 
  }

}
