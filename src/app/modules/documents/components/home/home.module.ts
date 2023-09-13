import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnSquareModule } from '@app/shared/btn-square/btn-square.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ActionReducerMap } from '@ngrx/store';
import { ITributary } from '../../entities/documents';
import { HomeModelDocuments } from '../../store/model/home.model';
import { HomeComponent } from './home.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ITributary>
>('Feature Home Reducer');
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TemplateSystemModule,
    CoreModule,
    BtnSquareModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  providers: [HomeModelDocuments],
})
export class HomeModule {}
