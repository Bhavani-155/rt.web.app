// signup.service.ts

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { HttpService } from 'src/app/shared/http.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private baseUrl: any = environment.baseUrl;
  private apiUrl: any = this.baseUrl + '/signup';

  constructor(private httpService: HttpService) {} // Inject the HttpService

  // get customer basic info
  getBasicDetails(customerId: any) {
    let endpoint = this.apiUrl + '/' + customerId;
    return this.httpService.get(endpoint);
  }
}
