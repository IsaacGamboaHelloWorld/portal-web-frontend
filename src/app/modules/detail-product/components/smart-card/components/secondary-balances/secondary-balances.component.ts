import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../../../../environments/environment';
import { TYPE_ACCOUNTS } from '../../../../../../core/constants/types_account';
import { Product } from '../../../../../../core/models/products/product';
import { ManipulateDomService } from '../../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { UserPocketsState } from '../../../../../../store/reducers/models/pockets/user-pockets.reducer';
import { PocketsByProduct } from '../../../../../pockets/home-pockets/entities/pocketsByProduct';

@Component({
  selector: 'app-secondary-balances',
  templateUrl: './secondary-balances.component.html',
  styleUrls: ['./secondary-balances.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SecondaryBalancesComponent {
  @Input() info: Product;
  @Input() pocketsByProductState: UserPocketsState = null;
  public showAdditionalData: boolean = false;
  public showOneData: boolean = true;

  @Output() callGetPockets: EventEmitter<void> = new EventEmitter();

  constructor(private dom: ManipulateDomService) {}

  get neededToPay(): boolean {
    return Product.getMinimumPayment(this.info) > 0;
  }

  get T_DA(): string {
    return TYPE_ACCOUNTS.DEPOSIT_ACCOUNT;
  }

  get T_CA(): string {
    return TYPE_ACCOUNTS.CURRENT_ACCOUNT;
  }

  get T_CC(): string {
    return TYPE_ACCOUNTS.CREDIT_CARD;
  }

  get typeProduct(): string {
    return this.info.accountInformation.productType;
  }

  get hasOverDraftDays(): boolean {
    return Number(this.info.overDraftDays) > 0 ? true : false;
  }

  get hasBalances(): boolean {
    return !isNullOrUndefined(this.info);
  }

  get pilotView(): boolean {
    return environment.pilot;
  }

  get purchasesToApply(): number {
    if (
      !isNullOrUndefined(this.info.productAccountBalances) &&
      this.info.productAccountBalances
        .compras_y_avances_pendientes_por_posteo &&
      this.info.productAccountBalances.compras_y_avances_pendientes_por_posteo
        .amount > 0
    ) {
      return this.info.productAccountBalances
        .compras_y_avances_pendientes_por_posteo.amount;
    }
    return 0;
  }

  get paymentsToApply(): number {
    if (
      !isNullOrUndefined(this.info.productAccountBalances) &&
      this.info.productAccountBalances.pagos_pendientes_por_posteo &&
      this.info.productAccountBalances.pagos_pendientes_por_posteo.amount > 0
    ) {
      return this.info.productAccountBalances.pagos_pendientes_por_posteo
        .amount;
    }
    return 0;
  }

  get havePockets(): boolean {
    return this.info.couldHavePockets;
  }

  public fetchPockets(): void {
    this.callGetPockets.emit();
  }

  public openAditional(): void {
    this.showAdditionalData = !this.showAdditionalData;
  }

  public pocketsByProduct(): PocketsByProduct {
    let pocketsByProduct: PocketsByProduct = null;
    for (const pocket of this.pocketsByProductState
      .productsWithPocketsInformation) {
      if (
        this.info.accountInformation.accountIdentifier.toString() ===
          pocket.parent.accountIdentifier &&
        this.info.accountInformation.productType === pocket.parent.productType
      ) {
        pocketsByProduct = pocket;
      }
    }
    return pocketsByProduct;
  }

  public openTooltip(tooltip: string): void {
    this.dom.addClass(tooltip, 'on');
  }

  public closeTip(tooltip: string): void {
    this.dom.removeClass(tooltip, 'on');
  }

  get pocketsLoaded(): boolean {
    return !isNullOrUndefined(this.pocketsByProduct());
  }

  get pocketsAmount(): number {
    return !isNullOrUndefined(this.pocketsByProduct())
      ? this.pocketsByProduct().pockets.length
      : 1;
  }

  get mustShowRetryGetPocketsButton(): boolean {
    return (
      !this.pocketsByProductState.loading &&
      (this.pocketsByProductState.error ||
        (this.pocketsLoaded && !this.pocketsByProduct().success))
    );
  }

  get mustShowGetPocketsButton(): boolean {
    return (
      !this.pocketsLoaded &&
      !this.pocketsByProductState.loading &&
      !this.pocketsByProductState.error
    );
  }

  get delinquentBalance(): number {
    if (
      !isNullOrUndefined(this.info.productAccountBalances) &&
      this.info.productAccountBalances.saldo_mora_pesos &&
      this.info.productAccountBalances.saldo_mora_pesos.amount > 0
    ) {
      return this.info.productAccountBalances.saldo_mora_pesos.amount;
    }
    return 0;
  }

  get mustShowTotalSavedOnPockets(): boolean {
    return (
      this.pocketsLoaded &&
      this.pocketsByProductState.loaded &&
      !this.pocketsByProductState.loading
    );
  }
}
