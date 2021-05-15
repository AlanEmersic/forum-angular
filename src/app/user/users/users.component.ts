import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  add(username: string, password: string, email: string): void {
    username = username.trim();
    password = password.trim();
    email = email.trim();

    if (!username || !password || !email) {
      return;
    }

    this.userService.adduser({username,password,email} as User)
      .subscribe(
        user => {
          this.users?.push(user);
        }
      );
  }

  delete(user: User): void {
    this.users = this.users?.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
