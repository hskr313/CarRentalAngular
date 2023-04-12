import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  
  customer: Customer | undefined

  constructor(
    private $ar: ActivatedRoute
  ){
    $ar.data.subscribe( (data:any) => this.customer = data.currentCustomer )
  }
}
