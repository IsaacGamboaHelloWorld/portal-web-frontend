import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import { CurrencyModule } from '../../../shared/currency/currency.module';
import { HomePocketsService } from '../home-pockets/services/home-pockets.service';
import { IMoveMoneyPocketModuleState } from './entities/move-pockets';
import { MovePocketsContainer } from './move-pockets.container';
import { MovePocketPocketsFacade } from './move-pockets.facade';
import { MoveMoneyPocketService } from './services/move-money.service';
import { MoveMoneyPocketRootReducer } from './store/reducers/index';
import { MoveMoneyPocketFeatureName } from './store/state/move-money-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IMoveMoneyPocketModuleState>
>('Feature Move Money Pocket Reducer');

@NgModule({
  declarations: [MovePocketsContainer],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    TemplateSystemModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: MovePocketsContainer,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./components/step-one/step-one.module').then(
                (m) => m.StepOneModule,
              ),
          },
          {
            path: 'resultado',
            loadChildren: () =>
              import('./components/step-two/step-two.module').then(
                (m) => m.StepTwoModule,
              ),
          },
        ],
      },
    ]),
    StoreModule.forFeature(MoveMoneyPocketFeatureName, FEATURE_REDUCER_TOKEN),
  ],
  providers: [
    MoveMoneyPocketService,
    HomePocketsService,
    MovePocketPocketsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: MoveMoneyPocketRootReducer,
    },
  ],
})
export class MovePocketsModule {}
