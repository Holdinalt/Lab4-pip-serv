import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GraphEditComponent} from "./graph-edit.component";
import {FormsModule} from "@angular/forms";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
  imports: [BrowserModule, FormsModule, SliderModule, InputTextModule, ButtonModule, RippleModule],
  exports: [GraphEditComponent],
  declarations: [GraphEditComponent]
})
export class GraphEditModule {}
