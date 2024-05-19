import { Component, EventEmitter, Input, Output } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'molecule-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  icon_right_arrow = icons.RIGTH_ARROW;
  icon_left_arrow = icons.LEFT_ARROW;

  constructor() { }

  get pages(): number[] {
    let pages: number[] = [];

    if (this.totalPages <= 3) {
      pages = Array.from({ length: this.totalPages }, (_, i) => i);
    } else {
      if (this.currentPage <= 1) {
        // Primeras páginas
        pages = [0, 1, 2];
      } else if (this.currentPage >= this.totalPages - 2) {
        // Últimas páginas
        pages = [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1];
      } else {
        // Páginas intermedias
        if (this.currentPage === this.totalPages - 1) {
          // Última página
          pages = [this.totalPages - 3, this.totalPages - 2, this.totalPages - 1];
        } else {
          // No es la última página
          pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
        }
      }
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
