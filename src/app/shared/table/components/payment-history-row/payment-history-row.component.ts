import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Record } from '@modules/paymentsv2/choose-history/entities/choose-history';
import {
  ITypePayments,
  status,
  TYPE_PAYMENTS,
} from '../../../../modules/paymentsv2/choose-history/entities/types';

@Component({
  selector: 'app-payment-history-row',
  templateUrl: './payment-history-row.component.html',
  styleUrls: ['./payment-history-row.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentHistoryRowComponent {
  @Input() data: Record = null;
  public types: ITypePayments = TYPE_PAYMENTS;
  public toggle: boolean = false;

  constructor() {}

  get isSuccess(): boolean {
    return !!this.data && this.data.paymentStatus === status.SUCCESS;
  }
  get hasData(): Record {
    return this.data;
  }
}
