import {browser, element, by, protractor} from 'protractor';
import {factory} from '../../configLog4j';

export enum SelectorType{
    XPATH="XPATH",
    ID="ID",
    CSS="CSS"
}

export interface Selector{
    selector:any,
    type:SelectorType,
    coincidence?:number
}

const toString = (selector: Selector):String => '{selector:'+selector.selector+',type:'+selector.type+'}';

const LOGGER = factory.getLogger("Action");
export class Action{
    
    
    private constructor(private selector:Selector){
    }

    public static set(selector:Selector):Action{
        return new Action(selector);
    }

    public static goTo(url){
        browser.get(url);
    }

    private getComponent(){
        let component = null;
        switch(this.selector.type){
            case SelectorType.XPATH:
                component = element.all(by.xpath(this.selector.selector)).first();
                break;
            case SelectorType.ID: 
                component = element.all(by.id(this.selector.selector)).first();
                break;
            case SelectorType.CSS: 
                component = element.all(by.css(this.selector.selector)).first();
                break;
        }
        return component;
    }

    public toString():String{
        return '{selector:'+this.selector.selector+',type:'+this.selector.type+'}';
    }

    public async waitFor(){
        let component = this.getComponent();
        await browser.wait(protractor.ExpectedConditions.elementToBeClickable(component));
    }

    public async waitForText(text){
        let component = this.getComponent();
        await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(component, text));
    }

    public async doClick(){
        let component = this.getComponent();
        await browser.wait(protractor.ExpectedConditions.elementToBeClickable(component)).then((c)=>{
            component.click();
            LOGGER.debug('Click:'+this.toString());
        });
    }

    public async putText(text:any){
        let input = this.getComponent();
        await browser.wait(protractor.ExpectedConditions.visibilityOf(input)).then(()=>{
            input.sendKeys(text);
            LOGGER.debug('PutText:'+this.toString());
        });
    }

    public async getText(){
        let input = this.getComponent();
        let content = null;
        await browser.wait(protractor.ExpectedConditions.visibilityOf(input)).then(()=>{
            LOGGER.debug('GetText:'+this.toString());
            input.getText().then((text)=> {
                content = text;
                LOGGER.debug('GetText->Result:'+text);
            });
        });
        return Promise.resolve(content);
    }
}