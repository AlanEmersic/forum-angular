import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../forum/login/login.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
  }

  logout() {
    this.loginService.logout();
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }

  isRoleAdmin(): boolean {
    return !!this.userService.isRoleAdmin();
  }
}
