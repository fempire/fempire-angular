import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SpeakerComponent } from './speaker.component';
import { Speaker } from '../speaker';

describe('SpeakerComponent', () => {
  let component: SpeakerComponent;
  let fixture: ComponentFixture<SpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpeakerComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerComponent);
    component = fixture.componentInstance;

    const speaker = new Speaker();
    speaker.website = 'http://example.com/';
    speaker.country = 'Germany';
    speaker.languages = ['German', 'English'];
    speaker.location = 'Test';
    speaker.name = 'Jane Doe';
    speaker.topics = ['TypeScript', 'Angular'];
    speaker.twitter = '@janedoe';

    component.speaker = speaker;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
