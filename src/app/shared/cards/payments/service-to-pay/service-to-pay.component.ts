import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-service-to-pay',
  templateUrl: './service-to-pay.component.html',
  styleUrls: ['./service-to-pay.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceToPayComponent {
  @Input() enterprise: string;
  @Input() nameService: string;
  @Input() amount: string;
  @Input() date: string;
  @Input() programmed: boolean = false;
  @Input() nodata: boolean = false;
  @Input() loading: boolean = false;
  @Output() payAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;

  constructor() {}

  public pay(): void {
    const dataToPay = {
      action: 'PAY',
      data: this.data,
    };
    this.payAction.emit(dataToPay);
  }
}
