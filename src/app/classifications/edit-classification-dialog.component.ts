import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Classification} from './classification';
import {ClassificationsService} from './classifications.service';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-edit-classification-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './edit-classification-dialog.component.html',
  styleUrl: './edit-classification-dialog.component.css'
})
export class EditClassificationDialogComponent {
  form: UntypedFormGroup;
  classification: Classification;

  constructor(
    private dialogRef: MatDialogRef<EditClassificationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) classification: Classification,
    private classificationsService: ClassificationsService
  ) {
    console.log("Classification")
    this.classification = classification;
    this.form = this.fb.group({
      classificationGender: classification.classificationGender,
      classificationName: classification.classificationName
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const changes = this.form.value;

    this.classificationsService.updateClassification(this.classification.id, changes);
    this.classificationsService.classificationEdited.emit();
    this.dialogRef.close()
  }

}
