import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { IBlockProduct } from '../entities/block-product';
import { IBlockProductResponse } from '../entities/block-product-response';

@Injectable()
export class BlockProductService {
  constructor(private http: HttpClient) {}

  public blockProduct(form: IBlockProduct): Observable<IBlockProductResponse> {
    const options = {
      accountId: form.accountId,
      accountType: form.accountType,
      refType: form.refType,
    };
    return this.http.post<IBlockProductResponse>(
      environment.api.base + environment.api.services.blockprods,
      options,
    );
  }
}
