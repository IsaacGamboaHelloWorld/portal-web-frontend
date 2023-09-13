import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CREDIT_CARDS } from '@app/core/constants/imgs_cards';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { PaymentInterface } from '@app/core/interfaces/paymentObligation.interface';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient, private pipe: TypeCreditCardPipe) {}

  public accountPayment(
    ownershipIdType: string,
    ownershipIdNumber: string,
    originAccountId: number,
    originAccountType: string,
    destinationAccountId: string,
    destinationAccountType: string,
    destinationLoanName: string,
    destinationNewLoan: string,
    bank: string,
    amount: number | string,
    notes: string,
  ): Observable<PaymentInterface> {
    const payment = {
      companyId: BANKS.BANCO_POPULAR,
      ipAddress: '192.168.0.1',
      requestId: Math.floor(Date.now() / 1000),
      language: 'es_CO',
      accountPaymentOrigin: {
        accountId: originAccountId,
        accountType: originAccountType.toUpperCase(),
        bank: BANKS.BANCO_POPULAR,
        paymentInformation: notes,
      },
      accountPaymentDestination: {
        accountId: destinationAccountId,
        accountType: destinationAccountType.toUpperCase(),
        bank,
        loanName: destinationLoanName,
        newLoan: destinationNewLoan,
        brandId: this.getCreditCardBrand(
          destinationAccountId,
          destinationAccountType.toUpperCase(),
        ),
      },
      transactionValue: {
        amount,
        currencyCode: 'COP',
      },
      clientApp: {
        name: 'MB',
      },
    };

    if (destinationNewLoan === 'true') {
      payment.accountPaymentOrigin = null;
    }
    return this.http.post<PaymentInterface>(
      environment.api.base + environment.api.services.payment,
      payment,
    );
  }

  private getCreditCardBrand(
    destinationAccountId: string,
    destinationAccountType: string,
  ): string {
    if (
      'TC' === destinationAccountType ||
      TYPE_ACCOUNTS.CREDIT_CARD === destinationAccountType
    ) {
      const creditCardType: any = this.pipe.transform(destinationAccountId).img;
      if (CREDIT_CARDS.IMG_MASTER_CARD === creditCardType) {
        return '01';
      }
      if (CREDIT_CARDS.IMG_VISA === creditCardType) {
        return '02';
      }
    }
    return null;
  }
}
