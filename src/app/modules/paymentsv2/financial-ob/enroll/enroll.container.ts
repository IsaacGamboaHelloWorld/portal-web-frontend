import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBankLoanElement } from '@app/core/interfaces/bankLoan.interface';
import { INavigate } from '@core/constants/navigate';
import { TranslateService } from '@ngx-translate/core';
import { IBanks } from '@store/reducers/models/banks/loans_banks.reducer';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Navigate } from '../../../../core/constants/navigate';
import { ClassNotification } from '../../../../core/constants/notification';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { setAccountIdentifier } from '../../../../shared/helpers/formValidators.helper';
import { AccountPaymentState } from '../../../../store/reducers/models/payment/account-payment/account-payment.reducer';
import { PaymentModel } from '../../../payments/payment.model';
import { FinancialOpFacade } from '../finantial-ob.facade';

@Component({
  selector: 'app-fo-enroll',
  templateUrl: './enroll.container.html',
  styleUrls: ['./enroll.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EnrollFOContainer implements OnInit, OnDestroy {
  public formEnroll: FormGroup;
  public options: object[];
  public stepOne: boolean = true;
  public stepTwo: boolean = false;
  public selectedBank: boolean = false;
  public isOwner: boolean = false;
  public OWNER: string = 'OWNER';
  public OTHER: string = 'OTHER';
  public loanActive: string = '';
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dom: ManipulateDomService,
    private _model: PaymentModel,
    private _router: Router,
    private _translate: TranslateService,
    private _facade_parent: FinancialOpFacade,
  ) {}

  ngOnInit(): void {
    this.options = [
      { label: 'AUTH.LOGIN.DOCUMENT_TYPE.CC', value: 'CC' },
      { label: 'AUTH.LOGIN.DOCUMENT_TYPE.CE', value: 'CE' },
      { label: 'AUTH.LOGIN.DOCUMENT_TYPE.NUI', value: 'TI' },
    ];

    this._initForm();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public compareFnBanks(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.value === c2.value : c1 === c2;
  }
  public compareFnLoanType(c1: any, c2: any): boolean {
    return c1 && c2 ? c2.loanType === c1.loanType : c2 === c1;
  }

  private _initForm(): void {
    this.formEnroll = new FormGroup({
      bank: new FormControl('', Validators.required),
      loanType: new FormControl('', Validators.required),
      number_prod: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      name_prod: new FormControl('', Validators.required),
    });

    this.fetchBanks();

    this.formEnroll
      .get('loanType')
      .valueChanges.pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.validateAccountIdentifier();
      });
  }

  public setClass(_id: string): void {
    this._dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this._dom.addClass('.type-owner-' + _id, 'active');
  }

  public doSubmit(): void {
    const bank = this.formEnroll.controls.bank.value;
    this._model.fetchPayment(
      '',
      '',
      null,
      '',
      this.formEnroll.controls.number_prod.value,
      this.formEnroll.controls.loanType.value,
      this.formEnroll.controls.name_prod.value,
      'true',
      bank.value,
      0,
      '',
    );

    this.payment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((returnedData: AccountPaymentState) => {
        if (!!returnedData && returnedData.loaded) {
          this._facade_parent.notificationOpen(
            this._translate.instant(
              'PAYMENTSV2.FINANCIAL_OP.SECTIONS.ENROLL.STEPS.STEP1.ENROLL_SUCCESS',
            ),
            true,
            ClassNotification.SUCCESS,
          );
          this._router.navigate([Navigate.paymentsv2obligations]);
        }
      });
  }

  validateAccountIdentifier(): void {
    if (this.formEnroll.get('loanType').value === 'CREDIT_CARD') {
      setAccountIdentifier(this.formEnroll, ['number_prod'], true);
    } else {
      setAccountIdentifier(this.formEnroll, ['number_prod'], false);
    }
  }

  public fetchBanks(): void {
    this._model.fetchBanks();
  }
  public changeBank(): void {
    this._model.resetBankLoans();
    this.formEnroll.patchValue({ loanType: '' });
    this.fetchBankLoans();
  }
  public fetchBankLoans(): void {
    this._model.fetchBankLoans(this.formEnroll.value.bank.value);
  }

  get bank_loans$(): Observable<IBankLoanElement[]> {
    return this._model.bank_loans$;
  }

  get loans_banks$(): Observable<IBanks> {
    return this._model.loans_banks$;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get payment$(): Observable<AccountPaymentState> {
    return this._model.payment$;
  }
}
