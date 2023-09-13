import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IRespondOperators } from '@modules/recharge-phone/entities/operatators';
import { environment } from 'environments/environment';

@Injectable()
export class OperatorsNameService {
  constructor(private http: HttpClient) {}

  public operators(): Observable<IRespondOperators> {
    return this.http.get<IRespondOperators>(
      environment.api.base + environment.api.services.operatorsName,
    );
  }
}
