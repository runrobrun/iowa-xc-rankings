import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ClassificationsService} from './classifications.service';
import {Observable, of} from 'rxjs';
import {Classification} from './classification';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ClassificationDialogComponent} from './classification-dialog.component';

@Component({
  selector: 'app-classifications-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconButton,
    MatIcon,
    MatButton
  ],
  templateUrl: './classifications-list.component.html',
  styleUrl: './classifications-list.component.css'
})
export class ClassificationsListComponent {

  private _classificationsService = inject(ClassificationsService);

  boysClassifications$: Observable<Classification[]> | undefined;
  girlsClassifications$: Observable<Classification[]> | undefined;

  constructor(private dialog: MatDialog) {
    this._classificationsService.classificationEdited.subscribe(
      () => {
        this.getBoysClassifications();
        this.getGirlsClassifications();
      }
    )
    this.getBoysClassifications();
    this.getGirlsClassifications();
  }


  async getBoysClassifications() {
    try {
      const classifications = await this._classificationsService.getClassificationsByGender('Boys');
      this.boysClassifications$ = of(classifications);
    } catch (error) {

    }
  }

  async getGirlsClassifications() {
    try {
      const classifications = await this._classificationsService.getClassificationsByGender('Girls');
      this.girlsClassifications$ = of(classifications);
    } catch (error) {

    }
  }

  onDelete(id: string | undefined) {
    if (confirm('Are you sure you want to delete this classification?')) {
      this._classificationsService.deleteClassification(id);
      this.getBoysClassifications();
      this.getGirlsClassifications();
      this._classificationsService.classificationEdited.emit();
    }

  }

  editClassification(classification: Classification) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';

    dialogConfig.data = classification;
    this.dialog
      .open(ClassificationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe()
  }

  addClassification() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';
    dialogConfig.data = {}

    this.dialog
      .open(ClassificationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe()
  }
}
