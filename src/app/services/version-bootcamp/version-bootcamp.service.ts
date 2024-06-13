import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';
import { VersionBootcamp } from 'src/app/interfaces/version-bootcamp.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionBootcampService {
  private apiUrl = `${environment.apiBaseUrl}/versionBootcamp/`;

  paginationState = new BehaviorSubject<{ page: number, size: number, isAscending: boolean, orderBy: boolean, bootcampName: string }>({
    page: 0,
    size: 10,
    isAscending: true,
    orderBy: true,
    bootcampName: '',
  });

  dataSubject = new BehaviorSubject<PaginatedResult<any> | null>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadVersionsBootcamp().subscribe();
  }

  getPaginationState(): Observable<{ page: number, size: number, isAscending: boolean, orderBy: boolean }> {
    return this.paginationState.asObservable();
  }

  loadVersionsBootcamp(): Observable<PaginatedResult<VersionBootcamp>> {
    return this.paginationState.pipe(
      switchMap(state =>
        this.httpClient.get<PaginatedResult<VersionBootcamp>>(this.apiUrl, {
          params: new HttpParams()
            .set('page', state.page.toString())
            .set('size', state.size.toString())
            .set('isAscending', String(state.isAscending))
            .set('isOrderByStartDate', String(state.orderBy))
            .set('bootcampName', state.bootcampName)
        })
      ),
      tap(result => {
        this.dataSubject.next(result);
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
    this.paginationState.next(currentState);
  }

  createVersionBootcamp(versionBootcamp: { bootcampId: number, maximumQuota: number, startDate: string, endDate: string }): Observable<VersionBootcamp> {
    return this.httpClient.post<VersionBootcamp>(this.apiUrl, versionBootcamp);
  }
}