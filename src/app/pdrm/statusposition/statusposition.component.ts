import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { TopnavService } from '../../header/topnav/topnav.service';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { APP_CONFIG, AppConfig } from '../../config/app.config.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatPaginator, MatSort
  } from '@angular/material';
import { SharedService } from '../../common/shared.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { environment } from '../../../environments/environment';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'gosg-statusposition',
  templateUrl: './statusposition.component.html',
  styleUrls: ['./statusposition.component.css']
})
export class StatuspositionComponent implements OnInit, OnDestroy {

  lang = this.lang;
  langID: any;
  complete: boolean;
  dataIntake;
  urlDoc;

  public kp: any;
  public name: any;
  public date: any;
  public place: any;
  public status: any;
  public showDetails = false;
  public showNoData = false;
  dsvcCode:any;
  agcCode:any;
  responsePosition: any;
  enquiry: any;

  searchForm: FormGroup;  
  public ic: FormControl;  

  dataAnnouncement: any;

  private subscriptionLang: ISubscription;
  private subscription: ISubscription;

  private urlFaq: string = this.config.urlFaq;
  loading: boolean = false;

  constructor(
    private protectedService: ProtectedService,
    private translate: TranslateService,
    private router: Router,
    private http: Http,
    @Inject(APP_CONFIG) private config: AppConfig,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private topnavservice: TopnavService,) {

    this.lang = translate.currentLang;
    this.subscriptionLang = translate.onLangChange.subscribe((event: LangChangeEvent) => {

        const myLang = translate.currentLang;

        if (myLang == 'en') {

          this.responsePosition = 'YOU HAVE NO INTAKE FOR PDRM POSITION.';
          this.enquiry = 'ANY ENQUIRIES PLEASE CALL INTAKE UNIT, BUKIT AMAN AT ON LINE 03-2266 8350 / 8351 / 8349';

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'en';
                this.langID = 1;
            });
        }

        if (myLang == 'ms') {
          
          this.responsePosition = 'ANDA TIADA PENGAMBILAN JAWATAN PDRM.';
          this.enquiry = 'SEBARANG PERTANYAAN SILA HUBUNGI UNIT PENGAMBILAN, BUKIT AMAN DI TALIAN 03-2266 8350 / 8351 / 8349';

            translate.get('HOME').subscribe((res: any) => {
                this.lang = 'ms';
                this.langID = 2;
            });
        }

        if(this.topnavservice.flagLang){
          //this.subscription = this.getFaq(this.langID);
        }

        this.getAnnoucement();

    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
   // this.subscription.unsubscribe();
  }

  ngOnInit() {

    // AGENCY & DSERVICE CODE FOR VALIDATION
    let sub = this.route.queryParams.subscribe((params: Params) => {
      this.dsvcCode = parseInt(params.service);
      this.agcCode = parseInt(params.agency);
    });

    this.triggerDserviceValidation(this.dsvcCode);

    if(!this.langID){
      this.langID = localStorage.getItem('langID');
    }else{
      this.langID = 1;
    }

    this.ic = new FormControl();

    this.searchForm = new FormGroup({   

      ic: this.ic   
    });

    this.getUserData();
    this.getAnnoucement();

  }

  getUserData(){
    
    this.loading = true;
    
    this.searchForm.get('ic').disable();

    if(!environment.staging){
      //this.getPerPostCodeFlag = false;
      this.protectedService.getUser().subscribe(
      data => {
        this.sharedService.errorHandling(data, (function(){

          console.log(data);
          if(data.user){
            
            this.searchForm.get('ic').setValue(data.user.identificationNo);

          }else{
          }
        }).bind(this));
        this.loading = false;
        
      },
      error => {
        location.href = this.config.urlUAP +'uapsso/Logout';
        this.loading = false;
          //location.href = this.config.urlUAP+'portal/index';
      });
      
    } else{ //need to be deleted Noraini for local only      

      this.loading = false;
      let data = {

        "user": {
          "userId": 1411,
          "pid": "871222145031",
          "identificationNo": "871222145031",
          "passportNo": "",
          "fullName": "Encik Saman Trafik2",
          "email": "saman2@yopmail.com"         
        }
        
      }

    
      this.searchForm.get('ic').setValue(data.user.identificationNo);

    }
  }

