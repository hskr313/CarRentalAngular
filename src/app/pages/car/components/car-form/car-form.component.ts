import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { toast } from 'materialize-css';
import { Car } from '../../model/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarFormComponent {
  @Input()  defaultValue : Car | undefined
  // @Output('submit') submitEvent = new EventEmitter<any>()

  fg: FormGroup = new FormGroup({
    buyPrice: new FormControl(null, Validators.required),
    buyDate: new FormControl(null, Validators.required),
    km: new FormControl(null, Validators.required),
    supplier: new FormControl(null),
    repair: new FormControl(false, Validators.required),
    model: new FormGroup({
      brand : new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      power:new FormControl(null, Validators.required),
      options: new FormArray([])
    })
  })
   

  constructor(
    private router: Router,
    private $carservice: CarService,
    private route:ActivatedRoute
  ){
  }

  ngOnInit(){
    if (this.defaultValue){
      this.fg.patchValue(this.defaultValue)

      for(const option of this.defaultValue.model.options){
        this.optionsArray.push(new FormGroup({option: new FormControl(option.option)}))
      }
        
    }
    this.fg.get('repair')?.valueChanges.subscribe( () => this.addReturnDate())
  }
  

  get optionsArray(): FormArray{
    return this.fg.get('model')?.get('options') as FormArray
  }

  cancel(){
    this.router.navigate(['cars/list'])
  }
  
  submit(){
    // if (this.fg.invalid) return
    // this.submitEvent.emit(this.fg.value)
    console.log(this.defaultValue)
    if (this.defaultValue) {
      this.updateAction()
    } else {
      this.submitAction()
    }
  
}
  addReturnDate(): void {
    const isChecked = this.fg.get('repair')?.value;
    if ( isChecked ) {
      this.fg.addControl( 'returnDate', new FormControl(''))
    } else {
      this.fg.removeControl('returnDate')
    }
  }

  
  addControl(): void {
    this.optionsArray.push(new FormGroup({option: new FormControl(null)}))
  }
   
  removeControl(i:number): void {
    this.optionsArray.removeAt(i)
  }

  logDate(date: Date){
    this.fg.get('buyDate')?.setValue(format(date, 'yyyy-MM-dd'))
  }

  logReturn(date: Date){
    this.fg.get('returnDate')?.setValue(format(date, 'yyyy-MM-dd'))
  }

  updateAction() {
    if (this.defaultValue ){
      this.$carservice.updateOne(this.defaultValue.id, this.fg.value).subscribe( () => 
      {toast({html: 'Car updated'}),
      this.router.navigate(['cars/list'])
    })
    }
    
  }

  submitAction(){
    this.$carservice.addOne(this.fg.value).subscribe( () => 
    {console.log(this.fg),
    toast({html: 'Car saved'}),
    this.router.navigate(['cars/list'])
  } )
  }
  
}
