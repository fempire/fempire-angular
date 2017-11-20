import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ApplyComponent } from './apply/apply.component';

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule
  ],
  declarations: [
    NavbarComponent,
    SignInComponent,
    ApplyComponent
  ],
  exports: [
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    NavbarComponent,
    SignInComponent,
    ApplyComponent
  ],
  entryComponents: [
    SignInComponent,
    ApplyComponent
  ]
})
export class SharedModule { }
