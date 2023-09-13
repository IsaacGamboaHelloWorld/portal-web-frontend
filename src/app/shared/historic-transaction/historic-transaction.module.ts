import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HistoricTransactionComponent } from '@app/shared/historic-transaction/components/historic-transaction/historic-transaction.component';
import { TransactionComponent } from './components/transaction/transaction.component';

@NgModule({
  declarations: [HistoricTransactionComponent, TransactionComponent],
  exports: [HistoricTransactionComponent, TransactionComponent],
  imports: [CommonModule],
})
export class HistoricTransactionModule {}
