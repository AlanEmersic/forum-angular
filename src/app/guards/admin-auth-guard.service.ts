import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor( private router: Router,
    private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
      return this.userService.getCurrentUser().pipe(
          map(user => {
              if (user) {
                  const isUserAdmin = this.userService.isRoleAdmin();
                  if (isUserAdmin) {
                      return true;
                  } else {
                      this.router.navigate(['/forbidden']);
                      return false;
                  }
              } else {
                  this.router.navigate(['/login']);
                  return false;
              }
          })
      );
  }
}
