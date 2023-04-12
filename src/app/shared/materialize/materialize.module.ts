import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatePickerDirective } from './directives/mat-date-picker.directive';



@NgModule({
  declarations: [
    MatDatePickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatDatePickerDirective
  ]
})
export class MaterializeModule { }
