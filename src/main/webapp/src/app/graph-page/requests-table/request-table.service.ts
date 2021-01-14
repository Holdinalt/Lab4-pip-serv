import {Injectable} from '@angular/core';
import * as request from 'superagent';
import {Router} from '@angular/router';
import {ShotResult} from '../../models/ShotResult';
import * as $ from 'jquery';
import {templateJitUrl} from "@angular/compiler";

@Injectable()
export class RequestTableService{

  constructor( private router: Router) { }

  makeTable(shot: ShotResult): string{
    return `
        <td>` + shot.x + `
        </td>
        <td>` + shot.y + `
        </td>
        <td>` + shot.r + `
        </td>
        <td>` + this.makeResult(shot.result) + `
        </td>
      `;
  }

  makeResult(value: boolean): string{
    if (value){
      return 'Yes';
    } else {
      return 'No';
    }
  }

  getRequests(): void{
    request
      .get('http://localhost:6520/api/shots')
      .withCredentials()
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        if (res.ok) {
          console.log(JSON.parse(res.text));
          const shotRes = JSON.parse(res.text) as ShotResult[];
          shotRes.forEach((value) => {
            const tempTr = document.createElement('tr');
            tempTr.innerHTML = this.makeTable(value);
            document.getElementById('ansTable').append(tempTr);
            this.createCircleFromValue(value.x, value.y, value.r, value.result);
          });
        } else if (res.status === 401) {
          console.log(res);
          this.router.navigate(['']);
        }
      });
  }

  createCircleFromValue(x: number, y: number, nr: number , result: boolean): void{

    if (nr < 0){
      x = -x;
      y = -y;
    }

    const xpos = x * 100 / Math.abs(this.getR()) + 150;
    const ypos = (y * 100 / Math.abs(this.getR()) * -1) + 150;
    let col;
    if (result){
      col = 'green';
    }else {
      col = 'red';
    }
    document.getElementById('points').appendChild(this.makeSVGEl('circle', {
      cx: String(xpos),
      cy: String(ypos),
      fill: String(col),
      r: 4
    }));
  }

  getR(): number{
    let r: number = +$('#rInput').text();
    if (r == 0){ r = 1; }
    // console.log('R=' + r);
    return r;
  }

  makeSVGEl(tag: string, attrs: any): Element {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) {
      el.setAttribute(k, attrs[k]);
    }
    return el;
  }
}
