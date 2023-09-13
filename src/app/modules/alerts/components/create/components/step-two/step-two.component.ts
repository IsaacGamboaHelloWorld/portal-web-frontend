import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import {
  A_SP,
  A_TC,
  IAlertFormTwo,
  IFinancialOpAlerts,
  IPublicServiceAlerts,
} from '@app/modules/alerts/entities/alerts';
import { AlertsModel } from '@app/modules/alerts/store/model/alerts.model';
import { INavigate, Navigate } from '@core/constants/navigate';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTwoComponent implements OnInit {
  public formStepTwoAlert: FormGroup;
  public itemsList: IPublicServiceAlerts[] | IFinancialOpAlerts[];
  public isLoading: boolean;
  public isError: boolean = false;
  public viewTypes: boolean = true;
  public retryTimes: number = 3;
  public typeAlert: string;
  public typeActive: any;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dom: ManipulateDomService,
    private _facade: AlertsModel,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._tryOne();
    this._initForm();
  }

  private _tryOne(): void {
    combineLatest([
      this._facade.stepOne$,
      this._facade.allFinancial$,
      this._facade.allServices$,
      this.financialitems$,
    ])
      .pipe(takeUntil(this._destroy$))
      .subscribe((info) => {
        if (!!info[0]) {
          this.typeAlert = info[0].type_prod;
          switch (info[0].type_prod) {
            case A_TC:
              this.itemsList = info[3];
              this.isLoading = info[1].loading;
              this.isError = info[1].error;
              break;
            case A_SP:
              this.itemsList = info[2].bills;
              this.isLoading = info[2].loading;
              this.isError = info[2].error;
              break;
          }
        }
      });
  }

  private _initForm(): void {
    this.formStepTwoAlert = new FormGroup({
      product_type: new FormControl('', Validators.required),
      target: new FormControl(''),
      alert_type: new FormControl(''),
    });
  }

  public setBorder(_id: string): void {
    this.typeActive = _id;
  }

  public setClassTarget(_id: string): void {
    this._dom.removeMultipleClass('.radio-image', 'active');
    this._dom.addClass('.type-target-' + _id, 'active');
  }

  public submitData(): void {
    const stepTwoData: IAlertFormTwo = {
      select_product: this.formStepTwoAlert.value.product_type,
    };
    this._facade.fetchStepTwo(stepTwoData);
    this.setStep.emit(3);
  }

  public retry(): void {
    this.retryTimes--;
    if (this.retryTimes > 0) {
      this._facade.clearAllBills();
      this._facade.clearAllFinancialOps();
      this.loadData(this.typeAlert);
      this._tryOne();
    } else {
      this.setStep.emit(1);
    }
  }

  public loadData(_data: string): void {
    switch (_data) {
      case A_TC:
        this._facade.fetchAllFinancialOps();
        break;
      case A_SP:
        this._facade.fetchAllBills();
        break;
    }
  }

  get A_TC(): string {
    return A_TC;
  }

  get financialitems$(): Observable<IFinancialOpAlerts[]> {
    return this._facade.allFinancial$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map((payments) => {
        if (!!payments && !!payments.registeredLoans) {
          return payments.registeredLoans.filter(
            (pay) => pay.accountType === TYPE_ACCOUNTS.CREDIT_CARD,
          );
        }
      }),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }
}
