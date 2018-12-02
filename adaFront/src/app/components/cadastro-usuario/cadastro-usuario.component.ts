import { Component, OnInit } from '@angular/core';
import { BaseCadastro } from 'src/app/pattern/base-cadastro';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { ListsService } from 'src/app/services/lists.service';
import { ResponseApi } from 'src/app/model/response-api';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent extends BaseCadastro implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  blockedPtable: boolean = false;

  users: Array<User> = new Array<User>();
  selectedUser: User = User.getInstance();
  oldSelectedUser: User = User.getInstance();

  btnSalvar: boolean;
  btnCancelar: boolean;
  btnNovo: boolean;
  btnDeletar: boolean;
  btnPrint: boolean;
  btnSenha: boolean;

  // tslint:disable-next-line:no-inferrable-types
  dlgPasswdDisplay: boolean = false;
  senha1: string;
  senha2: string;
  // tslint:disable-next-line:no-inferrable-types
  senhaMatch: boolean = false;

  constructor(private userService: UserService, private listsService: ListsService) {
    super();
  }

  ngOnInit() {
   this.copy();
   this.navigate();
  }

  findCarParams() {
    this.userService.findUserParams(this.selectedUser).subscribe((responseApi: ResponseApi) => {
      this.users = responseApi['data'];
      this.selectedUser = this.users.length > 0 ? this.users[0] : User.getInstance();
      this.copy();
      this.navigate();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  saveCar() {
    this.userService.save(this.selectedUser).subscribe((responseApi: ResponseApi) => {
      this.selectedUser = responseApi['data'];
      this.users = new Array<User>();
      this.users.push(this.selectedUser);
      this.copy();
      this.navigate();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  deleteCar() {
     this.userService.delete(this.selectedUser.id).subscribe(() => {
      Utils.arrayRemoveItem(this.users, this.selectedUser, 'id');
      this.selectedUser = this.users.length > 0 ? this.users[0] : User.getInstance();
      this.copy();
      this.navigate();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  printCars() {
    this.userService.print(this.users).subscribe(data => {
      const blob = new Blob([(<any>data)], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err
      });
    });

  }

  onRowUnselect(event: Event) {
    this.selectedUser = Utils.clone( this.oldSelectedUser );
  }

  copy() {
    this.oldSelectedUser = Utils.clone(this.selectedUser);
  }

  novo() {
    const user: User = User.getInstance();
    this.users.push(user);
    this.selectedUser = user ;
    Utils.cleanObject(this.selectedUser);
    this.navigate();
  }

  cancel() {
    if (this.selectedUser.id === null) {
      Utils.arrayRemoveItem(this.users, this.selectedUser, 'id');
    }
    this.selectedUser = Utils.clone( this.oldSelectedUser );
    Utils.arraySetItem(this.users, this.selectedUser, 'id');
    this.navigate();
  }

  clear() {
    Utils.cleanObject(this.selectedUser, 'id');
    this.navigate();
  }

  navigate() {

    const edit: boolean = (JSON.stringify(this.oldSelectedUser) !== JSON.stringify(this.selectedUser));
    const idIsNull: boolean = (this.selectedUser.id == null);
    const full: boolean = (this.users.length > 0);
    // tslint:disable-next-line:max-line-length
    const required: boolean = !Utils.strIsEmpty(this.selectedUser.email) && !Utils.strIsEmpty(this.selectedUser.profile) && !Utils.strIsEmpty(this.selectedUser.password);
    // tslint:disable-next-line:max-line-length
    const novo: boolean = ( JSON.stringify(this.users[this.users.indexOf(this.selectedUser)]) === JSON.stringify(this.selectedUser) ) && (idIsNull) ;

    this.btnSalvar   = full && edit && required;
    this.btnCancelar = full && ( novo || edit );
    this.btnNovo     = !novo && !edit;
    this.btnDeletar  = full && !idIsNull && !edit;
    this.btnPrint    = full && !this.btnCancelar;
    this.btnSenha    = full;

    this.blockedPtable = this.btnCancelar;

    // this.ptable.selectionMode = !this.btnCancelar ? 'single' : 'none';

    // console.log(`this.cars.length=${this.cars.length}`);
    // console.log(`this.selectedCar.id=${this.selectedCar.id}`);
    // console.log(`this.selectedCar=${JSON.stringify(this.selectedCar)}`);
    // console.log(`this.oldSelectedCar=${JSON.stringify(this.oldSelectedCar)}`);
    // console.log(`!novo=${!novo} && !edit=${!edit}`);
    // console.log(`===============================================================================================`);

  }

  navigateSenhas() {
    this.senhaMatch = !Utils.strIsEmpty(this.senha1) && !Utils.strIsEmpty(this.senha2) && Utils.equal(this.senha1, this.senha2);
  }

  okSenhas() {
    this.selectedUser.password = Utils.clone(this.senha2);
    this.dlgPasswdDisplay = false;
    this.senha1 = null;
    this.senha2 = null;
    this.navigate();
  }

  showDldSenhas() {
    this.senha1 = null;
    this.senha2 = null;
    this.dlgPasswdDisplay = true;
  }

}
