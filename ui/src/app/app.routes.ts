import { Routes } from '@angular/router';
import { LocationComponent } from './pages/location/location.component';
import { HomeComponent } from './pages/home/home.component';

//TODO: add subpage for each location
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'locations/:location', component: LocationComponent },
];
