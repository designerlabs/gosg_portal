import { Component, OnInit,  TemplateRef, ViewChild, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'gosg-sidenavmain',
  templateUrl: './sidenavmain.component.html'
})
export class SidenavmainComponent implements OnInit {
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
