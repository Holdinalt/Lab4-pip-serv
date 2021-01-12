import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-app',
  template: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Hello Angular 11</title>
    </head>
    <body>
    <div>
      <nav><table width="100%">
        <tr>
          <td width="33%" align="center">
            <a routerLink="">Главная</a> |
            <a routerLink="graph">График</a>
          </td>
          <td width="33%" align="center">
          </td>
          <td width="33%" align="center">
            <span>Елохов Даниил P3213</span>
          </td>
        </tr>
      </table>
      </nav>
      <router-outlet></router-outlet>
    </div>
    </body>
    </html>`,
  styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  constructor(private elementRef: ElementRef, private router: Router){}
  name = '';


  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'gray';
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('loginned'));
    if (sessionStorage.getItem('loginned')) {
      this.router.navigate(['/graph']);
    }
  }
}
