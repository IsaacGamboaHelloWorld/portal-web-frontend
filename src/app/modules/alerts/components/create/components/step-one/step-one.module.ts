import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BarProgressModule } from '@app/shared/bar-progress/bar-progress.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { StepOneComponent } from './step-one.component';

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    BarProgressModule,
    CheckboxSlideModule,
    CoreModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepOneComponent,
      },
    ]),
  ],
})
export class StepOneModule {}
