import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarResolver } from './components/resolver/car.resolver';
import { UpdateComponent } from './components/update/update.component';
import { AuthGuard } from 'src/app/security/guard/auth.guard';

const routes: Routes = [
  {path: '' , component: CarComponent,canActivate: [AuthGuard], children: [
    {path: 'list', component: CarListComponent, canActivate: [AuthGuard]},
    {path: 'create', component: AddcarComponent, canActivate: [AuthGuard]},
    {path: 'update/:id', resolve: {currentCar: CarResolver} ,component: UpdateComponent, canActivate: [AuthGuard]},
    {path: ':id/details', resolve: {currentCar: CarResolver}, component: CardetailComponent, canActivate: [AuthGuard] }
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
