import { Injectable } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import { BehaviorSubject } from 'rxjs';
import {
  banksPseSuccessMock,
  initPseSuccessMock,
} from '../data/private-pse.mock';
import { ProductsMock } from '../data/products.mock';

@Injectable()
export class PaymentFreeDestinationModelMock {
  public getStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  public selectAllProducts$: BehaviorSubject<Product[]> = new BehaviorSubject(
    ProductsMock.DEPOSIT_ACCOUNT.concat(ProductsMock.CURRENT_ACCOUNT),
  );
  public formOne$: BehaviorSubject<any> = new BehaviorSubject({});
  public formTwo$: BehaviorSubject<any> = new BehaviorSubject({});
  public selectBanksData$: BehaviorSubject<any> = new BehaviorSubject({});
  public selectBanks$: BehaviorSubject<any> = new BehaviorSubject(
    banksPseSuccessMock.banks,
  );
  public formThree$: BehaviorSubject<any> = new BehaviorSubject({});
  public initPaymentPse$: BehaviorSubject<any> = new BehaviorSubject(
    initPseSuccessMock,
  );
  public statusPaymentPse$: BehaviorSubject<any> = new BehaviorSubject({});
  public statusPaymentDataPse$: BehaviorSubject<any> = new BehaviorSubject({});

  public setStep(_step: number): void {}
  public resetStep(): void {}
  public setFormOne(_form: any): void {}
  public resetFormOne(): void {}
  public fetchBanksPse(): void {}
  public setFormTwo(_form: any): void {}
  public resetFormTwo(): void {}
  public resetBanksPse(): void {}
  public setFormThree(_form: any): void {}
  public resetFormThree(): void {}
  public fetchInitPaymentPse(_body: any): void {}
  public resetInitPaymentPse(): void {}
  public fetchStatusPaymentPse(_paymentId: any): void {}
  public resetStatusPaymentPse(): void {}

  public notificationOpen(): void {}
  public notificationClosed(): void {}
}
