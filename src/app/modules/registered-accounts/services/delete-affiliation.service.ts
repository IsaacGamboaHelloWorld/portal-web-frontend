import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BANKS } from '@core/constants/banks';
import { IProductAffiliationElement } from '@core/interfaces/product-destination.interface';
import { Product } from '@core/models/products/product';
import { IRespDeleteAffiliation } from '@modules/registered-accounts/entities/delete-affition';
import { environment } from 'environments/environment';

@Injectable()
export class DeleteAffiliationService {
  constructor(private http: HttpClient) {}

  public deleteAffiliation(
    affiliationProduct: IProductAffiliationElement,
    product: Product,
  ): Observable<IRespDeleteAffiliation> {
    const productDelete = {
      companyId: BANKS.BANCO_POPULAR,
      affiliationProduct: {
        originAccountId: product.id,
        originAccountType: product.typeAccount,
        destinationAccountId: affiliationProduct.destinationAccountId,
        destinationAccountType: affiliationProduct.destinationAccountType,
        customerId: affiliationProduct.customerId,
        customerIdType: affiliationProduct.customerIdType,
        bankId: affiliationProduct.bankId,
      },
    };

    return this.http.post<IRespDeleteAffiliation>(
      environment.api.base + environment.api.services.deleteAffiliationProducts,
      productDelete,
    );
  }
}
