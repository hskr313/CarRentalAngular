import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toast } from 'materialize-css';
import { Booking } from 'src/app/pages/booking/models/booking.model';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {

  @Input() defaultValue : Customer | undefined

  constructor(
    private $customerservice: CustomerService,
    private $router: Router
  ){
  }

  fg: FormGroup = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null,Validators.required),
    address : new FormGroup({
      street: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    })
  })


  ngOnInit(){
    if(this.defaultValue){
      this.fg.patchValue(this.defaultValue)
    }
  }

  submit(){
    if(this.defaultValue){
      this.updateAction()
    } else {
      this.submitAction()      
    }

  }

  submitAction(){
    this.$customerservice.addCustomer(this.fg.value as Customer).subscribe(
      () => {
        toast({html: 'Customer saved'}),
        this.$router.navigate(['customers/list'])
    }
    )
  }

  updateAction(){
    if (this.defaultValue){
      this.$customerservice.updateCustomer(this.defaultValue.id, this.fg.value as Customer).subscribe( () => 
      {toast({html: 'Customer updated'}),
      this.$router.navigate(['customers/list'])
    })
    }
  }

  cancel(){
    this.$router.navigate(['customers/list'])
  }

}
