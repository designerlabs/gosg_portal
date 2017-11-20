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



export function HttpLoaderFactory(http: Http) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    // AppComponent,
    ProfileComponent,
    ProtectedComponent,
    DashboardComponent,
    MailboxComponent,
    SidenavDashboardComponent
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
    OwlModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ ProtectedService],
  bootstrap: [ProtectedComponent]
})

export class ProtectedModule { }
