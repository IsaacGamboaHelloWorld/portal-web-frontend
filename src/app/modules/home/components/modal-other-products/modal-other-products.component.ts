import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ProductsInterface } from '@core/interfaces/products.interface';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { HomeModel } from '@modules/home/home.model';
import { OtherProduct } from '@store/reducers/models/products/other-products.reducer';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-modal-other-products',
  templateUrl: './modal-other-products.component.html',
  styleUrls: ['./modal-other-products.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalOtherProductsComponent {
  constructor(
    private model: HomeModel,
    private modalService: ModalService,
    private dom: ManipulateDomService,
  ) {}
  public products: number[] = [];

  get otherProducts$(): Observable<OtherProduct[]> {
    return this.model.otherProducts$;
  }

  get isLoading$(): Observable<boolean> {
    return this.otherProducts$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map(
        (products: OtherProduct[]) =>
          products.filter((product) => product.loading).length ===
          products.length,
      ),
    );
  }

  get hasProducts(): Observable<boolean> {
    return this.model.hasOtherProducts$;
  }

  public identify(index: number, item: { key: string }): string {
    return item.key;
  }

  public loadBank(bank: string): void {
    this.model.loadOtherBank(bank);
  }

  public lengthProducts(products: ProductsInterface): number {
    return joinProducts(products).length;
  }

  public cancel(): void {
    this._closeModal();
    this.model.showOtherProducts(false);
  }

  public viewProducts(): void {
    this._closeModal();
    this.dom.scrollToDivById('other-products');
  }

  private _closeModal(): void {
    this.modalService.close();
  }
}
