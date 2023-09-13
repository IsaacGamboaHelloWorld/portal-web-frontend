import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';

@Injectable()
export class UserSecureDataService {
  constructor(private http: HttpClient) {}

  public getSecureData(): Observable<any> {
    return this.http.post(
      environment.api.base + environment.api.services.customer.getSecureData,
      {},
      {},
    );
  }
}
