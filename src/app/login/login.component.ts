import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { PortalService } from "../services/portal.service";
@Component({
  selector: 'gosg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: any;

  loginName:string;
  constructor(private http:Http, private portalService:PortalService) { }

  ngOnInit() {
   
  }
  loginSubmit(){
    this.portalService.login(this.loginName).subscribe(
      data => {
        console.log(data);
        if(data.length != 0){
        
          localStorage.setItem('userId', data[0].id);
          alert('success'+ data[0].id);
      
          location.href = "http://localhost:8021?id="+data[0].id;
          // location.href = "http://localhost:8021?id="+data[0].id;
        }else{
          alert('username is not defined');
        }
          
      },
      error => {
        alert('error');
          //this.alertService.error(error);
          //this.loading = false;
      });

  }
}
