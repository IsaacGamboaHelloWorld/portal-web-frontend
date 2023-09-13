import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { Navigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RecurringPopupComponent } from '../components/recurring-popup/recurring-popup.component';
import {
  IDeleteServiceRequest,
  IPublicService,
  IRecurringPayment,
} from '../entities/public-services';
import { IPaymentFormOne } from '../payment/entities/new-payment';
import { PaymentServiceFacade } from '../payment/payment.facade';
import { PublicServicesFacade } from '../public-services.facade';
import { IInfoPayments } from '../registered-sp/store/state/registered-sp-module.state';
import { BillerDetailState } from '../store/reducers/biller-detail.reducer';
import { IDeletePublicServicePayments } from '../store/reducers/delete-payment.reducer';
import { EnabledAgreementsState } from '../store/reducers/enabled-agreements.reducer';

@Injectable()
export class UtilsService {
  public _destroy$: Subject<boolean> = new Subject<boolean>();
  private _loadedProduct$: Subject<boolean> = new Subject<boolean>();
  private _refresh$: Subject<any> = new Subject<any>();
  private _infoPaymentResponse$: Subject<IInfoPayments> = new Subject<
    IInfoPayments
  >();
  public getRefresh(): Observable<any> {
    return this._refresh$;
  }

  public getLoadedProduct(): Observable<boolean> {
    return this._loadedProduct$;
  }

  public getInfoPaymentResponse(): Observable<IInfoPayments> {
    return this._infoPaymentResponse$;
  }

  public OnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  constructor(
    private _facadeServicePublic: PublicServicesFacade,
    private _facadePayment: PaymentServiceFacade,
    private _modal: ModalService,
    private _translate: TranslateService,
    private _router: Router,
  ) {}

  public setProgramed(programmed: boolean, selectedBill: any): void {
    if (programmed) {
      this._modal.open(
        RecurringPopupComponent,
        false,
        `${SMALL_WIDTH} not-button-close`,
      );
    } else {
      this._modal.open(
        AlertCloseComponent,
        true,
        `${SMALL_WIDTH} not-button-close`,
      );
      setTimeout(() => {
        this._actionsModalUnprogrammed(selectedBill);
      }, 10);
    }
  }

