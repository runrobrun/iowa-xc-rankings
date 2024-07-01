import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule, MatSuffix} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {Timestamp} from '@firebase/firestore'
import {MatDatepickerModule, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Poll} from './poll';
import {PollsService} from './polls.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSuffix,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggle,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions
  ],
  templateUrl: './create-poll.component.html',
  styleUrl: './create-poll.component.css',
  providers: [MatDatepickerModule]
})
export class CreatePollComponent {

  pollForm = this.fb.group({
    pollTitle: ['', Validators.required],
    openDate: [null],
    deadline: [null],
    finalized: [],
    season: null
  });

  constructor(private fb: FormBuilder,
              private _pollsService: PollsService,
              private router: Router) {
  }

  onCreatePoll() {
    const val = this.pollForm.value;
    const newPoll: Partial<Poll> = {
      finalized: false,
      pollTitle: val.pollTitle,
      season: new Date().getFullYear()
    }

    newPoll.openDate = Timestamp.fromDate(this.pollForm.value.openDate);
    newPoll.deadline = Timestamp.fromDate(this.pollForm.value.deadline);

    this._pollsService.createPoll(newPoll).then(() => {
      this.router.navigate(['/polls'])
    });
  }
}
