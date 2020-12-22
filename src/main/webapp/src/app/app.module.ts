import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {GraphPageModule} from './graph-page/graph-page.module';
import {GraphPageComponent} from './graph-page/graph-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {MainPageModule} from './main-page/main-page.module';
import {APP_BASE_HREF} from "@angular/common";

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'graph', component: GraphPageComponent}
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), GraphPageModule, MainPageModule],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/api'}]
})
export class AppModule { }
