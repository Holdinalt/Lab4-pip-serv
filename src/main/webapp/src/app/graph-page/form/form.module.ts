import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {FormComponent} from './form.component';

import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, SliderModule, InputTextModule, ButtonModule, RippleModule],
  exports: [FormComponent],
  declarations: [FormComponent]
})
export class FormModule {}
