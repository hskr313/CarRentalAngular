import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'materialize-css';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent {
  @Input() defaultValue : Booking | undefined
  activeFormControl: string = '';

  fg: FormGroup = new FormGroup( {
    removal : new FormControl(null, Validators.required),
    theoricRestitution: new FormControl(null, Validators.required),
    restitution : new FormControl( null),
    reservStatus: new FormControl("effective"),
    substitution: new FormControl(null),
    rentalFormulaId: new FormControl(null),
    closingDate: new FormControl(null),
    cancellationDate: new FormControl(null),
    idCar: new FormControl(null, Validators.required),
    idCustomer: new FormControl(null, Validators.required)
  })

  constructor(
    private $bookingservice : BookingService,
    private $router: Router
    ){
  }

  ngOnInit(){
    if(this.defaultValue){
      this.fg.patchValue(this.defaultValue)
    }
  }

  submit(){
    if(this.defaultValue){
      this.submitAction()
    } else {
      this.submitAction()      
    }

  }

  submitAction(){
    this.$bookingservice.addBooking(this.fg.value as Booking).subscribe(
      () => {
        toast({html: 'Booking saved'}),
        this.$router.navigate(['bookings/list'])
    }
    )
  }

  updateAction(){
    if (this.defaultValue){
      this.$bookingservice.updateBooking(this.defaultValue.id, this.fg.value as Booking).subscribe( () => 
      {toast({html: 'Booking updated'}),
      this.$router.navigate(['bookings/list'])
    })
    }
  }

  cancel(){
    this.$router.navigate(['bookings/list'])
  }

  
  logDates(date: Date){
  switch(this.activeFormControl){
    case 'removal': 
      this.fg.get('removal')?.setValue(format(date,'yyyy-MM-dd'));
      break;
    case 'theoricRestitution': 
      this.fg.get('theoricRestitution')?.setValue(format(date,'yyyy-MM-dd'));
      break;
    case 'restitution': 
      this.fg.get('restitution')?.setValue(format(date,'yyyy-MM-dd'));
      break;
    case 'closingDate': 
      this.fg.get('closingDate')?.setValue(format(date,'yyyy-MM-dd'));
      break;
    case 'cancellationDate': 
      this.fg.get('cancellationDate')?.setValue(format(date,'yyyy-MM-dd'));
      break;
    }
  }

  setActiveFormControl(controlName: string) {
    this.activeFormControl = controlName;
  }
}


