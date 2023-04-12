import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarListComponent } from './components/car-list/car-list.component';
import { CoreModule } from '../../core/core.module';
import { CarComponent } from './car.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { CarService } from './services/car.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'src/app/shared/materialize/materialize.module';
import { CarResolver } from './components/resolver/car.resolver';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { UpdateComponent } from './components/update/update.component';
import { PaginationComponent } from 'src/app/shared/Components/pagination/pagination.component';
import { ComponentsModule } from 'src/app/shared/Components/components.module';


@NgModule({
  declarations: [
    CarListComponent,
    CarComponent,
    AddcarComponent,
    CardetailComponent,
    CarFormComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    MaterializeModule,
    ComponentsModule
  ],
  providers: [
    CarService,
    CarResolver
  ]
})
export class CarModule { }
