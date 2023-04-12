import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerResolver } from './resolver/customer.resolver';
import { UpdateComponent } from './components/update/update.component';
import { DetailsComponent } from '../booking/components/details/details.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { AuthGuard } from 'src/app/security/guard/auth.guard';

const routes: Routes = [
  {path: '', component: CustomerComponent,canActivate: [AuthGuard], children: [
    {path: 'list', component: CustomerListComponent,canActivate: [AuthGuard]},
    {path: 'create', component: AddCustomerComponent,canActivate: [AuthGuard]},
    {path: 'update/:id', resolve : {currentCustomer : CustomerResolver}, component: UpdateComponent,canActivate: [AuthGuard]},
    {path: ':id/details', resolve: {currentCustomer: CustomerResolver}, component: CustomerDetailComponent,canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
