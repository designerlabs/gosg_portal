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
import { SearchResultComponent } from './search/search-result/search-result.component';
import { SubarticleComponent } from './article/subarticle/subarticle.component';
import { ArticleComponent } from './article/article.component';
import { LifeeventComponent } from './lifeevent/lifeevent.component';
import { HomeComponent } from './home/home.component';
import { DigitalservicesComponent, DigitalServiceDialog } from './digitalservices/digitalservices.component';
import { ContentComponent } from './article/content/content.component';
import { LeftmenuComponent } from './article/leftmenu/leftmenu.component';
import { ArchivecategoryComponent } from './archive/archivecategory/archivecategory.component';
import { ArchivesubcategoryComponent } from './archive/archivesubcategory/archivesubcategory.component';
import { ArchivecontentComponent } from './archive/archivecontent/archivecontent.component';
import { LoadingModule } from 'ngx-loading';
// import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from "@angular/material";

export function HttpLoaderFactory(http: Http) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
imports: [
    LoadingModule,
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
    OwlModule

    // MatButtonModule,
    // MatCheckboxModule,
    // MatFormFieldModule,
    // MatInputModule,


  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SearchResultComponent,
    SubarticleComponent,
    ArticleComponent,
    LifeeventComponent,
    DigitalservicesComponent,
    HomeComponent,
    DigitalServiceDialog,
    ContentComponent,
    LeftmenuComponent,
    ArchivecategoryComponent,
    ArchivesubcategoryComponent,
    ArchivecontentComponent

  ],

  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ConfirmComponent,FeedbackComponent, ContentComponent],
  entryComponents: [DigitalServiceDialog],
  bootstrap: [AppComponent]
})

export class AppModule { }
