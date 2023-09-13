import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { ServiceToPayComponent } from './service-to-pay.component';

@NgModule({
  declarations: [ServiceToPayComponent],
  imports: [CommonModule, CoreModule],
  exports: [ServiceToPayComponent],
})
export class ServiceToPayModule {}
