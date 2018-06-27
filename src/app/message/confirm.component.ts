import { Component, OnInit } from '@angular/core';
import { FeedbackComponent } from '../feedback/feedback.component';
// import { FeedbackProtectedComponent } from '../feedback/feedback-protected.component';

@Component({
  selector: 'gosg-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  private ErrorMsg: string;
  public ErrorMessageIsVisible;

  constructor() { }

  ngOnInit() {
    this.ErrorMessageIsVisible = false;
    // this.show = this.showMsg.ErrorMessageIsVisible;
  }

  showErrorMessage()
  {
    this.ErrorMessageIsVisible = true;
    
      // this.ErrorMsg = msg;
      // this.ErrorMessageIsVisible = true;
  }

  hideErrorMsg()
  {
      this.ErrorMessageIsVisible = false;
      
  }
}
