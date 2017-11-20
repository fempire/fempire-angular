import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Geokit } from 'geokit';
import * as firebase from 'firebase';
import * as GeoFire from 'geofire';

import { LocationService } from './location.service';
import { LatLngLiteral } from '../interfaces';


@Injectable()
export class GeofireService {
  private _dbRef: any;
  private _geoFire: any;
  private _geoKit: Geokit = new Geokit();
  private _mentors: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _organizers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _speakers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private _ls: LocationService) {
    const geofireMentors = new GeoFire(firebase.database().ref('geofire/mentors'));
    const geofireOrganizers = new GeoFire(firebase.database().ref('geofire/organizers'));
    const geofireSpeakers = new GeoFire(firebase.database().ref('geofire/speakers'));

    this._ls.mapCenter.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, this._mentors, geofireMentors);
      this._geoFetch(coords, this._organizers, geofireOrganizers);
      this._geoFetch(coords, this._speakers, geofireSpeakers);
    });
  }

  get mentors(): Observable<any[]> {
    return this._mentors.asObservable();
  }

  get organizers(): Observable<any[]> {
    return this._organizers.asObservable();
  }

  get speakers(): Observable<any[]> {
    return this._speakers.asObservable();
  }

  private _deviator(num: number): number {
    let multiplier = 1;
    const diff = (Math.floor(Math.random() * 10) / 50000);
    (Math.floor(Math.random()) === 1) ? multiplier += diff : multiplier -= diff;
    return num * multiplier;
  }

  private _geoFetch(coords: LatLngLiteral, store: BehaviorSubject<any[]>, geofire: GeoFire): void {
    const max = 50;
    geofire.query({
      center: [coords.lat, coords.lng],
      radius: 100
    }).on('key_entered', (key: string, result: any) => {
      result = {
        $key: key,
        coordinates: {
          lat: this._deviator(result[0]),
          lng: this._deviator(result[1])
        }
      };
      let people: any[] = [...store.value];
      if (people.find((place: any) => place.$key === result.$key)) { return; }
      people.push(result);
      people.map((person: any) => person.distance = this._geoKit.distance(coords, person.coordinates, 'miles'));
      people = this._quicksort(people);
      if (people.length > max) { people = people.slice(max); }
      store.next(people);
    });
  }

  private _quicksort(c: any[]): any[] {
    if (c.length <= 1) { return c; }
    const pivot: any = c.pop();
    const less: any[] = [];
    const more: any[] = [];
    c.forEach((val: any) => (pivot.distance > val.distance) ? less.push(val) : more.push(val));
    return [...this._quicksort(less), pivot, ...this._quicksort(more)];
  }
}
