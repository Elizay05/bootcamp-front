import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, switchMap, tap, throwError } from 'rxjs';
import { Bootcamp } from 'src/app/interfaces/bootcamp.interface';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BootcampService {
  private apiUrl = `${environment.apiBaseUrl}/bootcamp/`;

  private apiUrlCapacities = `${environment.apiBaseUrl}/capacity/total_body`;

  private bootcamps: Bootcamp[] = [];
  private bootcampSubject = new Subject<Bootcamp>();

  constructor(private httpClient: HttpClient) {
  }


  createBootcamp(bootcamp: { name: string, description: string, capacities: Capacity[] }): Observable<Bootcamp> {
    return this.httpClient.post<Bootcamp>(this.apiUrl, bootcamp);
  }

  getCapacities(): Observable<Capacity[]> {
    return this.httpClient.get<Capacity[]>(this.apiUrlCapacities);
  }
}
