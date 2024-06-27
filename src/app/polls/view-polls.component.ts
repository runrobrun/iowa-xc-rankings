import {Component, inject} from '@angular/core';
import {PollsService} from './polls.service';
import {Observable} from 'rxjs';
import {Poll} from './poll';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-polls',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MatIconButton,
    MatMiniFabButton,
    RouterLink,
    MatIcon,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './view-polls.component.html',
  styleUrl: './view-polls.component.css'
})
export class ViewPollsComponent {
  currentSeason = new Date().getFullYear()
  private _pollsService = inject(PollsService);

  polls$: Promise<Poll[]> | undefined;
  loading: boolean = false;

  constructor() {
    this.getPolls();
  }

  async getPolls() {
    this.loading = true;
    this.polls$ = this._pollsService.getAllPolls();
    await this.polls$;
    this.loading = false;
  }

  editClassification(poll: Poll) {
    console.log(poll);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this Poll?')) {
      this._pollsService.deletePoll(id);
      this.getPolls();
    }
  }
}
