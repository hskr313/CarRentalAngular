import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Car } from '../../model/car.model';
import { CarService } from '../../services/car.service';

@Injectable()
export class CarResolver implements Resolve<Car> {
  
  constructor(private $carService: CarService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Car> {
    return this.$carService.getOneById(route.params["id"]);
  }
}
