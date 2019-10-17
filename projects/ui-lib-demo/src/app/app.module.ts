import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiChartsModule } from 'ui-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
