import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponseFreeDestinationAll } from '@app/core/interfaces/free-destination.interface';
import { BANKS } from '@core/constants/banks';
import { RespondServiceProducts } from '@core/interfaces/products.interface';
import { environment } from '@environment';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public allProducts(): Observable<RespondServiceProducts> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: '',
    };

    return this.http.post<RespondServiceProducts>(
      environment.api.base + environment.api.services.products,
      user,
    );
  }

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1740669785/Libre+Destino
   */
  public allFreeDestination(): Observable<ResponseFreeDestinationAll> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: '',
    };

    return this.http.post<ResponseFreeDestinationAll>(
      environment.api.base + environment.api.services.freeDestination,
      user,
    );
  }
}
