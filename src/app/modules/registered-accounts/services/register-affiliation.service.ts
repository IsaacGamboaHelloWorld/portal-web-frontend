import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IProductAffiliationElement,
  OriginAccountRegistrationProduct,
} from '@app/core/interfaces/product-destination.interface';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { IRespDeleteAffiliation } from '../entities/delete-affition';

@Injectable()
export class RegisterAffiliationService {
  constructor(private http: HttpClient) {}

  public registerAffiliation(
    affiliationProduct: IProductAffiliationElement,
    products: OriginAccountRegistrationProduct[],
  ): Observable<IRespDeleteAffiliation> {
    const relationship = { ...{}, ...affiliationProduct };
    relationship.bankId = relationship.bankId['value'];
    const request = {
      affiliationProduct: [relationship],
      originAccounts: products,
    };
    return this.http.post<IRespDeleteAffiliation>(
      environment.api.base +
        environment.api.services.registerAffiliationProducts,
      request,
    );
  }
}
