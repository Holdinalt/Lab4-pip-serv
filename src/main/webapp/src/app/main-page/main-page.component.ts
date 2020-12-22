import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `
    <clock-face></clock-face>
    <date-face></date-face>
    <auth-form></auth-form>
  `,
})
export class MainPageComponent {
  name = '';
}
