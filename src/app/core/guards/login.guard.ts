import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.checkToken()) {
      return true;
    }
    this.router.navigate(['/main']);
    return false;
  }

  checkToken() {
    return JSON.parse(localStorage.getItem('x-access-token') as any);
  }
}
