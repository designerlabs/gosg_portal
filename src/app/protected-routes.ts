import { Component, Inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// import { HomeComponent } from './home/home.component'
import { HomeProtectedComponent } from './home/home-protected.component';
import { SearchResultProdComponent } from './search/search-result/search-result-prod.component';
import { ArticleprodComponent } from './article/articleprod.component';
import { SubarticleprodComponent } from './article/subarticle/subarticleprod.component';
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
import { RssComponent } from './article/rss/rss.component';
import { ContentProdComponent } from './article/content/contentprod.component';
import { EparticipationComponent } from './eparticipation/eparticipation.component';
import { GareportsComponent} from './gareports/gareports.component';
import { StatisticComponent } from './statistic/statistic.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { ArchivecategoryProdComponent } from './archive/archivecategory/archivecategoryprod.component';
import { ArchivesubcategoryProdComponent } from './archive/archivesubcategory/archivesubcategoryprod.component';
import { ArchivecontentProdComponent } from './archive/archivecontent/archivecontentprod.component';
import { PolicereportComponent } from './pdrm/policereport/policereport.component';
import { SummontrafficComponent } from './pdrm/summontraffic/summontraffic.component';
import { StatuspositionComponent } from './pdrm/statusposition/statusposition.component';
import { SchoolsearchComponent } from './schoolsearch/schoolsearch.component';
import { DigitalservicesprodComponent } from './digitalservices/digitalservicesprod.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TrafficinfoComponent } from './trafficinfo/trafficinfo.component';
import { PerhilitanComponent } from './perhilitan/perhilitan.component';
import { ReplacementmycardComponent } from './replacementmycard/replacementmycard.component';
import { ReplacementmsgComponent } from './replacementmsg/replacementmsg.component';
import { PerhilitanrenewComponent } from './perhilitanrenew/perhilitanrenew.component';
import { RssmainComponent } from './article/rss/rssmain/rssmain.component';
import { FamilyinfoComponent } from './familyinfo/familyinfo.component';
import { FamilyinfotblComponent } from './familyinfo/familyinfotbl/familyinfotbl.component';
import { CheckexamresultComponent } from './checkexamresult/checkexamresult.component';

//import { GalleryComponent } from './gallery/gallery.component';
// import { NavRouterActivator } from './header/nav/nav-router-activator.service'

// import { appRoutes } from './routes';

export const protectedRoutes: Routes = [

    {path: '404', component: ErrorComponent },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'agencydir', component: AgencydirectoryComponent},
    {path: 'digitalservices', component: DigitalservicesprodComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'calendar', component: EventCalendarComponent},
    {path: 'profileupdate', component: ProfileUpdatedComponent},
    {path: 'appsmgmt', component: AppManagementComponent},
    {path: 'index', component: HomeProtectedComponent},
    {path: 'firsttime', component: FirsttimeloginComponent},
    {path: 'search/:id', component: SearchResultProdComponent},
    {path: 'eparticipation', component: EparticipationComponent},
    {path: 'category/:id', component: ArticleprodComponent, canActivate: [NavRouterActivator]  },
    {path: 'rss/:id', component: RssmainComponent},
    {path: 'rss/id/:id', component: RssComponent},
    {path: 'subcategory/:id1', component: SubarticleprodComponent },
    {path: 'content/:id1', component: ContentProdComponent},
    {path: 'archive/category/:id', component:ArchivecategoryProdComponent},
    {path: 'archive/subcategory/:id', component:ArchivesubcategoryProdComponent},
    {path: 'archive/content/:id', component:ArchivecontentProdComponent},
    {path: 'announcement', component: AnnouncementComponent },
    {path: 'announcement/:id', component: AnnouncementlistComponent},
    {path: 'announcement/:id/:id', component: AnnouncementdetailsComponent},
    {path: 'statistic', component: StatisticComponent},
    {path: 'sitemap', component: SitemapComponent},
    {path: 'gallery', component: GalleryComponent},
    // {path: 'gallery/category/:id', component:GalleryComponent},
    // {path: 'gallery/content/:id', component:GalleryComponent},

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
    {path: 'pdrm/police-report', component: PolicereportComponent},
    {path: 'pdrm/summon-traffic', component: SummontrafficComponent},
    {path: 'pdrm/status-position', component: StatuspositionComponent},
    {path: 'education', component: SchoolsearchComponent},
    {path: 'trafficinfo', component: TrafficinfoComponent },
    {path: 'perhilitan', component: PerhilitanComponent},
    {path: 'perhilitan/:id', component: PerhilitanComponent},
    {path: 'perhilitan_renew', component: PerhilitanrenewComponent},
    {path: 'perhilitan_renew/:id', component: PerhilitanrenewComponent},
    {path: 'ga_reports', component: GareportsComponent},
    {path: 'familyinfo', component: FamilyinfotblComponent},
    {path: 'familyinfo/:id', component: FamilyinfoComponent},
    {path: 'familyinfo/add', component: FamilyinfoComponent},
    {path: 'get_user_approval', component: ReplacementmycardComponent},
    {path: 'thanks', component: ReplacementmsgComponent},
    {path: 'exam_result', component: CheckexamresultComponent},
    {path: '**', component: ErrorComponent}
    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}
];
