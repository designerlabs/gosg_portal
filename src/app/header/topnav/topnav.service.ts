import { Injectable } from '@angular/core';

@Injectable()
export class TopnavService {

  getUserMenu(){
        return USERMENU;
    }

    getColors(){
        return COLORS;
    }

    getFonts(){
        return FONTS;
    }

  constructor() { }

}
const USERMENU = [{
        id: 1,
        name: 'My Profile',
        url: ''
    },
    {
        id: 2,
        name: 'InBox',
        url: ''
    }
];

const COLORS = [
    {
        bgColor: '#00bdbb'
    }, {
        bgColor: '#5e7899'
    },
    {
        bgColor: '#e06000'
    },
    {
        bgColor: '#4f81c5'
    },
     {   bgColor: '#982d57'
    }
    ];

const FONTS = [
        'Roboto',
        'Arial',
        'Times New Roman'
    ];
