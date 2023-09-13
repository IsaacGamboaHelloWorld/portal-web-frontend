import { Injectable } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';

import { ICertificateAccountRequest } from '../../entities/documents-general';
import {
  CertificateFail,
  CertificateLoad,
  CertificateReset,
} from '../actions/certificate.actions';
import {
  selectCertificate,
  selectProducts,
} from '../selectors/documents.selectors';
import { ICertificateState } from '../state/documents.state';

@Injectable()
export class CertificateModel {
  constructor(private store: Store<ApplicationState>) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public stateCertificate$: Observable<ICertificateState> = this.store.pipe(
    select(selectCertificate),
  );

  public creationFail(errorMessage: string): void {
    this.store.dispatch(CertificateFail({ errorMessage }));
  }

  public creationLoad(data: ICertificateAccountRequest): void {
    this.store.dispatch(CertificateLoad({ data }));
  }

  public reset(): void {
    this.store.dispatch(CertificateReset());
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

  public notificationClosed(): void {
    this.store.dispatch(new NotificationClosedAction());
  }

  public notificationReset(): void {
    this.store.dispatch(new NotificationResetAction());
  }
}