  private _actionsModalUnprogrammed(selectedBill: IPublicService): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modal._dialogComponentRef,
      )
    ) {
      const component = this._modal._dialogComponentRef.instance.componentRef
        .instance;
      component.title =
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_TITLE';
      component.img = '/salir.png';
      component.btnCancel =
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_NO';
      component.btnAgree =
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_YES';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this._modal.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        const nickname: string = selectedBill.billerNickName
          ? selectedBill.billerNickName
          : selectedBill.billerNickname;

        const data: IRecurringPayment = {
          billerId: selectedBill.billerId,
          billerNickname: nickname,
          contract: selectedBill.contract,
          reference: selectedBill.invoice,
          paymentType: 'X_DAYS_BEFORE_DUE_DATE',
          maxAmount: selectedBill.maxAmount,
          daysBeforeAfterExpiration: selectedBill.daysBeforeAfterExpiration,
          originAccountId: selectedBill.originAccountId,
          originAccountType: selectedBill.originAccountType,
          editMode: false,
        };
        this._facadeServicePublic.setDeleteRecurrent(data);
        this._modal.close();
      });
    }
  }

  public doPayService(data: any): void {
    this._facadeServicePublic.setPayment(data);
    this._router.navigate([Navigate.paymentsv2payservice]);
  }

  public onDeletePublicService($event: any): void {
    this._loadedProduct$.next(true);
    this._modal.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal($event);
    }, 10);
  }

  private _actionsModal(_data: object): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modal._dialogComponentRef,
      )
    ) {
      const component = this._modal._dialogComponentRef.instance.componentRef
        .instance;

      component.title =
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.DELETE_SERVICE_TITLE';
      component.desc =
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.DELETE_SERVICE_DESC';
      component.img = '/delete.png';
      component.btnCancel =
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.BTN_DELETE_NO';
      component.btnAgree =
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.BTN_DELETE_YES';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this._modal.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.doDeletePublicService(_data);
      });
    }
  }

  public doDeletePublicService(_data: any): void {
    const dataToSend: IDeleteServiceRequest = {
      billerId: _data.billerId,
      billerNickname: _data.billerNickname,
      contract: _data.contract,
      isBiller: _data.isBiller,
    };
    this._facadeServicePublic.deleteSelectedPayment(dataToSend);
    this.deletePayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((info: IDeletePublicServicePayments) => {
        if (!!info && !!info.deleteData) {
          if (info.deleteData.success) {
            this._facadeServicePublic.notificationOpen(
              this._translate.instant(
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.DELETE_SUCCESS',
              ),
              true,
              ClassNotification.SUCCESS,
            );
            this._facadeServicePublic.clearDeletePayment();
            this._modal.close();
            this._facadeServicePublic.clearAllPayments();
            this._refresh$.next({ isDeleted: true });
          } else {
            this._facadeServicePublic.notificationOpen(
              info.deleteData.errorMessage,
              true,
              ClassNotification.ERROR,
            );
            this._modal.close();
          }
        } else if (info.error) {
          this._modal.close();
          this._facadeServicePublic.clearDeletePayment();
        }
      });
  }

  get infoPayment$(): Observable<IPublicService> {
    return combineLatest([
      this.selectedPayment$,
      this.selectedNoDataPayment$,
      this.enabledAgreements$,
    ]).pipe(
      takeUntil(this._destroy$),
      map((combined) => {
        if (combined[0].error) {
          const isBill =
            combined[1].isBiller &&
            !!combined[2] &&
            !!combined[2].data &&
            !!combined[2].data.agreements[combined[1].billerId];
          this._infoPaymentResponse$.next({
            billWithError: true,
            billWithErrorMessage: combined[0].description,
            isBill,
          });
          return combined[1];
        } else if (!!combined[0].data && !!combined[0].data.billerPayment) {
          const isBill =
            combined[0].data.billerPayment.biller &&
            !!combined[2] &&
            !!combined[2].data &&
            !!combined[2].data.agreements[combined[1].billerId];

          this._infoPaymentResponse$.next({
            billWithError: false,
            billWithErrorMessage: '',
            isBill,
          });
          combined[0].data.billerPayment.billerNickname = combined[1]
            .billerNickname
            ? combined[1].billerNickname
            : combined[0].data.billerPayment.billerNickname;
          combined[0].data.billerPayment.paymentType = combined[1].paymentType;
          combined[0].data.billerPayment.daysBeforeAfterExpiration =
            combined[1].daysBeforeAfterExpiration;
          combined[0].data.billerPayment.maxAmount = combined[1].maxAmount;
          combined[0].data.billerPayment.originAccountId =
            combined[1].originAccountId;
          combined[0].data.billerPayment.originAccountType =
            combined[1].originAccountType;
          return combined[0].data.billerPayment;
        }
      }),
    );
  }

  get deletePayment$(): Observable<IDeletePublicServicePayments> {
    return this._facadeServicePublic.deletePayment$;
  }

  get selectedPayment$(): Observable<BillerDetailState> {
    return this._facadeServicePublic.selectedPayment$;
  }

  get selectedNoDataPayment$(): Observable<IPublicService> {
    return this._facadeServicePublic.selectedNotDataPayment$;
  }

  get enabledAgreements$(): Observable<EnabledAgreementsState> {
    return this._facadeServicePublic.selectEnabledAgreements$;
  }

  get getStepOne$(): Observable<IPaymentFormOne> {
    return this._facadePayment.getStepOne$;
  }

  get selectAllProducts$(): Observable<Product[]> {
    return this._facadePayment.selectAllProducts$;
  }

  get productDefault$(): Observable<Product> {
    return combineLatest(this.getStepOne$, this.selectAllProducts$).pipe(
      takeUntil(this._destroy$),
      map(([{ account_origin }, products]: [IPaymentFormOne, Product[]]) => {
        if (!!products) {
          return products
            .filter((data) => {
              if (!!account_origin) {
                return (
                  data.accountInformation.accountIdentifier ===
                    account_origin.accountInformation.accountIdentifier &&
                  data.accountInformation.productType ===
                    account_origin.accountInformation.productType
                );
              }
              return (
                data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
                data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT
              );
            })
            .shift();
        } else {
          return null;
        }
      }),
    );
  }
}
