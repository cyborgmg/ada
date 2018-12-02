import { browser, by, element, ExpectedConditions as ec } from 'protractor';

export class LoginPo {

    navigate() {
        browser.get('/login');
    }

    setEmail(email: string): void {
        element(by.id('email')).sendKeys(email);
    }

    getEmailProfile() {
        return element(by.id('emailprofile')).getText();
    }

    setPassword(password: string): void {
        element(by.id('password')).sendKeys(password);
    }

    login() {
        return element(by.id('btnlogin')).click();
    }

    wait() {
        browser.waitForAngular();
        browser.sleep(1000);
    }

}
