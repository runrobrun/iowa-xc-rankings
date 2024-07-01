import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatCardActions} from '@angular/material/card';
import {Classification} from '../classifications/classification';
import {Poll} from './poll';
import {PollsService} from './polls.service';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-poll-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatHint,
    MatLabel,
    MatSuffix,
    MatSlideToggle,
    MatButton,
    MatDialogActions,
    NgIf,
    MatCardActions
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './poll-dialog.component.html',
  styleUrl: './poll-dialog.component.css'
})
export class PollDialogComponent {
  form: UntypedFormGroup;
  poll: Poll;

  constructor(
    private dialogRef: MatDialogRef<PollDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) poll: Poll,
    private pollsService: PollsService
  ) {
    this.poll = poll;
    this.form = this.fb.group({
      pollTitle: poll.pollTitle,
      openDate: poll.openDate.toDate(),
      deadline: poll.deadline.toDate(),
      finalize: poll.finalized,
      season: poll.season
    })
  }

  close() {
    this.dialogRef.close();
  }

  onSavePoll() {
    const changes = this.form.value;

    this.pollsService.updatePoll(this.poll.id, changes);
    this.dialogRef.close();
    // this.classificationsService.updateClassification(this.classification.id, changes);
    this.pollsService.pollEdited.emit();
    // this.dialogRef.close()
  }
}
