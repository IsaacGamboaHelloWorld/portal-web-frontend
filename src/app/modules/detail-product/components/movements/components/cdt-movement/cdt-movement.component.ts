import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Product } from '../../../../../../core/models/products/product';

@Component({
  selector: 'app-cdt-movement',
  templateUrl: './cdt-movement.component.html',
  styleUrls: ['./cdt-movement.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CdtMovementComponent {
  @Input() movements: Product;

  public toggle: object = {};

  constructor(@Inject('isMobile') public isMobile: boolean) {}

  get hasMovements(): boolean {
    return !isNullOrUndefined(this.movements);
  }
}
