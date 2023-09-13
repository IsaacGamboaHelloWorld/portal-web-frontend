import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { INavigate, Navigate } from '@core/constants/navigate';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../../environments/environment';
import { PaymentModel } from '../../payment.model';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPaymentComponent {
  @Input() step: number;
  public typePayment: string;

  constructor(private model: PaymentModel, private router: Router) {}

  get navigate(): INavigate {
    return Navigate;
  }

  get step$(): Observable<number> {
    return this.model.step$;
  }

  public setStep(step: number): void {
    this.model.setStep(step);
  }

  public setPaymentType(type: string, disabled: boolean = false): void {
    if (!disabled) {
      this.typePayment = type;
      this.model.fetchPaymentType(this.typePayment);
    }
  }

  get baseAssets(): string {
    return environment.resources.base_assets;
  }

  get paymentType$(): Observable<boolean> {
    return this.model.paymentT$.pipe(map((data) => !isNullOrUndefined(data)));
  }
}
