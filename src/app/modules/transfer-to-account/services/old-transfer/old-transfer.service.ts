import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  validateData,
  validateEmpty,
  validateType,
} from '@app/shared/helpers/validateData.helper';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { AccountTransferInterface } from '../../entities/accountTransfer.interface';
import { IFormOneTransferInterface } from '../../entities/formOneTransfer.interface';
import {
  IScheduleTransferCreate,
  IScheduleTransferDelete,
} from '../../entities/scheduledTransfer.interface';

@Injectable()
export class OldTransferService {
  constructor(private http: HttpClient) {}

  public scheduledTransferCreate(
    formOne: IFormOneTransferInterface,
    amountt: number | string,
    voucher: number | string,
    dueDate: string,
    descriptiont: string,
    isNew: boolean = false,
    scheduledTransfer: boolean = false,
    isFavorite: boolean = false,
    periodicity: string,
    numberRepeat: number,
    nickFrom?: string,
    nickTo?: string,
  ): Observable<IScheduleTransferCreate> {
    const scheduled = {
      transferInformation: {
        amount: amountt,
      },
      accountFromInformation: {
        accountIdentifier: validateData(formOne.account_origin.id, ''),
        productType: validateData(formOne.account_origin.typeAccount, ''),
      },
      accountToInformation: this.destinationFormat(isNew, formOne, isFavorite),
      scheduleInfo: {
        transactionExecutionDate: dueDate,
        description: descriptiont,
        recurrent: true,
        frequency: periodicity,
        transactionTerms: 'INVOICE_RECEIVED',
        numberDesiredPayments: numberRepeat,
      },
    };
    scheduled.accountFromInformation['nickName'] = nickFrom;
    scheduled.accountToInformation['nickName'] = nickTo;
    return this.http.post<IScheduleTransferCreate>(
      environment.api.base + environment.api.services.scheduled.create,
      scheduled,
    );
  }

  public scheduledTransferDelete(
    id: string,
  ): Observable<IScheduleTransferDelete> {
    const idScheduled = {
      scheduleId: id,
    };

    return this.http.post<IScheduleTransferDelete>(
      environment.api.base + environment.api.services.scheduled.delete,
      idScheduled,
    );
  }

  public accountTransfer(
    formOne: IFormOneTransferInterface,
    amount: number | string,
    voucher: number | string,
    dueDate: string,
    description: string,
    isNew: boolean = false,
    scheduledTransfer: boolean = false,
    isFavorite: boolean = false,
    transactionCost: string = '$0',
    nickFrom?: string,
    nickTo?: string,
  ): Observable<AccountTransferInterface> {
    const transfer = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      notes: validateData(description, ''),
      invoiceNumber: `${validateData(voucher, '')}`,
      accountFromInformation: {
        accountIdentifier: validateData(formOne.account_origin.id, ''),
        productType: validateData(formOne.account_origin.typeAccount, ''),
      },
      accountToInformation: this.destinationFormat(isNew, formOne, isFavorite),
      transferInformation: {
        amount,
      },
      scheduledTransfer,
      dueDate,
      transactionCost,
    };
    transfer.accountFromInformation['nickName'] = nickFrom;
    transfer.accountToInformation['nickName'] = nickTo;
    return this.http.post<AccountTransferInterface>(
      environment.api.base +
        environment.api.services.transfers.account_transfer,
      transfer,
    );
  }

  private destinationFormat(
    isNew: boolean,
    form: IFormOneTransferInterface,
    isFavorite: boolean,
  ): object {
    return {
      accountIdentifier: validateType(
        isNew,
        validateEmpty(form.accountIdentifier, ''),
        validateEmpty(form.account_destination.destinationAccountId, ''),
      ),
      productType: validateType(
        isNew,
        validateEmpty(form.productType, ''),
        validateEmpty(form.account_destination.destinationAccountType, ''),
      ),
      bank: validateType(
        isNew,
        validateEmpty(form.bank.value, ''),
        validateEmpty(form.account_destination.bankId, ''),
      ),
      bankName: validateType(
        isNew,
        validateEmpty(form.bank.name, ''),
        validateEmpty(form.account_destination.bankName, ''),
      ),
      identificationType: validateType(
        isNew,
        validateEmpty(form.identificationType, ''),
        validateEmpty(form.account_destination.customerIdType, ''),
      ),
      identificationNumber: validateType(
        isNew,
        validateEmpty(form.identificationNumber, ''),
        validateEmpty(form.account_destination.customerId, ''),
      ),
      isNewAccount: isNew,
      name: validateType(
        isNew,
        validateEmpty(form.name, ''),
        validateEmpty(form.account_destination.customerName, ''),
      ),
      isFavorite,
    };
  }
}
