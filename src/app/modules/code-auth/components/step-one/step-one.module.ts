import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { CodeAuthModel } from '../../store/model/code-auth.model';
import { StepOneComponent } from './step-one.component';

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    ModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepOneComponent,
      },
    ]),
  ],
  providers: [CodeAuthModel],
})
export class StepOneModule {}
