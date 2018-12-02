import { LoginPo } from './login.po';

describe('Login', () => {
  let page: LoginPo;

  beforeEach(() => {
    page = new LoginPo();
  });
  it('espera que sistema esteja logado', () => {

      page.navigate();
      page.setEmail('admin@helpdesk.com');
      page.setPassword('123456');

      page.login().then(() => {
          page.wait();
          expect( page.getEmailProfile() ).toContain('admin@helpdesk.com');
          // .not.toBeNull();
      });


  });
});
