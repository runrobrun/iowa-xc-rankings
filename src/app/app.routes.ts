import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ClassificationsListComponent} from './classifications/classifications-list.component';
import {SchoolImportComponent} from './utilities/school-import.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'classifications', component: ClassificationsListComponent},
  {path: 'school-import', component: SchoolImportComponent},
  {path: '**', component: WelcomeComponent},
];
