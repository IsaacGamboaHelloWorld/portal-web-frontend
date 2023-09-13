import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { ProductsInterface } from '@app/core/interfaces/products.interface';
import { Product } from '@app/core/models/products/product';
import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  ITypeCardBlockpProduct,
  TypeCardBlockpProductEnum,
} from '../../constants/type-card-block.enum';
import { DebitCardListStateData } from '../../entities/debit-cards-response';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';

@Component({
  selector: 'app-home-blocked',
  templateUrl: './home-blocked.component.html',
  styleUrls: ['./home-blocked.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeBlockedComponent implements OnInit {
  typeSelected: string = TypeCardBlockpProductEnum.cards;
  loading: boolean;

  constructor(private router: Router, private model: BlockedProductsModel) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.model.loadDebitCards();
  }

  changeSelectedType(type: string): void {
    this.typeSelected = type;
  }

  public retryLoadDebitCardList(): void {
    this.loading = true;
    this.model.loadDebitCards();
  }

  get productsTC$(): Observable<Product[]> {
    return this.model.products$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map((products: ProductsInterface) => {
        return joinProducts(products).filter((product: Product) => {
          return product.typeAccount === TYPE_ACCOUNTS.CREDIT_CARD;
        });
      }),
    );
  }

  get debitCardListState$(): Observable<DebitCardListStateData> {
    return this.model.debitCardList$.pipe(
      map((data: DebitCardListStateData) => {
        this.loading = data.loading;
        return data;
      }),
    );
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$.pipe(
      tap((resp: OptionModuleState) => {
        if (
          !!resp &&
          !!resp.data &&
          !!resp.data.block_product &&
          !!resp.data.block_product.options &&
          !!resp.data.block_product.options.option_account &&
          !resp.data.block_product.options.option_card
        ) {
          this.typeSelected = TypeCardBlockpProductEnum.account;
        }
      }),
    );
  }

  get typeOptionCards(): ITypeCardBlockpProduct {
    return TypeCardBlockpProductEnum;
  }
}
