import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'http://localhost:8080/api/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUser(username: string): Observable<User> {
    const url = `${this.userURL}/${username}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log(`fetched user username=${username}`)),
        catchError(this.handleError<User>(`getUser username=${username}`))
      );
  }

  adduser(user: User): Observable<User> {
    return this.http.post<User>(this.userURL, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => console.log(`added user with username=${newUser.username}`)),
        catchError(this.handleError<User>('addUser'))
      );
  }

  deleteUser(user: User | string): Observable<User> {
    const username = typeof user === 'string' ? user : user.username;
    const url = `${this.userURL}/${username}`;

    return this.http.delete<User>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted user username=${username}`)),
        catchError(this.handleError<User>('deleteUser'))
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
