import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageSize!: number;
  @Input() totalItems!: number;
  @Output() pageChange = new EventEmitter<number>();

  currentPageNumber = 1 ;

  get pages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  get isFirstPage(): boolean {
    return this.currentPageNumber === 1;
  }
  
  get isLastPage(): boolean {
    return this.currentPageNumber === this.pages.length;
  }

  setPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.currentPageNumber = pageNumber;
      this.pageChange.emit(pageNumber);
    }
  }

  previousPage() {
    if (this.currentPageNumber > 1) {
      this.setPage(this.currentPageNumber - 1);
    }
  }

  nextPage() {
    if (this.currentPageNumber < this.pages.length) {
      this.setPage(this.currentPageNumber + 1);
    }
  }
}
