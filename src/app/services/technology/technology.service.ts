import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Technology } from 'src/app/interfaces/technology.interface';
import { PaginatedResult } from 'src/app/interfaces/paginated-result.interface';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private apiUrl = `${environment.apiBaseUrl}/technology/`;

  private paginationState = new BehaviorSubject<{ page: number, size: number, isAscending: boolean }>({
    page: 0,
    size: 10,
    isAscending: true
  });

  dataSubject = new BehaviorSubject<PaginatedResult<any> | null>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadTechnologies().subscribe();
  }

  loadTechnologies(): Observable<PaginatedResult<Technology>> {
    return this.paginationState.pipe(
      switchMap(state =>
        this.httpClient.get<PaginatedResult<Technology>>(this.apiUrl, {
          params: new HttpParams()
            .set('page', state.page.toString())
            .set('size', state.size.toString())
            .set('isAscending', String(state.isAscending))
        })
      ),
      tap(result => {
        this.dataSubject.next(result);
      })
    );
  }

  getPaginationState(): Observable<{ page: number, size: number, isAscending: boolean}> {
    return this.paginationState.asObservable();
  }

   getPaginationState(): Observable<{ page: number, size: number, isAscending: boolean}> {
    return this.paginationState.asObservable();
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

  createTechnology(technology: { name: string, description: string }): Observable<Technology> {
    return this.httpClient.post<Technology>(this.apiUrl, technology);
  }

}