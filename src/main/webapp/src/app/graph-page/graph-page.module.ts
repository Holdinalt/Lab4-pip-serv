import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GraphPageComponent} from './graph-page.component';
import {GraphSvgModule} from './graph-svg/graph-svg,module';
import {FormModule} from './form/form.module';
import {HttpClientModule} from '@angular/common/http';
import {LogOutModule} from './log-out/log-out.module';
import {RequestTableModule} from './requests-table/request-table.module';

@NgModule({
    imports: [BrowserModule, FormModule, GraphSvgModule, HttpClientModule, LogOutModule, RequestTableModule],
  declarations: [ GraphPageComponent]
})
export class GraphPageModule {}
