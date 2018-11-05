import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { CurrentUser } from './model/current-user.model';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  showTemplate = false;
  public shared: SharedService;

  constructor(private userService: UserService, private router: Router) {
    this.shared = SharedService.getInstance();

    if ( localStorage.getItem('token') != null ) {
      this.userService.getUser().subscribe((userAuthentication: CurrentUser) => {
        this.shared.user = userAuthentication.user;
        this.shared.user.profile = userAuthentication.user.profile.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        localStorage.removeItem('token');
        this.shared.user = null;
        this.shared.showTemplate.emit(false);
      });
    }

  }

  ngOnInit(): void {

  this.shared.showTemplate.subscribe(
     show => this.showTemplate = show
  );

  }

  showContentWarpper() {
    return {
      'content-wrapper': this.shared.isLoggedIn()
    };
  }

}
