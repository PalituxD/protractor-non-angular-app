import {browser} from 'protractor';
import {Action, SelectorType} from '../shared/common/action';
export class BitBucket{    
    constructor(){
    }

    public static async goToApp(url){
        await browser.get(url);
    }

    public static async goToLogin(){
        let xpath = "//a[@class='imkt-navbar__link-list-link'][contains(text(),'Log in')]";
        await Action.set({
            selector:xpath,
            type:SelectorType.XPATH
        }).doClick();
    }

    public static async putUsername(username){
        let xpath = "//input[@id='username']";
        await Action.set({
            selector:xpath,
            type:SelectorType.XPATH
        }).putText(username);
    }

    public static async putPassword(password){
        let xpath = "//input[@placeholder='Enter password']";
        await Action.set({
            selector:xpath,
            type:SelectorType.XPATH
        }).putText(password);
    }

    public static async doClickOnLogin(){
        let id = "login-submit";
        await Action.set({
            selector:id,
            type:SelectorType.ID
        }).doClick();
    }

    public static async doClickOnRepository(repository:String){
        let xpath = "//a[@title='"+repository+"'][contains(text(),'"+repository+"')]";
        await Action.set({
            selector:xpath,
            type:SelectorType.XPATH
        }).doClick();
    }

    public static async getPomText() {
        let xpath = "//a[contains(text(),'pom.xml')]";
        return Action.set({
            selector:xpath,
            type:SelectorType.XPATH
        }).getText();
    }

}