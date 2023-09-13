import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { validateData } from '@app/shared/helpers/validateData.helper';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import {
  FastTransfer,
  IResFastTransfer,
} from '../../entities/fast-transfer.interface';

@Injectable()
export class FastTransferService {
  constructor(private http: HttpClient) {}

  public accountTransfer(
    fastTransfer: FastTransfer,
  ): Observable<IResFastTransfer> {
    const transfer = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      notes: validateData(fastTransfer.notes, ''),
      invoiceNumber: `${fastTransfer.invoiceNumber}`,
      accountFromInformation: {
        accountIdentifier: validateData(
          fastTransfer.accountFromInformation.accountIdentifier,
          '',
        ),
        productType: validateData(
          fastTransfer.accountFromInformation.productType,
          '',
        ),
        nickName: fastTransfer.accountFromInformation.nickName,
      },
      accountToInformation: {
        bank: fastTransfer.accountToInformation.bank,
        isNewAccount: fastTransfer.accountToInformation.isNewAccount,
        name: fastTransfer.accountToInformation.name,
        identificationNumber:
          fastTransfer.accountToInformation.identificationNumber,
        accountIdentifier: fastTransfer.accountToInformation.accountIdentifier,
        bankName: fastTransfer.accountToInformation.bankName,
        identificationType:
          fastTransfer.accountToInformation.identificationType,
        productType: fastTransfer.accountToInformation.productType,
        isFavorite: fastTransfer.accountToInformation.isFavorite,
        nickName: fastTransfer.accountToInformation.nickName,
      },
      transferInformation: {
        amount: fastTransfer.transferInformation.amount,
      },
      scheduledTransfer: fastTransfer.scheduledTransfer,
      dueDate: fastTransfer.dueDate,
      transactionCost: fastTransfer.dueDate,
    };
    return this.http.post<IResFastTransfer>(
      environment.api.base + environment.api.services.transfers.fast_transfer,
      transfer,
    );
  }
}
