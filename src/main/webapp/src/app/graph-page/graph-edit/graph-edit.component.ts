import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shot} from "../../models/Shot";
import {ShotResult} from "../../models/ShotResult";
import {GraphEditService} from "./graph-edit.service";

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

  cords: Array<PairXY> = [];
}

@Component({
  selector: 'graph-edit',
  templateUrl: 'graph-edit.component.html',
  styleUrls: ['graph-edit.component.css'],
  providers: [GraphEditService]
})
export class GraphEditComponent implements OnInit{

  constructor(private graphEditService: GraphEditService) {
  }

  ngOnInit(): void {
  }

  @Output() Mode = new EventEmitter<String>();

  nowMode = 'Work';

  switchMode(){
    if(this.nowMode == 'Work'){
      this.Mode.emit('Edit');
      this.nowMode = 'Edit';
    }else {
      this.Mode.emit('Work');
      this.nowMode = 'Work';
    }
  }

  @Input() shot = new Shot(0, 0, 1);

  private myNewPolygon = new newPolygon();

  addPoint(){
    this.myNewPolygon.cords.push(new PairXY(this.shot.x, this.shot.y))
  }

  addPointToTable(){
    const tempTr = document.createElement('tr');
    tempTr.innerHTML = this.makeTable(this.shot.x, this.shot.y);
    document.getElementById('editTable').append(tempTr);
    this.createCircleFromValue(this.shot.x, this.shot.y);
    this.myNewPolygon.cords.push(new PairXY(this.shot.x, this.shot.y));
  }

  makeTable(x: number, y: number): string{
    return `
        <td>` + x + `
        </td>
        <td>` + y + `
        </td>
      `;
  }

  createCircleFromValue(x: number, y: number): void{
    const xpos = x * 100 + 150;
    const ypos = y * 100 * -1 + 150;
    let col = 'blue';
    document.getElementById('editPoints').appendChild(this.makeSVGEl('circle', {
      cx: String(xpos),
      cy: String(ypos),
      fill: String(col),
      r: 4
    }));
  }

  makeSVGEl(tag: string, attrs: any): Element {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) {
      el.setAttribute(k, attrs[k]);
    }
    return el;
  }

  clear(){
    if(this.nowMode == 'Edit'){
      this.switchMode();
      document.getElementById('newPolygon').remove();
      var paras = document.getElementsByClassName('graph-shape'); //возвращаем классические плоскости
      for(let i = 0; i < paras.length; i++){
        paras[i].setAttribute('opacity', '50%')
      }
    }
  }

  clearTable(){

  }

  startEdit(){
    var paras = document.getElementsByClassName('graph-shape'); //чистим свг от предыдущих плоскостей
    for(let i = 0; i < paras.length; i++){
      paras[i].setAttribute('opacity', '0%')
    }
    this.switchMode();
  }


}
