import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MainPageComponent} from './main-page.component';
import {ClockFaceModule} from './clock-face/clock-face.module';
import {DateFaceModule} from './date-face/date-face.module';
import {AuthFormModule} from './auth-form/auth-form.module';

@NgModule({
    imports: [BrowserModule, FormsModule, ClockFaceModule, DateFaceModule, AuthFormModule],
  declarations: [MainPageComponent]
})
export class MainPageModule {}
