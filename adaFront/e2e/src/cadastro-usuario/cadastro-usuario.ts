import { by, element, ElementFinder } from 'protractor';
import { Base } from '../base';

export class CadastroUsuario extends Base {

    getUserMenu(): ElementFinder {
        return element(by.className('usermenu')).element(by.className('ui-panelmenu-header-link'));
    }

    getUseritem(): ElementFinder {

        return element(by.id('useritem'));
    }

    getBoxTitle(): ElementFinder {

        return element(by.className('box-title'));
    }
}
