import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarProgressComponent } from './bar-progress.component';

@NgModule({
  declarations: [BarProgressComponent],
  imports: [CommonModule],
  exports: [BarProgressComponent],
})
export class BarProgressModule {}
