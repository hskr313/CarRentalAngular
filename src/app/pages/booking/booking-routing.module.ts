import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
import { BookinglistComponent } from './components/bookinglist/bookinglist.component';
import { BookingResolver } from './resolver/booking.resolver';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthGuard } from 'src/app/security/guard/auth.guard';

const routes: Routes = [
  { path: '', component: BookingComponent, canActivate: [AuthGuard],children : [
    {path: 'list', component: BookinglistComponent, canActivate: [AuthGuard]},
    {path: 'create', component: AddbookingComponent,canActivate: [AuthGuard]},
    {path: 'update/:id', resolve: { currentBooking: BookingResolver}, component: UpdateComponent, canActivate: [AuthGuard]},
    {path: ':id/details', resolve: {currentBooking: BookingResolver}, component: DetailsComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
