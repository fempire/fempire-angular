import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LatLngLiteral } from '@agm/core';
import { Geokit } from 'geokit';
import * as Fuse from 'fuse.js';
import 'rxjs/add/operator/first';

import { LocationService, GeofireService, ProfilesService } from '../core/services';

@Component({
  selector: 'fem-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit, OnDestroy {
  private _lastLocation: LatLngLiteral = { lat: 0, lng: 0 };
  private _geoKit: Geokit = new Geokit();
  private _items: any[] = [];
  private _itemsOriginal: any[] = [];
  private _itemsSubscription: Subscription;
  private _lastOpen: string;
  private _map: any;
  private _markers: Observable<any[]>;
  private _person: Observable<any>;
  @ViewChild('searchBar') searchBar: ElementRef;

  constructor(private _gfs: GeofireService, private _ls: LocationService, private _ps: ProfilesService, private _router: Router) {
    this._markers = this._gfs.speakers;
  }

  ngOnInit() {
    this._itemsSubscription = this._ps.speakers.subscribe((items: any[]) => {
      this._itemsOriginal = items;
      this.search(this.searchBar.nativeElement.value);
    });
  }

  ngOnDestroy() {
    this._ls.updatingStart();
    this._itemsSubscription.unsubscribe();
  }

  get coordsMap(): Observable<LatLngLiteral> {
    return this._ls.mapCenter;
  }

  get coordsUser(): Observable<LatLngLiteral> {
    return this._ls.coordinates;
  }

  get items(): any[] {
    return this._items;
  }

  get map(): any {
    return this._map;
  }

  get markers(): Observable<any[]> {
    return this._markers;
  }

  get person(): Observable<any> {
    return this._person;
  }

  get updating(): Observable<boolean> {
    return this._ls.updating;
  }

  set map(active: any) {
    this._map = active;
  }

  public centerChange(coordinates: LatLngLiteral): void {
    this._lastLocation = coordinates;

    this.coordsUser.first().subscribe((coords: LatLngLiteral) => {
      if (this._geoKit.distance(coordinates, coords) > 0.05) { this._ls.updateMapCenter(this._lastLocation); }
    });
  }

  public clickedMarker(id: string): void {
    // this._router.navigate(['/', 'profile', marker.$key]);
    this._person = this._ps.findById(id);
    this._lastOpen = id;
  }

  public isOpen(id: string): boolean {
    return (this._lastOpen === id);
  }

  public search(query: string): void {
    if (!this._itemsOriginal || this._itemsOriginal.length < 1) { return; }
    if (!query || query.length === 0) {
      this._items = [...this._itemsOriginal];
      return;
    }
    const searcher = new Fuse(this._itemsOriginal, { keys: ['name'], threshold: 0.4 });
    this._items = searcher.search(query);
  }

  public swipe(event: any): void {
    this._ls.updatingStop();
  }

  public toggleWatch(): void {
    this._ls.updating.first().subscribe((state: boolean) => {
      (state) ? this._ls.updatingStop() : this._ls.updatingStart();
    });
  }

  public trackByFn(index: number, item: any): string {
    return item.$key;
  }
}
