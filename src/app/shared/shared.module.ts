import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { OwlModule } from "ng2-owl-carousel";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from "@ngui/auto-complete/dist";

import { TopnavService } from '../header/topnav/topnav.service';
import { ContactComponent } from "../staticpage/contact.component";
import { SliderComponent } from '../slider/slider.component';
import { SliderService } from '../slider/slider.service';
import { SearchComponent } from '../search/search.component';
import { SearchIntComponent } from '../search/searchInt.component';

import { LifeeventComponent } from "../lifeevent/lifeevent.component";
import { AboutusComponent } from "../staticpage/aboutus.component";
import { AnnouncementboxComponent } from "../announcementbox/announcementbox.component";
import { AnnouncementComponent } from "../announcement/announcement.component";
import { FaqComponent } from "../staticpage/faq.component";
import { ManualComponent } from "../staticpage/manual.component";
import { SidenavComponent } from "../staticpage/sidenav.component";
import { DataprotectionComponent } from '../staticpage/dataprotection.component';
import { NavComponent } from "../header/nav/nav.component";
import { TopnavComponent } from "../header/topnav/topnav.component";

import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { SharedService }from '../common/shared.service';
import { ValidateService }from '../common/validate.service';
import { SearchResultComponent } from '../search/search-result/search-result.component';
import { SearchService } from '../search/search.service';

import { TopicFeatureComponent } from '../topic-feature/topic-feature.component';
import { FooterComponent } from '../footer/footer.component';
import { HighlightboxComponent } from '../highlightbox/highlightbox.component';
import { ArticleComponent } from '../article/article.component';
import { ErrorComponent } from "../error/error.component";
import { SubarticleComponent } from "../article/subarticle/subarticle.component";
import { PollComponent } from "../poll/poll.component";
import { BreadcrumbComponent } from "../header/breadcrumb/breadcrumb.component";

import { DialogsService } from '../dialogs/dialogs.service';
import { PortalService } from '../services/portal.service';
import { AuthService } from "../auth/auth.service";
import { ArticleService } from "../article/article.service";
import { NavRouterActivator } from "../header/nav/nav-router-activator.service";
import { NavService } from "../header/nav/nav.service";
import { HomeComponent } from "../home/home.component";
import { TransService } from '../services/trans.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ConfirmComponent } from '../message/confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

import { SidenavmainComponent } from "../sidenavmain/sidenavmain.component";
import {
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatSelectModule,
      MatDialogModule,
      MatAutocompleteModule,
      MatButtonToggleModule,
      MatCardModule,
      MatChipsModule,
      MatDatepickerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatSliderModule,
      MatSnackBarModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatNativeDateModule,
      MatSortModule,
      MatPaginatorModule,
    }from '@angular/material';

import { A11yModule } from "@angular/cdk/a11y";
import { BidiModule } from "@angular/cdk/bidi";
import { OverlayModule } from "@angular/cdk/overlay";
import { PlatformModule } from "@angular/cdk/platform";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
// import { DialogsModule } from '../dialogs/dialogs.module';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SharedPipe } from '../common/shared.pipe';
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    OwlModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatMenuModule,
    MatInputModule, 
    MatSelectModule,
    MatExpansionModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    NguiAutoCompleteModule,
    MatDialogModule,
    // DialogsModule,
    ModalModule.forRoot()
    
  ],

  declarations: [
    ContactComponent,
    SearchComponent,
    SearchIntComponent,
    LifeeventComponent,
    SliderComponent,
    TopnavComponent,
    AboutusComponent,
    AnnouncementboxComponent,
    AnnouncementComponent,
    FaqComponent,
    NavComponent,
    ManualComponent,
    SidenavComponent,
    DataprotectionComponent,
    SearchResultComponent,
    TopicFeatureComponent,
    FooterComponent,
    HighlightboxComponent,
    ArticleComponent,
    ErrorComponent,
    PollComponent,
    SubarticleComponent,
    BreadcrumbComponent,
    HomeComponent,
    FeedbackComponent,
    ConfirmComponent,
    SharedPipe,
    ConfirmDialogComponent,
    SidenavmainComponent
  ],

  exports: [
    ContactComponent,
    SearchComponent,
    SearchIntComponent,
    LifeeventComponent,
    SliderComponent,
    TopnavComponent,
    AboutusComponent,
    AnnouncementComponent,
    AnnouncementboxComponent,
    FaqComponent,
    NavComponent,
    ManualComponent,
    SidenavComponent,
    DataprotectionComponent,
    SearchResultComponent,
    TopicFeatureComponent,
    FooterComponent,
    HighlightboxComponent,
    ArticleComponent,
    ErrorComponent,
    PollComponent,
    SubarticleComponent,
    BreadcrumbComponent,
    HomeComponent,
    FeedbackComponent,
    ConfirmComponent,
    BrowserAnimationsModule,
    ConfirmDialogComponent,
    MatButtonModule,
    MatInputModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    // DialogsModule,

     // CDK
     A11yModule,
     BidiModule,
     OverlayModule,
     PlatformModule,
     PortalModule,
     ScrollDispatchModule,
     CdkStepperModule,
     CdkTableModule,
     
     // Material
     MatAutocompleteModule,

     MatButtonToggleModule,
     MatCardModule,

     MatChipsModule,
     MatDatepickerModule,
     MatExpansionModule,
     MatGridListModule,
     MatIconModule,

     MatListModule,
     MatMenuModule,
     MatProgressBarModule,
     MatProgressSpinnerModule,
     MatRadioModule,
     MatRippleModule,

     MatSidenavModule,
     MatSlideToggleModule,
     MatSliderModule,
     MatSnackBarModule,
     MatStepperModule,
     MatTableModule,
     MatTabsModule,
     MatToolbarModule,
     MatTooltipModule,
     MatNativeDateModule,
     MatSortModule,
     MatPaginatorModule,
     SharedPipe
    
  ],

  providers: [SliderService, BsModalService, TopnavService, SharedService, ValidateService, BreadcrumbService, PortalService, AuthService, ArticleService, NavRouterActivator, NavService, TransService, DialogsService, SearchService]
})
export class SharedModule { }
