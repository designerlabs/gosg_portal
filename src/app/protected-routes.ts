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
import { ClientCharterComponent } from './staticpage/bottommenu/clientcharter.component';
import { HelpComponent } from './staticpage/bottommenu/help.component';
import { PrivacyPolicyComponent } from './staticpage/bottommenu/privacypolicy.component';
import { SecurityPolicyComponent } from './staticpage/bottommenu/securitypolicy.component';
import { CopyrightNoticeComponent } from './staticpage/bottommenu/copyrightnotice.component';
import { DisclaimerComponent } from './staticpage/bottommenu/disclaimer.component';
import { DataprotectionComponent} from './staticpage/dataprotection.component';
import { ProfileUpdatedComponent } from './profile-updated/profile-updated.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackProtectedComponent } from './feedback/feedback-protected.component';
import { MailboxComponent } from "./mailbox/mailbox.component";
import { AppManagementComponent } from './app-management/app-management.component';
import { FirsttimeloginComponent } from './firsttimelogin/firsttimelogin.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementlistComponent } from './announcementlist/announcementlist.component';
import { AnnouncementdetailsComponent } from './announcementdetails/announcementdetails.component';
import { EventCalendarComponent } from './eventcalendar/eventcalendar.component';
import { OnlineserviceComponent } from './onlineservice/onlineservice.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { AgencydirectoryComponent } from './agencydirectory/agencydirectory.component';
import { SetactiveComponent } from './subscription/setactive/setactive.component';
import { DigitalservicesComponent } from './digitalservices/digitalservices.component';
import { RssComponent } from './article/rss/rss.component';
import { ContentComponent } from './article/content/content.component';
import { EparticipationComponent } from './eparticipation/eparticipation.component';
import { StatisticComponent } from './statistic/statistic.component';
import { SitemapComponent } from './sitemap/sitemap.component';
// import { NavRouterActivator } from './header/nav/nav-router-activator.service'

// import { appRoutes } from './routes';

export const protectedRoutes: Routes = [

    {path: '404', component: ErrorComponent },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'agencydir', component: AgencydirectoryComponent},
    {path: 'digitalservices', component: DigitalservicesComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'calendar', component: EventCalendarComponent},
    {path: 'profileupdate', component: ProfileUpdatedComponent},
    {path: 'appsmgmt', component: AppManagementComponent},
    {path: 'index', component: HomeProtectedComponent},
    {path: 'firsttime', component: FirsttimeloginComponent},
    {path: 'search/searchResult', component: SearchResultComponent},
    {path: 'eparticipation', component: EparticipationComponent},
    {path: 'category/:id', component: ArticleComponent, canActivate: [NavRouterActivator]  },
    {path: 'rss/:id', component: RssComponent},
    {path: 'rss/id/:id', component: RssComponent},
    {path: 'subcategory/:id1', component: SubarticleComponent },
    {path: 'content/:id1', component: ContentComponent},
    {path: 'announcement', component: AnnouncementComponent },
    {path: 'announcement/:id', component: AnnouncementlistComponent},
    {path: 'announcement/:id/:id', component: AnnouncementdetailsComponent},
    {path: 'statistic', component: StatisticComponent},
    {path: 'sitemap', component: SitemapComponent},

    {path: 'faq', component: FaqComponent},
    {path: 'aboutus', component: AboutusComponent},
    {path: 'manual', component: ManualComponent},
    {path: 'clientcharter', component: ClientCharterComponent},
    {path: 'help', component: HelpComponent},
    {path: 'privacypolicy', component: PrivacyPolicyComponent},
    {path: 'securitypolicy', component: SecurityPolicyComponent},
    {path: 'copyrightnotice', component: CopyrightNoticeComponent},
    {path: 'disclaimer', component: DisclaimerComponent},
    {path: 'dataprotection', component: DataprotectionComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'mailbox', component: MailboxComponent},
    {path: 'feedback', component: FeedbackProtectedComponent},
    {path: 'onlineservice', component: OnlineserviceComponent},
    {path: 'subscription/set_active/:id', component: SetactiveComponent},
    {path: 'subscription', component: SubscriptionComponent},
    {path: 'unsubscribe', component: UnsubscribeComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: '**', component: ErrorComponent}
    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}
];
