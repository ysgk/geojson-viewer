import { GeojsonViewerPage } from './app.po';

describe('geojson-viewer App', () => {
  let page: GeojsonViewerPage;

  beforeEach(() => {
    page = new GeojsonViewerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
