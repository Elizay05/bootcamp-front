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

  private paginationState = new BehaviorSubject<{ page: number, size: number, isAscending: boolean, orderBy: boolean }>({
    page: 0,
    size: 10,
    isAscending: true,
    orderBy: true,
  });

  dataSubject = new BehaviorSubject<PaginatedResult<any> | null>(null);
  data$ = this.dataSubject.asObservable();

  bootcamps: Bootcamp[] = [];
  bootcampSubject = new Subject<Bootcamp>();

  constructor(private httpClient: HttpClient) {
    this.loadBootcamps().subscribe();
  }

  getPaginationState(): Observable<{ page: number, size: number, isAscending: boolean, orderBy: boolean }> {
    return this.paginationState.asObservable();
  }

  loadBootcamps(): Observable<PaginatedResult<Bootcamp>> {
    return this.paginationState.pipe(
      switchMap(state =>
        this.httpClient.get<PaginatedResult<Bootcamp>>(this.apiUrl, {
          params: new HttpParams()
            .set('page', state.page.toString())
            .set('size', state.size.toString())
            .set('isAscending', String(state.isAscending))
            .set('isOrderByName', String(state.orderBy))
        })
      ),
      tap(result => {
        this.dataSubject.next(result);
        this.bootcamps = result.content;
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


  createBootcamp(bootcamp: { name: string, description: string, capacities: Capacity[] }): Observable<Bootcamp> {
    return this.httpClient.post<Bootcamp>(this.apiUrl, bootcamp);
  }

  getBootcampById(id: number): Observable<Bootcamp> {
    const bootcamp = this.bootcamps.find(boot => boot.id === id);
    if (bootcamp) {
      this.bootcampSubject.next(bootcamp);
      return of(bootcamp);
    } else {
        return throwError(() => new Error(`Bootcamp with id ${id} not found`));
    }
  }

  getBootcampObservable(): Observable<Bootcamp> {
    return this.bootcampSubject.asObservable().pipe(
      map((bootcamp : Bootcamp) => bootcamp)
    );
  }

  getCapacities(): Observable<Capacity[]> {
    return this.httpClient.get<Capacity[]>(this.apiUrlCapacities);
  }
}
