import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';

import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { IHistoricPayments } from '@modules/payments/home-payments/store/reducers/historic-payments.reducer';

@Component({
  selector: 'app-historic-status',
  templateUrl: './historic-status.component.html',
  styleUrls: ['./historic-status.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricStatusComponent {
  @Input() historic: IHistoricPayments;
  @Output() clickBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  get hasData(): boolean {
    return !!this.historic;
  }

  get emptyHistoric(): boolean {
    return (
      joinProducts(this.historic.data).length === 0 && this.historic.loaded
    );
  }

  get hasErrorText(): boolean {
    return (
      !isNullOrUndefined(this.historic.errorMessage) &&
      this.historic.errorMessage !== ''
    );
  }

  public btnClick(): void {
    this.clickBtn.emit();
  }
}
