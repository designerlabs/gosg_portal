import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng4FilesModule } from './ng4-files';
import { TruncateProdPipe } from './pipe/truncateprod.pipe';
import { AppConfigModule } from './config/app.config.module';
// import { AppComponent } from './app.component';
import { protectedRoutes } from './protected-routes';
import { OwlModule } from 'ng2-owl-carousel';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProtectedService } from "./services/protected.service";
import { SharedModule } from './shared/shared.module';
import { ProtectedComponent } from "./protected/protected.component";
import { TextMaskModule, conformToMask } from 'angular2-text-mask';
import { MailboxComponent } from './mailbox/mailbox.component';
import { SidenavDashboardComponent } from './sidenav-dashboard/sidenav-dashboard.component';
import { AppManagementComponent } from './app-management/app-management.component';
import { SidenavprotectedComponent } from './sidenavprotected/sidenavprotected.component';
import { FirsttimeloginComponent } from './firsttimelogin/firsttimelogin.component';
import { FeedbackProtectedComponent } from './feedback/feedback-protected.component';
// import { FeedbackComponent } from './feedback/feedback.component';
import { PollProtectedComponent } from './poll/poll-protected.component';
import { HomeProtectedComponent } from './home/home-protected.component';
import { ProfileUpdatedComponent } from './profile-updated/profile-updated.component';
import { SearchResultProdComponent } from './search/search-result/search-result-prod.component';
import {LifeeventprodComponent } from './lifeevent/lifeeventprod.component';
import { SubarticleprodComponent } from './article/subarticle/subarticleprod.component';
import { ArticleprodComponent } from './article/articleprod.component';
import { PolicereportComponent } from './pdrm/policereport/policereport.component';
import { StatuspositionComponent } from './pdrm/statusposition/statusposition.component';
import { SummontrafficComponent } from './pdrm/summontraffic/summontraffic.component';
import { DigitalservicesprodComponent } from './digitalservices/digitalservicesprod.component';
import { ContentProdComponent } from './article/content/contentprod.component';
import { PerhilitanComponent } from './perhilitan/perhilitan.component';
import { ReplacementmycardComponent } from './replacementmycard/replacementmycard.component';
import { ReplacementmsgComponent } from './replacementmsg/replacementmsg.component';
import { LeftmenuProdComponent } from './article/leftmenu/leftmenuprod.component';
import { ArchivecategoryProdComponent } from './archive/archivecategory/archivecategoryprod.component';
import { ArchivesubcategoryProdComponent } from './archive/archivesubcategory/archivesubcategoryprod.component';
import { ArchivecontentProdComponent } from './archive/archivecontent/archivecontentprod.component';
import { PerhilitanrenewComponent, PopupServiceDialog } from './perhilitanrenew/perhilitanrenew.component';
import { ProtectedLoaderComponent } from './loader/protected-loader.component';
import { FamilyinfoComponent, FamilyPopupDialog } from './familyinfo/familyinfo.component';
import { FamilyinfotblComponent } from './familyinfo/familyinfotbl/familyinfotbl.component';
import { CheckexamresultComponent, ExamPopupDialog,ExamResult } from './checkexamresult/checkexamresult.component';
import { HighlightboxProdComponent } from './highlightbox/highlightboxprod.component';

export function HttpLoaderFactory(http: Http) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppManagementComponent,
    ProfileComponent,
    ProtectedComponent,
    DashboardComponent,
    MailboxComponent,
    SidenavDashboardComponent,
    SidenavprotectedComponent,
    FirsttimeloginComponent,
    FeedbackProtectedComponent,
    PollProtectedComponent,
    HomeProtectedComponent,
    ProfileUpdatedComponent,
    LifeeventprodComponent,
    SearchResultProdComponent,
    SubarticleprodComponent,
    ArticleprodComponent,
    PolicereportComponent,
    StatuspositionComponent,
    DigitalservicesprodComponent,
    SummontrafficComponent,
    ContentProdComponent,
    PerhilitanComponent,
    ReplacementmycardComponent,
    ReplacementmsgComponent,
    LeftmenuProdComponent,
    ArchivecategoryProdComponent,
    ArchivesubcategoryProdComponent,
    ArchivecontentProdComponent,
    PerhilitanrenewComponent,
    PopupServiceDialog,
    ProtectedLoaderComponent,
    FamilyinfoComponent,
    FamilyPopupDialog,
    FamilyinfotblComponent,
    CheckexamresultComponent,
    ExamPopupDialog,
    HighlightboxProdComponent,
    ExamResult,
    TruncateProdPipe
  ],
  imports: [
    SharedModule,
    BrowserModule,
    TextMaskModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [Http]
      }
    }),
    AppConfigModule,
    ReactiveFormsModule,
    RouterModule.forRoot(protectedRoutes),
    NguiAutoCompleteModule,
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    OwlModule,
    Ng4FilesModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [ ProtectedService, ContentProdComponent],
  entryComponents: [PopupServiceDialog, FamilyPopupDialog, ExamPopupDialog, ExamResult],
  bootstrap: [ProtectedComponent]
})

export class ProtectedModule { }
