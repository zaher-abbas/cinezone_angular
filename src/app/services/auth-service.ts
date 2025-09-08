import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000';


  constructor(private http: HttpClient) {

  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.API_URL + '/users', {name, email, password});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.API_URL + "/login", {email, password},
      {
        withCredentials: true
      }
    )
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.API_URL + '/profile',
      {
        withCredentials: true
      });
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.API_URL + '/logout', null,
      {
        withCredentials: true
      });
  }

}
