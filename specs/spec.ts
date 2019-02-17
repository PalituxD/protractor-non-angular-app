import {browser} from 'protractor';

import {BitBucket} from '../pages/bitbucket';

describe('protractor with typescript typings', () => {
  let app:BitBucket;
  let defaultTimeoutInterval;
  const customTimeoutInterval = 3600000;
  const USERNAME = "";
  const PASSWORD = "";
  const REPOSITORY = "";
  const FILE = "pom.xml";
  
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    defaultTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = customTimeoutInterval;
    
    app = new BitBucket();
    app.goToApp();
    });

  afterEach(()=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeoutInterval;
  })

  it('should greet the named user', () => {
    app.goToLogin();
    app.putUsername(USERNAME);
    app.doClickOnLogin();
    app.putPassword(PASSWORD);
    app.doClickOnLogin();
    app.doClickOnRepository(REPOSITORY);
    app.getPomText().then((text)=>{
        expect(text).toBe(FILE);
    });
    browser.sleep(10000);
  });
});