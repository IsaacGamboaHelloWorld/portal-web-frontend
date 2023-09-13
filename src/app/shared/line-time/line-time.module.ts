import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LineTimeComponent } from './line-time.component';

@NgModule({
  declarations: [LineTimeComponent],
  imports: [CommonModule],
  exports: [LineTimeComponent],
})
export class LineTimeModule {}
