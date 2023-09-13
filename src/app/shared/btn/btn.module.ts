import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BtnComponent } from '@app/shared/btn/btn.component';

@NgModule({
  declarations: [BtnComponent],
  imports: [CommonModule],
  exports: [BtnComponent],
})
export class BtnModule {}
