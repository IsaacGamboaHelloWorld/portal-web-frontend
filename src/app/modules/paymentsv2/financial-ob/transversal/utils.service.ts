import { Injectable } from '@angular/core';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { ClassNotification } from '@app/core/constants/notification';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { IDeleteLoanRequest } from '../entities/financial-op';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { IDeleteLoanPayments } from '../store/reducers/delete-payment.reducer';
import { ManipulateDomService } from './../../../../core/services/manipulate-dom/manipulate-dom.service';

@Injectable()
export class UtilsService {
  public _destroy$: Subject<boolean> = new Subject<boolean>();

  private _refresh$: Subject<any> = new Subject<any>();

  public getRefresh(): Observable<any> {
    return this._refresh$;
  }

  public OnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  constructor(
    private _modal: ModalService,
    private _facade: FinancialOpFacade,
    private _translate: TranslateService,
    private _dom: ManipulateDomService,
  ) {}

  public doDeleteFinancialOp($event: any): void {
    this._modal.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal($event), 10);
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
        'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SERVICE_TITLE';
      component.desc =
        'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SERVICE_DESC';
      component.img = '/delete.png';
      component.btnCancel =
        'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.BTN_DELETE_NO';
      component.btnAgree =
        'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.BTN_DELETE_YES';
      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this._modal.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.doDeleteLoan(_data);
      });
    }
  }

  public doDeleteLoan(_data: any): void {
    const dataToSend: IDeleteLoanRequest = {
      accountId: _data.data.accountId,
      accountType: _data.data.accountType,
      bank: _data.data.bank,
    };
    this._facade.deleteSelectedPayment(dataToSend);
    this.deletePayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((info: IDeleteLoanPayments) => {
        if (!!info && !!info.deleteData) {
          if (info.deleteData.success) {
            this._facade.notificationOpen(
              this._translate.instant(
                'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SUCCESS',
              ),
              true,
              ClassNotification.SUCCESS,
            );
            this._facade.clearDeletePayment();
            this._modal.close();
            this._facade.clearAllPayments();
            this._refresh$.next();
          } else {
            this._facade.notificationOpen(
              info.deleteData.errorMessage,
              true,
              ClassNotification.ERROR,
            );
            this._modal.close();
          }
        } else if (info.error) {
          this._facade.notificationOpen(
            this._translate.instant(
              'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SUCCESS',
            ),
            true,
            ClassNotification.SUCCESS,
          );
          this._modal.close();
          this._facade.clearDeletePayment();
        }
      });
  }

  public domMainContainreOb(isInit: boolean): void {
    if (isInit) {
      this._dom.addClass('.main-container-transaction', 'main-container-ob');
    } else {
      this._dom.removeClass('.main-container-transaction', 'main-container-ob');
    }
  }

  get deletePayment$(): Observable<IDeleteLoanPayments> {
    return this._facade.deletePayment$;
  }
}
