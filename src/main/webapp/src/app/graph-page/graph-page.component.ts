import { Component } from '@angular/core';
import {Shot} from '../models/Shot';



@Component({
  selector: 'app-graph-page',
  template: `
    <log-out></log-out>
    <graph-svg (onClicked)="shot = $event" [mode]="mode"></graph-svg>
    <app-form [shot]="shot" ></app-form>
    <req-table></req-table>
    <graph-edit [shot]="shot" (Mode)="mode = $event" ></graph-edit>
  `,
  //styleUrls: ['graph.component.css']
})
export class GraphPageComponent {

  shot = new Shot();
  mode = '';



}
