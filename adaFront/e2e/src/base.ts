import { ElementFinder, browser, ExpectedConditions as ec, promise } from 'protractor';

export class Base {

    waitVisibilityOf(el: ElementFinder): promise.Promise<{}> {
        return browser.wait( ec.visibilityOf( el ) );
    }

    sleep(ms: number): void {
        browser.sleep(ms);
    }

    waitForAngular(): void {
        browser.waitForAngular();
    }

    maximize() {
        browser.driver.manage().window().maximize();
    }

}
