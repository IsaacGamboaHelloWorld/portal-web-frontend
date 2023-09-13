import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  AsyncValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Navigate } from '@core/constants/navigate';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { checkNested } from '../../../../../shared/helpers/checkNested.helper';
import { ModalService } from '../../../../../shared/modal/services/modal.service';
import {
  IAnswerPocket,
  INewPocketModuleState,
  IPocketFormOne,
  IPocketFormThree,
  ISendPocket,
} from '../../entities/new-pockets';
import { NewPocketFacade } from '../../new-pocket.facade';

@Component({
  selector: 'app-step-three-pocket',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreePocketComponent implements OnInit, OnDestroy {
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  public formStepThree: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public amountError1: boolean = false;
  public amountError2: boolean = false;
  public periodicityError: boolean = false;
  public updateMode: boolean = false;
  public options: object[];

  constructor(
    private facade: NewPocketFacade,
    private modalService: ModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.options = [
      { label: 'POCKETS.NEW.STEP_THREE.PERIODS.WEEKLY', value: 'WEEKLY' },
      { label: 'POCKETS.NEW.STEP_THREE.PERIODS.BIWEEKLY', value: 'BIWEEKLY' },
      { label: 'POCKETS.NEW.STEP_THREE.PERIODS.MONTHLY', value: 'MONTHLY' },
    ];
    this._initForm();
    this.pocketAnswer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IAnswerPocket) => {
        if (!isNullOrUndefined(data) && data.success) {
          this.setStep.emit(4);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private _initForm(): void {
    this.formStepThree = new FormGroup({
      amount: new FormControl('', Validators.required),
      amountPeriodic: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      period: new FormControl('', Validators.required),
    });

    this.formStepThree.controls.period.setValue('WEEKLY');
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.title = 'POCKETS.NEW.MODAL.TITLE';
      component.img = '/icon-bolsillos.png';
      component.btnAgree = 'POCKETS.NEW.MODAL.BTN';

      component.actionAgree.pipe(takeUntil(this.destroy$)).subscribe((_) => {
        this.router.navigate([Navigate.pockets]);
        this.modalService.close();
      });
    }
  }

  public submitForm(): void {
    const data: IPocketFormThree = {
      amount: this.formStepThree.value.amount,
      recursive: this.formStepThree.value.amountPeriodic,
      period: this.formStepThree.value.period,
    };
    this.formStepThree.controls['period'].patchValue(data.period);
    this.facade.setFormThree(data);
    this.nextStep();
  }

  public nextStep(): void {
    this.pocketInfo$
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        filter((pocket: INewPocketModuleState) => !isNullOrUndefined(pocket)),
      )
      .subscribe((data: INewPocketModuleState) => {
        const dataToSend: ISendPocket = {
          parentAccountId:
            data.formOne.account_origin.accountInformation.accountIdentifier,
          parentAccountType:
            data.formOne.account_origin.accountInformation.productType,
          pocketName: data.formOne.name,
          pocketPeriod: data.formThree.period,
          savingAmount: data.formTwo.goal,
          periodicAmount: data.formThree.recursive,
          openingAmount: data.formThree.amount,
          category: data.formOne.type,
        };
        this.facade.createPocket(dataToSend);
      });
  }

  public checkPeriodic(): void {
    this.pocketInfo$
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        filter(
          (pocket: INewPocketModuleState) =>
            !isNullOrUndefined(pocket.formOne.account_origin),
        ),
      )
      .subscribe((data: INewPocketModuleState) => {
        if (+data.formTwo.goal < +this.formStepThree.value.amountPeriodic) {
          this.periodicityError = true;
          this.formStepThree.controls['amountPeriodic'].setErrors({
            incorrect: true,
          });
        } else {
          this.periodicityError = false;
        }
      });
  }

  public checkStart(): void {
    this.pocketInfo$
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        filter(
          (pocket: INewPocketModuleState) =>
            !isNullOrUndefined(pocket.formOne.account_origin),
        ),
      )
      .subscribe((data: INewPocketModuleState) => {
        if (
          +data.formOne.account_origin.productAccountBalances.saldo_disponible
            .amount < +this.formStepThree.value.amount
        ) {
          this.amountError1 = true;
          this.amountError2 = false;
          this.formStepThree.controls['amount'].setErrors({
            incorrect: true,
          });
        } else if (+data.formTwo.goal < +this.formStepThree.value.amount) {
          this.amountError1 = false;
          this.amountError2 = true;
        } else {
          this.amountError1 = false;
          this.amountError2 = false;
        }
      });
  }

  get pocketInfo$(): Observable<INewPocketModuleState> {
    return this.facade.pocket$;
  }

  get pocketAnswer$(): Observable<IAnswerPocket> {
    return this.facade.pocketAnswer$;
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  get firstStep$(): Observable<IPocketFormOne> {
    return this.facade.firstStep$;
  }

  public valOpeningAmount(control: FormControl): AsyncValidator {
    const amount = control.value;
    this.firstStep$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (
        !isNullOrUndefined(data) &&
        data.account_origin.productAccountBalances.saldo_actual > amount
      ) {
        return true;
      }
    });
    return null;
  }
}
