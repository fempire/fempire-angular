import { FempireAngularPage } from './app.po';

describe('fempire-angular App', () => {
  let page: FempireAngularPage;

  beforeEach(() => {
    page = new FempireAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
