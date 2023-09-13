import { Component, ViewEncapsulation } from '@angular/core';
import { HomeModel } from '@modules/home/home.model';
import { ProductsState } from '@store/reducers/models/products/products.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-error',
  templateUrl: './product-error.component.html',
  styleUrls: ['./product-error.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductErrorComponent {
  constructor(private model: HomeModel) {}

  get infoProducts$(): Observable<ProductsState> {
    return this.model.infoProducts$;
  }

  get hasTextError$(): Observable<boolean> {
    return this.infoProducts$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data.errorMessage) && data.errorMessage !== '',
      ),
    );
  }

  public loadProducts(): void {
    this.model.fetchProducts();
    this.model.fetchFreeDestinationsAll();
  }
}
