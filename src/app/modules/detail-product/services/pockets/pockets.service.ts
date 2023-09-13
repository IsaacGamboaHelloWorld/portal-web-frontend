import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUserPockets } from '@app/core/interfaces/pockets/userPockets';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';

@Injectable()
export class PocketsService {
  constructor(private http: HttpClient) {}

  public pockets(): Observable<IUserPockets> {
    const USER_POCKETS_REQUEST = {
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<IUserPockets>(
      environment.api.base + environment.api.services.pockets.home,
      USER_POCKETS_REQUEST,
    );
  }
}
