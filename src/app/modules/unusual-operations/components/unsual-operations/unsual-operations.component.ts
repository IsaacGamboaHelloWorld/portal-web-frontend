import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApplicationModel } from '@app/application.model';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { IDsModal } from '@app/shared/ds/ds-modal/entities/ds-modal.interface';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OtpAthOperations } from '@app/shared/otp-ath-wrapper/constants/otp-ath-operations.enum';
import {
  IOtpAthModalFlow,
  OtpAthModel,
} from '@app/shared/otp-ath-wrapper/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnusualBlockTypeEnum } from '../../constants/unusual-block-type.enum';
import {
  IProductInfo,
  IUnusualOPApproveRequest,
} from '../../entities/unusual-approve-request.interface';
import {
  IDepAcctTrnRec,
  ITransactionsByCard,
} from '../../entities/unusual-query-response.interface';
import { IUnusualOpQuery } from '../../store/state/unsual-operations.state';

@Component({
  selector: 'app-unsuales-operations',
  templateUrl: './unsual-operations.component.html',
  styleUrls: ['./unsual-operations.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class UnsualOperationsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private _operationsInput: string = 'operations';
  private _destroy$: Subject<boolean> = new Subject();
  private _isConfirmOperation: boolean = false;

  constructor(
    private appModel: ApplicationModel,
    private translate: TranslateService,
    private modalService: ModalService,
    private _otpModel: OtpAthModel,
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this._subOtpAthFlow();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get unusualOperationsQuery$(): Observable<IUnusualOpQuery> {
    return this.appModel.unusualOperationsQuery$;
  }

  private _createForm(): void {
    this.form = new FormGroup({
      [this._operationsInput]: new FormControl([], Validators.required), // [] => ITransactionsByCard[]
    });
  }

  private _subOtpAthFlow(): void {
    this.otpAthModalFlow$
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._responseModalFlow.bind(this));
  }

  private _responseModalFlow(state: IOtpAthModalFlow): void {
    if (state.success) {
      this._fetchConfirmOperation();
    }
  }

  public confirmOperation(isConfirm: boolean): void {
    this._isConfirmOperation = isConfirm;
    this._otpModel.otpAthModalOpen(OtpAthOperations.unusualesOperation);
  }

  private _fetchConfirmOperation(): void {
    const formValue: ITransactionsByCard[] = this.operationsAlias.value;
    const productInfo: IProductInfo[] = [];
    const typeOperation = this._isConfirmOperation
      ? UnusualBlockTypeEnum.REJECT_BLOCK
      : UnusualBlockTypeEnum.APPROVE_BLOCK;

    formValue.forEach((i: ITransactionsByCard) => {
      const info: IProductInfo = {
        productId: i.CardNum,
        productType: TYPE_ACCOUNTS.CREDIT_CARD,
        transactionInfo: i.DepAcctTrnRec.map((t: IDepAcctTrnRec) => ({
          trnId: t.TrnId,
        })),
      };
      productInfo.push(info);
    });

    const body: IUnusualOPApproveRequest = {
      productInfo,
      typeOperation,
    };
    this.appModel.fetchUnusualOperationsApproveLoad(body);
  }

  public rejectOperation(): void {
    this._openModal();
  }

  get operationsAlias(): AbstractControl {
    return this.form.get(this._operationsInput);
  }

  private _openModal(): void {
    this.modalService.open(
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
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;
      this._setupRejectModal(component);
    }
  }

  private _setupRejectModal(component: IDsModal): void {
    component.img = '/essential-warning-6@3x.png';
    component.typeModal = 'warning';
    component.buttonsInColumn = true;
    component.title = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_WARNING_CONFIRM.TITLE`,
    );
    component.btnAgree = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_WARNING_CONFIRM.BTN_OK`,
    );
    component.btnCancel = this.translate.instant(
      `UNUSUALES_OPERATIONS.MODAL_WARNING_CONFIRM.BTN_CANCEL`,
    );

    const subs = component.actionAgree.subscribe(() => {
      this.modalService.close();
      setTimeout(() => this.confirmOperation(false), 1500);
      subs.unsubscribe();
    });

    const subsCancel = component.actionCancel.subscribe(() => {
      this.modalService.close();
      subsCancel.unsubscribe();
    });
  }

  get otpAthModalFlow$(): Observable<IOtpAthModalFlow> {
    return this._otpModel.modalFlowOtpAth$;
  }
}
