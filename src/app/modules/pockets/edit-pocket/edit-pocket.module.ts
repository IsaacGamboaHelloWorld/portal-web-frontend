import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import { CurrencyModule } from '../../../shared/currency/currency.module';
import { StateInputModule } from '../../../shared/state-input/state-input.module';
import { NewPocketService } from '../new-pocket/services/new-pocket.service';
import { EditStepOneComponent } from './components/edit-step-one/edit-step-one.component';
import { EditPocketContainer } from './edit-pocket.container';
import { EditPocketFacade } from './edit-pocket.facade';
import { EditPocketService } from './services/edit-pocket.service';
import { EditPocketEffect } from './store/effects/edit-pocket.effect';
import { EditPocketRootReducer } from './store/reducers/index';

import { TicketModule } from '@app/shared/ticket/ticket.module';
import { HomePocketsFacade } from '../home-pockets/home-pockets.facade';
import { DeleteStepOneComponent } from './components/delete-step-one/delete-step-one.component';
import {
  EditPocketFeatureName,
  EditPocketModuleState,
} from './store/state/edit-pocket-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<EditPocketModuleState>
>('Feature Edit Pockets Reducers');

@NgModule({
  declarations: [
    EditPocketContainer,
    EditStepOneComponent,
    DeleteStepOneComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    BtnModule,
    StateInputModule,
    DropdownModuleSelect,
    CurrencyModule.forRoot('es-US'),
    TemplateSystemModule,
    TicketModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditPocketContainer,
      },
    ]),
    StoreModule.forFeature(EditPocketFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([EditPocketEffect]),
  ],
  providers: [
    EditPocketService,
    NewPocketService,
    EditPocketFacade,
    HomePocketsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: EditPocketRootReducer,
    },
  ],
})
export class EditPocketModule {}
