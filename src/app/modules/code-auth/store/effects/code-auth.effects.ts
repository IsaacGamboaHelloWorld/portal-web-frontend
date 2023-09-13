import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  IAnswerAllowedCodeAuth,
  IAnswerAssignCodeAuth,
} from '../../entities/code-auth';
import { CodeAuthService } from '../../services/code-auth.service';
import * as CodeAssingActions from '../actions/assing.actions';
import * as CodeAuhtActions from '../actions/code-auth.actions';
import { CodeAuthModel } from '../model/code-auth.model';

@Injectable()
export class CodeAuthEffect {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private actions$: Actions,
    private codeAuthServices: CodeAuthService,
    private model: CodeAuthModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
    private modalService: ModalService,
    private router: Router,
  ) {}

  Allowed: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CodeAuhtActions.CodeAuthAllowedLoad),
      switchMap(() => {
        return this.codeAuthServices.codeAuthAllowed().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerAllowedCodeAuth) => {
            if (!!data && data.success) {
              this.router.navigate([this.model.navigate.step1]);
              return CodeAuhtActions.CodeAuthAllowedSuccess(data);
            }
            this.model.creationAllowedFail(data);
            const notification = {
              text: this.translate.instant('CODE_AUTH.LIST_MSM.MSM5'),
              class: ClassNotification.ERROR,
            };
            if (data.errorMessage.indexOf('seguros') > 0) {
              notification.text = this.translate.instant(
                'CODE_AUTH.LIST_MSM.MSM1',
              );
              notification.class = ClassNotification.INFO;
            } else if (data.errorMessage.indexOf('tarjeta débito') > 0) {
              notification.text = this.translate.instant(
                'CODE_AUTH.LIST_MSM.MSM2',
              );
              notification.class = ClassNotification.INFO;
            } else if (data.errorMessage.indexOf('token físico') > 0) {
              notification.text = this.translate.instant(
                'CODE_AUTH.LIST_MSM.MSM3',
              );
              notification.class = ClassNotification.INFO;
            } else if (data.errorMessage.indexOf('validar') > 0) {
              notification.text = this.translate.instant(
                'CODE_AUTH.LIST_MSM.MSM4',
              );
              notification.class = ClassNotification.ERROR;
            } else if (data.errorMessage.indexOf('asociado') > 0) {
              this.modalService.open(
                AlertCloseComponent,
                false,
                `${SMALL_WIDTH} not-button-close`,
              );
              setTimeout(() => {
                this._actionsModal(null, data);
              }, 10);
              notification.class = null;
              notification.text = null;
            }
            this.router.navigate([this.model.navigate.homeCodeAuth]);
            return new NotificationShowAction(
              notification.text,
              true,
              notification.class,
            );
          }),
          catchError((error) => {
            new NotificationShowAction(
              this.translate.instant('CODE_AUTH.LIST_MSM.MSM4'),
              true,
              ClassNotification.ERROR,
            );
            return of(CodeAuhtActions.CodeAuthAllowedFail({}));
          }),
        );
      }),
    ),
  );

  Assing: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CodeAssingActions.CodeAuthAssignLoad),
      switchMap((action: any) => {
        return this.codeAuthServices.codeAuthAssign(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerAssignCodeAuth) => {
            if (!!data && data.success) {
              this.modalService.open(
                AlertCloseComponent,
                true,
                `${SMALL_WIDTH} not-button-close`,
              );
              setTimeout(() => {
                this._actionsModal(data, null);
              }, 10);
              return CodeAssingActions.CodeAuthAssignSuccess(data);
            }
            if (data.errorMessage && data.numberAttemps === 0) {
              this.modalService.open(
                AlertCloseComponent,
                true,
                `${SMALL_WIDTH} not-button-close`,
              );
              setTimeout(() => {
                this._actionsModal(data, null);
              }, 10);
            } else if (data.errorMessage) {
              const notification = {
                text: this.translate.instant('CODE_AUTH.LIST_MSM.MSM5'),
                class: ClassNotification.ERROR,
              };
              this.model.creationAssignFail(data);
              return new NotificationShowAction(
                notification.text,
                true,
                notification.class,
              );
            }
            return CodeAssingActions.CodeAuthAssignFail(data);
          }),
          catchError((error) => {
            new NotificationShowAction(
              this.translate.instant('CODE_AUTH.LIST_MSM.MSM5'),
              true,
              ClassNotification.ERROR,
            );
            return of(CodeAssingActions.CodeAuthAssignFail({}));
          }),
        );
      }),
    ),
  );

  private _actionsModal(
    assing?: IAnswerAssignCodeAuth,
    allowed?: IAnswerAllowedCodeAuth,
  ): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      let component: any = null;
      if (allowed) {
        const text = allowed.errorMessage.split('******');
        const boldText = text[1];
        component = this.modalService._dialogComponentRef.instance.componentRef
          .instance;
        component.title = 'CODE_AUTH.MODAL_SUCCESS.TITLE';
        component.desc = `${text[0]}<b>******${boldText.substring(
          0,
          5,
        )}</b>${text[1].substring(5)}`;
        component.btnAgree = 'CODE_AUTH.MODAL_SUCCESS.BTN';
        component.img = '/celular.png';
      }

      if (assing && !assing.success) {
        component = this.modalService._dialogComponentRef.instance.componentRef
          .instance;
        component.title = 'CODE_AUTH.MODAL_ERROR.TITLE';
        component.btnAgree = 'CODE_AUTH.MODAL_SUCCESS.BTN';
        component.desc = 'CODE_AUTH.LIST_MSM.MSM8';
        component.img = '/numero-de-intentos-excedidos.png';
      }

      if (assing && assing.success) {
        component = this.modalService._dialogComponentRef.instance.componentRef
          .instance;
        component.title = 'CODE_AUTH.MODAL_SUCCESS.TITLE';
        component.btnAgree = 'CODE_AUTH.MODAL_SUCCESS.BTN';
        component.desc = assing.secureDataMessage;
        component.img = '/celular.png';
      }

      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.model.setStep({ step: 1 });
        this.model.reset();
        this.modalService.close();
        this.router.navigate([this.model.navigate.homeCodeAuth]);
      });
    }
  }
}
