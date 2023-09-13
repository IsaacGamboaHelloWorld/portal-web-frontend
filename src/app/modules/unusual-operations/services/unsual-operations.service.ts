import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { IUnusualOPApproveRequest } from '../entities/unusual-approve-request.interface';
import { IUnusualOPApproveResponse } from '../entities/unusual-approve-response.interface';
import { IUnusualOPQueryResponse } from '../entities/unusual-query-response.interface';

@Injectable()
export class UnsualOperationsService {
  constructor(private http: HttpClient) {}

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2715877486/Operations+Unusual+API+Query+Transactions
  public query(): Observable<IUnusualOPQueryResponse> {
    return this.http.post<IUnusualOPQueryResponse>(
      environment.api.base + environment.api.services.unusualOperations.query,
      {},
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2715287750/Operations+Unusual+API+Approve+Reject+Transactions
  public approve(
    body: IUnusualOPApproveRequest,
  ): Observable<IUnusualOPApproveResponse> {
    const { productInfo, typeOperation } = body;
    return this.http.post<IUnusualOPApproveResponse>(
      environment.api.base + environment.api.services.unusualOperations.approve,
      { productInfo, typeOperation },
    );
  }
}
