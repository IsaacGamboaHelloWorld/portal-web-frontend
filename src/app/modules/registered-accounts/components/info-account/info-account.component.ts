import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { IProductAffiliationElement } from '@core/interfaces/product-destination.interface';
import { initialName } from '@modules/registered-accounts/utils/initialsName';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoAccountComponent {
  @Input() product: IProductAffiliationElement;
  @Output() action: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionTransfer: EventEmitter<void> = new EventEmitter<void>();
  public loadings: number = 3;
  constructor() {}

  get initials(): string {
    return initialName(this.product.customerName);
  }

  get hasProduct(): boolean {
    return !!this.product;
  }
}
