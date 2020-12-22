import {AfterViewInit, Component, ElementRef} from '@angular/core';

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
export class AppComponent implements AfterViewInit{
  constructor(private elementRef: ElementRef){}
  name = '';

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'gray';
  }
}
