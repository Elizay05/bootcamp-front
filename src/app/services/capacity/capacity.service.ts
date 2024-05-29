import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { Technology } from 'src/app/interfaces/technology.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {
  private apiUrl = `${environment.apiBaseUrl}/capacity/`;

  private apiUrlTechnologies = `${environment.apiBaseUrl}/technology/total_body`;

  private capacities: Capacity[] = [];
  private capacitySubject = new Subject<Capacity>();

  constructor(private httpClient: HttpClient) {}

  createCapacity(capacity: { name: string, description: string, technologies: Technology[] }): Observable<Capacity> {
    return this.httpClient.post<Capacity>(this.apiUrl, capacity);
  }
  
  getTechnologies(): Observable<Technology[]> {
    return this.httpClient.get<Technology[]>(this.apiUrlTechnologies);
  }

}
