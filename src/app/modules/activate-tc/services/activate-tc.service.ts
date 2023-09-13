import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAnswerActivateTc } from '../entities/activate-tc';

@Injectable()
export class ActivateTcService {
  constructor(private http: HttpClient) {}

  public creditCard(numberCard?: string): Observable<IAnswerActivateTc> {
    const payload = {
      accountId: numberCard,
    };

    return this.http.post<IAnswerActivateTc>(
      environment.api.base + environment.api.services.activate_tc,
      payload,
    );
  }
}
