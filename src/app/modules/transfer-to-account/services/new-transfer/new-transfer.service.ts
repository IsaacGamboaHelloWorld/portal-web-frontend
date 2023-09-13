import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  IResNewTransfer,
  NewTransfer,
} from '../../entities/new-transfer.interface';

@Injectable()
export class NewTransferService {
  constructor(private http: HttpClient) {}

  public accountTransfer(
    newTransfer: NewTransfer,
  ): Observable<IResNewTransfer> {
    const transfer = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      notes: validateData(newTransfer.notes, ''),
      invoiceNumber: `${validateData(newTransfer.invoiceNumber, '')}`,
      accountFromInformation: {
        accountIdentifier: validateData(
          newTransfer.accountFromInformation.accountIdentifier,
          '',
        ),
        productType: validateData(
          newTransfer.accountFromInformation.productType,
          '',
        ),
        nickName: newTransfer.accountFromInformation.nickName,
      },
      accountToInformation: {
        bank: newTransfer.accountToInformation.bank,
        isNewAccount: newTransfer.accountToInformation.isNewAccount,
        name: newTransfer.accountToInformation.name,
        identificationNumber:
          newTransfer.accountToInformation.identificationNumber,
        accountIdentifier: newTransfer.accountToInformation.accountIdentifier,
        bankName: newTransfer.accountToInformation.bankName,
        identificationType: newTransfer.accountToInformation.identificationType,
        productType: newTransfer.accountToInformation.productType,
        isFavorite: newTransfer.accountToInformation.isFavorite,
        nickName: newTransfer.accountToInformation.nickName,
      },
      transferInformation: {
        amount: newTransfer.transferInformation.amount,
      },
      scheduledTransfer: newTransfer.scheduledTransfer,
      dueDate: newTransfer.dueDate,
      transactionCost: newTransfer.dueDate,
    };
    return this.http.post<IResNewTransfer>(
      environment.api.base +
        environment.api.services.transfers.account_transfer,
      transfer,
    );
  }
}
