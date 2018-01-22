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


export const appRoutes: Routes = [
    {path: '404', component: ErrorComponent },
    {path: 'index', component: HomeComponent},
    {path: 'search/searchResult', component: SearchResultComponent},
    {path: 'topic/:id', component: ArticleComponent, canActivate: [NavRouterActivator]  },
    {path: 'announcement/:id', component: ArticleComponent, canActivate: [NavRouterActivator]  },
    {path: 'subtopic/:id1/:id2', component: SubarticleComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent },
    
    {path: 'faq', component: FaqComponent},
    {path: 'aboutus', component: AboutusComponent},
    {path: 'manual', component: ManualComponent},
    {path: 'dataprotection', component: DataprotectionComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: '**', component: ErrorComponent}

    // {path: this.tempurl+'/fe', component: EventsListComponent, resolve:{events: EventListResolver}},
    // {path: this.tempurl+'/fe/:id', component: EventDetailsComponent, canActivate:[EventRouterActivator] },
    // {path: this.tempurl+'/fe/topic/:id', component: ArticleComponent, canActivate:[NavRouterActivator]  },
    // {path: this.tempurl+'/fe/subtopic/:id1/:id2', component: SubarticleComponent },
   
    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}
    
];
