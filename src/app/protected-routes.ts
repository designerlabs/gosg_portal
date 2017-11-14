import { Component, Inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { ArticleComponent } from './article/article.component';
import { SubarticleComponent } from './article/subarticle/subarticle.component';
import { NavRouterActivator } from './header/nav/nav-router-activator.service';
import { ErrorComponent } from './error/error.component';
import { ContactComponent } from './staticpage/contact.component';
import { FaqComponent } from './staticpage/faq.component';
import { AboutusComponent } from './staticpage/aboutus.component';
import { ManualComponent } from './staticpage/manual.component';
import { DataprotectionComponent} from './staticpage/dataprotection.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MailboxComponent } from "./mailbox/mailbox.component";

// import { NavRouterActivator } from './header/nav/nav-router-activator.service'

// import { appRoutes } from './routes';

export const protectedRoutes: Routes = [

    {path: '404', component: ErrorComponent },
    {path: 'portal-protected/dashboard', component: DashboardComponent},
    {path: 'portal-protected/profile', component: ProfileComponent},
    {path: 'portal', component: HomeComponent},
    {path: 'portal/search/searchResult', component: SearchResultComponent},
    {path: 'portal/topic/:id', component: ArticleComponent, canActivate: [NavRouterActivator]  },
    {path: 'portal/subtopic/:id1/:id2', component: SubarticleComponent },

    {path: 'portal/faq', component: FaqComponent},
    {path: 'portal/aboutus', component: AboutusComponent},
    {path: 'portal/manual', component: ManualComponent},
    {path: 'portal/dataprotection', component: DataprotectionComponent},
    {path: 'portal/contact', component: ContactComponent},
    {path: 'portal-protected/mailbox', component: MailboxComponent},
    {path: 'portal/feedback', component: FeedbackComponent},
    {path: '', redirectTo: 'portal-protected/dashboard', pathMatch: 'full'},
    {path: '**', component: ErrorComponent}
    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}
];
