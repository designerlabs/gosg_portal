import { Component, TemplateRef, ViewChild, Input } from '@angular/core';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {


    
    public message: string;
    @ViewChild('staticModal') public staticModal:ModalDirective;
    @Input() title?:string;
    @Input() content?:string;
    @Input() link?:string;
    @Input() state?:string;
    @Input() isRegister?:string;
    modalRef: BsModalRef;
    
    constructor(private modalService: BsModalService, private router:Router) {

    }

    show(){
      this.staticModal.show();
    }
    hide(){
      this.staticModal.hide();
    }

    confirm(data){
      this.router.navigate([data]);
    };

  
}