import {Component, inject} from '@angular/core';
import {PollsService} from './polls.service';
import {Observable} from 'rxjs';
import {Poll} from './poll';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-view-polls',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MatIconButton,
    MatMiniFabButton,
    RouterLink,
    MatIcon
  ],
  templateUrl: './view-polls.component.html',
  styleUrl: './view-polls.component.css'
})
export class ViewPollsComponent {
  currentSeason = new Date().getFullYear()
  private _pollsService = inject(PollsService);

  polls$: Promise<Poll[]> | undefined;

  constructor() {
    this.getPolls();
  }

  private getPolls() {
    this.polls$ = this._pollsService.getAllPolls();
  }

  editClassification(poll: Poll) {
    console.log(poll);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this Poll?')) {
      this._pollsService.deletePoll(id);
      this.getPolls();
      // this._classificationsService.deleteClassification(id);
      // this.getBoysClassifications();
      // this.getGirlsClassifications();
      // this._classificationsService.classificationEdited.emit();
    }
  }
}
