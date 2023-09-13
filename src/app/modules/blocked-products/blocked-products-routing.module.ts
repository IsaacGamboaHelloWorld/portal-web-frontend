import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlockedProductsContainer } from '@modules/blocked-products/blocked-products.container';
import { HomeBlockedComponent } from '@modules/blocked-products/components/home-blocked/home-blocked.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BlockedProductsContainer,
        children: [
          {
            path: '',
            component: HomeBlockedComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class BlockproductRoutingModule {}
