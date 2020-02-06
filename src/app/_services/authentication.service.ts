import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/signin`, {
        username: username,
        password: password
      })
      .pipe(
        map(userFromApi => {
          const user: User = {
            id: -1,
            username: userFromApi.username,
            password: '',
            firstName: '',
            lastName: '',
            token: userFromApi.accessToken,
            authorities: userFromApi.authorities,
            tokenType: userFromApi.tokenType
          };
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  signin(
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string
  ) {
    const user = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password
    };
    console.log('user', user);

    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/signup`, user)
      .pipe(
        map(userFromApi => {
          console.log('???', userFromApi);

          return userFromApi;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
