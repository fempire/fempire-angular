import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as Fuse from 'fuse.js';
import 'rxjs/add/operator/first';

import { ProfilesService, UserService, IUser, IProfile, IProfileUpdate } from '../core/services';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'fem-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _edit: boolean;
  public editing: IProfileUpdate = {
    location: '',
    about: '',
    social: {},
    topics: []
  };
  private _idSubscription: Subscription;
  private _profile: Observable<IProfile>;
  private _self: boolean;
  private _topics: string[] = [];
  private _topicsOriginal: string[] = [];
  @ViewChild('topicsSearchBar') topicsSearchBar: ElementRef;
  private _topicsSubscription: Subscription;
  private _userSubscription: Subscription;

  constructor(private _us: UserService, private _ps: ProfilesService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this._self = false;
        this._profile = this._ps.findById(id);
      } else {
        this._userSubscription = this._us.user.subscribe((user: IUser) => {
          if (!user) { return; }
          this._self = true;
          this._profile = this._ps.findById(user.uid);
          this._profile.first().subscribe((profile: IProfile) => {
            this.editing = {
              location: profile.location,
              about: profile.about,
              social: (profile.social) ? profile.social : {},
              topics: (profile.topics) ? [...profile.topics] : []
            };
          });
        });
      }
    });

    this._topicsSubscription = this._ps.topics.subscribe((topics: any[]) => {
      this._topicsOriginal = topics;
      this.topicsSearch(this.topicsSearchBar.nativeElement.value);
    });
  }

  ngOnDestroy() {
    this._idSubscription.unsubscribe();
    if (this._userSubscription) { this._userSubscription.unsubscribe(); }
  }

  get edit(): boolean {
    return this._edit;
  }

  get profile(): Observable<any> {
    return this._profile;
  }

  get self(): boolean {
    return this._self;
  }

  get topics(): any[] {
    return this._topics.slice(0, 10);
  }

  set edit(edit: boolean) {
    if (this.self) {
      if (!edit) {
        this._us.updateProfile(this.editing);
      }
      this._edit = edit;
    }
  }

  public addTopic(topic: string): void {
    this.editing.topics.forEach((item: string) => {
      if (topic.toUpperCase() === item.toUpperCase()) { return; }
    });
    this.editing.topics.push(topic);
    this.topicsSearchBar.nativeElement.value = '';
    this.topicsSearch('');
  }

  public removeTopic(index: number): void {
    this.editing.topics.splice(index, 1);
  }

  public topicsSearch(query: string): void {
    if (!this._topicsOriginal || this._topicsOriginal.length < 1) { return; }
    if (!query || query.length === 0) {
      this._topics = [...this._topicsOriginal];
      return;
    }
    const searcher = new Fuse(this._topicsOriginal, { keys: ['topic'], threshold: 0.4 });
    this._topics = searcher.search(query);
  }
}
