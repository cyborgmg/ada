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
});
