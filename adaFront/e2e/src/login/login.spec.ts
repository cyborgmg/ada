import { LoginPo } from './login.po';

describe('Login', () => {
  let page: LoginPo;

  beforeEach(() => {
    page = new LoginPo();
  });

  it('espera que sistema esteja logado', () => {

      page.maximize();

      page.navigate().then(() => {

        page.waitVisibilityOf(page.getEmail()).then(() => {

          page.setEmail('admin@helpdesk.com');
          page.setPassword('123456');

          page.login().then(() => {
              page.waitVisibilityOf(page.getEmailProfile()).then(() => {
                expect( page.getEmailProfile().getText() ).toContain('admin@helpdesk.com');
              });
          });

        });

      });

  });

});
