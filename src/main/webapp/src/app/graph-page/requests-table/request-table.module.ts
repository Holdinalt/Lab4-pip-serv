import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RequestTableComponent} from './request-table.component';

@NgModule({
  imports: [BrowserModule],
  exports: [RequestTableComponent],
  declarations: [RequestTableComponent]
})
export class RequestTableModule {}
