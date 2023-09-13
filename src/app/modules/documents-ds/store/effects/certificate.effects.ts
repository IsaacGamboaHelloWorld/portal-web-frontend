import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { ICertificateState } from './../state/documents.state';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { TranslateService } from '@ngx-translate/core';

import { DocumentsService } from '../../services/documents.service';
import * as CertificateActions from '../actions/certificate.actions';
import { CertificateModel } from '../model/certificate.model';

@Injectable()
export class CertificateDocEffect {
  constructor(
    private actions$: Actions,
    private documentServices: DocumentsService,
    private model: CertificateModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
  ) {}

  Certificate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificateActions.CertificateLoad),
      switchMap((action: any) => {
        return this.documentServices
          .generateCertificateAccount(action.data)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: ICertificateState) => {
              if (!!data && data.success) {
                return CertificateActions.CertificateSuccess({
                  certificate: data,
                });
              }
              this._showErrorToast(
                this.translate.instant(
                  'DOCUMENTS.CERTIFICATE.DETAIL.ERROR_DOWNLOAD',
                ),
              );
              return CertificateActions.CertificateFail({
                errorMessage: data.errorMessage,
              });
            }),
            catchError((_error) => {
              new NotificationShowAction('', true, ClassNotification.ERROR);
              return of(
                CertificateActions.CertificateFail({
                  errorMessage: errorMessage500,
                }),
              );
            }),
          );
      }),
    ),
  );

  private _showErrorToast(errorMessage: string): void {
    this.model.notificationOpen(errorMessage, true, ClassNotification.ERROR);
  }
}
