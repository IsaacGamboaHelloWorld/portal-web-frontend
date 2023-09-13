import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { LoanPaymentInfoComponent } from './loan-payment-info.component';

@NgModule({
  declarations: [LoanPaymentInfoComponent],
  imports: [CommonModule, CoreModule],
  exports: [LoanPaymentInfoComponent],
})
export class LoanPaymentInfoModule {}
