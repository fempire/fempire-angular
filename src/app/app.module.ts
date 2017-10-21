import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FempireMaterialModule } from './app.material.module'

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeakerService } from './service/speaker.service';


@NgModule({
  declarations: [
    AppComponent,
    SpeakerComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FempireMaterialModule
  ],
  providers: [SpeakerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
