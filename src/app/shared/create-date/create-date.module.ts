import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateDatePipe } from '@app/shared/create-date/create-date.pipe';

@NgModule({
  declarations: [CreateDatePipe],
  imports: [CommonModule],
  exports: [CreateDatePipe],
})
export class CreateDateModule {}
