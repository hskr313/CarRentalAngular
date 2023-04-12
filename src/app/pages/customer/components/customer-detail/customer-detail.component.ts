import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {

  customer : Customer | undefined

  constructor(
    private $ar: ActivatedRoute
  ){
    $ar.data.subscribe( (data:any) => this.customer = data.currentCustomer )
  }
}
