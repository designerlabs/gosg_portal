import { Component } from '@angular/core';

@Component({
    templateUrl: 'manual.component.html',
    styles: [`
      a {
            color: #337ab7;
            text-decoration: none;
      }
      a:hover, a:focus {
        color: #1ebebc;
        text-decoration: underline;
      }

    `]
})

export class ManualComponent{

}
