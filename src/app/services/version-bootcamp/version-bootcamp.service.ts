import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionBootcamp } from 'src/app/interfaces/version-bootcamp.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionBootcampService {
  private apiUrl = `${environment.apiBaseUrl}/versionBootcamp/`;

  constructor(private httpClient: HttpClient) { }

  createVersionBootcamp(versionBootcamp: { bootcampId: number, maximumQuota: number, startDate: string, endDate: string }): Observable<VersionBootcamp> {
    return this.httpClient.post<VersionBootcamp>(this.apiUrl, versionBootcamp);
  }
}
