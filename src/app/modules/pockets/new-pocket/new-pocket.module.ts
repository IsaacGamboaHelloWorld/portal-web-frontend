import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { CoreModule } from '../../../core/core.module';
import { LineTimeModule } from '../../../shared/line-time/line-time.module';
import { StateInputModule } from '../../../shared/state-input/state-input.module';
import { StepFourComponent } from './components/step-four/step-four.component';
import { StepOnePocketsComponent } from './components/step-one/step-one.component';
import { StepThreePocketComponent } from './components/step-three/step-three.component';
import { StepTwoPocketsComponent } from './components/step-two/step-two.component';
import { INewPocketModuleState } from './entities/new-pockets';
import { NewPocketContainer } from './new-pocket.container';
import { NewPocketFacade } from './new-pocket.facade';
import { NewPocketService } from './services/new-pocket.service';
import { NewPocketEffect } from './store/effects/new-pockets.effect';
import { NewPocketRootReducer } from './store/reducers/index';
import { NewPocketFeatureName } from './store/state/new-pocket-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewPocketModuleState>
>('Feature New Pocket Reducer');

@NgModule({
  declarations: [
    NewPocketContainer,
    StepOnePocketsComponent,
    StepTwoPocketsComponent,
    StepThreePocketComponent,
    StepFourComponent,
  ],
  imports: [
    CommonModule,
    BtnModule,
    CalendarModule,
    CoreModule,
    CurrencyModule.forRoot('es-US'),
    ReactiveFormsModule,
    FormsModule,
    LineTimeModule,
    ModalModule,
    StateInputModule,
    DropdownModuleSelect,
    TemplateSystemModule,
    TicketModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewPocketContainer,
      },
    ]),
    StoreModule.forFeature(NewPocketFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([NewPocketEffect]),
  ],
  providers: [
    NewPocketService,
    NewPocketFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: NewPocketRootReducer,
    },
    ModalService,
  ],
})
export class NewPocketModule {}
