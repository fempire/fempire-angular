import { LocationService } from './location.service';
export * from './location.service';
import { UserService } from './user.service';
export * from './user.service';
import { ProfilesService } from './profiles.service';
export * from './profiles.service';
import { ApplicationsService } from './applications.service';
export * from './applications.service';
import { GeofireService } from './geofire.service';
export * from './geofire.service';
import { OrganizationsService } from './organizations.service';
export * from './organizations.service';

export * from '../interfaces';

export const SERVICES: any[] = [
  LocationService,
  UserService,
  ProfilesService,
  ApplicationsService,
  GeofireService,
  OrganizationsService
];
