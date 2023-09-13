import { Injectable } from '@angular/core';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigateSecurity } from '../../constants/navigate-security';
import { AccessControlModel } from '../../modules/access-control/store/models/access-control.models';
import { StepSelector } from '../selectors/step.selectors';
import { ApplicationState } from './../../../../store/state/application.state';
import { SetStepAccessControl } from './../actions/step.actions';

@Injectable()
export class SecurityModel extends AccessControlModel {
  constructor(public store: Store<ApplicationState>) {
    super(store);
  }

  public getStep$: Observable<any> = this.store.pipe(select(StepSelector));

  public setStep(navigate: NavigateSecurity): void {
    this.store.dispatch(SetStepAccessControl({ navigate }));
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
    hideClose: boolean = false,
    subMessage: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(
        message,
        autoClosed,
        typeNotification,
        hideClose,
        subMessage,
      ),
    );
  }
}
