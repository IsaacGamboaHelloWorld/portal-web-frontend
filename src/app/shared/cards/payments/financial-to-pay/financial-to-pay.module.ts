import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { FinancialToPayComponent } from './financial-to-pay.component';

@NgModule({
  declarations: [FinancialToPayComponent],
  imports: [CommonModule, CoreModule],
  exports: [FinancialToPayComponent],
})
export class FinancialToPayModule {}
