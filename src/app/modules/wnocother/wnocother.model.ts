import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { OtpWithDrawal } from '@app/core/interfaces/otpWitdrawal.interface';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { LoadWithDrawalAction } from '@app/store/actions/models/withdrawal/no-card/no-card.action';
import { SetStepWAction } from '@app/store/actions/models/withdrawal/steps/stepw.action';
import { SetValidateOtpAction } from '@app/store/actions/models/withdrawal/steps/validate-otp.action';
import { SetTypeWithdrawal } from '@app/store/actions/models/withdrawal/steps/whatdoyouwant.action';
import { SetWithDrawalStepTwoAction } from '@app/store/actions/models/withdrawal/steps/withdrawalsteptwo.action';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import {
  TempProduct,
  WithDrawalStepTwoState,
} from '@app/store/reducers/models/withdrawal/steps/withdrawal-step-two.reducer';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ResetWithDrawalAction } from '../../store/actions/models/withdrawal/no-card/no-card.action';
import { WithDrawalState } from '../../store/reducers/models/withdrawal/no-card/no-card.reducer';

@Injectable()
export class WnocotherMoldel extends ApplicationModel {
  constructor(
    protected dom: ManipulateDomService,
    protected store: Store<ApplicationState>,
  ) {
    super(store);
  }

  public productActive$: Observable<IProductActive> = this.store.pipe(
    select((store) => store.models.productActive),
  );

  public typeTransaction$: Observable<string> = this.store.pipe(
    select((store) => store.models.withdrawal.type_withdrawal),
  );

  public stepW$: Observable<number> = this.store.pipe(
    select((store) => store.models.withdrawal.step_w),
  );

  public dataForm$: Observable<WithDrawalStepTwoState> = this.store.pipe(
    select((store) => store.models.withdrawal.data_withdrawal),
  );

  public getOtp$: Observable<WithDrawalState> = this.store.pipe(
    select((store) => store.models.withdrawal.no_card),
  );

  public sendWithDrawal(
    typeTransaction: string,
    from: TempProduct,
    where: string,
    ammount: number,
    document: string,
  ): void {
    this.store.dispatch(
      new LoadWithDrawalAction(typeTransaction, from, where, ammount, document),
    );
  }

  public resetWithDrawal(): void {
    this.store.dispatch(new ResetWithDrawalAction());
  }

  public setTypeTransaction(type: string): void {
    this.store.dispatch(new SetTypeWithdrawal(type));
  }

  public setDataForm(dataform: WithDrawalStepTwoState): void {
    this.store.dispatch(new SetWithDrawalStepTwoAction(dataform));
  }

  public setTemporalResponse(response: OtpWithDrawal): void {
    this.store.dispatch(new SetValidateOtpAction(response));
  }

  public setStepW(step: number): void {
    setTimeout(() => {
      this.store.dispatch(new SetStepWAction(step));
      this.dom.scrollTop();
    }, 0);
  }
}
