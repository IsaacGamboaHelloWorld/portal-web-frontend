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
import { IPdfdata } from '../../../../core/interfaces/statement/pdfdata';
import { IPeriodItem } from '../../../../core/interfaces/statement/period';
import { IStatement } from '../../../../core/interfaces/statement/statement';
import {
  StatementsGeneratePdfAction,
  StatementsGeneratePdfAResetAction,
  StatementsLoadAction,
  StatementsResetAction,
} from '../../../../store/actions/models/statements/statements.action';

@Injectable()
export class StatementModel extends ApplicationModel {
  constructor(protected store: Store<ApplicationState>) {
    super(store);
  }

  public periods$: Observable<IStatement> = this.store.pipe(
    select((store) => store.models.statement.statements.statementsInfo),
  );

  public periodsLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.statement.statements.loading),
  );

  public periodsLoaded$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.statement.statements.loaded),
  );

  public periodsError$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.statement.statements.error),
  );

  public pdf$: Observable<IPdfdata> = this.store.pipe(
    select((store) => store.models.statement.pdfstatement.pdfInfo),
  );

  public pdfLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.statement.pdfstatement.loading),
  );

  public pdfLoaded$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.statement.pdfstatement.loaded),
  );

  public pdfError$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.statement.pdfstatement.error),
  );

  public pdfFailedRetries$: Observable<number> = this.store.pipe(
    select((store) => store.models.statement.pdfstatement.failedRetries),
  );

  public getPeriods(type: string, id: string): void {
    this.store.dispatch(new StatementsLoadAction(type, id));
  }

  public getPdf(type: string, id: string, value: IPeriodItem): void {
    this.store.dispatch(new StatementsGeneratePdfAction(type, id, value));
  }

  public resetPeriods(): void {
    this.store.dispatch(new StatementsResetAction());
  }

  public resetPdfData(): void {
    this.store.dispatch(new StatementsGeneratePdfAResetAction());
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
