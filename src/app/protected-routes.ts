import { Component, Inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// import { HomeComponent } from './home/home.component'
import { HomeProtectedComponent } from './home/home-protected.component';
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
import { FeedbackProtectedComponent } from './feedback/feedback-protected.component';
import { MailboxComponent } from "./mailbox/mailbox.component";
import { AppManagementComponent } from './app-management/app-management.component';
import { FirsttimeloginComponent } from './firsttimelogin/firsttimelogin.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementlistComponent } from './announcementlist/announcementlist.component';
import { AnnouncementdetailsComponent } from './announcementdetails/announcementdetails.component';
// 
// import { NavRouterActivator } from './header/nav/nav-router-activator.service'

// import { appRoutes } from './routes';

export const protectedRoutes: Routes = [

    {path: '404', component: ErrorComponent },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'appsmgmt', component: AppManagementComponent},
    {path: 'index', component: HomeProtectedComponent},
    {path: 'firsttime', component: FirsttimeloginComponent},
    {path: 'search/searchResult', component: SearchResultComponent},
    {path: 'topic/:id', component: ArticleComponent, canActivate: [NavRouterActivator]  },
    {path: 'subtopic/:id1/:id2', component: SubarticleComponent },
    {path: 'announcement', component: AnnouncementComponent },
    {path: 'announcement/:id', component: AnnouncementlistComponent},
    {path: 'announcement/:id/:id', component: AnnouncementdetailsComponent},

    {path: 'faq', component: FaqComponent},
    {path: 'aboutus', component: AboutusComponent},
    {path: 'manual', component: ManualComponent},
    {path: 'dataprotection', component: DataprotectionComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'mailbox', component: MailboxComponent},
    {path: 'feedback', component: FeedbackProtectedComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: '**', component: ErrorComponent}
    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}
];
