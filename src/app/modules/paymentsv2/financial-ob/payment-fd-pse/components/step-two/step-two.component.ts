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
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { IDsDropDown } from '@app/shared/ds/ds-dropdown-select/constants/ds-dropdown-interface';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepPaymentPseEnum } from '../../constants/step-payment-pse.enum';
import { IBanksPse } from '../../entities/banks-pse.interface';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { TypePerson } from './../../constants/type-person.enum';
import { ISetFormTwo } from './../../entities/step-form-two.interface';
import { NavigatePaymentFD } from './../../navigate/routes';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public options: IDsDropDown[] = [];

  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _options$: Subject<IDsDropDown[]> = new Subject<IDsDropDown[]>();
  private objPerson: any = {
    1: TypePerson.NATURAL,
    2: TypePerson.LEGAL,
  };

  constructor(
    private model: PaymentFreeDestinationModel,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dom: ManipulateDomService,
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this.dom.scrollContentTop();
    this._setStep(StepPaymentPseEnum.step_2);
    this._subsLoansBanks();
    this.model.fetchBanksPse();
    setTimeout(() => this.cd.markForCheck(), 10);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _subsLoansBanks(): void {
    this.selectBanks$
      .pipe(takeUntil(this._destroy$))
      .subscribe((banks: IBanksPse[]) => this._mapBanksOptions(banks));
  }

  private _mapBanksOptions(banks: IBanksPse[]): void {
    this.options = [];
    if (!banks) {
      return;
    }
    banks.forEach((bank: IBanksPse) => {
      if (bank.bankId !== '0') {
        this.options.push({ label: bank.bankName, value: bank.bankId });
      }
    });
    this._options$.next(this.options);
    setTimeout(() => this._setValuesForm(), 10);
  }

  public next(): void {
    const [bankId, bankName] = this._getValuesBanks();
    const _form: ISetFormTwo = {
      type_person: this.personAlias.value,
      bankId,
      bankName,
      email: this.emailAlias.value,
    };
    this.model.setFormTwo(_form);
    this._setStep(StepPaymentPseEnum.step_3);
    this.router.navigate([NavigatePaymentFD.step3]);
  }

  private _getValuesBanks(_bankId: string = ''): [string, string] {
    const bankId = !!_bankId ? _bankId : this.bankAlias.value;
    let bankFinded = this.options.find((item: any) => item.value === bankId);
    if (!bankFinded && this.options.length > 0) {
      bankFinded = this.options[0];
    } else if (!bankFinded) {
      return ['', ''];
    }
    const bankName = bankFinded.label;
    return [bankId, bankName];
  }

  public selectCard(index: number): void {
    if (index <= 0) {
      return;
    }
    const person = this.objPerson[index];
    this.personAlias.setValue(`${person}`);
    this.cd.markForCheck();
  }

  private _setStep(step: number): void {
    this.model.setStep(step);
  }

  private _createForm(): void {
    this.form = new FormGroup({
      type_person: new FormControl('', Validators.required),
      bank: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    setTimeout(() => this._setValuesForm(), 10);
  }

  private _setValuesForm(): void {
    this.formTwo$
      .subscribe((_form: ISetFormTwo) => {
        const person: string = !!_form.type_person ? _form.type_person : '-1';
        const index = parseInt(person, 10);
        this.selectCard(index);
        const bankIdSelected = _form.bankId;
        const [bankId, _bankName] = this._getValuesBanks(bankIdSelected);
        this.bankAlias.setValue(bankId);
        this.emailAlias.setValue(_form.email);
      })
      .unsubscribe();
  }

  get formTwo$(): Observable<ISetFormTwo> {
    return this.model.formTwo$;
  }

  get selectBanks$(): Observable<IBanksPse[]> {
    return this.model.selectBanks$;
  }

  get personAlias(): AbstractControl {
    return this.form.get('type_person');
  }

  get bankAlias(): AbstractControl {
    return this.form.get('bank');
  }

  get emailAlias(): AbstractControl {
    return this.form.get('email');
  }

  get options$(): Observable<IDsDropDown[]> {
    return this._options$;
  }
}
