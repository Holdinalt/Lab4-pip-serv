import {Injectable} from '@angular/core';
import * as request from 'superagent';
import {Router} from '@angular/router';

@Injectable()
export class LogOutService{

  constructor( private router: Router) { }

  logOut(): any{
    request
      .post('http://localhost:6520/api/authorization/logout')
      .withCredentials()
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        console.log(res);
        this.router.navigate(['']);
        sessionStorage.setItem('LoginnedLogin', '');
        sessionStorage.setItem('loginned', 'false');
      });
  }
}
