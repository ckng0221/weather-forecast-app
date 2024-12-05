import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LocationComponent } from './pages/location/location.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'locations/:identifier', component: LocationComponent },
];
