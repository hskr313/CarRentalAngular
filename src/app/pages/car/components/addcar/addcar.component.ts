import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import {toast, Datepicker} from 'materialize-css'
import {format} from 'date-fns'
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../model/car.model';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss']
})
export class AddcarComponent{

  constructor(
    private $carservice: CarService,
    private router: Router,
  ){
  }
}
