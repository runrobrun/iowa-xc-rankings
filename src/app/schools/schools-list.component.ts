import {Component, inject} from '@angular/core';
import {SchoolsService} from './schools.service';
import {Observable, of} from 'rxjs';
import {School} from './school';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-schools-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './schools-list.component.html',
  styleUrl: './schools-list.component.css'
})
export class SchoolsListComponent {
  private _schoolsService = inject(SchoolsService);

  schools$: Promise<School[]> | undefined;

  constructor() {
    this.getSchools();
  }

  public getSchools() {
    this.schools$ = this._schoolsService.getAllSchools();
  }
}
