import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment';
import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';
import { IRespondRecharge } from '@modules/recharge-phone/entities/recharge';

@Injectable()
export class CellPhoneRechargeService {
  constructor(private http: HttpClient) {}

  public recharge(form: IFormOneRecharge): Observable<IRespondRecharge> {
    const options = {
      accountId: form.account_origin.id || '',
      accountType: form.account_origin.typeAccount || '',
      phoneNumber: form.phone_number,
      amount: form.amount,
      operatorCode: form.operator.code,
      operatorName: form.operator.name,
      currentSystemDate: Date.now(),
      transactionCost: '$0',
    };

    return this.http.post<IRespondRecharge>(
      environment.api.base + environment.api.services.cellPhoneRecharge,
      options,
    );
  }
}
