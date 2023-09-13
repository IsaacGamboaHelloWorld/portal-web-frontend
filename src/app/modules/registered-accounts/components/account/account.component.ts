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
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  @Input() product: IProductAffiliationElement;
  @Input() isActive: boolean = false;
  @Output() action: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  get hasProduct(): boolean {
    return !!this.product;
  }

  get initials(): string {
    return initialName(this.product.customerName);
  }
}
