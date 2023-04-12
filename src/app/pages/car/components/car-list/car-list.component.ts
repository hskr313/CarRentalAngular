import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/pages/car/services/car.service';
import { Car } from '../../model/car.model';
import { Toast } from 'materialize-css';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Period } from 'src/app/shared/models/period.model';
import { format } from 'date-fns';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {

  carList : Car[] = []
  currentPage = 1
  pageSize = 1
  totalItems = 0

  periodFg : FormGroup =  new FormGroup({ 
    start : new FormControl(null),
    end: new FormControl(null)
  })


  get CarList(): any[] { return [...this.carList]}

  constructor(
    private $carService: CarService,
    private router: Router){
  }

  ngOnInit(){
    this.loadItems()
  }

  loadItems() {
    
    let period = this.periodFg.value as Period
    
    if (period.start != null && period.end != null) {
      this.$carService.getAll(period).pipe(
        tap((data: Car[]) => this.totalItems = data.length)
      ).subscribe(data => {
        if( data != null){
          this.carList = data
          console.log(this.carList)
        }
      });
    } else {
        this.$carService.getAll().pipe(
        tap((data: Car[]) => this.totalItems = data.length)
      ).subscribe(data => this.carList = data);
    }
  }

  start(start: Date){
    this.periodFg.get('start')?.setValue(format(start, 'yyyy-MM-dd'))
  }

  end(end:Date){
    this.periodFg.get('end')?.setValue(format(end, 'yyyy-MM-dd'))
  }
  

  udpateOne(id : number): void {
    this.router.navigate(['cars/update', id])
  }

  deleteOne(id:number){
    this.$carService.deleteOne(id).subscribe(() => this.loadItems())
  } 

  details(id: number){
    this.router.navigate(['cars',id,'details'])
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.carList.slice(startIndex, endIndex);
  }

}
