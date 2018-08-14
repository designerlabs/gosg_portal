import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gosg-protected-loader',
  templateUrl: './portal-loader.component.html',
  styleUrls: ['./portal-loader.component.css']
})
export class ProtectedLoaderComponent implements OnInit {

  constructor() { }
  @Input() loader:boolean;
  ngOnInit() {
  }

}
