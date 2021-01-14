import {Injectable} from "@angular/core";
import * as request from 'superagent';
import {newPolygon} from "../../models/newPolygon";


@Injectable()
export class GraphEditService{

  sendEdits(poly: newPolygon): void{
    request
      .post('http://localhost:6520/api/edit')
      .withCredentials()
      .set('X-Requested-With', 'XMLHttpRequest')
      .send(JSON.stringify({dots: poly.getCordsArray()}))
      .type('json')
      .end((err, res) => {
        if (res.ok) {
          console.log(res);
          console.log('Загрузка полигона успешна!');
          this.makePoly(poly);
        } else {
          console.log('Проблемы с полигоном после сервера');
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

    let paras = document.getElementsByClassName('editDots');
    if(paras != null){
      for(let i = 0; i < paras.length; i++){
        paras[0].remove();
        paras[0].remove();
      }
    }

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
    request
      .get('http://localhost:6520/api/edit')
      .withCredentials()
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        console.log(res);
        if(res.ok){
          console.log("Очистка на сервере успешна")
        }
      });
  }
}
