// http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private authToken: string = localStorage.getItem('authToken');

  // request headers
  private requestHeaders: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.authToken}`,
  });

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(url, { headers: this.requestHeaders });
  }

  post(url: string, data: any) {
    return this.http.post(url, data, { headers: this.requestHeaders });
  }

  // Add other HTTP methods as needed
}
