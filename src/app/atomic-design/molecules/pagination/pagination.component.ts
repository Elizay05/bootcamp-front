import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICONS } from 'src/app/util/icons.constants';

@Component({
  selector: 'molecule-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  icon_right_arrow = ICONS.RIGTH_ARROW;
  icon_left_arrow = ICONS.LEFT_ARROW;

  constructor() { }

  get pages(): number[] {
    let pages: number[] = [];

    if (this.totalPages <= 3) {
      pages = Array.from({ length: this.totalPages }, (_, i) => i);
    } else if (this.currentPage <= 1) {
        pages = [0, 1, 2];
      } else if (this.currentPage >= this.totalPages - 2) {
        pages = [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1];
      } else {
          pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
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