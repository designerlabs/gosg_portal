import { Component } from '@angular/core';

@Component({
    templateUrl: 'contact.component.html',
    styles: [
        `
        .map-responsive {
            border-top:2px solid #1ebebc;
        }

        p {
          color:black;
          font-size:14px;
        }

        .glyphicon{
            color:white;
        }

        body {
            font-family: Roboto, sans-serif;
        }

        .mapstyle {
            width:100%;
            height:400px;
            frameborder:0;
            border:0;
        }

        `
    ]
})

export class ContactComponent{
       getTheme(){
        return localStorage.getItem('themeColor');
    }
}

