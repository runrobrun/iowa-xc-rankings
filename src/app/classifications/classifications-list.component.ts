import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ClassificationsService} from './classifications.service';
import {Observable, of} from 'rxjs';
import {Classification} from './classification';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-classifications-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './classifications-list.component.html',
  styleUrl: './classifications-list.component.css'
})
export class ClassificationsListComponent {
  private _classificationsService = inject(ClassificationsService);

  boysClassifications$: Observable<Classification[]> | undefined;
  girlsClassifications$: Observable<Classification[]> | undefined;

  constructor() {
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
    }

  }
}
