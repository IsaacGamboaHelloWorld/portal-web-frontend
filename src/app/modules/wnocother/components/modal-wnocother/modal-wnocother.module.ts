import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { ModalWnocotherComponent } from './modal-wnocother.component';

@NgModule({
  declarations: [ModalWnocotherComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    BtnModule,
    ReactiveFormsModule,
  ],
  exports: [ModalWnocotherComponent],
})
export class ModalWnocotherModule {}
