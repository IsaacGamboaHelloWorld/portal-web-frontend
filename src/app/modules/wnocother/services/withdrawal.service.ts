import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import { BANKS } from '@core/constants/banks';
import { environment as ENV } from '@environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class WnocotherService {
  constructor(private http: HttpClient, private translate: TranslateService) {}

  public getOTPWitdrawal(data: object): Observable<OtpWithDrawal> {
    let actId = '';
    if (data['from']) {
      actId = data['from']['id']
        ? data['from']['id']
        : data['from']['accountId'];
    }
    const withdrawal = {
      otpType: 'W',
      otpChannel: data['where'],
      revocation: true,
      amount: data['ammount'],
      accountId: actId,
      accountType: data['from'] ? data['from']['accountType'] : '',
      currency: 'COP',
      companyId: BANKS.BANCO_POPULAR,
      smsMessage: this.translate.instant('WITHDRAWAL.VALID_STEP.SEND_SMS'),
      sendBySMS: true,
      beneficiaryId: data['document'],
    };
    return this.http.post<OtpWithDrawal>(
      ENV.api.base + ENV.api.services.otpService,
      withdrawal,
    );
  }
}
