import { Car } from './car';

let page: Car;

function botoesEmptyNotEdit(desc: string) {
  describe(desc, () => {

    it('find(enable)', () => {
        expect(page.getBtnFind().isEnabled()).toBe(true);
    });
    it('clean(enable)', () => {
        expect(page.getBtnClean().isEnabled()).toBe(true);
    });
    it('print(disable)', () => {
        expect(page.getBtnPrint().isEnabled()).toBe(false);
    });
    it('delete(disable)', () => {
        expect(page.getBtnDelete().isEnabled()).toBe(false);
    });
    it('new(enable)', () => {
        expect(page.getBtnNew().isEnabled()).toBe(true);
    });
    it('cancel(disable)', () => {
        expect(page.getBtnCancel().isEnabled()).toBe(false);
    });
    it('save(disable)', () => {
        expect(page.getBtnSave().isEnabled()).toBe(false);
    });

  });
}

function botoesFullNotEdit(desc: string) {

  describe(desc, () => {

    it('find(enable)', () => {
      expect(page.getBtnFind().isEnabled()).toBe(true);
    });
    it('clean(enable)', () => {
        expect(page.getBtnClean().isEnabled()).toBe(true);
    });
    it('print(enable)', () => {
        expect(page.getBtnPrint().isEnabled()).toBe(true);
    });
    it('delete(enable)', () => {
        expect(page.getBtnDelete().isEnabled() ).toBe(true);
    });
    it('new(enable)', () => {
        expect(page.getBtnNew().isEnabled()).toBe(true);
    });
    it('cancel(disable)', () => {
        expect(page.getBtnCancel().isEnabled()).toBe(false);
    });
    it('save(disable)', () => {
        expect(page.getBtnSave().isEnabled()).toBe(false);
    });

  });

}

function botoesFullEdit(desc: string) {

  describe(desc, () => {

    it('find(enable)', () => {
        expect(page.getBtnFind().isEnabled()).toBe(true);
    });
    it('clean(enable)', () => {
        expect(page.getBtnClean().isEnabled()).toBe(true);
    });
    it('print(disable)', () => {
        expect(page.getBtnPrint().isEnabled()).toBe(false);
    });
    it('delete(disable)', () => {
        expect(page.getBtnDelete().isEnabled()).toBe(false);
    });
    it('new(disable)', () => {
        expect(page.getBtnNew().isEnabled()).toBe(false);
    });
    it('cancel(enable)', () => {
        expect(page.getBtnCancel().isEnabled()).toBe(true);
    });
    it('save(enable)', () => {
        expect(page.getBtnSave().isEnabled()).toBe(true);
    });

  });

}

function camposEmpty(desc: string) {
  describe(desc, () => {
    it('inputid Empty and Disable', () => {
      expect(page.getInputId().getAttribute('value') ).toEqual('');
      expect(page.getInputId().isDisplayed() ).toBe(true);
    });
    it('inputbrand Empty', () => {
      expect(page.getInputBrand().getAttribute('value') ).toEqual('');
    });
    it('inputstatus Empty', () => {
      expect(page.getInputStatus().getAttribute('value') ).toEqual('null');
    });
    it('inputyear Empty', () => {
      expect(page.getInputYear().getAttribute('value') ).toEqual('');
    });
    it('inputcolor Empty', () => {
      expect(page.getInputColor().getAttribute('value') ).toEqual('null');
    });
    it('inputprice Empty', () => {
      expect(page.getInputPrice().getAttribute('value') ).toEqual('');
    });
    it('inputsaleDate Empty', () => {
      expect(page.getInputSaleDate().getAttribute('value') ).toEqual('');
    });
    it('ptable.rowns = 0', () => {
      expect(page.getPTableRows().count() ).toEqual(0);
    });

  });
}

function campoFull(desc: string, novo: boolean) {
  describe(desc, () => {

    it(`inputid${novo ? '' : 'not'} Empty and Disable`, () => {
      if (novo) {
        expect(page.getInputId().getAttribute('value') ).toEqual('');
      } else {
        expect(page.getInputId().getAttribute('value') ).not.toEqual('');
      }
      expect(page.getInputId().isDisplayed() ).toBe(true);
    });

    it('inputbrand="brand car"', () => {
      expect(page.getInputBrand().getAttribute('value') ).toEqual('brand car');
    });
    it('inputstatus="B"', () => {
      expect(page.getInputStatus().getAttribute('value') ).toEqual('B');
    });
    it('inputyear="2000"', () => {
      expect(page.getInputYear().getAttribute('value') ).toEqual('2000');
    });
    it('inputcolor not Empty', () => {
      expect(page.getInputColor().getAttribute('value') ).not.toBeNull();
    });
    it('inputprice="10.000,00"', () => {
      expect(page.getInputPrice().getAttribute('value') ).toEqual('10.000,00');
    });
    it('inputsaleDate="01/01/2018"', () => {
      expect(page.getInputSaleDate().getAttribute('value') ).toEqual('01/01/2018');
    });
    it('ptable.rowns=1', () => {
      expect(page.getPTableRows().count() ).toEqual(1);
    });

  });
}

describe('Car', () => {

  beforeAll(() => {
    page = new Car();
    page.getCarMenu().click().then(() => {
      page.waitVisibilityOf( page.getCaritem() ).then(() => {
        page.getCaritem().click().then(() => {
          page.waitVisibilityOf( page.getBoxTitle());
        });
      });
    });
  });

/*********************************************************************************************************** */
  describe('espera tela em estado inicial', () => {

    botoesEmptyNotEdit('espera botões em estado inicial');

    camposEmpty('espera campos em estado inicial');

  });
/*********************************************************************************************************** */

describe('espera tela em estado de novo', () => {

  beforeAll(() => {

    page.getBtnNew().click().then(() => {

      page.getBtnNewDlgOk().click().then(() => {

        page.getInputBrand().sendKeys('brand car');

        page.getPDropDownStatus().click().then(() => {
          page.getPDropDownStatusOptin0().click();
        });

        page.getInputYear().sendKeys('2000');

        page.getPDropDownColor().click().then(() => {
          page.getPDropDownColorOptin0().click();
        });

        page.getInputPrice().sendKeys('1000000');

        page.getInputSaleDate().sendKeys('01/01/2018');

        page.getInputId().click();

        page.waitForAngular();

      });

    });

  });

  botoesFullEdit('espera botões em estado de novo');

  campoFull('espera campos em estado de novo', true);

});

/*********************************************************************************************************** */

describe('espera tela em estado de save após novo', () => {

  beforeAll(() => {

    page.getBtnSave().click().then(() => {

      page.getBtnSaveDlgOk().click().then(() => {

        page.getInputId().click();

        page.waitForAngular();

      });

    });

  });

  botoesFullNotEdit('espera botões em estado de save após novo');

  campoFull('espera campos em estado de save após novo', false);

});

/*********************************************************************************************************** */

describe('espera tela em estado de find', () => {

  beforeAll(() => {

    page.getBtnClean().click().then(() => {

      page.getBtnFind().click().then(() => {

        page.waitForAngular();

      });

    });

  });

  botoesFullNotEdit('espera botões em estado de find');

  campoFull('espera campos em estado de save após novo', false);
});

/*********************************************************************************************************** */

describe('espera tela em estado de delete', () => {

  beforeAll(() => {

    page.getBtnDelete().click().then(() => {

      page.getBtnDeleteDlgOk().click().then(() => {

        page.waitForAngular();

      });

    });

  });

  botoesEmptyNotEdit('espera botões em estado de delete');

  camposEmpty('espera campos em estado de delete');

});

/*********************************************************************************************************** */

});
