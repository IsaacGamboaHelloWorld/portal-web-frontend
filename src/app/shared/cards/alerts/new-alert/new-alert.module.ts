import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { NewAlertComponent } from './new-alert.component';

@NgModule({
  declarations: [NewAlertComponent],
  imports: [CommonModule, CoreModule],
  exports: [NewAlertComponent],
})
export class NewAlertModule {}
