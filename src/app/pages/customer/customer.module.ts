import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/Components/components.module';
import { CustomerService } from './service/customer.service';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { UpdateComponent } from './components/update/update.component';
import { CustomerResolver } from './resolver/customer.resolver';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    CustomerListComponent,
    AddCustomerComponent,
    CustomerComponent,
    CustomerFormComponent,
    UpdateComponent,
    CustomerDetailComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    CoreModule
  ],
  providers : [
    CustomerService,
    CustomerResolver
  ]
})
export class CustomerModule { }
