import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { JwtToken } from './jwt-token.model';
import { LoginService } from './login.service';
import { UserCredentials } from './user-credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticating = false;
  loginFailed = false;
  userCredentials!: UserCredentials;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userCredentials = new UserCredentials();
  }

  login() {
    this.authenticating = true;
    this.loginFailed = false;

    this.loginService.authenticate(this.userCredentials).subscribe(
      (jwtToken: JwtToken) => this.successfulLogin(jwtToken),
      () => this.loginFailed = true
    ).add(() => this.authenticating = false);
  }

  successfulLogin(jwtToken: JwtToken) {
    localStorage.setItem('token', jwtToken.token);
    this.userService.getCurrentUser().subscribe((currentUser: User) => this.userService.currentUser = currentUser);
    this.router.navigate(['/forum']);
  }
}
