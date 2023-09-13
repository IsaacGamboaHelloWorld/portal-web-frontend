import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { IProductAffiliation } from '../../entities/product-destination.interface';

@Injectable()
export class AffiliationProductsService {
  constructor(private http: HttpClient) {}

  public affiliationProducts(
    accountId: string,
    accountType: string,
  ): Observable<IProductAffiliation> {
    const AFFILIATIONS = {
      accountId,
      accountType: accountType.toUpperCase(),
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<IProductAffiliation>(
      environment.api.base + environment.api.services.affiliation_products,
      AFFILIATIONS,
    );
  }
}
