import { Injectable } from '@angular/core';
import { UserInfoState } from '@app/store/reducers/global/user/user.reducer';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IAlertFormOne,
  IAlertFormThree,
  IAlertFormTwo,
  ICreateUserAlertRequest,
  IinfoUser,
  StepLineTime,
} from '../../entities/alerts';
import {
  IGroupsAlertRequest,
  IGroupsAlertResponse,
} from '../../entities/groups';
import {
  IGroupsTypeAlertRequest,
  IGroupsTypeAlertResponse,
} from '../../entities/groups-type';
import {
  ITargetAlertRequest,
  ITargetAlertResponse,
} from '../../entities/target';
import { IUserAlertRequest, IUserAlertResponse } from '../../entities/user';
import { CreateAlertsLoadAction } from '../actions/create-alert.action';
import { SetStepOneAlert } from '../actions/formOne.action';
import { SetStepThreeAlert } from '../actions/formThree.action';
import { SetStepTwoAlert } from '../actions/formTwo.action';
import { LoadAlertsLoadAction } from '../actions/get-alerts.action';
import { GroupsTypeAlertsLoadAction } from '../actions/groups-type.action';
import { GroupsAlertsLoadAction } from '../actions/groups.action';
import { InfoUserLoadAction } from '../actions/info-user.action';
import {
  AllFinancialOpAlertsLoad,
  AllFinancialOpAlertsReset,
} from '../actions/registered-bills.action';
import {
  AllPublicServicesAlertsLoad,
  AllPublicServicesAlertsReset,
} from '../actions/registered-services.action';
import { SetStepAlert } from '../actions/step.actions';
import { TargetAlertsLoadAction } from '../actions/target.action';
import { UserAlertsLoadAction } from '../actions/user.action';
import { ICreateAlert } from '../reducers/create-alert.reducer';
import { IHomeAlerts } from '../reducers/get-alerts.reducer';
import { IAllFinancialOpAlerts } from '../reducers/registered-bills.reducer';
import { IAllPublicServicesAlerts } from '../reducers/registered-services.reducer';
import {
  selectAlertCreate,
  selectAllAlerts,
  selectAllFinancial,
  selectAllServices,
  selectBasicData,
  selectGroupsAlert,
  selectGroupsTypeAlert,
  selectInfoUserAlert,
  selectStep,
  selectStepOne,
  selectStepThree,
  selectStepTwo,
  selectTargetAlert,
  selectUserAlert,
} from '../selectors/alerts.selectors';

@Injectable()
export class AlertsModel {
  constructor(private store: Store<ApplicationState>) {}

  public step$: Observable<StepLineTime> = this.store.pipe(select(selectStep));
  public basicData$: Observable<UserInfoState> = this.store.pipe(
    select(selectBasicData),
  );

  public allAlerts$: Observable<IHomeAlerts> = this.store.pipe(
    select(selectAllAlerts),
  );

  public allServices$: Observable<IAllPublicServicesAlerts> = this.store.pipe(
    select(selectAllServices),
  );

  public allFinancial$: Observable<IAllFinancialOpAlerts> = this.store.pipe(
    select(selectAllFinancial),
  );

  public stepOne$: Observable<IAlertFormOne> = this.store.pipe(
    select(selectStepOne),
  );

  public stepTwo$: Observable<IAlertFormTwo> = this.store.pipe(
    select(selectStepTwo),
  );

  public stepThree$: Observable<IAlertFormThree> = this.store.pipe(
    select(selectStepThree),
  );

  public createAlert$: Observable<ICreateAlert> = this.store.pipe(
    select(selectAlertCreate),
  );

  public infoUser$: Observable<IinfoUser> = this.store.pipe(
    select(selectInfoUserAlert),
  );

  public userAlert$: Observable<IUserAlertResponse> = this.store.pipe(
    select(selectUserAlert),
  );

  public targetAlert$: Observable<ITargetAlertResponse> = this.store.pipe(
    select(selectTargetAlert),
  );

  public groupAlert$: Observable<IGroupsAlertResponse> = this.store.pipe(
    select(selectGroupsAlert),
  );

  public groupTypeAlert$: Observable<
    IGroupsTypeAlertResponse
  > = this.store.pipe(select(selectGroupsTypeAlert));

  public fetchAllAlerts(): void {
    this.store.dispatch(LoadAlertsLoadAction());
  }

  public fetchAllFinancialOps(): void {
    this.store.dispatch(AllFinancialOpAlertsLoad());
  }

  public fetchAllBills(): void {
    this.store.dispatch(AllPublicServicesAlertsLoad());
  }

  public clearAllFinancialOps(): void {
    this.store.dispatch(AllFinancialOpAlertsReset());
  }

  public clearAllBills(): void {
    this.store.dispatch(AllPublicServicesAlertsReset());
  }

  public fetchStepOne(_data: IAlertFormOne): void {
    this.store.dispatch(SetStepOneAlert(_data));
  }

  public fetchStepTwo(_data: IAlertFormTwo): void {
    this.store.dispatch(SetStepTwoAlert(_data));
  }

  public fetchStepThree(_data: IAlertFormThree): void {
    this.store.dispatch(SetStepThreeAlert(_data));
  }

  public fetchCreateAlert(_data: ICreateUserAlertRequest): void {
    this.store.dispatch(CreateAlertsLoadAction(_data));
  }

  public fetchInfoUser(): void {
    this.store.dispatch(InfoUserLoadAction());
  }

  public setStep(step: StepLineTime): void {
    setTimeout(() => {
      this.store.dispatch(SetStepAlert(step));
    }, 1);
  }

  public fetchUserAlert(data: IUserAlertRequest): void {
    this.store.dispatch(UserAlertsLoadAction(data));
  }

  public fetchTargetAlert(data: ITargetAlertRequest): void {
    this.store.dispatch(TargetAlertsLoadAction(data));
  }

  public fetchGroups(data: IGroupsAlertRequest): void {
    this.store.dispatch(GroupsAlertsLoadAction(data));
  }

  public fetchGroupsType(data: IGroupsTypeAlertRequest): void {
    this.store.dispatch(GroupsTypeAlertsLoadAction(data));
  }
}
