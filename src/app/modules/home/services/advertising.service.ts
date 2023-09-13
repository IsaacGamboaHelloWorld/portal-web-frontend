import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AdvertisingResponse } from '@app/core/models/advertising/advertisingData';
import { environment } from '@environment';

@Injectable()
export class AdvertisingService {
  constructor(private http: HttpClient) {}

  public allAdvertising(): Observable<AdvertisingResponse> {
    const user = {};

    return this.http.post<AdvertisingResponse>(
      environment.api.base + environment.api.services.advertising,
      user,
    );
  }
}
