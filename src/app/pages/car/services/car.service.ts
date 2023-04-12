import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { map, Observable, tap } from 'rxjs';
import { Car} from 'src/app/pages/car/model/car.model';
import { Period } from 'src/app/shared/models/period.model';
import { environment } from 'src/environments/environment';
import { Booking } from '../../booking/models/booking.model';

@Injectable()
export class CarService {

  private url : string = environment.url

  constructor(private $client: HttpClient) { }

  // getAll(): Observable<Car[]> {
  //     return this.$client.get<CarDTO[]>(this.url+"/cars").pipe(
  //       tap( value => console.log(value)),
  //       map(carDtos => carDtos.map(it => (
  //         {
  //           id : it.id,
  //           buyPrice: it.buyPrice,
  //           supplier: it.supplier,
  //           km: it.km,
  //           repair: it.repair,
  //           returnDate: it.returnDate,
  //           model : {
  //             brand: it.model.brand,   /*it.model && it.model.brand || "no brand",*/
  //             type: it.model.type,    /*it.model && it.model.type || "no type",*/
  //             power: it.model.power,   /*it.model &&it.model.power || "no power",*/
  //             options: it.model.options   /*it.model && it.model.options || "no options"*/
  //           }
  //       } as Car)))
  //     )
  // }

  getAll(period?: Period): Observable<Car[]> {
    
    if (period) {
      return this.$client.get<Car[]>(this.url + '/cars', {params: period});
    }
    return this.$client.get<Car[]>(this.url + '/cars');
    
  
  }

  getBookingsByCar(id: number) : Observable<Booking[]>{
    return this.$client.get<Booking[]>(this.url+ "/cars/" + id + "/bookings")
  }
  


  getOneById(id: number) : Observable<Car>{
    return this.$client.get<Car>(this.url+"/cars/"+id)
  }

  addOne(fg: Car) : Observable<Car> {
    console.log(fg)
    return this.$client.post<Car>(this.url+ '/cars', fg)
  }

  deleteOne(id: number):Observable<void>{
    return this.$client.delete<void>(this.url+"/cars/"+id)
  }

  updateOne(id: number,car : Car): Observable<void>{
    return this.$client.put<void>(this.url+"/cars/"+id, car)
  }

}
