import {Injectable} from "@angular/core";
import {Shot} from "../../models/Shot";
import {ShotResult} from "../../models/ShotResult";
import * as request from 'superagent';

export class PairXY{

  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
  }

  X:number;
  Y:number;

}

export class newPolygon{

  R: number = 1;

  cords: Array<PairXY>;
}

@Injectable()
export class GraphEditService{

  makeShot(poly: newPolygon): void{
    request
      .post('http://localhost:6520/api/shots') //TODO
      .withCredentials()
      .set('X-Requested-With', 'XMLHttpRequest')
      .send(JSON.stringify(poly))
      .type('json')
      .end((err, res) => {
        if (res.ok) {
          this.makePoly(poly);
        } else if (res.status === 401) {
          console.log('Проблемы с полигоном после сервера')
        }
      });
  }

  makePoly(poly: newPolygon){
    let cordsStr = '';
    poly.cords.forEach((value) => {
      const xpos = value.X * 100 + 150;
      const ypos = value.Y * 100 * -1 + 150;
      cordsStr += xpos + ',' + ypos + ' ';
    })

    document.getElementById('graph-svg').appendChild(this.makePolySvg(cordsStr));
  }

  makePolySvg(cordsStr: string){
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    el.setAttribute('id', 'newPolygon')
    el.setAttribute('points', cordsStr);
    el.setAttribute('fill', 'blue')
    el.setAttribute('opacity', '50%')
    el.setAttribute('class', 'graph-shape')
    return el;
  }

  clear(){
    
  }
}
