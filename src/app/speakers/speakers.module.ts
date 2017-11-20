import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { SpeakersRoutingModule } from './speakers-routing.module';
import { SpeakersComponent } from './speakers.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SpeakersRoutingModule
  ],
  declarations: [SpeakersComponent]
})
export class SpeakersModule { }
