import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gosg-home-protected',
  templateUrl: './home-protected.component.html',
  styleUrls: ['./home-protected.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeProtectedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
