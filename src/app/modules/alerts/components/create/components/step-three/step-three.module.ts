import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { StepThreeComponent } from './step-three.component';

@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateSystemModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepThreeComponent,
      },
    ]),
  ],
})
export class StepThreeModule {}
