import { Injectable, Inject } from "@angular/core";
import { Router } from '@angular/router'
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { environment } from "../../environments/environment.prod";

const MINUTES_UNITL_AUTO_LOGOUT = 60 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';
@Injectable()
export class AutologoutService {
 public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router,  @Inject(APP_CONFIG) private config: AppConfig) {
    
  }

  starts() {
    console.log('Timer Starts..');
    console.log('Auto logout when idle is set to '+ MINUTES_UNITL_AUTO_LOGOUT + ' minutes'); 
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout)  {
      localStorage.clear();
      if (environment.staging) {
        //this.router.navigateByUrl(port APP_BASE_HREF);
        window.location.href ='/uapsso/Logout';
        console.log(window.location.origin);
      } else if (environment.production) {
        window.location.href = this.config.urlUAP +'uapsso/Logout?return='+this.config.urlUAP+'portal/index';
      }
    }
  }
}