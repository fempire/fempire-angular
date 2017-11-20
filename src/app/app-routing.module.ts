import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ProfileGuard } from './core/guards';

const routes: Routes = [{
  path: '',
  loadChildren: 'app/home/home.module#HomeModule',
}, {
  path: 'profile',
  loadChildren: 'app/profile/profile.module#ProfileModule',
  canActivateChild: [ProfileGuard]
}, {
  path: 'mentors',
  loadChildren: 'app/mentors/mentors.module#MentorsModule',
}, {
  path: 'organizers',
  loadChildren: 'app/organizers/organizers.module#OrganizersModule',
}, {
  path: 'speakers',
  loadChildren: 'app/speakers/speakers.module#SpeakersModule',
}, {
  path: 'organizations',
  loadChildren: 'app/organizations/organizations.module#OrganizationsModule',
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