  searchApp(formValues: any){

    this.showDetails = true;
    this.showNoData = false;

    let icno = this.searchForm.get('ic').value;
    let arrObj = [];

    arrObj.push(this.langID);
    arrObj.push(this.agcCode);
    arrObj.push(this.dsvcCode);

    if(!environment.staging) {

    this.protectedService.getPdrm('pdrm/checkPoliceIntake', arrObj).subscribe(
    data => {
      this.sharedService.errorHandling(data, (function(){

        this.dataIntake = data.policeIntakeResource;
   
        if(this.dataIntake){
          this.showDetails = true;
          this.showNoData = false;

          this.kp = this.dataIntake.newIcNo;
          this.name = this.dataIntake.personnelName;
          this.date =  this.dataIntake.startDate;
          this.place = this.dataIntake.location;
          this.urlDoc = this.dataIntake.docUrl;
          
          if(this.dataIntake.status == 1)
          this.status = "PAPAR/CETAK";
          else
          this.status = "-";
          
        } else{
          this.showDetails = false;
          this.showNoData = true;
        }

        if(this.kp == null)
        this.showNoData = true;

      }).bind(this));
      
    },
    error => {
      this.toastr.error(JSON.parse(error._body).statusDesc, '');
    });
    
  } else {
    this.showDetails = true;
    this.showNoData = false;
    
    this.kp = "930319095074";
    this.name = "FARZANA NUR YUSRA BINTI SAKRI";
    this.date =  "2018-04-12";
    this.place = "PULAPOL DUNGUN";
    this.status = "PAPAR/CETAK";
    this.urlDoc = "http://sso.rmp.gov.my/AP_E/AP_LETTER_EXTENSION.aspx?id=Y1P0FzQmQC6C9/7nGjjnsK6RIY59dq2UUIUrQXJYzIiTm+45KsQfIQ==";
    // https://sso.rmp.gov.my/AP_E/AP_LETTER_PHYSICAL_KONS.aspx?id=2AcmoFAGendMyHdqvsnPX8CStAuyTbSur6UG2S1Jf4NkY8FBGo0X4w==
    }
  }

