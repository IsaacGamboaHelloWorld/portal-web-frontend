import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { BtnSquareModule } from '../../../shared/btn-square/btn-square.module';
import { TemplateSystemModule } from '../../../shared/template-system/template-system.module';
import { ChooseStepContainer } from './choose-step.container';

@NgModule({
  declarations: [ChooseStepContainer],
  imports: [
    CommonModule,
    TemplateSystemModule,
    CoreModule,
    BtnSquareModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChooseStepContainer,
      },
    ]),
  ],
})
export class ChooseStepModule {}
