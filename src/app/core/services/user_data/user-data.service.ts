import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient) {}

  public userData(): Observable<any> {
    return this.http.post(
      environment.api.base + environment.api.services.customer.getProfile,
      {},
      {},
    );
  }
}
