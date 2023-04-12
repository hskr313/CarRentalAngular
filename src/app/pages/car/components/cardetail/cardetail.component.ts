import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { id } from 'date-fns/locale';
import { Booking } from 'src/app/pages/booking/models/booking.model';
import { Car } from '../../model/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.scss']
})
export class CardetailComponent {
  
  car : Car | undefined
  bookings: Booking[] = []

constructor(
  private $ar : ActivatedRoute,
  private $carservice: CarService
){
  $ar.data.subscribe((data: any) => {
    this.car = data.currentCar
    console.log(this.car)
  })
  
}

  ngOnInit(){
    this.loadItems()
  }

  loadItems(){
    
    if ( this.car ){
      this.$carservice.getBookingsByCar(this.car.id).subscribe( (data: Booking[]) => 
      {
        this.bookings = data 
      })
    }
  }

}
