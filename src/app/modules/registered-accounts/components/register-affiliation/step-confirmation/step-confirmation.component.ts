import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterAffiliationData } from '@app/modules/registered-accounts/entities/register-affiliation';
import { RegisteredAccountsFacade } from '@app/modules/registered-accounts/registered-accounts.facade';
import { RegisterDestinationProductState } from '@app/store/reducers/models/transfer/destination-products/register-destination-product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-confirmation',
  templateUrl: './step-confirmation.component.html',
  styleUrls: ['./step-confirmation.component.sass'],
})
export class StepConfirmationComponent implements OnInit {
  @Input()
  registerAffiliationProductData: RegisterAffiliationData;

  @Output()
  public saveInformation: EventEmitter<
    RegisterAffiliationData
  > = new EventEmitter();

  @Output()
  public redirectToFirstStep: EventEmitter<
    RegisterAffiliationData
  > = new EventEmitter();

  public formData: FormGroup;

  constructor(private model: RegisteredAccountsFacade) {}

  ngOnInit(): void {
    this.formData = new FormGroup({});
  }
  public submitData(): void {
    this.saveInformation.emit(this.registerAffiliationProductData);
  }

  public goToFirstStep(): void {
    this.redirectToFirstStep.emit(this.registerAffiliationProductData);
  }

  get transactionState(): Observable<RegisterDestinationProductState> {
    return this.model.getRegisterDestinationProductState$;
  }

  get destinationBankName(): string {
    return this.registerAffiliationProductData.data.bankId['name'];
  }
}
