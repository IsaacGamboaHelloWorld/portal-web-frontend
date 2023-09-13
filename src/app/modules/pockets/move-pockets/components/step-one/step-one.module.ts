import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { HomePocketsService } from '@app/modules/pockets/home-pockets/services/home-pockets.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { LottieModule } from '@app/shared/lottie/lottie.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { IMoveMoneyPocketModuleState } from '../../entities/move-pockets';
import { MovePocketPocketsFacade } from '../../move-pockets.facade';
import { MoveMoneyPocketService } from '../../services/move-money.service';
import { MoveMoneyPocketsEffect } from '../../store/effects/move-money-pockets.effect';
import { MoveMoneyPocketRootReducer } from '../../store/reducers';
import { MoveMoneyPocketFeatureName } from '../../store/state/move-money-module.state';
import { ModalMovePocketsComponent } from '../modal-move-pockets/modal-move-pockets.component';
import { StepOneMoveComponent } from './step-one.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IMoveMoneyPocketModuleState>
>('Feature Move Money Pocket Reducer');

@NgModule({
  declarations: [StepOneMoveComponent, ModalMovePocketsComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    FormsModule,
    LottieModule,
    ReactiveFormsModule,
    StateInputModule,
    DropdownModuleSelect,
    TemplateSystemModule,
    CardChangeDataModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: StepOneMoveComponent,
      },
    ]),
    StoreModule.forFeature(MoveMoneyPocketFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([MoveMoneyPocketsEffect]),
  ],
  entryComponents: [ModalMovePocketsComponent],
  providers: [
    ModalService,
    MoveMoneyPocketService,
    HomePocketsService,
    MovePocketPocketsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: MoveMoneyPocketRootReducer,
    },
  ],
})
export class StepOneModule {}
