import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'molecule-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent{
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();  

  icon_rigth_arrow = icons.RIGTH_ARROW
  icon_left_arrow = icons.LEFT_ARROW

  constructor() { }

  get pages(): Array<number> {
    let start, end;
    if (this.totalPages <= 3) {
        start = 0;
        end = this.totalPages;
    } else {
        start = Math.max(0, this.currentPage - 1);
        end = Math.min(start + 3, this.totalPages);
        if (end === this.totalPages && end - start < 3) {
            start = Math.max(0, this.totalPages - 3);
        }
    }

    const pages = [];
    for (let i = start; i < end; i++) {
        pages.push(i);
    }

    return pages;
}

  changePage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.changePage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.changePage(this.currentPage - 1);
    }
  }

}
