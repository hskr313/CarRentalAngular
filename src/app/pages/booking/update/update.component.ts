import { Component } from '@angular/core';
import { Booking } from '../models/booking.model';
import { ActivatedRoute } from '@angular/router';
import { ar } from 'date-fns/locale';

@Component({
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  booking: Booking | undefined

  constructor(
    private $ar: ActivatedRoute
  ){
    $ar.data.subscribe( (data:any) => this.booking = data.currentBooking )
  }

}
