import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopupComponent } from './components/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, PopupComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
