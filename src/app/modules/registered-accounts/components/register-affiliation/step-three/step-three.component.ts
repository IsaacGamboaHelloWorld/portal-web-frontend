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
import { DOCUMENT_TYPES } from '@app/core/constants/document_types';
import { RegisterAffiliationData } from '@app/modules/registered-accounts/entities/register-affiliation';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepThreeComponent implements OnInit, OnDestroy {
  @Input()
  registerAffiliationProductData: RegisterAffiliationData;

  @Output()
  public saveInformation: EventEmitter<
    RegisterAffiliationData
  > = new EventEmitter();

  NEXT_STEP: number = 4;
  public documentTypes: Array<{ name: string; type: string }> = DOCUMENT_TYPES;

  public formData: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnInit(): void {
    this._initForm();
  }

  protected _initForm(): void {
    const incomingObjectIsNotNull =
      !isNullOrUndefined(this.registerAffiliationProductData) &&
      !isNullOrUndefined(this.registerAffiliationProductData.data);
    this.formData = new FormGroup({
      customerIdType: new FormControl(
        incomingObjectIsNotNull
          ? this.registerAffiliationProductData.data.customerIdType
          : null,
        [Validators.required],
      ),
      customerId: new FormControl(
        incomingObjectIsNotNull
          ? this.registerAffiliationProductData.data.customerId
          : null,
        [Validators.required],
      ),
      customerName: new FormControl(
        incomingObjectIsNotNull
          ? this.registerAffiliationProductData.data.customerName
          : null,
        [Validators.required],
      ),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
