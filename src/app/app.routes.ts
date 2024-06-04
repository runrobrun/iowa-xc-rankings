import { Routes } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ClassificationsListComponent} from './classifications/classifications-list.component';
import {SchoolImportComponent} from './utilities/school-import.component';
import {SchoolsListComponent} from './schools/schools-list.component';
import {CreatePollComponent} from './polls/create-poll.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'classifications', component: ClassificationsListComponent},
  {path: 'schools', component: SchoolsListComponent},
  {path: 'create-poll', component: CreatePollComponent},
  {path: 'school-import', component: SchoolImportComponent},
  {path: '**', component: WelcomeComponent},
];
