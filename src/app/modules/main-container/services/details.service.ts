import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@core/constants/banks';
import { Product } from '@core/models/products/product';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { ResponseFreeDestinationDetail } from './../../../core/interfaces/free-destination.interface';

@Injectable()
export class DetailsService {
  constructor(private http: HttpClient) {}

  public get_product(type: string, id: string): Observable<Product> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: '',
      accountId: id,
      accountType: type.toUpperCase(),
    };
    return this.http.post<Product>(
      environment.api.base + environment.api.services.pdetail,
      user,
    );
  }

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1740669785/Libre+Destino
   */
  public getFreeDestinationDetail(
    id: string,
  ): Observable<ResponseFreeDestinationDetail> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: '',
      accountId: id,
    };

    return this.http.post<ResponseFreeDestinationDetail>(
      environment.api.base + environment.api.services.detailFreeDestination,
      user,
    );
  }
}
