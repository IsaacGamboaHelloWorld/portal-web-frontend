import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { status } from '@modules/payments/home-payments/constants/status';
import {
  ITypePayments,
  TYPE_PAYMENTS,
} from '@modules/payments/home-payments/constants/types';
import { Record } from '@modules/payments/home-payments/entities/historic-payments';

@Component({
  selector: 'app-transaction-payment',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {
  public showInfo: boolean = false;
  public types: ITypePayments = TYPE_PAYMENTS;
  @Input() transaction: Record;
  constructor() {}

  get isSuccess(): boolean {
    return (
      !!this.transaction && this.transaction.paymentStatus === status.SUCCESS
    );
  }

  get hasDescription(): boolean {
    return (
      !!this.transaction.description && this.transaction.description !== ''
    );
  }

  public toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }

  get hasData(): boolean {
    return !!this.transaction;
  }
}
