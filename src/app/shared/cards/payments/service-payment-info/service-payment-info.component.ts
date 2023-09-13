import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-service-payment-info',
  templateUrl: './service-payment-info.component.html',
  styleUrls: ['./service-payment-info.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ServicePaymentInfoComponent {
  @Input() serviceName: string;
  @Input() enterprise: string;
  @Input() loading: boolean = false;
  @Input() biller: boolean;
  @Input() ref: string;
  @Input() amount: string;
  @Input() data: any;
  @Input() billWithError: boolean;
  @Input() billWithErrorMessage: string;
  @Output() payAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  public pay(): void {
    const dataToPay = {
      action: 'PAY',
      data: this.data,
    };
    this.payAction.emit(dataToPay);
  }
}
