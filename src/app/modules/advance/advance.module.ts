import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NewsService } from '@app/shared/news/services/news.service';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CoreModule } from '@core/core.module';
import { AdvanceRoutingModule } from '@modules/advance/advance-routing.module';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { StepGuard } from '@modules/advance/guards/step.guard';
import { AdvanceService } from '@modules/advance/services/advance.service';
import { StepService } from '@modules/advance/services/step.service';
import { TransferAdvanceEffect } from '@modules/advance/store/effects/transfer-advance.effect';
import { AdvanceRootReducer } from '@modules/advance/store/reducers';
import {
  AdvanceFeatureName,
  AdvanceModuleState,
} from '@modules/advance/store/state/advance-module.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AdvanceContainer } from 'app/modules/advance/advance.container';
import { DsModalModule } from './../../shared/ds/ds-modal/ds-modal.module';
import { AdvanceSuccessComponent } from './components/advance-success/advance-success.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HowMuchComponent } from './components/how-much/how-much.component';
import { ToWhoComponent } from './components/to-who/to-who.component';
import { WhenComponent } from './components/when/when.component';
import { PreviousRouteService } from './services/previous-route.service';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<AdvanceModuleState>
>('Feature Home Payments Reducers');

@NgModule({
  declarations: [
    AdvanceContainer,
    ToWhoComponent,
    HowMuchComponent,
    WhenComponent,
    AdvanceSuccessComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    AdvanceRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    LineTimeModule,
    CurrencyModule.forRoot('es-US'),
    TicketModule,
    BtnModule,
    StoreModule.forFeature(AdvanceFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([TransferAdvanceEffect]),
    ModalModule,
    DropdownModuleSelect,
    DsModalModule,
    TemplateSystemModule,
  ],
  providers: [
    AdvanceService,
    AdvanceFacade,
    StepService,
    StepGuard,
    ModalService,
    PreviousRouteService,
    NewsService,
    NewsModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: AdvanceRootReducer,
    },
  ],
})
export class AdvanceModule {}
