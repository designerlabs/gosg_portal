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
import {HttpClientModule} from '@angular/common/http';
import { AppConfigModule } from './config/app.config.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { OwlModule } from 'ng2-owl-carousel';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { SharedModule } from './shared/shared.module';
import { TextMaskModule, conformToMask } from 'angular2-text-mask';
import { FeedbackComponent } from './feedback/feedback.component';
import { ConfirmComponent } from './message/confirm.component';

// import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from "@angular/material";

export function HttpLoaderFactory(http: Http) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [Http]
      }
    }),
    AppConfigModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NguiAutoCompleteModule,
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    OwlModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatFormFieldModule,
    // MatInputModule,

    
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent
  
  ],
 
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ConfirmComponent,FeedbackComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
