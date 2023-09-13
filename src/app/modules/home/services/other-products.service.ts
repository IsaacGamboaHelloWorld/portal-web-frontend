import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BANKS } from '@core/constants/banks';
import { IRespOtherProducts } from '@core/interfaces/products.interface';
import { environment } from '@environment';

@Injectable()
export class OtherProductsService {
  constructor(private http: HttpClient) {}

  public OtherProducts(nameBank: string): Observable<IRespOtherProducts> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: '',
      entitySearch: nameBank,
    };

    return this.http.post<IRespOtherProducts>(
      environment.api.base + environment.api.services.otherProducts,
      user,
    );
  }
}
