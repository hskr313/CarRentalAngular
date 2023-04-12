import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  url : string = environment.url

  constructor(private $client : HttpClient) { }

  getAllBookings() :  Observable<Booking[]>{
    return this.$client.get<Booking[]>(this.url+"/reservations")
  }

  getOneById(id:number): Observable<Booking>{
    return this.$client.get<Booking>(this.url+"/reservations/"+id)
  }

  addBooking(booking : Booking): Observable<Booking>{
    return this.$client.post<Booking>(this.url+"/reservations",booking)
  }

  updateBooking(id: number, booking:Booking): Observable<Booking>{
    return this.$client.put<Booking>(this.url+"/reservations/"+id, booking)
  }

  updateBookingStatus(id: number, status: string): Observable<Booking>{
    return this.$client.patch<Booking>(this.url+"/reservations/"+id +"/status", null, {params: {status}})
  }

  deleteBooking(id: number) : Observable<void>{
    return this.$client.delete<void>(this.url+"/reservations/"+id)
  }
}
