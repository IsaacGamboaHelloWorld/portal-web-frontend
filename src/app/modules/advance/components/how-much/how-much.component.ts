import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { Product } from '@core/models/products/product';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import {
  advanceRootRoute,
  advanceWhen,
} from '@modules/advance/constants/routes';
import { IFormGlobal } from '@modules/advance/entities/form-global';
import { StepService } from '@modules/advance/services/step.service';

const MAX = 3000000;

@Component({
  selector: 'app-how-much',
  templateUrl: './how-much.component.html',
  styleUrls: ['./how-much.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowMuchComponent implements OnInit {
  public formHowMuch: FormGroup;
  private _fee: number = 1;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _stepService: StepService,
    private _facade: AdvanceFacade,
    private _dom: ManipulateDomService,
    private stepService: StepService,
  ) {}

  ngOnInit(): void {
    this.stepService.setStep(2);
    this._initForm();
    this._dom.scrollTop();
  }

  get fee(): number {
    return this._fee;
  }

  get disabledPlus(): boolean {
    return this._fee >= 36;
  }

  get disabledMinus(): boolean {
    return this._fee <= 1;
  }

  get maxAmount$(): Observable<number> {
    return this._facade.formGlobal$.pipe(
      filter(
        (data: IFormGlobal) =>
          !!data &&
          !!data.origin &&
          checkNested(
            [
              'origin',
              'productAccountBalances',
              'cupo_disponible_avances_pesos',
              'amount',
            ],
            data,
          ),
      ),
      map((data) => data.origin),
      map((origin: Product) =>
        origin.productAccountBalances.cupo_disponible_avances_pesos.amount >=
        MAX
          ? MAX
          : origin.productAccountBalances.cupo_disponible_avances_pesos.amount,
      ),
    );
  }

  public cost(value: number): number {
    return typeof value === 'string' ? 0 : value;
  }

  public numberFee(sum: boolean = true): void {
    this._fee = sum
      ? this._fee >= 36
        ? 36
        : this._fee + 1
      : this._fee <= 1
      ? 1
      : this._fee - 1;
  }

  public formSubmit(): void {
    const { amount, description, month, year } = this.formHowMuch.value;
    this._facade.setHowMuch(amount, description, month, year, this._fee);
    this._stepService.setStep(3);
    this._router.navigate([`/${advanceRootRoute}/${advanceWhen}`]);
  }

  public onKey(event: any): void {
    if (
      this.isNumberKeyEvent(event) &&
      event.target.value != null &&
      event.target.value.length === event.srcElement.maxLength
    ) {
      event.srcElement.nextElementSibling.nextElementSibling.focus();
    }
  }

  private isNumberKeyEvent(event: any): boolean {
    return (
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    );
  }

  private _initForm(): void {
    this._facade.formGlobal$.pipe(take(1)).subscribe((data) => {
      this.formHowMuch = this._fb.group({
        amount: [
          validateData(data.amount, ''),
          [
            Validators.min(1),
            Validators.max(
              checkNested(
                [
                  'origin',
                  'productAccountBalances',
                  'cupo_disponible_avances_pesos',
                  'amount',
                ],
                data,
              ) &&
                data.origin.productAccountBalances.cupo_disponible_avances_pesos
                  .amount >= MAX
                ? MAX
                : data.origin.productAccountBalances
                    .cupo_disponible_avances_pesos.amount,
            ),
            Validators.pattern(/^[0-9]+$/),
            Validators.required,
          ],
        ],
        month: [
          validateData(data.month, ''),
          [
            Validators.minLength(2),
            Validators.maxLength(2),
            Validators.min(1),
            Validators.max(12),
            Validators.required,
          ],
        ],
        year: [
          validateData(data.year, ''),
          [
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.min(new Date().getFullYear()),
            Validators.required,
          ],
        ],
        description: [
          validateData(data.description, ''),
          [Validators.pattern(/^[ A-Za-z0-9_@./#&+-]*$/), Validators.required],
        ],
      });
      this._fee = !!data.fees ? data.fees : 1;
    });
  }
}
