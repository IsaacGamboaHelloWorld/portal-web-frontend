import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { IAdvanceResp } from '@modules/advance/entities/advance';
import { IFormGlobal } from '@modules/advance/entities/form-global';
import { Observable } from 'rxjs';

@Injectable()
export class AdvanceService {
  constructor(private http: HttpClient) {}

  public advanceTransfer(form: IFormGlobal): Observable<IAdvanceResp> {
    const body = {
      accountFromInformation: {
        accountIdentifier: form.origin.id,
        productType: form.origin.typeAccount,
        bank: form.origin.accountInformation.bank,
        expirationMonth: form.month,
        expirationYear: form.year,
      },
      accountToInformation: {
        accountIdentifier: form.destination.id,
        productType: form.destination.typeAccount,
        bank: form.destination.accountInformation.bank,
      },
      advanceInformation: {
        amount: form.amount,
        currencyCode: 'COP',
        description: form.description,
        numberFees: 36,
      },
      currentSystemDate: Date.now(),
      transactionCost: '$0',
    };

    return this.http.post<IAdvanceResp>(
      environment.api.base + environment.api.services.advance.transfer,
      body,
    );
  }
}
