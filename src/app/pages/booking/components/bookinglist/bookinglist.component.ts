import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.scss']
})
export class BookinglistComponent {
  
  bookingList: Booking[] = []
  currentPage = 1
  pageSize = 3
  totalItems = 0
  
  constructor(
    private $bookingservice : BookingService,
    private $router: Router
    ){
      
    }
    
    ngOnInit(){
      this.loadItems()
    }
    
    loadItems(){
      this.$bookingservice.getAllBookings().pipe(
        tap( (data: Booking[]) => this.totalItems = data.length)
        ).subscribe( (data: Booking[]) => {
          console.log(data)
          this.bookingList = data
        } )
    }
    
    onPageChange(pageNumber: number) {
      this.currentPage = pageNumber;
    }
    
    get paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.bookingList.slice(startIndex, endIndex);
    }
    details(id : number) {
      this.$router.navigate(['bookings', id ,'details'])
    }
    deleteOne(id: number) {
      this.$bookingservice.deleteBooking(id).subscribe( () => this.loadItems())
    }
    udpateOne(id: number) {
      this.$router.navigate(['bookings/update', id])
    }
  }
