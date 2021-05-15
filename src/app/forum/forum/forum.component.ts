import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post/post.model';
import { PostService } from 'src/app/post/post.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  users!: User[];
  posts!: Post[];
  userPosts: any[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      users.forEach((user) => {
        this.postService
          .getPostsByUsername(user.username)
          .subscribe((posts) => {
            if (posts != undefined && posts != null) {
              console.log(posts);
              for (let i = 0; i < posts.length; i++) {
                const userPost = { ...user, ...posts[i] };
                this.userPosts.push(userPost);                
              }
            }
          });
      });
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  // getPostsByUsername(username: string) {
  //   this.postService.getPostsByUsername(username).subscribe((posts) => {
  //     posts.forEach((post) => {
  //       this.posts.push(post);
  //     });
  //   });
  // }
}
