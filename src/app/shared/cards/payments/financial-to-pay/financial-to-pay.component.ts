import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-financial-to-pay',
  templateUrl: './financial-to-pay.component.html',
  styleUrls: ['./financial-to-pay.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class FinancialToPayComponent {
  @Input() enterprise: string;
  @Input() nameService: string;
  @Input() ref: string = '';
  @Input() date: string;
  @Input() programmed: boolean = false;
  @Input() nodata: boolean = false;
  @Input() loading: boolean = false;
  @Output() payAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;

  constructor() {}

  public pay(): void {
    if (!!this.data) {
      const dataToPay = {
        action: 'PAY',
        data: this.data,
      };
      this.payAction.emit(dataToPay);
    }
  }
}
