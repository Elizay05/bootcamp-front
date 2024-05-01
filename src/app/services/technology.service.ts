import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Technology } from '../common/technology';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private apiUrl = 'http://localhost:8081/technology/';

  constructor(private httpClient: HttpClient) { }

  getTechnologies(size?: number, ascending?: boolean): Observable<Technology[]> {
    let params = new HttpParams();
    if (size) {
      params = params.set('size', size.toString());
    }
    params = params.set('isAscending', String(ascending));
    return this.httpClient.get<Technology[]>(this.apiUrl, { params });
  }
}
