import {browser, element, by, protractor} from 'protractor';

export class BitBucket{    
    constructor(){
    }

    public goToApp():void{
        browser.get('https://bitbucket.org/');
    }

    public goToLogin():void{
        let xpath = "//a[@class='imkt-navbar__link-list-link'][contains(text(),'Log in')]";
        let login = element(by.xpath(xpath));
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(login)).then(()=>{
            login.click();
        });
    }

    public putUsername(username):void{
        let xpath = "//input[@id='username']";
        let input = element(by.xpath(xpath));
        browser.wait(protractor.ExpectedConditions.visibilityOf(input)).then(()=>{
            input.sendKeys(username);
        });
    }

    public putPassword(password):void{
        let xpath = "//input[@placeholder='Enter password']";
        let input = element(by.xpath(xpath));
        browser.wait(protractor.ExpectedConditions.visibilityOf(input)).then(()=>{
            input.sendKeys(password);
        });
    }

    public doClickOnLogin():void{
        let id = "login-submit";
        let button = element(by.id(id));
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(button)).then(()=>{
            button.click();
        });
    }

    public doClickOnRepository(repository:String){
        let xpath = "//a[@title='"+repository+"'][contains(text(),'"+repository+"')]";
        let link = element(by.xpath(xpath));
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(link)).then(()=>{
            link.click();
        });
    }

    public async getPomText() {
        let pom = element(by.xpath("//a[contains(text(),'pom.xml')]"));
        let content ="";
        await browser.wait(protractor.ExpectedConditions.elementToBeClickable(pom)).then(()=>{
            pom.getText().then((text)=> {
                content = text;
            });
        });
        return Promise.resolve(content);
    }

}