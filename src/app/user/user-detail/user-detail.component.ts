import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Post } from 'src/app/post/post.model';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Input() user!: User;
  posts!: Post[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const username = this.route.snapshot.paramMap.get('username');

    if (username !== null) {
      this.userService.getUser(username).subscribe((user) => {
        this.user = user;
        this.postService
          .getPostsByUsername(user.username)
          .subscribe((posts) => (this.posts = posts));
      });
    } else {
      console.error('username is null!');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
