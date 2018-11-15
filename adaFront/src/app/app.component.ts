import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './services/shared.service';
import { CurrentUser } from './model/current-user.model';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  showTemplate = false;
  public shared: SharedService = SharedService.getInstance();

  constructor(private userService: UserService, private router: Router) {

    if ( this.shared.isLoggedIn() ) {
      this.userService.getUser().subscribe((userAuthentication: CurrentUser) => {
        this.shared.user = userAuthentication.user;
        this.shared.showTemplate.emit(true);
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

    this.shared.showTemplate.subscribe((show: boolean) => {
        this.showTemplate = show;
      }
    );

  }

}

