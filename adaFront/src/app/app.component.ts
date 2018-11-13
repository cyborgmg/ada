import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';
import { CurrentUser } from './model/current-user.model';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  @ViewChild('menu') menu: MenuComponent;
  showTemplate = false;
  public shared: SharedService;

  constructor(private userService: UserService, private router: Router) {
    this.shared = SharedService.getInstance();

    if ( this.shared.token != null ) {
      this.userService.getUser().subscribe((userAuthentication: CurrentUser) => {
        this.shared.user = userAuthentication.user;
        this.shared.showTemplate.emit(true);
        this.menu.populateItems();
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.shared.token = null;
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
