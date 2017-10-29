import { Injectable } from '@angular/core';

import { Speaker } from '../speaker';
import { SPEAKERS } from './mock-speaker';
@Injectable()

export class SpeakerService {

  constructor() { }
  getSpeakers(): Speaker[] {
    return SPEAKERS;
  }
}
