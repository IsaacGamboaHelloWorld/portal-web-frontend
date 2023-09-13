import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { validateEmpty } from '@app/shared/helpers/validateData.helper';
import { BANKS } from '@core/constants/banks';
import { Movement } from '@core/models/movement/movement';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { MovementsFileResponse } from '../../entities/movements-file';

@Injectable()
export class MovementsService {
  constructor(private http: HttpClient) {}

  public movements(
    type: string,
    id: string,
    from: string = '',
    to: string = '',
  ): Observable<Movement> {
    const request = this.buildRequest(type, id, from, to);

    return this.http.post<Movement>(
      environment.api.base + environment.api.services.movements,
      request,
    );
  }

  public movementsFile(data: any): Observable<MovementsFileResponse> {
    const request = this.buildRequest(
      data['type'],
      data['id'],
      data['from'],
      data['to'],
    );
    return this.http.post<MovementsFileResponse>(
      environment.api.base + environment.api.services.movementsFile,
      request,
    );
  }

  buildRequest(
    type: string,
    id: string,
    from: string = '',
    to: string = '',
  ): any {
    return {
      accountId: id,
      accountType: type.toUpperCase(),
      currency: 'COP',
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      dateMovementsFrom: validateEmpty(from, ''),
      dateMovementsTo: validateEmpty(to, ''),
    };
  }
}
