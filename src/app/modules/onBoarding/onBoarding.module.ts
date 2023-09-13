import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';

import { OnBoardingContainer } from '@modules/onBoarding/components/onboarding-container/onboarding-container.component';
import { OnBoardingRoutingModule } from '@modules/onBoarding/onBoarding-routing.module';
import { SliderOnBoardingComponent } from './components/slider-on-boarding/slider-on-boarding.component';
import { StepFourComponent } from './components/step-four/step-four.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    OnBoardingContainer,
    WelcomeComponent,
    SliderOnBoardingComponent,
  ],
  imports: [CommonModule, OnBoardingRoutingModule, CoreModule],
})
export class OnBoardingModule {}
