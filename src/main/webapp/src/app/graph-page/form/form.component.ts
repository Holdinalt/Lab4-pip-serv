import {Component, Input} from '@angular/core';
import {Shot} from '../../models/Shot';
import {ShotService} from './shot.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
  providers: [ShotService]
})
export class FormComponent{
  @Input() shot = new Shot(0, 0, 1);

  R = 1;

  constructor(private shotService: ShotService) {
  }

  makeShot(): void{
    this.shotService.makeShot(this.shot);
  }

  getR(): number{
    let r: number = +$('#rInput').text();
    if (r == 0){ r = 1; }
    // console.log('R=' + r);
    return r;
  }

  resetR(): void{
    const hereR = this.R;
    const newR = this.getR();
    if (Number(newR) === Number(this.R)) { return; }
    $('#points').find('*').each(function(){
      const koef = newR / hereR;
      const newElem = $(this);
      // @ts-ignore
      const newcx = (newElem.attr('cx') - 150) / koef + 150;
      // @ts-ignore
      const newcy = (newElem.attr('cy') - 150) / koef + 150;
      // console.log(newcx);
      // console.log(newcy);
      newElem.attr('cx', newcx);
      newElem.attr('cy', newcy);
    });
    this.R = newR;
  }
}