  getAnnoucement(){

      if(!environment.staging){
        this.loading = true;
        this.protectedService.postProtected('','pdrm/getAnnoucement?type=3'+'&agency='+this.agcCode+'&service='+this.dsvcCode+'&language='+this.langID).subscribe(
        data => {
          this.sharedService.errorHandling(data, (function(){

            this.dataAnnouncement = data.announcementResource.content;
            console.log(this.dataAnnouncement);
        
          }).bind(this));
          this.loading = false;
          
        },
        error => {
          this.toastr.error(JSON.parse(error._body).statusDesc, '');
          this.loading = false;
        }); 
    } else {
      this.dataAnnouncement = '<P STYLE="TEXT-ALIGN: JUSTIFY;"><SPAN STYLE="TEXT-DECORATION: UNDERLINE;">PENGUMUMAN</SPAN></P> <TABLE WIDTH="100%"WIDTH="100%" STYLE="BORDER: CURRENTCOLOR; BORDER-IMAGE: NONE;" BORDER="0" CELLSPACING="0" CELLPADDING="0"> <TBODY> <TR> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 16.4PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P><SPAN STYLE="FONT-FAMILY: CALIBRI; FONT-SIZE: 16PX;">1</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 451.1PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P STYLE="TEXT-ALIGN: JUSTIFY;"><SPAN STYLE="FONT-FAMILY: "TIMES NEW ROMAN",SERIF; FONT-SIZE: 12PT;">PANGGILAN EKSESAIS PEMERIKSAAN UJIAN FIZIKAL UNIT PENGAMBILAN POLIS DIRAJA MALAYSIA BAGI JAWATAN INSPEKTOR POLIS (YA13), KONSTABEL POLIS (YA1) DAN KONSTABEL POLIS (YT1) YANG TELAH BERDAFTAR DENGAN SURAHANJAYA PERKHIDMATAN AWAM (SPA) MELALUI SISTEM PENDAFTARAN PEKERJAAN DALAM PERKHIDMATAN AWAM (SPA8I).</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> </TR> <TR> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 16.4PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P><SPAN STYLE="FONT-FAMILY: CALIBRI; FONT-SIZE: 16PX;">2</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 451.1PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P STYLE="TEXT-ALIGN: JUSTIFY;"><SPAN STYLE="FONT-FAMILY: "TIMES NEW ROMAN",SERIF; FONT-SIZE: 12PT;">CALON – CALON YANG <SPAN STYLE="TEXT-DECORATION: UNDERLINE;">TIDAK DISENARAIKAN </SPAN>DI DALAM SISTEM ADALAH DIANGGAP <SPAN STYLE="TEXT-DECORATION: UNDERLINE;">TIDAK BERJAYA </SPAN>DAN DIKEHENDAKI MENGISI KEMBALI KE SISTEM PENDAFTARAN PEKERJAAN DALAM PERKHIDMATAN AWAM (SPA8I) BAGI SESI EKSESAIS YANG AKAN DATANG.</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> </TR> <TR> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 16.4PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P><SPAN STYLE="FONT-FAMILY: CALIBRI; FONT-SIZE: 16PX;">3</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 451.1PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P STYLE="TEXT-ALIGN: JUSTIFY;"><SPAN STYLE="FONT-FAMILY: "TIMES NEW ROMAN",SERIF; FONT-SIZE: 12PT;">CALON- CALON YANG BERJAYA <STRONG>DIWAJIBKAN </STRONG>MENCETAK SURAT TAWARAN EKSESAIS PEMERIKSAAN FIZIKAL DAN BORANG GANTI RUGI DAN DIBAWA PADA HARI PEMERIKSAAN UJIAN FIZIKAL DILAKSANAKAN.</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> </TR> <TR> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 16.4PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P><SPAN STYLE="FONT-FAMILY: CALIBRI; FONT-SIZE: 16PX;">4</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 451.1PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P STYLE="TEXT-ALIGN: JUSTIFY;"><SPAN STYLE="FONT-FAMILY: "TIMES NEW ROMAN",SERIF; FONT-SIZE: 12PT;">KEGAGALAN ANDA UNTUK MENCETAK SURAT TAWARAN DAN MEMENUHI SYARAT-SYARAT YANG DINYATAKAN DALAM SURAT TAWARAN TERSEBUT AKAN DIHALANG MENJALANI UJIAN PEMERIKSAAN FIZIKAL.</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> </TR> <TR> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 16.4PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P><SPAN STYLE="FONT-FAMILY: CALIBRI; FONT-SIZE: 16PX;">5</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> <TD VALIGN="TOP" STYLE="PADDING: 0CM 5.4PT; BORDER: #000000; BORDER-IMAGE: NONE; WIDTH: 451.1PT; TEXT-ALIGN: LEFT; BACKGROUND-COLOR: TRANSPARENT;"><SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN> <P STYLE="TEXT-ALIGN: JUSTIFY;"><SPAN STYLE="FONT-FAMILY: "TIMES NEW ROMAN",SERIF; FONT-SIZE: 12PT;">SEGALA KEPUTUSAN ADALAH MUKTAMAD DAN RAYUAN TIDAK AKAN DITERIMA.</SPAN></P> <SPAN STYLE="FONT-FAMILY: TIMES NEW ROMAN; FONT-SIZE: 16PX;"> </SPAN></TD> </TR> </TBODY> </TABLE>';
    }
  }

  openLink(varUrl){
    
    if(varUrl != undefined){
      let httpStr = varUrl.substring(0, 4);

      if(httpStr.toLowerCase() == 'https'){
        window.open(varUrl,'_blank');
      } else {
        let newUrl = "http://";
        window.open(newUrl + varUrl.substr(7),'_blank'); 
      }

    }
  }

  isNumber(evt) {

    this.checkReqValues();
    
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  checkReqValues() {

    let reqVal:any = ["ic"];
    let nullPointers:any = [];

    for (var reqData of reqVal) {
      let elem = this.searchForm.get(reqData);

      if (elem.value == "" || elem.value == null) {
        elem.setValue(null)
        nullPointers.push(null)
      }
    }
      
    if(nullPointers.length > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }

  }

  resetSearch(){
    //this.appNumber.reset();
    this.searchForm.get('ic').setValue(null);
    this.showDetails = false;
  }

  resetMethod(event) {
    this.resetSearch();
  }

  triggerDserviceValidation(dsvcCode) {
    let sub;
    this.loading = true;

    return this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.protectedService.validateDserviceByRefCode(dsvcCode))
      .subscribe(resValidation => {
        
        if(!resValidation.valid) {
          this.toastr.error('Invalid Service!', '');
          this.router.navigate(['404']);
          
          // sub = Observable.interval(2000)
          // .subscribe((val) => {
          //   window.close();
          //   sub.unsubscribe();
          // });
        } else {
          localStorage.setItem('dserviceCode', dsvcCode);
          this.loading = false;
        }
        this.loading = false;
      },
      error => {
        this.toastr.error(JSON.parse(error._body).statusDesc, '');
        this.loading = false;
  
      });
  }

}
