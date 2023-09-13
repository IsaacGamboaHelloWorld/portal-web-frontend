import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  IAnswerGetQuestion,
  IAnswerSecureData,
  IAnswerSecureValidQuestion,
  IAnswerUpdateSecureData,
} from '../../entities/code-auth';
import { CodeAuthService } from '../../services/code-auth.service';
import * as CodeAssingSecureDataActions from '../actions/home-auth.actions';
import { CodeAuthModel } from '../model/code-auth.model';

@Injectable()
export class CodeAuthSecureDataEffect {
  constructor(
    private actions$: Actions,
    private codeAuthServices: CodeAuthService,
    private model: CodeAuthModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
    private modelApp: ApplicationModel,
  ) {}

  GetSecureDataAuth: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CodeAssingSecureDataActions.CodeAuthSecureDataLoad),
      switchMap(() => {
        return this.codeAuthServices.codeAuthInfoUser().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerSecureData) => {
            if (!!data && data.success) {
              if (!!data.secureEmail) {
                data.secureEmail = data.secureEmail.toLowerCase();
              }

              if (
                !!data.secureTelephone &&
                String(data.secureTelephone).indexOf(' ') !== 0
              ) {
                data.ind = data.secureTelephone.split(' ')[0];
                data.secureTelephone = data.secureTelephone.split(' ')[1];
              }
              return CodeAssingSecureDataActions.CodeAuthSecureDataSuccess(
                data,
              );
            }
            this.model.authGetSecuerDataFail(data);
            return CodeAssingSecureDataActions.CodeAuthSecureDataFail(data);
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(
              CodeAssingSecureDataActions.CodeAuthSecureDataFail(error),
            );
          }),
        );
      }),
    ),
  );

  UpdateSecureDataAuth: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CodeAssingSecureDataActions.CodeAuthSecureDataUpdateLoad),
      switchMap((action: any) => {
        return this.codeAuthServices.codeAuthInfoUserUpdate(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerUpdateSecureData) => {
            if (!!data && data.success) {
              this.modelApp.notificationOpen(
                this.translate.instant('CODE_AUTH.LIST_MSM.MSM7'),
                true,
                ClassNotification.SUCCESS,
              );
              return CodeAssingSecureDataActions.CodeAuthSecureDataUpdateSuccess(
                data,
              );
            }
            this.model.authUpdateSecuerDataFail(data);
            this.modelApp.notificationOpen(
              this.translate.instant('CODE_AUTH.LIST_MSM.MSM6'),
              true,
              ClassNotification.ERROR,
            );
            return CodeAssingSecureDataActions.CodeAuthSecureDataUpdateFail(
              data,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(
              CodeAssingSecureDataActions.CodeAuthSecureDataUpdateFail(error),
            );
          }),
        );
      }),
    ),
  );

  GetQuestionDataAuth: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CodeAssingSecureDataActions.CodeAuthSecureQuestionLoad),
      switchMap(() => {
        return this.codeAuthServices.getQuestion().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerGetQuestion) => {
            if (!!data && data.success) {
              return CodeAssingSecureDataActions.CodeAuthSecureQuestionSuccess(
                data,
              );
            }
            this.model.authGetQuestionFail(data);
            return CodeAssingSecureDataActions.CodeAuthSecureQuestionFail(data);
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(
              CodeAssingSecureDataActions.CodeAuthSecureQuestionFail(error),
            );
          }),
        );
      }),
    ),
  );

  ValidQuestionDataAuth: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CodeAssingSecureDataActions.CodeAuthSecureValidQuestionLoad),
      switchMap((action: any) => {
        return this.codeAuthServices.validQuestion(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerSecureValidQuestion) => {
            if (!!data && data.success) {
              return CodeAssingSecureDataActions.CodeAuthSecureValidQuestionSuccess(
                data,
              );
            }
            this.modelApp.notificationOpen(
              this.translate.instant('CODE_AUTH.LIST_MSM.MSM6'),
              true,
              ClassNotification.ERROR,
            );
            return CodeAssingSecureDataActions.CodeAuthSecureValidQuestionFail(
              data,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(
              CodeAssingSecureDataActions.CodeAuthSecureValidQuestionFail(
                error,
              ),
            );
          }),
        );
      }),
    ),
  );
}
