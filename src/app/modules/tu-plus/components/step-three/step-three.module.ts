import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { AdvanceFacade } from '@app/modules/advance/advance.facade';
import { HomeModel } from '@app/modules/home/home.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { CardNotificationModule } from '@app/shared/card-notification/card-notification.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { DsCreditCardModule } from '@app/shared/ds/ds-credit-card/ds-credit-card.module';
import { LottieModule } from '@app/shared/lottie/lottie.module';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { StepThreeRoutingModule } from './step-three-routing.module';
import { StepThreeComponent } from './step-three.component';

@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CommonModule,
    CoreModule,
    StepThreeRoutingModule,
    CardChangeDataModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModuleSelect,
    AutoCompleteModule,
    StateInputModule,
    BtnModule,
    LottieModule,
    DsCreditCardModule,
    CardNotificationModule,
  ],
  providers: [HomeModel, AdvanceFacade],
})
export class StepThreeModule {}
