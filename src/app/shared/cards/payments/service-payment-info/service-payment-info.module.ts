import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { ServicePaymentInfoComponent } from './service-payment-info.component';

@NgModule({
  declarations: [ServicePaymentInfoComponent],
  imports: [CommonModule, CoreModule],
  exports: [ServicePaymentInfoComponent],
})
export class ServicePaymentInfoModule {}
