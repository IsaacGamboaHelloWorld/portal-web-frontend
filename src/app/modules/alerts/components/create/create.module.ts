import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { CreateAlertComponent } from './create.component';

@NgModule({
  declarations: [CreateAlertComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateSystemModule,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: CreateAlertComponent,
        children: [
          {
            path: 'step-one',
            loadChildren: () =>
              import('./components/step-one/step-one.module').then(
                (m) => m.StepOneModule,
              ),
          },
          {
            path: 'step-two',
            loadChildren: () =>
              import('./components/step-two/step-two.module').then(
                (m) => m.StepTwoModule,
              ),
          },
          {
            path: 'step-three',
            loadChildren: () =>
              import('./components/step-three/step-three.module').then(
                (m) => m.StepThreeModule,
              ),
          },
        ],
      },
    ]),
  ],
})
export class CreateModule {}
