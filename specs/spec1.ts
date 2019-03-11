import {LoginService} from '../services/login-service';
import {browser} from 'protractor';
import {BitBucket} from '../pages/bitbucket';
import {factory} from '../configLog4j';

const SPEC_DESCRIPTION="Spec1";
const SPEC_TEST="Bitbucket Login && find '..pom.xml' of <REPOSITORY>";

describe(SPEC_DESCRIPTION, () => {
  const REPOSITORY = "multitenancy";
  const FILE = "..pom.xml";
  const LOGGER = factory.getLogger(`{${SPEC_DESCRIPTION}}-{${SPEC_TEST}}`);
  
  beforeEach(async () => {
    browser.waitForAngularEnabled(false);
    await BitBucket.goToApp(LoginService.getUrl());
  });

  afterEach(async ()=>{
    
  });

  it(SPEC_TEST, async() => {
    await BitBucket.goToLogin();
    await BitBucket.putUsername(LoginService.getUsername());
    await BitBucket.doClickOnLogin();
    await BitBucket.putPassword(LoginService.getPassword());
    await BitBucket.doClickOnLogin();
    await BitBucket.doClickOnRepository(REPOSITORY);
    await BitBucket.getPomText().then((text)=>{
        LOGGER.info(text);
        expect(text).toBe(FILE);
    });
  });
});