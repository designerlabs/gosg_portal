import { Component } from '@angular/core';
declare var jQuery: any;
@Component({
    selector: 'sidenav',
    templateUrl:  'sidenav.component.html',
    styles: [`
        h4 {
            padding-left:55px;
        }

        a{
            line-height:35px;
        }

        .headerLink{
            line-height:0px;
        }

        .topactive{
            text-decoration:underline;
            font-weight:bold;
        }

    `]
})

export class SidenavComponent{
    /*activateLink(event){
        var link = event.srcElement;
        
            jQuery(link).wrap( "<span style='color: rgb(0, 189, 187)'></span>");
            jQuery(link).child().css({"color":"#00bdbb","text-decoration": "none","font-weight":"600"});
    }*/
}
