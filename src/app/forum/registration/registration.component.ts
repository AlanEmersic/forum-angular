import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  users!: User[];
  newUser!: User;
  checkUsername: boolean = false;
  isSuccess: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  register(form: any) {
    const newUser = {
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
      authorities: [],
    };

    this.userService.adduser(newUser).subscribe(() => {
      this.checkUsername = false;
      this.isSuccess = false;

      if (!newUser.username || !newUser.password || !newUser.email) {
        return;
      }

      this.users.forEach((user) => {      
        if (user.username.toLowerCase() === newUser.username.toLowerCase()) {
          this.checkUsername = true;          
          return;
        }
      });
      this.users?.push(newUser);
      form.reset();
      this.isSuccess = true;
    });
  }
}
