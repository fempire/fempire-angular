import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OrganizersRoutingModule } from './organizers-routing.module';
import { OrganizersComponent } from './organizers.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrganizersRoutingModule
  ],
  declarations: [OrganizersComponent]
})
export class OrganizersModule { }
