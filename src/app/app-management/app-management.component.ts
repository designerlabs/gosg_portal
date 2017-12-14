import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Inject, Renderer } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../common/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DialogsService } from '../dialogs/dialogs.service';
import { ProtectedService } from '../services/protected.service';
import { FormControl, FormGroup } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { PortalService } from '../services/portal.service';
import { Http } from '@angular/http';

@Component({
  selector: 'gosg-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css'],
})
export class AppManagementComponent implements OnInit {
  dataApp: any;
  dataAgency: any;
  data: any;
  showHide: boolean = false;
  mailData: any;
  mailContent: any;
  searchForm: FormGroup;
  appNumber: FormControl;
  agency: FormControl;
  appStatus: FormControl;
  startData: FormControl;
  endData: FormControl;
  mailboxId=[];
  mailPageSize = 10;
  mailPageCount = 1;
  noPrevData = true;
  noNextData = false;
  rerender = false;
  isMailContainerShow = 'block';
  languageId = this.languageId;
  collapse:string = "closed";
  date = new FormControl(new Date());
  
  // serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private protectedService: ProtectedService,
    private dialogsService: DialogsService,
    private cdRef:ChangeDetectorRef,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private portalService:PortalService,
    private translate:TranslateService, 
    private http: Http, 
    private _renderer: Renderer,
    @Inject(APP_CONFIG) private config: AppConfig) {
      
    }

  ngOnInit() {
    this.getDataApp();
    this.appNumber = new FormControl(),
    this.agency = new FormControl(),
    this.appStatus = new FormControl(),
    this.startData = new FormControl(),
    this.endData = new FormControl(),
    this.searchForm = new FormGroup({    
      appNumber : this.appNumber,
      agency :  this.agency,
      appStatus : this.appStatus,
      startData : this.startData,
      endData : this.endData
    })

    this.languageId = 2;
    this.getMails(this.mailPageCount, this.mailPageSize);
  }

  getMails(page, size){
    this.protectedService.getMails('930701055000', page, size).
    subscribe(data => {
      this.mailData  = data;
    },
    Error => {

     this.toastr.error(this.translate.instant('mailbox.err.failtoload'), '');            
   });
  }

  pageChange(event){
    // this.getMails(this.mailPageCount, event.value);
    this.mailPageSize = event.value;
  }

  paginatorL(page){
    // this.getMails(page-1, this.mailPageSize);
    this.noPrevData = page <= 2 ? true : false;
    this.noNextData = false;
  }

  paginatorR(page, totalPages){
    this.noPrevData = page >= 1 ? false : true;
    let pageInc = page+1;
    this.noNextData = pageInc === totalPages;
    // this.getMails(page+1, this.mailPageSize);
  }

  toggleCollapse() {
    // this.show = !this.show
      this.collapse = this.collapse == "open" ? 'closed' : 'open';
  }

  changeShowStatus(){
    console.log(this.showHide);
    this.showHide = !this.showHide;
    this.getAgencyApp();
    this.getStatusApp();
  }

  getAgencyApp(){
    this.portalService.getAgencyApp().subscribe(data => {
      this.dataAgency = data.agencyList;
      console.log(this.dataAgency);
    });
  }

  getStatusApp(){
    this.portalService.getStatusApp().subscribe(data => {
      this.data = data.status;
      console.log(this.data);
    });
  }

  getDataApp(){
    this.portalService.getDataApp().subscribe(data => {
      this.dataApp = data.dataTable;
      console.log(this.dataApp);
    });
  }

  resetSearch(){
    this.appNumber.reset();
    this.agency.reset();
    this.appStatus.reset();
    this.endData = null;
    this.startData = null;
    this.searchForm.get('endData').setValue("");
    this.searchForm.get('startData').setValue("");
  }

  resetMethod(event) {
    this.resetSearch();
  }

  searchapp(formValues: any){
    let body = {
      "no_app": null,
      "agensi": null,
      "status": null,
      "startD": null,
      "endD": null
    }

    console.log(formValues);
    body.no_app = formValues.appNumber;
    body.agensi = formValues.agency;
    body.status = formValues.appStatus;
    body.startD = formValues.startData;
    body.endD = formValues.endData;
    
    let datasend = JSON.stringify(body);
  }
}
