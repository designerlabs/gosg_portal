import { Component, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms/forms";

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
    @Input() content2?:string;
    @Input() link?:string;
    @Input() state?:string;
    @Input() email?:string;
    @Input() isRegister?:string;
    @Input() isReset?:string;
    @Input() mailId?:string;
    @Output()
    resetMethod:EventEmitter<string> = new EventEmitter();
    
    modalRef: BsModalRef;
    
    constructor(private modalService: BsModalService, private router:Router) {

    }

    show(data?){
      console.log(data)
      this.mailId = data;
      this.staticModal.show();
    }

    hide(){
      this.staticModal.hide();
    }

    confirm(data){
      this.router.navigate([data]);
    };

    onSubmit() {
      this.resetMethod.emit('complete');
      this.staticModal.hide();
    }

    // resetForm(data){
    //   this.router.navigate([data]);
    // }

  
}