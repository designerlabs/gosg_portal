import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gosg-sidenavprotected',
  templateUrl: './sidenavprotected.component.html'
})
export class SidenavprotectedComponent implements OnInit {

  @Output()
  openSlide:EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openNav() {
    document.getElementById("mySidenavProtected").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenavProtected").style.width = "0";
  }


}
