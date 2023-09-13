import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetailProductContainer } from '@modules/detail-product/detail-product.container';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailProductContainer,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule {}
