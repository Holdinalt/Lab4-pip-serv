import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShotService} from '../form/shot.service';
import {RequestTableService} from './request-table.service';
import {Shot} from '../../models/Shot';

@Component({
  selector: 'req-table',
  templateUrl: 'request-table.component.html',
  styleUrls: ['request-table.component.css'],
  providers: [RequestTableService]
})
export class RequestTableComponent implements OnInit{

  constructor(private requestTableService: RequestTableService) {
  }

  getRequests(): void{
    this.requestTableService.getRequests();

  }

  ngOnInit(): void {
    this.getRequests();
  }
}
