import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ID_CHANNEL } from '@app/core/constants/global';
import { OtpAthOperations } from '@app/shared/otp-ath-wrapper/constants/otp-ath-operations.enum';
import {
  IOtpAthModalFlow,
  OtpAthModel,
} from '@app/shared/otp-ath-wrapper/store';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  ILimitManagementCreateRequest,
  ITransferLimitData,
} from '../../entities';
import {
  ILimitManagementCreate,
  ILimitManagementGet,
  ILimitManagementGetData,
  LimitManagementModel,
} from '../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  public formPB: FormGroup;
  public formAnother: FormGroup;

  public openPB: boolean = false;
  public openAnother: boolean = false;

  public maxAmountTransactionName: string = 'maxAmountTransaction';
  public maxAmountTransfersByDayName: string = 'maxAmountOperationsByDay';

  private _pressedEvent: 'PB' | 'Another' | '';
  private _maxAmountTransaction: number = 0;
  private _maxAmountTransfersByDay: number = 0;
  private _maxAmountTransactionAnotherBank: number = 0;
  private _maxAmountTransfersByDayAnotherBank: number = 0;
  private _destroy$: Subject<boolean> = new Subject();

  constructor(
    private _model: LimitManagementModel,
    private _otpModel: OtpAthModel,
    private _cd: ChangeDetectorRef,
  ) {
    this._createFormPB();
    this._createFormAnother();
  }

  ngOnInit(): void {
    this._fetchValues();
    this._subsCreate();
    this._subOtpAthFlow();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _fetchValues(): void {
    this._model.limitManagementGetLoad({
      channel: ID_CHANNEL,
      operation: 'transfer',
    });
  }

  private _createFormPB(): void {
    this.formPB = new FormGroup({
      [this.maxAmountTransactionName]: new FormControl(0, [
        Validators.required,
      ]),
      [this.maxAmountTransfersByDayName]: new FormControl(0, [
        Validators.required,
      ]),
    });
  }

  private _createFormAnother(): void {
    this.formAnother = new FormGroup({
      [this.maxAmountTransactionName]: new FormControl(0, [
        Validators.required,
      ]),
      [this.maxAmountTransfersByDayName]: new FormControl(0, [
        Validators.required,
      ]),
    });
  }

  private _subOtpAthFlow(): void {
    this.otpAthModalFlow$
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._responseModalFlow.bind(this));
  }

  private _responseModalFlow(state: IOtpAthModalFlow): void {
    if (state.success) {
      if (this._pressedEvent === 'PB') {
        this._fetchSavePB();
      }
      if (this._pressedEvent === 'Another') {
        this._fetchSaveAnother();
      }
    }
  }

  private _fetchSavePB(): void {
    const limits: ITransferLimitData = {
      maxAmountTransaction: parseFloat(
        this.aliasPBMaxAmountByTransaction.value,
      ),
      maxAmountOperationsByDay: parseFloat(this.aliasPBMaxAmountByDay.value),
      maxAmountTransactionAnotherBank: this._maxAmountTransactionAnotherBank,
      maxAmountOperationsByDayAnotherBank: this
        ._maxAmountTransfersByDayAnotherBank,
    };
    this._saveLimits(limits);
  }

  private _fetchSaveAnother(): void {
    const limits: ITransferLimitData = {
      maxAmountTransactionAnotherBank: parseFloat(
        this.aliasAnotherMaxAmountByTransaction.value,
      ),
      maxAmountOperationsByDayAnotherBank: parseFloat(
        this.aliasAnotherMaxAmountByDay.value,
      ),
      maxAmountTransaction: this._maxAmountTransaction,
      maxAmountOperationsByDay: this._maxAmountTransfersByDay,
    };
    this._saveLimits(limits);
  }

  public openAccordion($event: string): void {
    this[$event] = !this[$event];
  }

  private _subsCreate(): void {
    this.limitManagementCreate$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: ILimitManagementCreate) => this._mapCreate(data));
  }

  private _mapCreate(data: ILimitManagementCreate): void {
    if (data.success && !!data.data && data.data.statusCode === '200') {
      this.openPB = false;
      this.openAnother = false;
      this._cd.markForCheck();
      setTimeout(() => this._fetchValues(), 1000);
    }
  }

  public savePB(): void {
    this._pressedEvent = 'PB';
    this._otpModel.otpAthModalOpen(OtpAthOperations.limitManagement);
  }

  public saveAnother(): void {
    this._pressedEvent = 'Another';
    this._otpModel.otpAthModalOpen(OtpAthOperations.limitManagement);
  }

  private _saveLimits(limits: ITransferLimitData): void {
    const request: ILimitManagementCreateRequest = {
      channel: ID_CHANNEL,
      limits,
      operation: 'transfer',
    };
    this._model.limitManagementCreateLoad(request);
  }

  get limitManagementGet$(): Observable<ILimitManagementGet> {
    return this._model.limitManagementGet$;
  }

  get limitManagementGetData$(): Observable<ILimitManagementGetData> {
    return this.limitManagementGet$.pipe(
      map((state: ILimitManagementGet) => this._mapLimetGet(state)),
    );
  }

  private _mapLimetGet(state: ILimitManagementGet): ILimitManagementGetData {
    if (!state || !state.data || !state.data.limits) {
      return;
    }

    this._setAliasValues(
      'aliasPBMaxAmountByTransaction',
      'maxAmountTransaction',
      state,
    );

    this._setAliasValues(
      'aliasPBMaxAmountByDay',
      'maxAmountOperationsByDay',
      state,
    );

    this._setAliasValues(
      'aliasAnotherMaxAmountByTransaction',
      'maxAmountTransactionAnotherBank',
      state,
    );

    this._setAliasValues(
      'aliasAnotherMaxAmountByDay',
      'maxAmountOperationsByDayAnotherBank',
      state,
    );

    // get values for PB
    this._maxAmountTransaction = state.data.limits.maxAmountTransaction;
    this._maxAmountTransfersByDay = state.data.limits.maxAmountOperationsByDay;

    // get values for another banks
    this._maxAmountTransactionAnotherBank =
      state.data.limits.maxAmountTransactionAnotherBank;
    this._maxAmountTransfersByDayAnotherBank =
      state.data.limits.maxAmountOperationsByDayAnotherBank;

    return state.data;
  }

  private _setAliasValues(
    alias: string,
    property: string,
    state: ILimitManagementGet,
  ): void {
    this[alias].setValue(state.data.limits[property]);
    this[alias].setValidators([
      Validators.required,
      Validators.max(state.data.limitsBank[property]),
    ]);
  }

  get limitManagementCreate$(): Observable<ILimitManagementCreate> {
    return this._model.limitManagementCreate$;
  }

  get aliasPBMaxAmountByTransaction(): AbstractControl {
    return this.formPB.get(this.maxAmountTransactionName);
  }

  get aliasPBMaxAmountByDay(): AbstractControl {
    return this.formPB.get(this.maxAmountTransfersByDayName);
  }

  get aliasAnotherMaxAmountByTransaction(): AbstractControl {
    return this.formAnother.get(this.maxAmountTransactionName);
  }

  get aliasAnotherMaxAmountByDay(): AbstractControl {
    return this.formAnother.get(this.maxAmountTransfersByDayName);
  }

  get hasErrorPBAmounts$(): Observable<boolean> {
    return of(
      parseInt(this.aliasPBMaxAmountByTransaction.value, 10) >
        parseInt(this.aliasPBMaxAmountByDay.value, 10),
    );
  }

  get hasErrorAnotherAmounts$(): Observable<boolean> {
    return of(
      parseInt(this.aliasAnotherMaxAmountByTransaction.value, 10) >
        parseInt(this.aliasAnotherMaxAmountByDay.value, 10),
    );
  }

  get otpAthModalFlow$(): Observable<IOtpAthModalFlow> {
    return this._otpModel.modalFlowOtpAth$;
  }
}
