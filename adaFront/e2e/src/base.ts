import { ElementFinder, browser, ExpectedConditions as ec, promise } from 'protractor';

export class Base {

    waitVisibilityOf(el: ElementFinder): promise.Promise<{}> {
        return browser.wait( ec.visibilityOf( el ) );
    }

}
