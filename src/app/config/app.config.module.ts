import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

let baseURL =  environment.mockApiURL;
let uapURL = environment.uapURL;
let mediaURL = environment.mediaURL;
let searchURL = environment.miaugeoURL;
let trafficInfoURL = environment.trafficInfoURL;
let registrationUrl = uapURL+'registration/';


// common service
let portalBaseURL = 'http://localhost:8020/portal/';
let protectedBaseURL = uapURL+'service-protected/';
let commonURL = uapURL+'service/';

let agencyURL = uapURL+'service-dservice-protected/'

// backend service
let baseLocalURL = './app/apidata/';
let searchServiceURL = searchURL;
let searchServicePublicURL = 'https://www.malaysia.gov.my/public/';
let pollUrl = commonURL + "polls";

export class AppConfig {
    apiEndpoint: string;
    urlEvents: string;
    urlMenu: string;
    urlSlider: string;
    urlFooter: string;
    urlArticle: string;
    urlGallery: string;
    urlCountry: string;
    urlState:string;
    urlPostcode:string;
    // urlStaurlPostcodete:string;
    urlRace:string;
    urlCity:string;
    urlReligion: string;
    urlLifeevent: string;
    urlSubtopic: string;
    urlTopics: string;
    urlHighlights: string;
    urlGender: string;
    urlPoll: string;
    urlAnnouncement: string;
    urlAnnouncementSub: string;
    urlCalendar: string;
    urlEvent: string;
    urlRegister: string;
    urlFeedbackType: string;
    urlFeedbackSubject: string;
    urlFeedback: string;
    urlProfile: string;
    portalURL:string;
    protectedURL:string;
    urlIntSearch:string;
    urlOsSearch:string;
    urlGlobalSearch:string;
    urlUserType:string;
    urlMail:string;
    urlAgency:string;
    urlSiteMap:string;
    urlAppAgency:string;
    urlUapStaging:string;
    urlComplete: string;
    urlGetUser: string;
    urlDashboard: string;
    urlUAP: string;
    urlGetProfile: string;
    urlPollProtected:string;
    urlFeedbackProtected:string;
    urlGetProfileEmail:string;
    urlGetProfilePhone:string;
    urlUapStagingProfile:string;
    urlColor:string;
    urlFont: string;
    urlCompleteEmail:string;
    urlCompletePhone:string;
    externalMediaURL: string;
    urlPortal:string;
    urlProtected: string;
    urlSubscription: string;
    urlDigitalServices: string;
    urlDigitalServicesDetails: string;
    urlPopularSearch: string;
    urlFaq: string;
    urlManual: string;
    urlDashboardData: string;
    statusAppUrl: string;
    urlAgencyList: string;
    dataAppUrl: string;
    urlStatistic: string;
    urlDserviceRpt: string;
    registerationUrl: string;
    UrlStreetNameAPI: string;
    UrlTrafficPolylines: string;
    UrlTrafficPredictionAPI: string;
    urlAgencyDservice: string;
    urlRating: string;
    urlSharedDS: string;
    urlSubStatus: string;

}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlPortal: commonURL,
    urlProtected: protectedBaseURL,
    urlMenu: './app/apidata/menudata',
    urlSlider: commonURL+'slider',
    urlEvents: commonURL+'calendar',
    urlFaq: commonURL+'faq/all',
    urlManual: commonURL+'article/usermanual',
    // urlFooter: './app/apidata/footer',
    registerationUrl: registrationUrl,
    urlFooter: commonURL + 'footer',
    urlArticle: commonURL+'article',
    urlGallery: commonURL+'gallerydetails',
    urlCountry: commonURL+'country/all',
    urlState: commonURL+'state/all',
    urlColor: commonURL+ 'color/active',
    urlFont: commonURL+ 'font/active',
    urlPostcode: commonURL+'postcode/city/',
    urlRace: commonURL+'race/lang/',
    urlCity: commonURL+'city/state/',
    urlReligion: commonURL+'religion/lang/',
    urlLifeevent: commonURL+'life/event',
    urlSubtopic: './app/apidata/subtopic',
    urlTopics: './app/apidata/articlemenu',
    urlHighlights: './app/apidata/highlightbox',
    urlGender: commonURL+'gender/lang/',
    urlAnnouncement : commonURL + 'highlight/tender',
    // urlAnnouncement : commonURL + 'announcement/date/publish',
    urlAnnouncementSub: commonURL + 'announcement/category',
    urlCalendar: commonURL + './calendar',
    urlEvent: './app/apidata/event',
    urlRegister: registrationUrl+'register',
    urlRating: commonURL+'content/rating/post',
    urlFeedbackType: commonURL+'feedback/type/lang/',
    urlFeedbackSubject: commonURL+'feedback/subject/lang/',
    urlFeedback: commonURL+'feedback',
    urlFeedbackProtected: protectedBaseURL+'feedback',
    urlProfile: baseURL+'profile',
    portalURL: portalBaseURL,
    urlDashboard: uapURL + 'portal-protected/dashboard/',
    protectedURL:protectedBaseURL,
    // urlPopularSearch: uapURL + 'popular',
    // urlIntSearch: uapURL + 'content',
    // urlOsSearch: uapURL + 'agency',
    urlPopularSearch: searchServiceURL + 'popular',
    urlIntSearch: searchServiceURL + 'content',
    urlOsSearch: searchServiceURL + 'agency',
    urlGlobalSearch: searchServicePublicURL + 'query/1/',
    urlUserType:uapURL+'service/user/type/lang/',
    urlMail: protectedBaseURL+'inbox/',
    urlUAP: uapURL,
    urlComplete: protectedBaseURL+'user/complete/registration',
    urlCompleteEmail: protectedBaseURL+'user/complete/email/updated',
    urlCompletePhone: protectedBaseURL+'user/complete/phone/updated',
    urlGetUser: protectedBaseURL+'user/detail',
    urlGetProfile: protectedBaseURL+'user/profile',
    urlGetProfileEmail: protectedBaseURL+'user/profile/email',
    urlGetProfilePhone: protectedBaseURL+'user/profile/phone',
    urlAppAgency: './app/apidata/appAgency',
    urlAgency: commonURL + 'agency/language/',
    urlUapStaging: 'https://uapstaging.malaysia.gov.my/uap/validatesigncryption.jsp?language=',
    urlUapStagingProfile: 'https://uapstaging.malaysia.gov.my/myprofile/update/updatechannel.jsp?tag=',
    urlPoll: commonURL + 'polls',
    urlPollProtected: protectedBaseURL + 'polls',
    externalMediaURL: mediaURL+"media",
    urlSubscription: registrationUrl + 'subscription',
    urlDigitalServices: commonURL + 'digitalservice',
    urlDigitalServicesDetails: commonURL + 'digitalservice/details',
    urlSiteMap: commonURL + 'sitemapdetails',
    urlStatistic: commonURL + 'statistics?year=2018',
    urlDserviceRpt: commonURL + 'dservice/report',
    urlSubStatus: commonURL + 'application/status/',
    // urlFaq: commonURL + 'faq',
    urlDashboardData: agencyURL + 'dservice/dashboard',
    statusAppUrl: agencyURL + 'dservice/group',
    urlAgencyList: agencyURL + 'dservice/agencylist',
    dataAppUrl: agencyURL + 'dservice',
    UrlStreetNameAPI: trafficInfoURL+"street?rows=100",
    UrlTrafficPolylines: trafficInfoURL+"kl",
    UrlTrafficPredictionAPI: trafficInfoURL+"traffic?streetName=",
    urlAgencyDservice: agencyURL,
    urlSharedDS: commonURL,
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {

}
