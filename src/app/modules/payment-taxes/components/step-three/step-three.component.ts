import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TODAY } from '@modules/transfer-to-account/constants/calendar';
import {
  INavigatePaymentTaxes,
  NavigatePaymentTaxes,
} from '../../entities/routes';
import { PaymentTaxesModel } from '../../store/model/payment-taxes.model';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent implements OnInit {
  public today: object = new Date();
  public typeActive: string = '';
  public formStepThree: FormGroup;
  public optionOne: string = TODAY;
  constructor(
    private model: PaymentTaxesModel,
    private router: Router,
    private dom: ManipulateDomService,
  ) {}

  get navigate(): INavigatePaymentTaxes {
    return NavigatePaymentTaxes;
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  ngOnInit(): void {
    this._setStep(3);
    this._initForm();
  }

  private _initForm(): void {
    this.formStepThree = new FormGroup({
      scheduledPayment: new FormControl('', [Validators.required]),
      dueDate: new FormControl(''),
    });
  }

  public selectedOption(nameScheduled: string): void {
    this.typeActive = nameScheduled;
  }

  public setClass(_id: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this.dom.addClass(_id, 'active');
  }

  public submitFormThree(): void {
    this.model.setDate({ date: this.today });
    this._setStep(4);
    this.router.navigate([this.navigate.step4]);
  }
}
