import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/components/login/login.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './security/guard/auth.guard';
import { ProfileComponent } from './security/components/profile/profile.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'cars', loadChildren: () => import('./pages/car/car.module').then(m => m.CarModule)},
  {path: 'bookings', loadChildren: () => import('./pages/booking/booking.module').then(m =>m.BookingModule)},
  {path: 'customers', loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule)},
  {path: 'login', component:LoginComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
