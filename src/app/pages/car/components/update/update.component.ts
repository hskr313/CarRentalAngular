import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'materialize-css';
import { map } from 'rxjs';
import { Car } from '../../model/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  car : Car | undefined

  constructor( 
    private $carservice: CarService,
    private $router: Router,
    private $ar: ActivatedRoute
    ){
      $ar.data.subscribe((data: any) => {
        this.car = data.currentCar
        console.log(this.car)
      })
    }

    ngOnInit() {
      this.$ar.data.subscribe(data => console.log(data))
    }
}
