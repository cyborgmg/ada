import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
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

    getBtnFind(): ElementFinder {
        return element(by.id('btnfind'));
    }

    getBtnClean(): ElementFinder {
        return element(by.id('btnclean'));
    }

    getBtnPrint(): ElementFinder {
        return element(by.id('btnprint'));
    }

    getBtnDelete(): ElementFinder {
        return element(by.id('btndelete'));
    }

    getBtnDeleteDlgOk(): ElementFinder {
        return element(by.css('p-dialog[id="dlgdelete"] button[id="btnok"]'));
    }

    getBtnNew(): ElementFinder {
        return element(by.id('btnnew'));
    }

    getBtnNewDlgOk(): ElementFinder {
        return element(by.css('p-dialog[id="dlgnew"] button[id="btnok"]'));
    }

    getBtnCancel(): ElementFinder {
        return element(by.id('btncancel'));
    }

    getBtnSave(): ElementFinder {
        return element(by.id('btnsave'));
    }

    getBtnSaveDlgOk(): ElementFinder {
        return element(by.css('p-dialog[id="dlgsave"] button[id="btnok"]'));
    }

    getInputId(): ElementFinder {
        return element(by.css('input[id="inputid"][name="id"]'));
    }

    getInputBrand(): ElementFinder {
        return element(by.css('input[id="inputbrand"][name="brand"]'));
    }

    getPDropDownStatus(): ElementFinder {
        return element(by.css('p-dropdown[id="inputstatus"][name="status"]'));
    }

    getInputStatus(): ElementFinder {
        return element(by.css('p-dropdown[id="inputstatus"][name="status"] select[name="status"]'));
    }

    getPDropDownStatusOptin0(): ElementFinder {
        return element.all(by.css('p-dropdown[id="inputstatus"][name="status"] li')).get(1);
    }

    getInputYear(): ElementFinder {
        return element(by.css('p-spinner[id="inputyear"][name="year"] input[name="year"]'));
    }

    getPDropDownColor(): ElementFinder {
        return element(by.css('p-dropdown[id="inputcolor"][name="color"]'));
    }

    getInputColor(): ElementFinder {
        return element(by.css('p-dropdown[id="inputcolor"][name="color"] select[name="color"]'));
    }

    getPDropDownColorOptin0(): ElementFinder {
        return element.all(by.css('p-dropdown[id="inputcolor"][name="color"] li')).get(1);
    }

    getInputPrice(): ElementFinder {
        return element(by.css('input[id="inputprice"][name="price"]'));
    }

    getInputSaleDate(): ElementFinder {
        return element(by.css('p-calendar[id="inputsaleDate"][name="saleDate"] input[name="saleDate"]'));
    }

    getPTableRows(): ElementArrayFinder {
        return element.all(by.css('p-table[id="ptable"] div[class="ui-table-scrollable-body"] tr'));
    }
}
