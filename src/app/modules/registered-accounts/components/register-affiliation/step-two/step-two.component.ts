import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterAffiliationData } from '@app/modules/registered-accounts/entities/register-affiliation';
import { RegisteredAccountsFacade } from '@app/modules/registered-accounts/registered-accounts.facade';
import { IBanks } from '@app/store/reducers/models/banks/loans_banks.reducer';
import { Observable, Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTwoComponent implements OnInit, OnDestroy {
  NEXT_STEP: number = 3;

  @Input()
  registerAffiliationProductData: RegisterAffiliationData;

  @Output()
  public saveInformation: EventEmitter<
    RegisterAffiliationData
  > = new EventEmitter();

  public formData: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private facade: RegisteredAccountsFacade) {}

  ngOnInit(): void {
    this.fetchBanks();
    this._initForm();
  }

  protected _initForm(): void {
    const incomingObjectIsNotNull =
      !isNullOrUndefined(this.registerAffiliationProductData) &&
      !isNullOrUndefined(this.registerAffiliationProductData.data);
    this.formData = new FormGroup({
      bankId: new FormControl(
        incomingObjectIsNotNull
          ? this.registerAffiliationProductData.data.bankId
          : null,
        [Validators.required],
      ),
      destinationAccountType: new FormControl(
        incomingObjectIsNotNull
          ? this.registerAffiliationProductData.data.destinationAccountType
          : null,
        [Validators.required],
      ),
      destinationAccountId: new FormControl(
        incomingObjectIsNotNull
          ? this.registerAffiliationProductData.data.destinationAccountId
          : '',
        [Validators.required],
      ),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public compareFnBanks(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.value === c2.value : c1 === c2;
  }

  public fetchBanks(): void {
    this.facade.fetchBanks();
  }

  get banks$(): Observable<IBanks> {
    return this.facade.banks$;
  }

  public submitForm(): void {
    const value: any = this.formData.value;

    this.submitActionHandler({
      step: this.NEXT_STEP,
      data: value,
      products: this.registerAffiliationProductData.products,
    });
  }

  protected submitActionHandler(data: RegisterAffiliationData): void {
    this.saveInformation.emit(data);
  }
}
