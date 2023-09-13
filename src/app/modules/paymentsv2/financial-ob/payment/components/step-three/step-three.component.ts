import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TODAY } from '@modules/transfer-to-account/constants/calendar';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { PaymentObligationsFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-obligations-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepThreeComponent implements OnInit {
  private static readonly CURRENT_NUMBER_STEP: number = 3;
  private static readonly NEXT_STEP: number = 4;
  public today: object = new Date();
  public typeActive: string = '';
  public formThree: FormGroup;
  public optionOne: string = TODAY;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _facade: PaymentObligationsFacade,
    private _router: Router,
    private _parent_facade: FinancialOpFacade,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._setStep(StepThreeComponent.CURRENT_NUMBER_STEP);
  }

  private _initForm(): void {
    this.formThree = new FormGroup({
      date: new FormControl('', [Validators.required]),
      dueDate: new FormControl(''),
    });
  }

  public nexStep(): void {
    this._router.navigate([this.navigateInternal.step_confirmation]);
    this.setStep.emit(StepThreeComponent.NEXT_STEP);
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }

  public submitData(): void {
    this.formThree.controls.date.setValue(this.today);
    this._facade.setFormThree(this.formThree.value);
    this.nexStep();
  }
}
