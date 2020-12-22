import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GraphComponent} from './graph.component';

@NgModule({
  imports: [BrowserModule],
  exports: [
    GraphComponent
  ],
  declarations: [GraphComponent]
})
export class GraphSvgModule {}
