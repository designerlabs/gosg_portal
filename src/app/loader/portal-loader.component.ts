import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gosg-portal-loader',
  templateUrl: './portal-loader.component.html',
  styleUrls: ['./portal-loader.component.css']
})
export class PortalLoaderComponent implements OnInit {

  constructor() { }
  @Input() loader:boolean;
  ngOnInit() {
  }

}
