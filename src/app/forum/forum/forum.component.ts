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
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
    this.getUsersAndPosts();
  }

  getUsersAndPosts() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      users.forEach((user) => {
        this.postService
          .getPostsByUsername(user.username)
          .subscribe((posts) => {
            if (posts != undefined && posts != null) {
              for (let i = 0; i < posts.length; i++) {
                const userPost = { ...user, ...posts[i] };
                this.userPosts.push(userPost);
              }
            }
            this.userPosts.sort(
              (a, b) =>
                new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
            );
          });
      });
    });
    
  }

  addPost(form: any) {
    let today = new Date();
    let date = `${today.getDate()}.${
      today.getMonth() + 1
    }.${today.getFullYear()}.`;
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    let dateTime = date + ' ' + time;    

    const post = { comment: form.value.comment, timestamp: dateTime };

    this.postService
      .addPost(post, this.userService.currentUser?.username || '')
      .subscribe((post) => {            
        const userPost = {...this.userService.currentUser, ...post };
        this.userPosts.push(userPost);               
        form.reset();
      });  
  }
}
