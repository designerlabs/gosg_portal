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
import { ClientCharterComponent } from './staticpage/bottommenu/clientcharter.component';
import { HelpComponent } from './staticpage/bottommenu/help.component';
import { PrivacyPolicyComponent } from './staticpage/bottommenu/privacypolicy.component';
import { SecurityPolicyComponent } from './staticpage/bottommenu/securitypolicy.component';
import { CopyrightNoticeComponent } from './staticpage/bottommenu/copyrightnotice.component';
import { DisclaimerComponent } from './staticpage/bottommenu/disclaimer.component';
// import { SearchResultComponent } from './search/searchResult/searchResult.component'
import { DataprotectionComponent} from './staticpage/dataprotection.component';
import { LoginComponent } from "./login/login.component";
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementlistComponent } from './announcementlist/announcementlist.component';
import { AnnouncementdetailsComponent } from './announcementdetails/announcementdetails.component';
import { EventCalendarComponent } from './eventcalendar/eventcalendar.component';
import { OnlineserviceComponent } from './onlineservice/onlineservice.component';
import { AgencydirectoryComponent } from './agencydirectory/agencydirectory.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { SetactiveComponent } from './subscription/setactive/setactive.component';
import { DigitalservicesComponent } from './digitalservices/digitalservices.component';
import { RssComponent } from './article/rss/rss.component';
import { ContentComponent } from './article/content/content.component';
import { EparticipationComponent } from './eparticipation/eparticipation.component';
import { StatisticComponent } from './statistic/statistic.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { ArchivecategoryComponent } from './archive/archivecategory/archivecategory.component';
import { ArchivesubcategoryComponent } from './archive/archivesubcategory/archivesubcategory.component';
import { ArchivecontentComponent } from './archive/archivecontent/archivecontent.component';
import { GalleryComponent } from './gallery/gallery.component';

export const appRoutes: Routes = [

    {path: '404', component: ErrorComponent },
    {path: 'index', component: HomeComponent},
    {path: 'agencydir', component: AgencydirectoryComponent},
    {path: 'calendar', component: EventCalendarComponent},
    {path: 'digitalservices', component: DigitalservicesComponent},
    {path: 'search/searchResult/:id', component: SearchResultComponent},
    {path: 'category/:id', component: ArticleComponent, canActivate: [NavRouterActivator]  },
    {path: 'rss/:id', component: RssComponent},
    {path: 'rss/id/:id', component: RssComponent},
    {path: 'announcement', component: AnnouncementComponent },
    {path: 'eparticipation', component: EparticipationComponent},
    {path: 'announcement/:id', component: AnnouncementlistComponent, canActivate: [NavRouterActivator]},
    {path: 'announcement/:id1/:id2', component: AnnouncementdetailsComponent, canActivate: [NavRouterActivator]},
    {path: 'subcategory/:id1', component: SubarticleComponent },
    {path: 'content/:id1', component: ContentComponent},
    {path: 'archive/category/:id', component:ArchivecategoryComponent},
    {path: 'archive/subcategory/:id', component:ArchivesubcategoryComponent},
    {path: 'archive/content/:id', component:ArchivecontentComponent},
    {path: 'gallery/category/:id', component:GalleryComponent},
    {path: 'gallery', component:GalleryComponent},
    {path: 'gallery/content/:id', component:GalleryComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent },

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
    {path: 'feedback', component: FeedbackComponent},
    {path: 'onlineservice', component: OnlineserviceComponent},
    {path: 'subscription/set_active/:id', component: SetactiveComponent},
    {path: 'subscription', component: SubscriptionComponent},
    {path: 'unsubscribe', component: UnsubscribeComponent},
    {path: 'statistic', component: StatisticComponent},
    {path: 'sitemap', component: SitemapComponent},

    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: '**', component: ErrorComponent}

    // {path: this.tempurl+'/fe', component: EventsListComponent, resolve:{events: EventListResolver}},
    // {path: this.tempurl+'/fe/:id', component: EventDetailsComponent, canActivate:[EventRouterActivator] },
    // {path: this.tempurl+'/fe/topic/:id', component: ArticleComponent, canActivate:[NavRouterActivator]  },
    // {path: this.tempurl+'/fe/subtopic/:id1/:id2', component: SubarticleComponent },

    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}

];
