import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TYPE_ACCOUNTS } from '../../../../core/constants/types_account';

@Component({
  selector: 'app-loan-payment-info',
  templateUrl: './loan-payment-info.component.html',
  styleUrls: ['./loan-payment-info.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LoanPaymentInfoComponent implements OnInit {
  @Input() serviceName: string;
  @Input() enterprise: string;
  @Input() productType: string;
  @Input() loading: boolean = false;
  @Input() ref: string;
  @Input() owner: string;
  @Input() bankList: any[];
  @Output() payAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;
  public valueBank: string = '';
  constructor() {}

  ngOnInit(): void {}

  get T_CC(): boolean {
    return this.productType === TYPE_ACCOUNTS.CREDIT_CARD ||
      this.productType === 'TC'
      ? true
      : false;
  }

  get bankName(): string {
    this.valueBank = '';
    return this.valueBank;
  }

  public pay(): void {
    const dataToPay = {
      action: 'PAY',
      data: this.data,
    };
    this.payAction.emit(dataToPay);
  }
}
