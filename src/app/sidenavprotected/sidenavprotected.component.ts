import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gosg-sidenavprotected',
  templateUrl: './sidenavprotected.component.html',
  styleUrls: ['./sidenavprotected.component.css']
})
export class SidenavprotectedComponent implements OnInit {

  @Output()
  openSlide:EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


}
