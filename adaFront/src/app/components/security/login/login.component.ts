import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { CurrentUser } from '../../../model/current-user.model';
import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = User.getInstance();
  shared: SharedService;
  message: string;

  constructor(private userService: UserService, private router: Router) {

    this.shared = SharedService.getInstance();
   }

  ngOnInit() {
  }

  login() {

      this.message = '';
      this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
          this.shared.token = userAuthentication.token;
          this.shared.user = userAuthentication.user;
          window.location.reload();
      }, err => {
          this.shared.token = null;
          this.shared.user = null;
          this.shared.showTemplate.emit(false);
          this.message = 'Erro';
      });

  }

  cancelLogin() {
    this.message = '';
    this.user = User.getInstance();
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty): any {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': isInvalid && isDirty
    };
  }

}
