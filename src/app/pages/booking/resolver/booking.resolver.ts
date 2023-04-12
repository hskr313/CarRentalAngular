import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';

@Injectable()
export class BookingResolver implements Resolve<Booking> {

  constructor(
    private $bookingservice : BookingService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Booking> {
    return this.$bookingservice.getOneById(route.params["id"])
  }
}
