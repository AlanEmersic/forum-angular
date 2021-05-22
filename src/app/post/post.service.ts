import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postURL = 'http://localhost:8080/api/posts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postURL).pipe(
      tap((_) => console.log('fetched posts')),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPostsByUsername(username: string): Observable<Post[]> {
    const url = `${this.postURL}/${username}`;
    return this.http.get<Post[]>(url).pipe(
      tap((_) => console.log('fetched posts')),
      catchError(this.handleError<Post[]>('getPostsByUsername', []))
    );
  }

  addPost(post: Post, username: String): Observable<Post> {
    const url = `${this.postURL}/?username=${username}`;
    return this.http.post<Post>(url, post, this.httpOptions).pipe(
      tap((newPost: Post) =>
        console.log(`added post with username=${username}`)
      ),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
