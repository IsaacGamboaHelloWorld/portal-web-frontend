import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { Product } from '@app/core/models/products/product';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { Navigate } from '@core/constants/navigate';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { environment } from '@environment';
import { SecurityService } from '@modules/security/services/security.service';
import { Observable } from 'rxjs';
import { INavigate } from '../../../../core/constants/navigate';
import { HomeModel } from '../../home.model';

@Component({
  selector: 'app-product-credit-card',
  templateUrl: './product-credit-card.component.html',
  styleUrls: ['./product-credit-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCreditCardComponent {
  @Input() product: Product;
  @Input() nameBank: string;
  @Output() clickBox: EventEmitter<{
    product: Product;
    url: string;
  }> = new EventEmitter();

  private isPseTC: boolean = false;

  constructor(
    private router: Router,
    private dom: ManipulateDomService,
    private security: SecurityService,
    private model: HomeModel,
  ) {}

  get neededToPay(): boolean {
    return Product.getMinimumPayment(this.product) > 0;
  }

  get hasProduct(): boolean {
    return Product.hasProductData(this.product);
  }

  get hasNameBank(): boolean {
    return !isNullOrUndefined(this.nameBank);
  }

  public redirect(type: string, id: string | number): void {
    this.security.encryptAesGcm(id.toString()).then((data) => {
      this.router.navigate([Navigate.detail, type.toLowerCase(), data]);
      this.dom.scrollTop();
    });
  }

  get pilotView(): boolean {
    return environment.pilot;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get debt(): number {
    return !this.neededToPay && !isNullOrUndefined(this.product.capacity)
      ? 100 - this.product.capacity
      : 0;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$.pipe(
      tap((data: OptionModuleState) => this._mapOptionModule(data)),
    );
  }

  public payCreditCard(): void {
    this.model.setFlowFreeDestination(this.isPseTC);
    this.clickBox.emit({
      product: this.product,
      url: this.isPseTC
        ? Navigate.paymentsv2payForPse
        : Navigate.paymentsv2payloan,
    });
  }

  private _mapOptionModule(data: OptionModuleState): void {
    if (
      !data ||
      !data.data ||
      !data.data.payments ||
      !data.data.payments.options
    ) {
      this.isPseTC = false;
      return;
    }
    this.isPseTC = data.data.payments.options.payment_pse_credit_card;
  }
}
