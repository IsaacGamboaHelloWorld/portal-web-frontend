import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPaymentTaxesFormOne } from '../../entities/payment-taxes';
import {
  INavigatePaymentTaxes,
  NavigatePaymentTaxes,
} from '../../entities/routes';
import { PaymentTaxesModel } from '../../store/model/payment-taxes.model';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTwoComponent implements OnInit {
  constructor(private model: PaymentTaxesModel, private router: Router) {}

  get navigate(): INavigatePaymentTaxes {
    return NavigatePaymentTaxes;
  }

  get infoPaymentTaxes(): Observable<IPaymentTaxesFormOne> {
    return this.model.stepOne$;
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  ngOnInit(): void {
    this._setStep(2);
  }

  submitData(): void {
    this._setStep(3);
    this.router.navigate([this.navigate.step3]);
  }
}
