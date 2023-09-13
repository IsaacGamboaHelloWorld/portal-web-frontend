import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Navigate } from '@core/constants/navigate';
import { PaymentModel } from '@modules/payments/payment.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertCloseComponent } from '../../../../core/components/alert-close/alert-close.component';
import { checkNested } from '../../../../shared/helpers/checkNested.helper';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NewPaymentComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private model: PaymentModel,
    private router: Router,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.model.fetchBanks();
  }

  ngOnDestroy(): void {
    this.resetAllActions();
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  resetAllActions(): void {
    this.model.setStep(1);
    this.model.resetLoansDestination();
    this.model.resetFormOne();
    this.model.resetFormTwo();
    this.model.fetchPaymentType(null);
    this.model.resetProduct();
  }

  get step$(): Observable<number> {
    return this.model.step$;
  }

  public openAlert(): void {
    this.modalService.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.title = 'PAYMENTS_PSE.POPUP_CLOSE.TEXT';
      component.img = '/delete.png';
      component.btnCancel = 'CANCEL';
      component.btnAgree = 'PAYMENTS_PSE.POPUP_CLOSE.YES_OPT';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.modalService.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.resetAllActions();
        this.router.navigate([Navigate.paymentsOld]);
        this.modalService.close();
      });
    }
  }

  public setStep(step: number): void {
    this.model.setStep(step);
  }

  public back(): void {
    this.step$
      .subscribe((data) => {
        const previous = data - 1;
        this.model.setStep(previous === 0 ? 1 : previous);
        if (previous === 0) {
          this.model.fetchPaymentType(null);
          this.router.navigate([Navigate.paymentsOld]);
        }
      })
      .unsubscribe();
  }
}
