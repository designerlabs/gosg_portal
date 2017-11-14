import { Component, Inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { ArticleComponent } from './article/article.component';
import { SubarticleComponent } from './article/subarticle/subarticle.component';
import { NavRouterActivator } from './header/nav/nav-router-activator.service';

// import {
//     EventsListComponent,
//     EventDetailsComponent,
//     CreateEventComponent,
//     EventListResolver,
//     EventRouterActivator
// } from './events/index'

import { ErrorComponent } from './error/error.component';
import { ContactComponent } from './staticpage/contact.component';
import { FaqComponent } from './staticpage/faq.component';
// import { ArticleComponent } from './article/article.component'
// import { SubarticleComponent } from './article/subarticle.component'
import { AboutusComponent } from './staticpage/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ManualComponent } from './staticpage/manual.component';
// import { SearchResultComponent } from './search/searchResult/searchResult.component'
import { DataprotectionComponent} from './staticpage/dataprotection.component';
import { LoginComponent } from "./login/login.component";
// import { NavRouterActivator } from './header/nav/nav-router-activator.service'
import{ ConfirmComponent } from './message/confirm.component';


export const appRoutes: Routes = [
    {path: '404', component: ErrorComponent },
    {path: 'portal', component: HomeComponent},
    {path: 'portal/search/searchResult', component: SearchResultComponent},
    {path: 'portal/topic/:id', component: ArticleComponent, canActivate: [NavRouterActivator]  },
    {path: 'portal/subtopic/:id1/:id2', component: SubarticleComponent },
    {path: 'portal/login', component: LoginComponent},
    {path: 'portal/register', component: RegisterComponent },
    
    {path: 'portal/faq', component: FaqComponent},
    {path: 'portal/aboutus', component: AboutusComponent},
    {path: 'portal/manual', component: ManualComponent},
    {path: 'portal/dataprotection', component: DataprotectionComponent},
    {path: 'portal/contact', component: ContactComponent},
    {path: 'portal/feedback', component: FeedbackComponent},
    {path: '', component: ConfirmComponent},
    {path: '', redirectTo: 'portal', pathMatch: 'full'},
    {path: '**', component: ErrorComponent}

    // {path: this.tempurl+'/fe', component: EventsListComponent, resolve:{events: EventListResolver}},
    // {path: this.tempurl+'/fe/:id', component: EventDetailsComponent, canActivate:[EventRouterActivator] },
    // {path: this.tempurl+'/fe/topic/:id', component: ArticleComponent, canActivate:[NavRouterActivator]  },
    // {path: this.tempurl+'/fe/subtopic/:id1/:id2', component: SubarticleComponent },
   
    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}
    
];
