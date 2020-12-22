import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'date-face',
  template: `
    <div class="block">
      <div>
        <div class="date">
          <span id="day-name">Day</span>,
          <span id="month">Month</span>,
          <span id="day-number">00</span>,
          <span id="year">Year</span>
        </div>
        <div class="time">
          <span id="hour">00</span>
          <span>:</span>
          <span id="minutes">00</span>
          <span>:</span>
          <span id="seconds">00</span>
          <span id="period">AM</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['date-face.component.css']
})

export class DateFaceComponent implements OnInit{
  name = '';

  ngOnInit(): void {
    const interval = 6000;

    showDateTime();
    setInterval(showDateTime, interval);

    function toNormalDigit(digit): string {
      const str = digit.toString();
      if (str.length === 1) {
        return `0${str}`;
      }
      return str;
    }


    // tslint:disable-next-line:typedef
    function showDateTime() {

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const date = new Date();

      let hours = date.getHours();
      const period = hours >= 12 ? 'PM' : 'AM';

      if (hours === 0) { hours = 12; }
      if (hours > 12) { hours = hours - 12; }

      $('#day-name').text(days[date.getDay()]);
      $('#month').text(months[date.getMonth()]);
      $('#day-number').text(toNormalDigit(date.getDate()));
      $('#year').text(date.getFullYear());
      $('#hour').text(toNormalDigit(hours));
      $('#minutes').text(toNormalDigit(date.getMinutes()));
      $('#seconds').text(toNormalDigit(date.getSeconds()));
      $('#period').text(period);
    }
  }
}
