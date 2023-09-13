import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { BlockProductLoad } from '@app/modules/blocked-products/store/actions/block-product.action';
import { productsLoad } from '@app/store/actions/models/products/products.action';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBlockProduct } from '../../entities/block-product';
import { BlockProductStateData } from '../../entities/block-product-response';
import { DebitCardListStateData } from '../../entities/debit-cards-response';
import { DebitCardListLoad } from '../actions/debit-cards.action';
import {
  blockProductResponse,
  debitCardsListResponse,
} from '../selectors/block-product.selector';

@Injectable()
export class BlockedProductsModel extends ApplicationModel {
  public block$: Observable<BlockProductStateData> = this.store.pipe(
    select(blockProductResponse),
  );

  public debitCardList$: Observable<DebitCardListStateData> = this.store.pipe(
    select(debitCardsListResponse),
  );

  public blockProduct(form: IBlockProduct): void {
    this.store.dispatch(BlockProductLoad(form));
  }

  public loadDebitCards(): void {
    this.store.dispatch(DebitCardListLoad());
  }

  public loadProducts(): void {
    this.store.dispatch(productsLoad());
  }
}
