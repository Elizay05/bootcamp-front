import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, switchMap, tap, throwError } from 'rxjs';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { Technology } from 'src/app/interfaces/technology.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {
  private apiUrl = `${environment.apiBaseUrl}/capacity/`;

  private apiUrlTechnologies = `${environment.apiBaseUrl}/technology/total_body`;

  private paginationState = new BehaviorSubject<{ page: number, size: number, isAscending: boolean, orderBy: boolean }>({
    page: 0,
    size: 10,
    isAscending: true,
    orderBy: true,
  });

  private dataSubject = new BehaviorSubject<PaginatedResult<any> | null>(null);
  public data$ = this.dataSubject.asObservable();

  private capacities: Capacity[] = [];
  private capacitySubject = new Subject<Capacity>();

  constructor(private httpClient: HttpClient) {
    this.loadCapacities().subscribe();
   }

   loadCapacities(): Observable<PaginatedResult<Capacity>> {
    return this.paginationState.pipe(
      switchMap(state =>
        this.httpClient.get<PaginatedResult<Capacity>>(this.apiUrl, {
          params: new HttpParams()
            .set('page', state.page.toString())
            .set('size', state.size.toString())
            .set('isAscending', String(state.isAscending))
            .set('isOrderByName', String(state.orderBy))
        })
      ),
      tap(result => {
        this.dataSubject.next(result);
        this.capacities = result.content;
      })
    );
  }

   updatePage(page: number): void {
    const currentState = this.paginationState.value;
    this.paginationState.next({ ...currentState, page });
  }

  updateSize(size: number): void {
    const currentState = this.paginationState.value;
    this.paginationState.next({ ...currentState, size, page: 0 });
  }

  updateOrder(isAscending: boolean): void {
    const currentState = this.paginationState.value;
    this.paginationState.next({ ...currentState, isAscending });
  }

  updateOrderBy(orderBy: boolean): void {
    const currentState = this.paginationState.value;
    this.paginationState.next({ ...currentState, orderBy });
  }

  refreshData(): void {
    const currentState = this.paginationState.value;
    this.httpClient.get<PaginatedResult<any>>(this.apiUrl, {
      params: new HttpParams()
        .set('page', currentState.page.toString())
        .set('size', currentState.size.toString())
        .set('isAscending', String(currentState.isAscending))
    }).subscribe(result => {
      this.dataSubject.next(result);
    });
  }


  createCapacity(capacity: { name: string, description: string, technologies: Technology[] }): Observable<Capacity> {
    return this.httpClient.post<Capacity>(this.apiUrl, capacity);
  }

  getCapacityById(id: number): Observable<Capacity> {
    const capacity = this.capacities.find(cap => cap.id === id);
    if (capacity) {
      this.capacitySubject.next(capacity);
      return of(capacity);
    } else {
        return throwError(() => new Error(`Capacity with id ${id} not found`));
    }
  }

  getCapacityObservable(): Observable<Capacity> {
    return this.capacitySubject.asObservable().pipe(
      map((capacity : Capacity) => capacity)
    );
  }

  getTechnologies(): Observable<Technology[]> {
    return this.httpClient.get<Technology[]>(this.apiUrlTechnologies);
  }

}
