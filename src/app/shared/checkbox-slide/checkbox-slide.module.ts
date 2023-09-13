import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckboxSlideComponent } from '@app/shared/checkbox-slide/checkbox-slide.component';

@NgModule({
  declarations: [CheckboxSlideComponent],
  imports: [CommonModule],
  exports: [CheckboxSlideComponent],
})
export class CheckboxSlideModule {}
