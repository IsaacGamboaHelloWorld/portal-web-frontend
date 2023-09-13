import { Injectable } from '@angular/core';
import * as certificatesActions from '@app/store/actions/models/certificates/certificates.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IPdfdata } from '../../../../../core/interfaces/certificates/pdfdata';
import { CertificatesService } from '../services/certificates.service';

@Injectable()
export class CertificatesEffect {
  constructor(
    private actions$: Actions,
    private destinationService: CertificatesService,
  ) {}

  @Effect()
  GeneratePDF: Observable<Action> = this.actions$.pipe(
    ofType<certificatesActions.CertificatesGeneratePdfAction>(
      certificatesActions.CERTIFICATES_PDF_LOAD,
    ),
    switchMap((action: certificatesActions.CertificatesGeneratePdfAction) => {
      return this.destinationService
        .getPdf(action.accountId, action.accountType, action.includeBalance)
        .pipe(
          map((pdfData: IPdfdata) => {
            if (!isNullOrUndefined(pdfData.base64) && pdfData.base64) {
              return new certificatesActions.CertificatesGeneratePdfSuccessAction(
                pdfData,
              );
            } else {
              return new certificatesActions.CertificatesGeneratePdfFailAction();
            }
          }),
          catchError((_) =>
            of(new certificatesActions.CertificatesGeneratePdfFailAction()),
          ),
        );
    }),
  );
}
