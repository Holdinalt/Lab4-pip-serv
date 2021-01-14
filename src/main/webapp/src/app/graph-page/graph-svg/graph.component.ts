import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import * as $ from 'jquery';
import {Shot} from '../../models/Shot';


@Component({
  selector: 'graph-svg',
  templateUrl: 'graph.component.html',
  styleUrls: ['graph.component.css']
})
export class GraphComponent implements OnInit{

  @Input() mode = '';

  ngOnInit(): void {
    this.lenY = Math.round($('#graph-svg').height());
    this.lenX = Math.round($('#graph-svg').width());
  }

  lenY: number;
  lenX: number;

  R: number;

  constructor() {
    this.R = +1;
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClicked = new EventEmitter<Shot>();

  makeHit(x: number, y: number, r: number): void{
    this.onClicked.emit(new Shot(x, y, r));
  }

  svgClick(event): void{
    const target = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - target.left;
    const y = event.clientY - target.top;
    this.setNewCircle(x / (this.lenX/300) , y / (this.lenY/300));
    this.clickButton();
  }

  setNewCircle(px: number, py: number): void{
    px = this.clipX(px);
    py = this.clipY(py);
    document.getElementById('points').appendChild(this.makeSVGEl('circle', {
      cx: String(px),
      cy: String(py),
      fill: 'red',
      r: 4
    }));
  }

// tslint:disable-next-line:typedef // работает в координатах 300х300
    clipX(xps): number{
    const clipx: number = xps - 150;
    let koef: number = clipx / (100 / this.R);
    // console.log(this.R);
    if (koef < -5) { koef = -5; }
    if (koef > 3) { koef = 3; }
    return  koef * (100 / this.R) + 150;
  }

    clipY(yps: number): number{ // работает в координатах 300х300
    const clipy: number = yps - 150;
    let koef: number = clipy / (100 / this.R); // scale
    if (koef < -5) { koef = -5; }
    if (koef > 3) { koef = 3; }
    return koef * (100 / this.R) + 150;
  }

  makeSVGEl(tag: string, attrs: any): Element {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) {
      el.setAttribute(k, attrs[k]);
    }
    return el;
  }

  svgPointMove(event): void{
    const target = event.currentTarget.getBoundingClientRect();
    let x: number = event.clientX - target.left;
    let y: number = event.clientY - target.top;
    y = y/(this.lenY/300);
    x = x/(this.lenX/300);
    //console.log(x);
    this.drawCircle(x, y);
    if (x < 0) { x = 0; }
    if (y < 0) { y = 0; }
    const posX = x - 150;
    const posY = 150 - y;
    this.R = this.getR();
    x = this.makeX(posX);
    y = this.makeY(posY);
    // this.setX(x);
    // console.log('X=' + x);
    // console.log('Y=' + y);
    // $('#yInput').val(y);
    this.makeHit(x, y, this.R);
    $('#answer').html( x + ', ' + y);
  }

  drawCircle(xps: number, yps: number): void{
    xps = this.clipX(xps);
    yps = this.clipY(yps);
    $('#cursorDot').attr('fill', 'red');
    $('#cursorDot').attr('cx', xps);
    $('#cursorDot').attr('cy', yps);
    $('#cursorDot').attr('fill-opacity', '1');
  }

  getR(): number{
    let r: number = +$('#rInput').text();
    if (r == 0){ r = 1; }
    // console.log('R=' + r);
    return r;
  }

  makeX(xps: number): number{
    let x = (xps / (100 / this.R));
    if (x < -5) { x = -5; }
    if (x > 3) { x = 3; }
    return x;
  }

  makeY(yps: number): number{
    let y = yps / (100 / this.R);
    if (y < -3) { y = -3; }
    if (y > 5) { y = 5; }
    return y;
  }

  setX(x: number): void{
    $('#xSlider').attr('ng-reflect-model', x);
  }

  clickButton(): void{
    if(this.mode == 'Edit'){
      $('#addPointButton').click();
    }else{
      $('#submitFormButton').click();
    }
  }
}
