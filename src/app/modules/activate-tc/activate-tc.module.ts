import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ActivateTcComponent } from './activate-tc.component';
import { IActivateTcModuleState } from './entities/activate-tc';
import { ActivateTcService } from './services/activate-tc.service';
import { ActivateTcModel } from './store/model/activate-tc.model';
import { ActivateTcRootReducer } from './store/reducers';
import { NewActivateTcFeatureName } from './store/state/activate-tc.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IActivateTcModuleState>
>('Feature Payment Taxes Reducer');

@NgModule({
  declarations: [ActivateTcComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    TemplateSystemModule,
    RouterModule.forChild([
      {
        path: '',
        component: ActivateTcComponent,
        children: [
          {
            path: 'crear',
            loadChildren: () =>
              import('./components/step-one/step-one.module').then(
                (m) => m.StepOneModule,
              ),
          },
        ],
      },
    ]),
    StoreModule.forFeature(NewActivateTcFeatureName, FEATURE_REDUCER_TOKEN),
  ],
  providers: [
    ActivateTcModel,
    ActivateTcService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: ActivateTcRootReducer,
    },
  ],
})
export class ActivateTcModule {}
