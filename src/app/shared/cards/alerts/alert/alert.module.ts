import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { CheckboxSlideModule } from '../../../checkbox-slide/checkbox-slide.module';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, CoreModule, CheckboxSlideModule],
  exports: [AlertComponent],
})
export class AlertModule {}
