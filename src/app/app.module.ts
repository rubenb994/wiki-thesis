import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopupComponent } from './components/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { IntroComponent } from './components/intro/intro.component';
import { OutroComponent } from './components/outro/outro.component';
import { MapComponent } from './components/map/map.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
@NgModule({
  declarations: [AppComponent, PopupComponent, IntroComponent, OutroComponent, MapComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressBarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
