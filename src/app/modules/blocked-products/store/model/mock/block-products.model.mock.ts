import { Injectable } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import { BlockProductStateData } from '@app/modules/blocked-products/entities/block-product-response';
import { DebitCardListStateData } from '@app/modules/blocked-products/entities/debit-cards-response';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { BehaviorSubject } from 'rxjs';
import { responseOptionsModuleMock } from '../../../../../../../test-helpers/mocks/data/options-modules.mock';
import {
  blockCreditCardMock,
  debitCardListStateDataMock,
} from '../../../../../../../test-helpers/mocks/data/products-blocks.mock';

@Injectable()
export class BlockProductsModelMock {
  private innerProductData?: any = blockCreditCardMock;
  get getInnerProductData(): any {
    return this.innerProductData;
  }
  set setInnerProductData(data: any) {
    this.innerProductData = data;
    this.products$.next(data);
  }

  private innerDebitCardData?: any = debitCardListStateDataMock;
  get getInnerDebitCardData(): any {
    return this.innerDebitCardData;
  }
  set setInnerDebitCardData(data: any) {
    this.innerDebitCardData = data;
    this.debitCardList$.next(data);
  }

  public block$: BehaviorSubject<BlockProductStateData> = new BehaviorSubject(
    null,
  );
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject(
    this.innerProductData,
  );
  public debitCardList$: BehaviorSubject<
    DebitCardListStateData
  > = new BehaviorSubject(this.innerDebitCardData);

  public optionModule$: BehaviorSubject<
    OptionModuleState
  > = new BehaviorSubject<OptionModuleState>(responseOptionsModuleMock as any);

  public blockProduct(): void {}
  public loadDebitCards(): void {}
  public loadProducts(): void {}
}
