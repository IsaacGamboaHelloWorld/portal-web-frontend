import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FreeDestinationDetail } from '@app/core/interfaces/free-destination.interface';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-free-destination-container',
  templateUrl: './free-destination-container.component.html',
  styleUrls: ['./free-destination-container.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class FreeDestinationContainerComponent implements OnInit {
  @Input() products: FreeDestinationDetail[];

  constructor() {}

  ngOnInit(): void {}

  public trackByFn(index: number, product: FreeDestinationDetail): string {
    return product.accountIdentifier;
  }

  get hasProducts(): boolean {
    return !isNullOrUndefined(this.products) && this.products.length > 0;
  }

  get quantityProducts(): number {
    return !isNullOrUndefined(this.products) ? this.products.length : 0;
  }
}
