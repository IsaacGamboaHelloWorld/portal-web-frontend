import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { OnboardingComponent } from './onboarding.component';

@NgModule({
  declarations: [OnboardingComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: OnboardingComponent,
      },
    ]),
  ],
})
export class OnboardingModule {}
