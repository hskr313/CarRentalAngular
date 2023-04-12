import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  customerList: Customer[] = []
  currentPage = 1
  pageSize = 3
  totalItems = 0
  
  constructor(
    private $customerservice : CustomerService,
    private $router: Router
    ){
      
    }
    
    ngOnInit(){
      this.loadItems()
    }
    
    loadItems(){
      this.$customerservice.getAllCustomers().pipe(
        tap( (data: Customer[]) => this.totalItems = data.length)
        ).subscribe( (data: Customer[]) => this.customerList = data)
    }
    
    onPageChange(pageNumber: number) {
      this.currentPage = pageNumber;
    }
    
    get paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.customerList.slice(startIndex, endIndex);
    }
    details(id : number) {
      this.$router.navigate(['customers', id ,'details'])
    }
    deleteOne(id: number) {
      this.$customerservice.deleteCustomer(id).subscribe( () => this.loadItems())
    }
    udpateOne(id: number) {
      this.$router.navigate(['customers/update', id])
    }
}
