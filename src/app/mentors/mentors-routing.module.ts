import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorsComponent } from './mentors.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: MentorsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorsRoutingModule { }
