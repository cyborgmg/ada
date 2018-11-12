import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    public shared: SharedService;

    constructor(private userService: UserService, private router: Router) {
        this.shared = SharedService.getInstance();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        // console.log(`AuthGuard token=${localStorage.getItem('token')} is null ${localStorage.getItem('token') === null}`);

        if (this.shared.isLoggedIn()) {
            // console.log(`esta logado ${this.shared.token}`);
            return true;
        } else {
            this.router.navigate(['/login']);
            // console.log(`não esta logado ${this.shared.token}`);
            return false;
        }
    }

}
