import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClassNotification } from '@app/core/constants/notification';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { checkNested } from '../helpers/checkNested.helper';
import { SMALL_WIDTH } from '../modal/constants/modal.style';
import { ModalService } from '../modal/services/modal.service';
import { OtpAthModalComponent } from './components/otp-ath-modal.component';
import {
  IOtpAhtModalComponent,
  IOtpAthAgree,
} from './components/otp-ath-modal.interface';
import { OtpAthOperations } from './constants/otp-ath-operations.enum';
import { IOtpAthValidateRequest } from './entites';
import {
  IOtpAthGenerate,
  IOtpAthModal,
  IOtpAthValidate,
  OtpAthModel,
} from './store';

/**
 * Para usar este componente, se debe llamar el action "OtpAthModalOpen" para comenzar el flujo, recibe como parámetro el
 *    tipo de operación definido en el enum "OtpAthOperations".
 * Y suscribrirse al select "OtpAthModalFlowSelector" para validar si el flujo fue exitoso o fallido (true / false)
 */
@Component({
  selector: 'app-otp-ath-wrapper',
  templateUrl: './otp-ath-wrapper.component.html',
  styleUrls: ['./otp-ath-wrapper.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpAthWrapperComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _modalComponent: IOtpAhtModalComponent;
  private _transactionType: OtpAthOperations = null;
  private _transactionRqUID: string = '';

  constructor(
    private _modalService: ModalService,
    private _otpModel: OtpAthModel,
    private _translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this._subsGenerate();
    this._subsValidate();
    this._subsModal();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._otpModel.otpAthGenerateReset();
    this._otpModel.otpAthValidateReset();
    this._otpModel.notificationReset();
  }

  private _subsGenerate(): void {
    this.generateOtpAth$
      .pipe(
        takeUntil(this._destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(curr) === JSON.stringify(prev),
        ),
      )
      .subscribe(this._responseGenerate.bind(this));
  }

  private _responseGenerate(state: IOtpAthGenerate): void {
    if (!!state.data && state.data.generateOtpAllow) {
      this._openModal(this._transactionType);
      this._transactionRqUID = state.data.transactionRqUID;
    }
  }

  private _subsValidate(): void {
    this.validateOtpAth$
      .pipe(takeUntil(this._destroy$), skip(1))
      .subscribe(this._responseValidate.bind(this));
  }

  private _responseValidate(state: IOtpAthValidate): void {
    if (isNullOrUndefined(this._modalComponent)) {
      return;
    }
    this._modalComponent.isLoading = state.loading;
    if (!state.success && state.loaded) {
      this._modalComponent.txtError = state.errorMessage;
      this._modalComponent.retries += 1;
      this._modalComponent.txtBtn = this._translate.instant('TWO_FA.BTN_RETRY');
    }
    if (state.success) {
      this._otpModel.otpAthModalFlowSuccess();
      this._otpModel.otpAthModalClose();
      this._otpModel.otpAthValidateReset();
      this._otpModel.otpAthModalFlowReset();
    }
  }

  private _subsModal(): void {
    this.modalOtpAth$
      .pipe(takeUntil(this._destroy$), skip(1))
      .subscribe(this._responseModal.bind(this));
  }

  private _responseModal(state: IOtpAthModal): void {
    if (isNullOrUndefined(this._modalService)) {
      return;
    }
    if (state.open) {
      this._otpModel.otpAthGenerateLoad(state.transactionType);
      this._transactionType = state.transactionType;
    } else {
      this._modalService.close();
    }
  }

  private _openModal(transactionType: OtpAthOperations): void {
    this._modalService.open(
      OtpAthModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      this._modalComponent = this._modalService._dialogComponentRef.instance.componentRef.instance;
      this._modalComponent.actionCancel
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this._modalService.close();
        });
      this._modalComponent.actionAgree
        .pipe(takeUntil(this._destroy$))
        .subscribe((action: IOtpAthAgree) => {
          if (action.event === 'success') {
            const request: IOtpAthValidateRequest = {
              otpValue: action.otp,
              transactionRqUID: this._transactionRqUID,
              transactionType: this._transactionType,
            };
            this._otpModel.otpAthValidateLoad(request);
          }
          if (action.event === 'error') {
            this._otpModel.otpAthModalClose();
            this._toastError(this._translate.instant('TWO_FA.ERROR_RETRIES'));
            this._otpModel.otpAthModalFlowError();
          }
        });
    }
  }

  private _toastError(message: string): void {
    this._otpModel.notificationOpen(message, false, ClassNotification.ERROR);
  }

  get generateOtpAth$(): Observable<IOtpAthGenerate> {
    return this._otpModel.generateOtpAth$;
  }

  get validateOtpAth$(): Observable<IOtpAthValidate> {
    return this._otpModel.validateOtpAth$;
  }

  get modalOtpAth$(): Observable<IOtpAthModal> {
    return this._otpModel.modalOtpAth$;
  }
}
