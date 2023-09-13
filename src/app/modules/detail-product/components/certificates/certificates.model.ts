import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPdfdata } from '../../../../core/interfaces/certificates/pdfdata';
import {
  CertificatesGeneratePdfAction,
  CertificatesGeneratePdfResetAction,
} from '../../../../store/actions/models/certificates/certificates.action';

@Injectable()
export class CertificateModel extends ApplicationModel {
  constructor(protected store: Store<ApplicationState>) {
    super(store);
  }

  public pdf$: Observable<IPdfdata> = this.store.pipe(
    select((store) => store.models.certificates.pdfInfo),
  );

  public pdfLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.certificates.loading),
  );

  public pdfLoaded$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.certificates.loaded),
  );

  public pdfError$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.certificates.error),
  );

  public pdfFailedRetries$: Observable<number> = this.store.pipe(
    select((store) => store.models.certificates.failedRetries),
  );

  public getPdf(
    accountType: string,
    accountId: string,
    includeBalance: boolean,
  ): void {
    this.store.dispatch(
      new CertificatesGeneratePdfAction(accountType, accountId, includeBalance),
    );
  }

  public resetPdfData(): void {
    this.store.dispatch(new CertificatesGeneratePdfResetAction());
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(message, autoClosed, typeNotification),
    );
  }

  public notificationClosed(): void {
    this.store.dispatch(new NotificationClosedAction());
  }
}
