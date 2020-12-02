import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarTabDisplayComponent } from './components/bar-tab-display/bar-tab-display.component';

@NgModule({
  declarations: [
    AppComponent,
    BarTabDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
