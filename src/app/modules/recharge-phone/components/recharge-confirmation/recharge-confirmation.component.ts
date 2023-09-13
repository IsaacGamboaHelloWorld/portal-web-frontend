import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';
import { IRecharge } from '@store/reducers/models/recharge/recharge.reducer';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  INavigateRechargePhone,
  NavigateRechargePhone,
} from '../../entities/routes';

@Component({
  selector: 'app-recharge-confirmation',
  templateUrl: './recharge-confirmation.component.html',
  styleUrls: ['./recharge-confirmation.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RechargeConfirmationComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public cost: number = 0;

  constructor(private model: RechargeModel, private router: Router) {}

  ngOnInit(): void {
    this.model.setStep(2);
    this._validateStep();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get formOne$(): Observable<IFormOneRecharge> {
    return this.model.formOne$;
  }

  get recharge$(): Observable<IRecharge> {
    return this.model.recharge$;
  }

  public fetchRecharge(form: IFormOneRecharge): void {
    this.model.recharge(form);
  }

  get navigate(): INavigateRechargePhone {
    return NavigateRechargePhone;
  }
  private _validateStep(): void {
    this.model.recharge$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IRecharge) => {
        if (data.loaded) {
          this.model.setStep(3);
          this.router.navigate([this.navigate.step3]);
        }
      });
  }
}
