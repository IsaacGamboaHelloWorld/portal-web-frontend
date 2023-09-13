import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { CheckboxSlideModule } from '../../../checkbox-slide/checkbox-slide.module';
import { ProgrammedPaymentComponent } from './programmed-payment.component';

@NgModule({
  declarations: [ProgrammedPaymentComponent],
  imports: [CommonModule, CheckboxSlideModule, CoreModule],
  exports: [ProgrammedPaymentComponent],
})
export class ProgrammedPaymentModule {}
