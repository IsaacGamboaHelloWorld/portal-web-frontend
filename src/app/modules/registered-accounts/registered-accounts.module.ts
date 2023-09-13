import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BtnModule } from '@app/shared/btn/btn.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CoreModule } from '@core/core.module';
import { RegisteredAccountsFacade } from '@modules/registered-accounts/registered-accounts.facade';
import { DeleteAffiliationService } from '@modules/registered-accounts/services/delete-affiliation.service';
import { DeleteAffiliationEffects } from '@modules/registered-accounts/store/effects/delete-affiliation.effects';
import { EffectsModule } from '@ngrx/effects';
import { RegisteredAccountsContainer } from 'app/modules/registered-accounts/registered-accounts.container';
import { NicknamesService } from '../detail-product/services/nicknames/nicknames.service';
import { AccountComponent } from './components/account/account.component';
import { HomeRegisteredAccountsComponent } from './components/home-registered-accounts/home-registered-accounts.component';
import { InfoAccountComponent } from './components/info-account/info-account.component';
import { RegisterAffiliationComponent } from './components/register-affiliation/register-affiliation.component';
import { StepConfirmationComponent } from './components/register-affiliation/step-confirmation/step-confirmation.component';
import { StepOneComponent } from './components/register-affiliation/step-one/step-one.component';
import { StepThreeComponent } from './components/register-affiliation/step-three/step-three.component';
import { StepTwoComponent } from './components/register-affiliation/step-two/step-two.component';
import { RegisteredAccountsRoutingModule } from './registered-accounts-routing.module';
import { RegisterAffiliationService } from './services/register-affiliation.service';
import { RegisterAffiliationEffects } from './store/effects/register-affiliation.effects';

export const registeredAccountsRootRoute = 'transferencia/cuentas-inscritas';

@NgModule({
  declarations: [
    RegisteredAccountsContainer,
    AccountComponent,
    InfoAccountComponent,
    RegisterAffiliationComponent,
    HomeRegisteredAccountsComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepConfirmationComponent,
  ],
  imports: [
    CommonModule,
    RegisteredAccountsRoutingModule,
    CoreModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    LineTimeModule,
    TicketModule,
    ModalModule,
    EffectsModule.forFeature([
      DeleteAffiliationEffects,
      RegisterAffiliationEffects,
    ]),
    RouterModule.forChild([
      {
        path: '',
        component: RegisteredAccountsContainer,
      },
    ]),
  ],
  providers: [
    RegisteredAccountsFacade,
    DeleteAffiliationService,
    RegisterAffiliationService,
    ModalService,
    NicknamesService,
  ],
})
export class RegisteredAccountsModule {}
