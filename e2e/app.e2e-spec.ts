import { PortalFEPublicPage } from './app.po';

describe('portal-fe-public App', () => {
  let page: PortalFEPublicPage;

  beforeEach(() => {
    page = new PortalFEPublicPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
