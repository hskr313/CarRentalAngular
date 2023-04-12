import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../service/customer.service';

@Injectable()
export class CustomerResolver implements Resolve<Customer> {

  constructor(
    private $customerservice: CustomerService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
    return this.$customerservice.getOneById(route.params["id"]);
  }
}
