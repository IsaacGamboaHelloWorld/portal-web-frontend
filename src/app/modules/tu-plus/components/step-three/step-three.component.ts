import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { AdvanceFacade } from '@app/modules/advance/advance.facade';
import { HomeModel } from '@app/modules/home/home.model';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { IDsModal } from '@app/shared/ds/ds-modal/entities/ds-modal.interface';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { IToPlusState } from '@app/store/reducers/models/to-plus/to-plus.reducer';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  ACCOUNT_TYPE_CODE,
  BANK_ID,
  BANK_NICKNAME,
  ERROR_MESSAGE,
  REGEX_BIN_NO_REDEEM,
} from '../../constants/constants';
import { INavigateYourPlus, NavigateYourPlus } from '../../constants/routes';
import { IReqRedemption } from '../../entities/redemption.interface';
import { YourPlusOption } from '../../entities/your-plus.interface';
import { MdlAuthOtpComponent } from '../../shared/mdl-auth-otp/mdl-auth-otp.component';
import { YourPlusModel } from '../../store/models/your-plus.model';
import { IConfiguration } from '../../store/reducers/configuration.reducer';
import { IOTPGeneration } from '../../store/reducers/otp-generation.reducer';
import { IRedemption } from '../../store/reducers/redemption.reducer';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepThreeComponent implements OnInit, OnDestroy {
  public formCreateRedemption: FormGroup;

  public isSelectedAccount: boolean = true;
  public isSelectedCreditCard: boolean = false;
  public accountDefault: any;
  public options: YourPlusOption[];
  private textType: ACCOUNT_TYPE_CODE;
  private _isValue: boolean;
  private _maxAmountRedeem: number = 0;
  private _minAmount: number = 0;
  private _maxAmount: number = 0;
  private _conversionFactor: number = 0;
  private _dataToSubmit: IReqRedemption;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('inputReference', null) inputReference: ElementRef;

  constructor(
    private _model: YourPlusModel,
    private _home_model: HomeModel,
    private _facade: AdvanceFacade,
    private _translate: TranslateService,
    private _modalService: ModalService,
    private _router: Router,
  ) {
    this._initForm();
  }

  ngOnInit(): void {
    this._setStep(3);
    this._loadConfiguration();
    this._loadData();
    this.onChange();
    this.setSelectedAccount();
    this._accountDefault();
  }
  ngOnDestroy(): void {
    this._model.otpGenerationReset();
    this._model.redemptionReset();
    this._destroy$.next(true);
    this._destroy$.complete();
  }
  private _loadData(): void {
    this.formCreateRedemption.patchValue({
      bankId: BANK_ID.POPULAR,
    });
    this.formCreateRedemption.patchValue({
      bankName: BANK_NICKNAME.POPULAR,
    });
    this.formCreateRedemption.patchValue({
      totalPoints: this._minAmount,
    });
  }
  private _setStep(step: number): void {
    this._model.setStep({ step });
  }

  private _initForm(): void {
    this.formCreateRedemption = new FormGroup({
      totalPoints: new FormControl('', [
        Validators.required,
        this.regexValidator(new RegExp('^[0-9]+$'), { error_input: true }),
      ]),
      curAmt: new FormControl('', Validators.required),
      accountData: new FormControl(null),
      accountId: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required),
      bankId: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
    });
  }

  private _loadConfiguration(): void {
    this.configuration$
      .subscribe((data: IConfiguration) => {
        if (!!data.data && data.data.success) {
          this._minAmount = data.data.MinCurAmt.Amt;
          this._maxAmount = data.data.MaxCurAmt.Amt;
          this._conversionFactor = data.data.ConversionFactor;
          data.data.OtpInfo.OtpRequired
            ? (this._maxAmountRedeem = data.data.OtpInfo.MinCurAmt.Amt)
            : (this._maxAmountRedeem =
                this._maxAmount * this._conversionFactor + 1);
        }
      })
      .unsubscribe();
  }

  regexValidator(
    regexPoints: RegExp,
    errorPoints: ValidationErrors,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      this._isValue = regexPoints.test(control.value);
      if (
        control.value >= this._minAmount &&
        control.value <= this._maxAmount &&
        this._isValue &&
        !isNullOrUndefined(control.value)
      ) {
        return null;
      } else {
        return errorPoints;
      }
    };
  }
  public loadForm(): void {
    this._model.redemptionReset();

    this._dataToSubmit = {
      totalPoints: this.formCreateRedemption.controls['totalPoints'].value,
      curAmt: this.formCreateRedemption.controls['curAmt'].value,
      accountId: this.formCreateRedemption.controls['accountId'].value,
      accountType: this.formCreateRedemption.controls['accountType'].value,
      bankId: this.formCreateRedemption.controls['bankId'].value,
      bankName: this.formCreateRedemption.controls['bankName'].value,
    };
    if (this._dataToSubmit.curAmt >= this._maxAmountRedeem) {
      this._model.otpGenerationLoad();
      const subscribeOtpGeneration = this.otpGeneration$.subscribe(
        (data: IOTPGeneration) => {
          if (!!data && data.success) {
            this._openModalOTP(data.data.Transaction.ApprovalId);
            subscribeOtpGeneration.unsubscribe();
          } else if (data.error && data.loaded) {
            if (
              data.errorMessageCode ===
                ERROR_MESSAGE.GENERATION_CODE_MAX_RETRY ||
              data.errorMessageCode ===
                ERROR_MESSAGE.GENERATION_CODE_MAX_RETRY_OTP
            ) {
              this._openModal(false);
            }
            subscribeOtpGeneration.unsubscribe();
          }
        },
      );
    } else {
      this._submitForm();
    }
  }
  private _submitForm(): void {
    this._model.redemptionLoad(
      this._dataToSubmit.totalPoints + '',
      this._dataToSubmit.curAmt + '',
      this._dataToSubmit.accountId,
      this._dataToSubmit.accountType,
      this._dataToSubmit.bankId,
      this._dataToSubmit.bankName,
    );
    this._loadRedemption();
  }

  get redemption$(): Observable<IRedemption> {
    return this._model.redemption$;
  }
  get configuration$(): Observable<IConfiguration> {
    return this._model.configuration$;
  }
  get toPlus$(): Observable<IToPlusState> {
    return this._home_model.toPlus$;
  }
  get otpGeneration$(): Observable<IOTPGeneration> {
    return this._model.otpGeneration$;
  }
  get productsOrigin$(): Observable<Product[]> {
    return this._model.products$.pipe(
      map((product: Product[]) => {
        return this._filterProducts(product);
      }),
    );
  }
  get productDefault$(): Observable<Product> {
    return this._model.products$.pipe(
      map((product: Product[]) => this._filterProducts(product).shift()),
    );
  }
  private _filterProducts(product: Product[]): Product[] {
    return product.filter(
      (data) =>
        data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
        data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
    );
  }
  get products(): Observable<Product[]> {
    return this._model.products$.pipe(
      map((product: Product[]) =>
        product.filter(
          (data) =>
            data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        ),
      ),
    );
  }
  private _loadRedemption(): void {
    const subscribeRedemption = this.redemption$.subscribe(
      (data: IRedemption) => {
        if (!!data && data.success) {
          this._openModal(true);
          subscribeRedemption.unsubscribe();
        } else if (data.error && data.loaded) {
          if (
            data.errorMessageCode === ERROR_MESSAGE.REDEMPTION_CODE_MAX_RETRY
          ) {
            this._openModal(false);
          }

          subscribeRedemption.unsubscribe();
        }
      },
    );
  }

  public onChange(): void {
    if (
      this.formCreateRedemption.controls['totalPoints'].value > this._maxAmount
    ) {
      this.formCreateRedemption.patchValue({
        totalPoints: this._maxAmount,
      });
    }
    if (
      this.formCreateRedemption.controls['totalPoints'].value <= this._maxAmount
    ) {
      this.formCreateRedemption.patchValue({
        curAmt: (
          this.formCreateRedemption.controls['totalPoints'].value *
          this._conversionFactor
        ).toString(),
      });
    }
  }
  public setSelectedAccount(): void {
    this.isSelectedAccount = true;
    this.isSelectedCreditCard = false;
    this.formCreateRedemption.patchValue({
      accountType: '',
    });
    this.formCreateRedemption.patchValue({
      accountId: '',
    });
  }
  public setSelectedCreditCard(): void {
    this.isSelectedAccount = false;
    this.isSelectedCreditCard = true;
    this.formCreateRedemption.patchValue({
      accountType: '',
    });
    this.formCreateRedemption.patchValue({
      accountId: '',
    });
  }
  get productsCreditCard$(): Observable<Product[]> {
    return this._facade.products$.pipe(
      filter((products) => !!products && products.length > 0),
      map((products) => {
        return products.filter(
          (product) =>
            product.typeAccount === TYPE_ACCOUNTS.CREDIT_CARD &&
            product.enabled &&
            !this.validateCard(
              product.accountInformation.accountIdentifier,
              REGEX_BIN_NO_REDEEM,
            ),
        );
      }),
    );
  }

  private validateCard(value: string, regExp: any): boolean {
    return value.toString().match(regExp) !== null;
  }
  selectCard(data: any): void {
    this.formCreateRedemption.patchValue({
      accountId: data.accountInformation.accountIdentifier,
    });
    this._selectAccountType(data.accountInformation.productType);
  }
  public selectAccount(event: object): void {
    this.accountDefault = event;
    this.formCreateRedemption.patchValue({
      accountId: this.accountDefault['id'],
    });
    this._selectAccountType(this.accountDefault['typeAccount']);
  }
  private _accountDefault(): void {
    if (
      isNullOrUndefined(this.formCreateRedemption.controls['accountData'].value)
    ) {
      this.formCreateRedemption.controls['accountData'].valueChanges.subscribe(
        (data) => {
          this.accountDefault = data;
          this.formCreateRedemption.patchValue({
            accountId: this.accountDefault['id'],
          });
          this._selectAccountType(this.accountDefault['typeAccount']);
        },
      );
    }
  }

  private _selectAccountType(type: string): void {
    switch (type) {
      case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT:
        this.formCreateRedemption.patchValue({
          accountType: ACCOUNT_TYPE_CODE.DEPOSIT_ACCOUNT,
        });
        const value_deposit_account = Number(
          this.formCreateRedemption.controls['curAmt'].value,
        );
        this.textType = this._translate
          .instant(`TO_PLUS.REDEEM_SUCCESS.DEPOSIT_ACCOUNT`)
          .replace('{{amount}}', value_deposit_account.toLocaleString('es-CO'));
        break;
      case TYPE_ACCOUNTS.CURRENT_ACCOUNT:
        const value_current_account = Number(
          this.formCreateRedemption.controls['curAmt'].value,
        );
        this.textType = this._translate
          .instant(`TO_PLUS.REDEEM_SUCCESS.CURRENT_ACCOUNT`)
          .replace('{{amount}}', value_current_account.toLocaleString('es-CO'));
        this.formCreateRedemption.patchValue({
          accountType: ACCOUNT_TYPE_CODE.CURRENT_ACCOUNT,
        });
        break;
      case TYPE_ACCOUNTS.CREDIT_CARD:
        this.textType = this._translate
          .instant(`TO_PLUS.REDEEM_SUCCESS.CREDIT_CARD`)
          .replace(
            '{{amount}}',
            this.formCreateRedemption.controls['curAmt'].value,
          );
        this.formCreateRedemption.patchValue({
          accountType: ACCOUNT_TYPE_CODE.CREDIT_CARD,
        });
        break;
      default:
        this.formCreateRedemption.patchValue({
          accountType: '',
        });
    }
  }
  private _openModal(isSuccess: boolean): void {
    this._modalService.open(
      DsModalComponent,
      false,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(isSuccess), 10);
  }
  private _actionsModal(isSuccess: boolean): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;
      if (isSuccess) {
        this._modalSuccess(component);
        if (this.isSelectedAccount) {
          this._modalSuccessSelectedAccount(component);
        } else if (this.isSelectedCreditCard) {
          this._modalSuccessSelectedCreditCard(component);
        }
      } else {
        this._modalError(component);
      }
      const actionCancel = component.actionCancel.subscribe(() => {
        this._model.redemptionReset();
        this._modalService.close();
        this._goToHome();
        actionCancel.unsubscribe();
      });
      const actionAgree = component.actionAgree.subscribe(() => {
        this._model.redemptionReset();
        this._modalService.close();
        this._goToHome();
        actionAgree.unsubscribe();
      });
    }
  }
  private _modalSuccess(component: IDsModal): void {
    component.img = '/like-icon-pocket.svg';
    component.typeModal = 'success';
    const value = Number(
      this.formCreateRedemption.controls['totalPoints'].value,
    );
    component.title = this._translate
      .instant(`TO_PLUS.REDEEM_SUCCESS.TITLE`)
      .replace('{{points}}', value.toLocaleString('es-CO'));
    component.btnAgree = this._translate.instant(
      `TO_PLUS.REDEEM_SUCCESS.BTN_OK`,
    );
  }

  private _modalSuccessSelectedAccount(component: IDsModal): void {
    component.description = this._translate
      .instant(this.textType)
      .replace(
        '{{digitsAccount}}',
        this.formCreateRedemption.controls['accountId'].value.slice(-4),
      );
  }
  private _modalSuccessSelectedCreditCard(component: IDsModal): void {
    component.description = this._translate
      .instant(this.textType)
      .replace(
        '{{digitsCreditCard}}',
        this.formCreateRedemption.controls['accountId'].value.slice(-4),
      );
  }
  private _modalError(component: IDsModal): void {
    component.img = '/error-icon.png';
    component.typeModal = 'error';
    component.title = this._translate.instant(`TO_PLUS.REDEEM_ERROR.TITLE`);
    component.description = this._translate.instant(
      `TO_PLUS.REDEEM_ERROR.DESCRIPTION`,
    );
    component.btnAgree = this._translate.instant(`TO_PLUS.REDEEM_ERROR.BTN_OK`);
  }

  private _openModalOTP(approvalId: string): void {
    this._modalService.open(
      MdlAuthOtpComponent,
      false,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModalOTP(approvalId);
    }, 10);
  }

  private _actionsModalOTP(approvalId: string): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.txtTitle = 'TO_PLUS.MODAL_OTP.TITLE';
      component.txtDescription = 'TO_PLUS.MODAL_OTP.DESCRIPTION';
      component.txtCode = 'TO_PLUS.MODAL_OTP.CODE';
      component.txtBtn = 'TO_PLUS.MODAL_OTP.BTN_OK';

      component.dataToSubmit = this._dataToSubmit;
      component.approvalId = approvalId;

      const actionCancel = component.actionCancel.subscribe((closeRetry) => {
        this._model.otpGenerationReset();
        this._modalService.close();
        if (closeRetry) {
          setTimeout(() => {
            this._openModal(false);
          }, 500);
        }
        actionCancel.unsubscribe();
      });

      const actionAgree = component.actionAgree.subscribe(
        (otpValue: string) => {
          this._model.otpGenerationReset();
          this._modalService.close();
          setTimeout(() => {
            this._openModal(true);
          }, 500);
          actionAgree.unsubscribe();
        },
      );
    }
  }

  private _goToHome(): void {
    this._router.navigate([NavigateYourPlus.step1]);
  }
  get navigate(): INavigateYourPlus {
    return NavigateYourPlus;
  }
  // tslint:disable-next-line:max-file-line-count
}
