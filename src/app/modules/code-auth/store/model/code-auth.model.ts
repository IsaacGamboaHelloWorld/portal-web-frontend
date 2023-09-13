import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { UserSecureDataMdmResponse } from '@app/core/models/user/get-user-secure-data-mdm';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DebitCardListStateData } from '@app/modules/blocked-products/entities/debit-cards-response';
import {
  DebitCardListLoad,
  DebitCardListReset,
} from '@app/modules/blocked-products/store/actions/debit-cards.action';
import { debitCardsListResponse } from '@app/modules/blocked-products/store/selectors/block-product.selector';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';
import {
  IAnswerAllowedCodeAuth,
  IAnswerAssignCodeAuth,
  IAnswerGetQuestion,
  IAnswerSecureData,
  IAnswerSecureValidQuestion,
  IAnswerUpdateSecureData,
  ISendAssignCodeAuth,
  ISendEnrollSecureData,
  IUpdateSecureData,
  StepBar,
} from '../../entities/code-auth';
import { INavigateCodeAuth, NavigateCodeAuth } from '../../entities/routes';
import {
  CodeAuthAssignFail,
  CodeAuthAssignLoad,
  CodeAuthAssignReset,
} from '../actions/assing.actions';
import {
  CodeAuthAllowedFail,
  CodeAuthAllowedLoad,
  CodeAuthAllowedReset,
} from '../actions/code-auth.actions';
import {
  ExperianFlowLoad,
  ExperianFlowReset,
} from '../actions/experian.actions';
import {
  CodeAuthSecureDataFail,
  CodeAuthSecureDataLoad,
  CodeAuthSecureDataUpdateFail,
  CodeAuthSecureDataUpdateLoad,
  CodeAuthSecureQuestionFail,
  CodeAuthSecureQuestionLoad,
  CodeAuthSecureValidQuestionFail,
  CodeAuthSecureValidQuestionLoad,
  CodeAuthSecureValidQuestionReset,
} from '../actions/home-auth.actions';
import { SecureDataSave } from '../actions/secure-data.actions';
import { ResetStepCodeAuth, SetStepCodeAuth } from '../actions/step.actions';
import {
  selectCodeAuthAllowed,
  selectCodeAuthAssign,
  selectExperianState,
  selectGetQuestion,
  selectGetSecureData,
  selectStep,
  selectUpdateSecureData,
  selectUserSecureData,
  selectValidQuestion,
} from '../selectors/code-auth.selectors';

@Injectable()
export class CodeAuthModel extends ApplicationModel {
  constructor(
    protected dom: ManipulateDomService,
    protected store: Store<ApplicationState>,
  ) {
    super(store);
  }

  get navigate(): INavigateCodeAuth {
    return NavigateCodeAuth;
  }

  public debitCardList$: Observable<DebitCardListStateData> = this.store.pipe(
    select(debitCardsListResponse),
  );

  public step$: Observable<StepBar> = this.store.pipe(select(selectStep));

  public stateAllowedCodeAuth$: Observable<
    IAnswerAllowedCodeAuth
  > = this.store.pipe(select(selectCodeAuthAllowed));

  public stateAssignCodeAuth$: Observable<
    IAnswerAssignCodeAuth
  > = this.store.pipe(select(selectCodeAuthAssign));

  public stateGetSecureDataCodeAuth$: Observable<
    IAnswerSecureData
  > = this.store.pipe(select(selectGetSecureData));

  public stateUpdateSecureDataCodeAuth$: Observable<
    IAnswerUpdateSecureData
  > = this.store.pipe(select(selectUpdateSecureData));

  public stateGetQuestion$: Observable<IAnswerGetQuestion> = this.store.pipe(
    select(selectGetQuestion),
  );

  public stateExperian$: Observable<IAnswerGetQuestion> = this.store.pipe(
    select(selectExperianState),
  );

  public userInfoResponse$: Observable<
    UserSecureDataMdmResponse
  > = this.store.pipe(select((store) => store.global.userSecureData.data));

  public userSecureData$: Observable<any> = this.store.pipe(
    select(selectUserSecureData),
  );

  public stateValidQuestion$: Observable<
    IAnswerSecureValidQuestion
  > = this.store.pipe(select(selectValidQuestion));

  public creationAllowedFail(_data: IAnswerAllowedCodeAuth): void {
    this.store.dispatch(CodeAuthAllowedFail(_data));
  }

  public creationAllowedSucces(): void {
    this.store.dispatch(CodeAuthAllowedLoad());
  }

  public creationAssignFail(_data: IAnswerAssignCodeAuth): void {
    this.store.dispatch(CodeAuthAssignFail(_data));
  }

  public creationAssignSucces(_data: ISendAssignCodeAuth): void {
    this.store.dispatch(CodeAuthAssignLoad(_data));
  }

  public authGetSecuerDataSucces(): void {
    this.store.dispatch(CodeAuthSecureDataLoad());
  }
  public authGetSecuerDataFail(_data: IAnswerSecureData): void {
    this.store.dispatch(CodeAuthSecureDataFail(_data));
  }

  public authGetQuestionSucces(): void {
    this.store.dispatch(CodeAuthSecureQuestionLoad());
  }
  public authGetQuestionFail(_data: IAnswerGetQuestion): void {
    this.store.dispatch(CodeAuthSecureQuestionFail(_data));
  }

  public authValidQuestionSucces(data: ISendEnrollSecureData): void {
    this.store.dispatch(CodeAuthSecureValidQuestionLoad(data));
  }
  public authValidQuestionFail(_data: IAnswerSecureValidQuestion): void {
    this.store.dispatch(CodeAuthSecureValidQuestionFail(_data));
  }

  public authUpdateSecuerDataSucces(_data: IUpdateSecureData): void {
    this.store.dispatch(CodeAuthSecureDataUpdateLoad(_data));
  }
  public authUpdateSecuerDataFail(_data: IAnswerUpdateSecureData): void {
    this.store.dispatch(CodeAuthSecureDataUpdateFail(_data));
  }

  public setStep(step: StepBar): void {
    setTimeout(() => {
      this.store.dispatch(SetStepCodeAuth(step));
    }, 1);
  }

  public reset(): void {
    this.store.dispatch(CodeAuthAllowedReset());
    this.store.dispatch(CodeAuthAssignReset());
    this.store.dispatch(ResetStepCodeAuth());
    this.store.dispatch(DebitCardListReset());
  }

  public resetAuthValidQuestionState(): void {
    this.store.dispatch(CodeAuthSecureValidQuestionReset());
  }
  public executeExperianFlow(data: any): void {
    this.store.dispatch(ExperianFlowLoad(data));
  }
  public resetExperianData(): void {
    this.store.dispatch(ExperianFlowReset());
  }
  public setUserSecureData(
    securePhone: string,
    secureEmail: string,
    contactPreference: string,
  ): void {
    this.store.dispatch(
      SecureDataSave(securePhone, secureEmail, contactPreference),
    );
  }

  public loadDebitCards(): void {
    this.store.dispatch(DebitCardListLoad());
  }
}
