import { Component, Input, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Product } from '../../../../core/models/products/product';
import { UserPocketsState } from '../../../../store/reducers/models/pockets/user-pockets.reducer';
import { DetailProductModel } from '../../detail-product.model';

@Component({
  selector: 'app-smart-card',
  templateUrl: './smart-card.component.html',
  styleUrls: ['./smart-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SmartCardComponent {
  @Input() data: Product;
  @Input() pocketsByProductState: UserPocketsState = null;

  constructor(private _model: DetailProductModel) {}

  get hasData(): boolean {
    return !isNullOrUndefined(this.data);
  }

  public fetchPockets(): void {
    this._model.fetchPockets();
  }
}
