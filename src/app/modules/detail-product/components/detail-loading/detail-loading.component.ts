import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '@core/models/products/product';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-detail-loading',
  templateUrl: './detail-loading.component.html',
  styleUrls: ['./detail-loading.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailLoadingComponent {
  @Input() data: any;
  @Input() product: Product;
  @Output() clickBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  get hasData(): boolean {
    return !isNullOrUndefined(this.data);
  }

  get hasErrorMessage$(): boolean {
    return (
      !isNullOrUndefined(this.product.errorMessage) &&
      this.product.errorMessage !== ''
    );
  }

  public btnClick(): void {
    this.clickBtn.emit();
  }
}
