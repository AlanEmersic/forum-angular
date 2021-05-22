import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken } from './jwt-token.model';
import { UserCredentials } from './user-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticate(userCredentials: UserCredentials): Observable<JwtToken> {
    const url = 'http://localhost:8080';
    return this.http.post<JwtToken>(`${url}/api/authenticate`, userCredentials);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
