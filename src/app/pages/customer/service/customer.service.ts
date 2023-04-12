import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { Booking } from '../../booking/models/booking.model';

@Injectable()
export class CustomerService {

  url : string = environment.url

  constructor(
    private $client: HttpClient
  ) { }

  getAllCustomers(): Observable<Customer[]>{
    return this.$client.get<Customer[]>(this.url+"/customers")
  }

  getOneById(id: number): Observable<Customer>{
    return this.$client.get<Customer>(this.url+"/customers/"+id)
  }

  getBookingsByCustomer(id:number): Observable<Booking[]>{
    return this.$client.get<Booking[]>(this.url+"/customers"+id+"/bookings")
  }

  addCustomer(customer : Customer) : Observable<Customer>{
    return this.$client.post<Customer>(this.url+"/customers", customer)
  }

  updateCustomer(id: number, customer: Customer) :Observable<Customer>{
    return this.$client.put<Customer>(this.url+"/customers/"+id, customer)
  }

  deleteCustomer(id: number): Observable<void> {
    return this.$client.delete<void>(this.url+"/customers/"+id)
  }
}
