import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ITypePayments,
  status,
  TYPE_PAYMENTS,
} from '@app/modules/paymentsv2/choose-history/entities/types';
import { RecordItem } from '@app/shared/historic/entities/registered-history';

@Component({
  selector: 'app-card-registered-payment',
  templateUrl: './card-registered-payment.component.html',
  styleUrls: ['./card-registered-payment.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardRegisteredPaymentComponent implements OnInit {
  @Input() data: RecordItem = null;
  public types: ITypePayments = TYPE_PAYMENTS;
  public toggle: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get isSuccess(): boolean {
    return !!this.data && this.data.paymentStatus === status.SUCCESS;
  }
  get hasData(): RecordItem {
    return this.data;
  }
}
