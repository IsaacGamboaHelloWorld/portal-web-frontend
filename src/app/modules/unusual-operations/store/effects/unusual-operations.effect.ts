import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { errorMessage500 } from '@app/core/constants/global';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { IDsModal } from '@app/shared/ds/ds-modal/entities/ds-modal.interface';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UnusualBlockTypeEnum } from '../../constants/unusual-block-type.enum';
import { UnusualModalTypeEnum } from '../../constants/unusual-modal-type.enum';
import {
  IAdditionalData,
  IUnusualOPApproveResponse,
} from '../../entities/unusual-approve-response.interface';
import {
  ITransactionsByCard,
  IUnusualOPQueryResponse,
} from '../../entities/unusual-query-response.interface';
import { UnsualOperationsService } from '../../services/unsual-operations.service';
import {
  UnusualApproveFailAction,
  UnusualApproveLoadAction,
  UnusualApproveSuccessAction,
} from '../actions/unusual-approve.actions';
import {
  UnusualQueryFailAction,
  UnusualQueryLoadAction,
  UnusualQuerySuccessAction,
} from '../actions/unusual-query.actions';

@Injectable()
export class UnusualOperationsEffect {
  constructor(
    private actions$: Actions,
    private unusualService: UnsualOperationsService,
    private translate: TranslateService,
    private modalService: ModalService,
    private router: Router,
  ) {}

  unusualOPQuery$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UnusualQueryLoadAction),
      switchMap(() =>
        this.unusualService.query().pipe(
          map((response: IUnusualOPQueryResponse) => {
            if (response.success) {
              return UnusualQuerySuccessAction({
                data: this._mapOperations(response),
              });
            }
            const { errorMessage } = response;
            return UnusualQueryFailAction({ errorMessage });
          }),
          catchError((_err: any) =>
            of(UnusualQueryFailAction({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  unusualOPApprove$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UnusualApproveLoadAction),
      switchMap((action) =>
        this.unusualService.approve(action.body).pipe(
          map((response: IUnusualOPApproveResponse) => {
            if (response.success) {
              const typeModal =
                response.typeOperation === UnusualBlockTypeEnum.APPROVE_BLOCK
                  ? UnusualModalTypeEnum.APPROVE_OK
                  : UnusualModalTypeEnum.REJECT_OK;

              const cardNumbers: string = response.AdditionalData.map(
                (i: IAdditionalData) => i.ProductId.slice(-4),
              ).join(', ');

              this._openModal(typeModal, cardNumbers);
              return UnusualApproveSuccessAction({
                data: response.AdditionalData,
              });
            }
            const { errorMessage } = response;
            return UnusualApproveFailAction({ errorMessage });
          }),
          catchError((_err: any) =>
            of(UnusualApproveFailAction({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  private _mapOperations(
    response: IUnusualOPQueryResponse,
  ): ITransactionsByCard[] {
    return response.TransactionsByCard.filter(
      (op: ITransactionsByCard) => op.DepAcctTrnRec.length > 0,
    );
  }

  get mainNavigate(): INavigate {
    return Navigate;
  }

  private _openModal(
    type: UnusualModalTypeEnum,
    cardNumbers: string = '',
  ): void {
    this.modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(type, cardNumbers), 10);
  }

  public _actionsModal(
    type: UnusualModalTypeEnum,
    cardNumbers: string = '',
  ): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;
      switch (type) {
        case UnusualModalTypeEnum.REJECT_OK:
          this._setupApproveOKModal(component);
          break;
        case UnusualModalTypeEnum.APPROVE_OK:
          this._setupRejectOKModal(component, cardNumbers);
          break;
      }
    }
  }

  private _setupApproveOKModal(component: IDsModal): void {
    component.img = '/24-essential-like.svg';
    component.typeModal = 'success';
    component.title = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_CONFIRM_SURE.TITLE`,
    );
    component.description = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_CONFIRM_SURE.DESCRIPTION`,
    );
    component.btnAgree = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_CONFIRM_SURE.BTN_OK`,
    );

    const subs = component.actionAgree.subscribe(() => {
      this.modalService.close();
      this.router.navigate([this.mainNavigate.home]);
      subs.unsubscribe();
    });
  }

  private _setupRejectOKModal(component: IDsModal, cardNumbers: string): void {
    component.img = '/24-essential-bell-5.svg';
    component.typeModal = 'info';
    component.title = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_CONFIRM_NO_SURE.TITLE`,
    );
    component.description = this.translate
      .instant(`UNUSUALES_OPERATIONS.MODAL_CONFIRM_NO_SURE.DESCRIPTION`)
      .replace('{{number}}', cardNumbers);
    component.btnAgree = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_CONFIRM_NO_SURE.BTN_OK`,
    );

    const subs = component.actionAgree.subscribe(() => {
      this.modalService.close();
      this.router.navigate([this.mainNavigate.contact]);
      subs.unsubscribe();
    });
  }
}
