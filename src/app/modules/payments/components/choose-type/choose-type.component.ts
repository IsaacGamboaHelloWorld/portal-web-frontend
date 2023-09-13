import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { INavigate, Navigate } from '@core/constants/navigate';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../../environments/environment';
import { PaymentModel } from '../../payment.model';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ChooseTypeComponent implements OnInit, OnDestroy {
  @Input() step: number;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private model: PaymentModel, private router: Router) {}

  ngOnInit(): void {
    this.model.setStep(0);
    if (!this.pilotView) {
      this.model.searchAllRegistered();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

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
    if (!disabled && type !== 'taxes') {
      this.model.fetchPaymentType(type);
      this.model.setStep(1);
      this.router.navigate([Navigate.new_payment]);
    } else if (type === 'taxes') {
      this.router.navigate([Navigate.payment_taxes]);
    }
  }

  get pilotView(): boolean {
    return environment.pilot;
  }

  get baseAssets(): string {
    return environment.resources.base_assets;
  }

  get paymentType$(): Observable<boolean> {
    return this.model.paymentT$.pipe(map((data) => !isNullOrUndefined(data)));
  }
}
