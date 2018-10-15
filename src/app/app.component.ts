import { Component } from '@angular/core';

import { SpeakerService } from './service/speaker.service';
import { Speaker } from './speaker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SpeakerService]
})
export class AppComponent {
  speakers: Speaker[];
  constructor(private speakerService: SpeakerService) {

  }

  ngOnInit(): void {
    this.getSpeakers();
  }

  getSpeakers(): void {
    this.speakers = this.speakerService.getSpeakers();
  }
}
