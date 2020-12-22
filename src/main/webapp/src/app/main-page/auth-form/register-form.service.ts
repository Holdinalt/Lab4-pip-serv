import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as request from 'superagent';
import {User} from '../../models/User';
import {element} from 'protractor';


@Injectable()
export class RegisterFormService{



  constructor(private http: HttpClient) { }

  tryToRegister(user: User): Observable<any>{
    const myHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '/')
      .set('Referrer-Policy', 'strict-origin-when-cross-origin')
      .set('Content-Type', 'application/json');
    // @ts-ignore
    return this.http.post<any>('http://localhost:6520/api/authorization/signup', user, {headers: myHeaders, responseType: 'text'});
  }

  superAgentRegister(user: User): any{
    request
      .post('http://localhost:6520/api/authorization/signup')
      .withCredentials()
      .send(JSON.stringify({username: user.login, password: user.password}))
      .type('json')
      .end((err, res) => {
        if (res.ok){
          document.getElementById('regAns').innerText = 'Регистрация успешна';
        } else{
          document.getElementById('regAns').innerText = res.text;
        }
      });
  }

}
