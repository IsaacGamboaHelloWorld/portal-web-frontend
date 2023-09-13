import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { CodeAuthService } from '../../services/code-auth.service';
import { ModalCodeAuthComponent } from '../modal-code-auth/modal-code-auth.component';
import { HomeCodeAuthComponent } from './home-code-auth.component';

@NgModule({
  declarations: [HomeCodeAuthComponent, ModalCodeAuthComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    ModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeCodeAuthComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    CurrencyModule.forRoot('es-US'),
  ],
  entryComponents: [ModalCodeAuthComponent],
  providers: [ModalService, CodeAuthService, ApplicationModel],
})
export class HomeCodeAuthModule {}
