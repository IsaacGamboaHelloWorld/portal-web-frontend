import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './../../core/core.module';
import { LabelRadioButtonComponent } from './label-radio-button.component';

@NgModule({
  declarations: [LabelRadioButtonComponent],
  imports: [CommonModule, CoreModule],
  exports: [LabelRadioButtonComponent],
})
export class LabelRadioButtonModule {}
