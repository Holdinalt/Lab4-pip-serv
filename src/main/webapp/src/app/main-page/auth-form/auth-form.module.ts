import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthFormComponent} from './auth-form.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, ButtonModule, InputTextModule, FormsModule, HttpClientModule],
  exports: [AuthFormComponent],
  declarations: [AuthFormComponent]
})
export class AuthFormModule {

}
