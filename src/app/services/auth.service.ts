import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  constructor(private http: HttpClient) {}

  callTokenAPI(request: any): Observable<any> {
    let endpoint = 'http://localhost:3001/getPersonData';
    return this.http.post<any>(endpoint, request).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
