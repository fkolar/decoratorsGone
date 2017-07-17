import { DecoratorsGonePage } from './app.po';

describe('decorators-gone App', () => {
  let page: DecoratorsGonePage;

  beforeEach(() => {
    page = new DecoratorsGonePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
