import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { IToPlus } from '@modules/main-container/constants/to-plus';

@Injectable()
export class ToPlusService {
  constructor(private http: HttpClient) {}

  public loadToPlus(): Observable<IToPlus> {
    return this.http.post<IToPlus>(
      environment.api.base + environment.api.services.tuPlus.toPlus,
      {
        companyId: BANKS.BANCO_POPULAR,
      },
    );
  }
}
