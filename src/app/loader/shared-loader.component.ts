import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gosg-shared-loader',
  templateUrl: './portal-loader.component.html',
  styleUrls: ['./portal-loader.component.css']
})
export class SharedLoaderComponent implements OnInit {

  constructor() { }
  @Input() loader:boolean;
  ngOnInit() {
  }

}
