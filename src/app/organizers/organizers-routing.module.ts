import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizersComponent } from './organizers.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: OrganizersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizersRoutingModule { }
