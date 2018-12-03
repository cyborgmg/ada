import { Car } from './car';

describe('Car', () => {

  let page: Car;

  beforeEach(() => {
    page = new Car();
  });

  it('espera abrir cadastro de carros', () => {

      page.getCarMenu().click().then(() => {
        page.waitVisibilityOf( page.getCaritem() ).then(() => {
          page.getCaritem().click().then(() => {
            page.waitVisibilityOf( page.getBoxTitle()).then(() => {
              expect(page.getBoxTitle().getText()).toContain('Car Registration');
            });
          });
        });
      });

  });
/*********************************************************************************************************** */
  describe('espera tela em estado inicial', () => {

      describe('espera botões em estado inicial', () => {

        it('find(enable)', () => {
            expect(page.getBtnFind().isEnabled()).toBe(true);
        });
        it('clean(enable)', () => {
            expect(page.getBtnClean().isEnabled()).toBe(true);
        });
        it('print(disable)', () => {
            expect(page.getBtnPrint().isDisplayed()).toBe(true);
        });
        it('delete(disable)', () => {
            expect(page.getBtnDelete().isDisplayed()).toBe(true);
        });
        it('new(enable)', () => {
            expect(page.getBtnNew().isEnabled()).toBe(true);
        });
        it('cancel(disable)', () => {
            expect(page.getBtnCancel().isDisplayed()).toBe(true);
        });
        it('save(disable)', () => {
            expect(page.getBtnSave().isDisplayed()).toBe(true);
        });

      });

      describe('espera campos em estado inicial', () => {

        it('inputid Empty and Disable', () => {
          expect(page.getInputId().getText() ).toEqual('');
          expect(page.getInputId().isDisplayed() ).toBe(true);
        });
        it('inputbrand Empty', () => {
          expect(page.getInputBrand().getText() ).toEqual('');
        });
        it('inputstatus Empty', () => {
          expect(page.getInputStatus().getText() ).toEqual('');
        });
        it('inputyear Empty', () => {
          expect(page.getInputYear().getText() ).toEqual('');
        });
        it('inputcolor Empty', () => {
          expect(page.getInputColor().getText() ).toEqual('');
        });
        it('inputprice Empty', () => {
          expect(page.getInputPrice().getText() ).toEqual('');
        });
        it('inputsaleDate Empty', () => {
          expect(page.getInputSaleDate().getText() ).toEqual('');
        });
        it('ptable.rowns = 0', () => {
          expect(page.getPTableRows().count() ).toEqual(0);
        });

      });
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

        it('cancel(enable)', () => {
          expect(page.getBtnCancel().isEnabled()).toBe(true);
        });

      });

    });

  });

  describe('espera botões em estado de novo', () => {

    it('find(enable)', () => {
        expect(page.getBtnFind().isEnabled()).toBe(true);
    });
    it('clean(enable)', () => {
        expect(page.getBtnClean().isEnabled()).toBe(true);
    });
    it('print(disable)', () => {
        expect(page.getBtnPrint().isDisplayed()).toBe(true);
    });
    it('delete(disable)', () => {
        expect(page.getBtnDelete().isDisplayed()).toBe(true);
    });
    it('new(disable)', () => {
        expect(page.getBtnNew().isDisplayed()).toBe(true);
    });
    it('cancel(enable)', () => {
        expect(page.getBtnCancel().isEnabled()).toBe(true);
    });
    it('save(enable)', () => {
        expect(page.getBtnSave().isEnabled()).toBe(true);
    });

  });

  describe('espera campos em estado de novo', () => {

    it('inputid Empty and Disable', () => {
      expect(page.getInputId().getText() ).toEqual('');
      expect(page.getInputId().isDisplayed() ).toBe(true);
    });
    it('inputbrand not Empty', () => {
      expect(page.getInputBrand().getText() ).not.toBeNull();
    });
    it('inputstatus not Empty', () => {
      expect(page.getInputStatus().getText() ).not.toBeNull();
    });
    it('inputyear not Empty', () => {
      expect(page.getInputYear().getText() ).not.toBeNull();
    });
    it('inputcolor not Empty', () => {
      expect(page.getInputColor().getText() ).not.toBeNull();
    });
    it('inputprice not Empty', () => {
      expect(page.getInputPrice().getText() ).not.toBeNull();
    });
    it('inputsaleDate not Empty', () => {
      expect(page.getInputSaleDate().getText() ).not.toBeNull();
    });
    it('ptable.rowns=1', () => {
      expect(page.getPTableRows().count() ).toEqual(1);
    });

  });

});
/*********************************************************************************************************** */


});
