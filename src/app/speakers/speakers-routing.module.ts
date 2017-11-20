import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeakersComponent } from './speakers.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: SpeakersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakersRoutingModule { }
