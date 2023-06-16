import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IotService {
  private apiUrl = 'http://localhost:3000/iot'; // URL of your API
  private refreshInterval = 100000; // Refresh interval in milliseconds

  constructor(private http: HttpClient) {}

  getAllValues(): Observable<any> {
    return timer(0, this.refreshInterval).pipe(
      switchMap(() => this.http.get(this.apiUrl))
    );
  }

  addValue(value: any): Observable<any> {
    return this.http.post(this.apiUrl, value);
  }
}
