import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  ILimitManagementCreateResponse,
  ILimitManagementGetResponse,
} from '../../entities';
import { LimitManagementService } from '../../services/limit-management.service';
import {
  LimitManagementCreateFailAction,
  LimitManagementCreateLoadAction,
  LimitManagementCreateSuccessAction,
  LimitManagementGetFailAction,
  LimitManagementGetLoadAction,
  LimitManagementGetSuccessAction,
} from '../actions';
import { LimitManagementModel } from '../models';
import { ILimitManagementCreateData, ILimitManagementGetData } from '../state';

@Injectable()
export class LimitManagementEffect {
  constructor(
    private actions$: Actions,
    private _limitService: LimitManagementService,
    private _model: LimitManagementModel,
    private _translateService: TranslateService,
    private _modalService: ModalService,
  ) {}

  maxCounterError: number = 3;
  counterError: number = 0;

  limitManagementCreate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LimitManagementCreateLoadAction),
      switchMap((action) =>
        this._limitService.create(action.body).pipe(
          map((resp: ILimitManagementCreateResponse) => {
            if (resp.success) {
              this._model.notificationOpen(
                this._translateService.instant(
                  'LIMIT_MANAGEMENT.HOME.SAVE_SUCCESS.TITLE',
                ),
                true,
                ClassNotification.SUCCESS,
                true,
                this._translateService.instant(
                  'LIMIT_MANAGEMENT.HOME.SAVE_SUCCESS.DESCRIPTION',
                ),
              );
              const data: ILimitManagementCreateData = {
                statusDescription: resp.statusDescription,
                statusCode: resp.statusCode,
              };
              return LimitManagementCreateSuccessAction({ data });
            }
            const { errorMessage } = resp;
            this._model.notificationOpen(
              errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return LimitManagementCreateFailAction({ errorMessage });
          }),
          catchError((_err: any) =>
            of(
              LimitManagementCreateFailAction({
                errorMessage: errorMessage500,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  limitManagementGet$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LimitManagementGetLoadAction),
      switchMap((action: any) =>
        this._limitService.get(action.body).pipe(
          map((resp: ILimitManagementGetResponse) => {
            if (resp.success) {
              const data: ILimitManagementGetData = {
                limits: resp.limits,
                channel: resp.channel,
                limitsBank: resp.limitsBank,
                firstTime: resp.firstTime,
              };
              return LimitManagementGetSuccessAction({ data });
            }
            const { errorMessage } = resp;
            this._model.notificationOpen(
              errorMessage,
              true,
              ClassNotification.ERROR,
            );
            if (this.counterError > this.maxCounterError) {
              this.counterError = 0;
            }
            this.counterError++;
            this._openModal();
            return LimitManagementGetFailAction({ errorMessage });
          }),
          catchError((_err: any) =>
            of(LimitManagementGetFailAction({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  private _openModal(): void {
    this._modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  public _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'error';
      component.title = this._translateService.instant(
        `LIMIT_MANAGEMENT.HOME.ERROR.TITLE`,
      );
      component.subtitle = this._translateService.instant(
        `LIMIT_MANAGEMENT.HOME.ERROR.DESCRIPTION`,
      );
      component.btnAgree = this._translateService.instant(
        this.counterError > this.maxCounterError
          ? `LIMIT_MANAGEMENT.HOME.ERROR.BUTTON`
          : `LIMIT_MANAGEMENT.HOME.ERROR.BUTTON_RETRY`,
      );

      const subs = component.actionAgree.subscribe(() => {
        this._modalService.close();
        subs.unsubscribe();
      });
    }
  }
}
