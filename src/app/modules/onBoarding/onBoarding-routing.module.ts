import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnBoardingContainer } from '@modules/onBoarding/components/onboarding-container/onboarding-container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OnBoardingContainer,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OnBoardingRoutingModule {}
