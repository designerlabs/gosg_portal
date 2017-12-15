import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface IAppConfig {
    apiEndpoint: string;
    urlMenu: string;
    urlSlider: string;
    urlFooter: string;
    urlArticle: string;
    urlCountry: string;
    urlLifeevent: string;
    urlSubtopic: string;
    urlTopics: string;
    urlGender: string;
    urlAnnouncement: string;
    urlFeedbackType: string;
}

export const AppConfig: IAppConfig = {
    apiEndpoint: '',
    urlMenu: './app/apidata/menudata',
    urlSlider: './app/apidata/sliderdata',
    urlFooter: './app/apidata/footer',
    urlArticle: './app/apidata/topic',
    urlCountry: './app/apidata/countries',
    urlLifeevent: './app/apidata/lifeevent',
    urlSubtopic: './app/apidata/subtopic',
    urlTopics: './app/apidata/articlemenu',
    urlGender: './app/apidata/gender',
    urlAnnouncement: './app/apidata/announcement',
    urlFeedbackType: './app/apidata/feedbacktype'

};
