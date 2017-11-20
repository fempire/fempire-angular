import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrganizationsRoutingModule
  ],
  declarations: [OrganizationsComponent]
})
export class OrganizationsModule { }
