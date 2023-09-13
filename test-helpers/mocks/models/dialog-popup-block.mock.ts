import { Injectable } from '@angular/core';

@Injectable()
export class DialogConfigMock {
  public data: any = {
    accountInformation: {
      accountIdentifier: '4506580000000000',
      productType: 'CREDIT_CARD',
    },
    body: {
      digitNumber: 6,
    },
  };
}
