import { browser, by, element, promise, ElementFinder} from 'protractor';
import { Base } from '../base';

export class LoginPo extends Base {

    navigate(): promise.Promise<any> {
        return browser.get('/login');
    }

    setEmail(email: string): void {
        element(by.id('email')).sendKeys(email);
    }

    getEmail(): ElementFinder {
        return element(by.id('email'));
    }

    getEmailProfile(): ElementFinder {
        return element(by.id('emailprofile'));
    }

    setPassword(password: string): void {
        element(by.id('password')).sendKeys(password);
    }

    login() {
        return element(by.id('btnlogin')).click();
    }

}
