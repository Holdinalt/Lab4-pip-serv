import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'clock-face',
  template: `
    <div class="block">
      <div class="clock">
        <div class="wrap">
          <span class="hour"></span>
          <span class="minute"></span>
          <span class="second"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['clock-face.component.css']
})
export class ClockFaceComponent implements OnInit{
  name = '';

  ngOnInit(): void {
    const interval = 6000;

    showClock();
    setInterval(showClock, interval);

    // tslint:disable-next-line:typedef
    function showClock(){

      const date = new Date();

      const hour = ((date.getHours() + 11) % 12 + 1) * 30;
      const minute = date.getMinutes() * 6;
      const second = date.getSeconds() * 6;

      $('.hour').css('transform', `rotate(${hour}deg)`);
      $('.minute').css('transform', `rotate(${minute}deg)`);
      $('.second').css('transform', `rotate(${second}deg)`);
    }
  }
}
