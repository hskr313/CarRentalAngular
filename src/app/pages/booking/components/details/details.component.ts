import { Component } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  booking: Booking | undefined

  constructor(
    private $ar: ActivatedRoute
  ){
    $ar.data.subscribe( (data: any) => this.booking = data.currentBooking)
  }

}
