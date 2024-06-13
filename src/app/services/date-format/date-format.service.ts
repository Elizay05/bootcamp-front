import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }

  formatDateToSemester(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);
    const semester = month <= 6 ? 1 : 2;
    return `${year}-${semester}`;
  }
}
