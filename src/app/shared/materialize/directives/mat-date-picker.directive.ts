import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[matDatePicker]'
})
export class MatDatePickerDirective {

  @Output('mchange') mChangeEvent = new EventEmitter<Date>()
  instance : M.Datepicker | undefined

  options: Partial<M.DatepickerOptions> = {
    format: 'dd/mm/yyyy',
    autoClose: true,
    onClose: () => this.mChangeEvent.emit(this.instance?.date)
  }

  constructor(
    private $er: ElementRef<HTMLInputElement>
  ) {

  }

  ngOnInit() {
    this.instance = M.Datepicker.init(this.$er.nativeElement, this.options);    
  }
}
