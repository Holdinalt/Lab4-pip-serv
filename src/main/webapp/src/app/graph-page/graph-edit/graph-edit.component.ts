import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shot} from "../../models/Shot";
import {GraphEditService} from "./graph-edit.service";
import {PairXY} from "../../models/PairXY";
import {newPolygon} from "../../models/newPolygon";




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

  sendEdits(){
    console.log(this.myNewPolygon.getCords());
    this.graphEditService.sendEdits(this.myNewPolygon);
    this.switchMode();
  }

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
    this.myNewPolygon.cords.push(new PairXY(this.getXFromShot(), this.getYFromShot()));
    this.addPointToTable();
  }

  addPointToTable(){
    console.log('Adding point to table')
    const tempTr = document.createElement('tr');
    tempTr.setAttribute('class', 'editPoint')
    tempTr.innerHTML = this.makeTable(this.getXFromShot(), this.getYFromShot());
    document.getElementById('editTable').append(tempTr);
    this.createCircleFromValue(this.getXFromShot(), this.getYFromShot());
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
      class: 'editDots',
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
    console.log('Clearing')

    this.myNewPolygon = new newPolygon();

    this.switchMode();
    var paras = document.getElementsByClassName('graph-shape'); //чистим свг от предыдущих плоскостей
    for(let i = 0; i < paras.length; i++){
      paras[i].setAttribute('opacity', '50%')
    }
    if(document.getElementById('newPolygon') != null){
      document.getElementById('newPolygon').remove();
    }

    paras = document.getElementsByClassName('editDots');
    if(paras != null){
      for(let i = 0; i < paras.length; i++){
        paras[0].remove();
      }
    }

    this.clearTable();
    this.graphEditService.clear();
    if(this.nowMode == 'Edit'){
      this.switchMode();
    }
  }

  clearTable(){
    var paras = document.getElementsByClassName('editPoint');
    if(paras != null){
      for(let i = 0; i < paras.length; i++){
        paras[0].remove();
        paras[0].remove(); //хз почему 2 раза, но чистит
      }
    }
  }


  startEdit(){
    console.log('Edit started')
    var paras = document.getElementsByClassName('graph-shape'); //чистим свг от предыдущих плоскостей
    for(let i = 0; i < paras.length; i++){
      paras[i].setAttribute('opacity', '0%')
    }
    this.switchMode();
  }

  getXFromShot(){
    if(this.shot.r > 0){
      return this.shot.x / Math.abs(this.shot.r);
    }else {
      return -1 * this.shot.x / Math.abs(this.shot.r);
    }

  }

  getYFromShot(){
    if(this.shot.r > 0){
      return this.shot.y / Math.abs(this.shot.r);
    } else {
      return -1 * this.shot.y / Math.abs(this.shot.r);
    }

  }

}
