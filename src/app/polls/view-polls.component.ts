import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {PollsService} from './polls.service';
import {Poll} from './poll';
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PollDialogComponent} from './poll-dialog.component';

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

  constructor(private dialog: MatDialog) {
    this.getPolls();
    this._pollsService.pollEdited.subscribe(
      () => {
        this.getPolls();
      }
    )
  }

  async getPolls() {
    this.loading = true;
    this.polls$ = this._pollsService.getAllPolls();
    await this.polls$;
    this.loading = false;
  }

  editPoll(poll: Poll) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';

    dialogConfig.data = poll;
    this.dialog
      .open(PollDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe()
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this Poll?')) {
      this._pollsService.deletePoll(id);
      this.getPolls();
    }
  }
}
