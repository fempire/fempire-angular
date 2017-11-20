import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MentorsRoutingModule } from './mentors-routing.module';
import { MentorsComponent } from './mentors.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MentorsRoutingModule
  ],
  declarations: [MentorsComponent]
})
export class MentorsModule { }
