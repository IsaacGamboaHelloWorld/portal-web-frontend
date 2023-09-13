import { Injectable } from '@angular/core';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CudAccessControlCreate,
  CudAccessControlDelete,
  CudAccessControlReset,
  CudAccessControlUpdate,
} from '../actions/cud-access-control.actions';
import {
  GetAccessControlLoad,
  GetAccessControlReset,
} from '../actions/get-access-control.actions';
import {
  AccessControlSelector,
  CudAccessControlSelector,
  GetAccessControlSelector,
} from '../selectors/access-control.selectors';
import {
  IAccessControlModuleState,
  ICudChannel,
  IDataChannel,
  IGenericChannel,
} from '../state/access-control.state';

@Injectable()
export class AccessControlModel {
  constructor(protected store: Store<ApplicationState>) {}

  public hourSession$: Observable<string> = this.store.pipe(
    select((store) => store.global.user.data.lastAuthDate),
  );

  public accessControlData$: Observable<
    IAccessControlModuleState
  > = this.store.pipe(select(AccessControlSelector));

  public getAccessControl$: Observable<
    IGenericChannel<IDataChannel>
  > = this.store.pipe(select(GetAccessControlSelector));

  public cudAccessControl$: Observable<
    IGenericChannel<ICudChannel>
  > = this.store.pipe(select(CudAccessControlSelector));

  //#region "Get AccessControl"
  public getAccessControlLoad(): void {
    this.store.dispatch(GetAccessControlLoad());
  }

  public getAccessControlReset(): void {
    this.store.dispatch(GetAccessControlReset());
  }
  //#endregion "Get AccessControl"

  //#region "CUD AccessControl"
  public cudAccessControlCreate(PB: boolean, MB: boolean): void {
    this.store.dispatch(CudAccessControlCreate({ PB, MB }));
  }

  public cudAccessControlUpdate(PB: boolean, MB: boolean): void {
    this.store.dispatch(CudAccessControlUpdate({ PB, MB }));
  }

  public cudAccessControlDelete(): void {
    this.store.dispatch(CudAccessControlDelete());
  }

  public cudAccessControlReset(): void {
    this.store.dispatch(CudAccessControlReset());
  }
  //#endregion "CUD AccessControl"
}
