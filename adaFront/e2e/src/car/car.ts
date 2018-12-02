import { by, element, ElementFinder } from 'protractor';
import { Base } from '../base';

export class Car extends Base {

    getCarMenu(): ElementFinder {
        return element(by.className('carmenu')).element(by.className('ui-panelmenu-header-link'));
    }

    getCaritem(): ElementFinder {

        return element(by.id('cadcaritem'));
    }

    getBoxTitle(): ElementFinder {

        return element(by.className('box-title'));

    }
}
