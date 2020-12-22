import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as request from 'superagent';
import {User} from '../../models/User';
import {Router} from '@angular/router';


@Injectable()
export class AuthFormService{

  private loginnedLogin = "";

  private loggedInStatus = false;

  constructor(private http: HttpClient, private router: Router) { }

  setLoggedIn(value: boolean): void{
    this.loggedInStatus = value;
    sessionStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn(): boolean{
    return this.loggedInStatus;
  }

  tryToLogin(user: User): Observable<any>{
    const myHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '/')
      .set('Referrer-Policy', 'strict-origin-when-cross-origin')
      .set('Content-Type', 'application/json');

    // @ts-ignore
    return this.http.get<any>('http://localhost:6520/api/authorization/signin', user, {headers: myHeaders, responseType: 'text'});
  }

  superAgentLogin(user: User): any{
    request
      .get('http://localhost:6520/api/authorization/signin')
      .auth(user.login, user.password)
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        console.log(res);
        if (res.ok){
          this.loggedInStatus = true;
          this.loginnedLogin = user.login;
          sessionStorage.setItem('LoginnedLogin', user.login.toString());
          sessionStorage.setItem('loginned', 'true');
          this.router.navigate(['graph']);

        }
      });
  }

}
