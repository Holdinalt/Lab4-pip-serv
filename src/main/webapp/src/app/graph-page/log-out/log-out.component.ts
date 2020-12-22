import {Component} from '@angular/core';
import {LogOutService} from './log-out.service';


@Component({
  selector: 'log-out',
  template: `<div class="block">
  <h2>Здравствуйте,</h2>
    <h1 style="color: green">{{sesStorage.getItem('LoginnedLogin')}}</h1>
  <p (click)="logOut()" style="color: blue; font-size: 150%">ВЫЙТИ</p>
  </div>
  `,
  styleUrls: ['log-out.component.css'],
  providers: [LogOutService]
})
export class LogOutComponent{

  public sesStorage = sessionStorage;

  constructor( private logOutService: LogOutService) { }

  logOut(): void{
    this.logOutService.logOut();
  }

}
