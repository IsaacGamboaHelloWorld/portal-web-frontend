import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeTransferComponent } from '@modules/transfer-to-account/components/home-transfer/home-transfer.component';
import { TransferToAccountContainer } from '@modules/transfer-to-account/transfer-to-account.container';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TransferToAccountContainer,
        children: [
          {
            path: 'cuentas-inscritas',
            loadChildren: () =>
              import('../registered-accounts/registered-accounts.module').then(
                (m) => m.RegisteredAccountsModule,
              ),
          },
          {
            path: '',
            component: HomeTransferComponent,
          },
          {
            path: 'nueva-transferencia',
            loadChildren: () =>
              import('./components/old-transfer/old-transfer.module').then(
                (m) => m.OldTransferModule,
              ),
          },
          {
            path: 'transferencia-rapida',
            loadChildren: () =>
              import('../fast-transfer/fast-transfer.module').then(
                (m) => m.FastTransferModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class TransferToAccountRoutingModule {}
