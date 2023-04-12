import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { BookinglistComponent } from './components/bookinglist/bookinglist.component';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
import { ComponentsModule } from 'src/app/shared/Components/components.module';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'src/app/shared/materialize/materialize.module';
import { BookingService } from './services/booking.service';
import { BookingResolver} from './resolver/booking.resolver';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './components/details/details.component';
import { DashboardComponent } from 'src/app/core/components/dashboard/dashboard.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    BookingComponent,
    BookinglistComponent,
    AddbookingComponent,
    BookingFormComponent,
    UpdateComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MaterializeModule,
    CoreModule
  ],
  providers: [
    BookingService,
    BookingResolver
  ]
})
export class BookingModule { }
