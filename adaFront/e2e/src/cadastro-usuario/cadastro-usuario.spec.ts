import { CadastroUsuario } from './cadastro-usuario';

describe('CadastroUsuario', () => {

  let page: CadastroUsuario;

  beforeEach(() => {
    page = new CadastroUsuario();
  });

  it('espera abrir cadastro de usuários', () => {

      page.getUserMenu().click().then(() => {
        page.waitVisibilityOf( page.getUseritem() ).then(() => {
          page.getUseritem().click().then(() => {
            page.waitVisibilityOf( page.getBoxTitle() ).then(() => {
              expect(page.getBoxTitle().getText()).toContain('Cadastro de Usuários');
            });
          });
        });
      });

  });
});
