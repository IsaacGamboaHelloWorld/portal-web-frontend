import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { CustomerProfile } from '@app/core/models/user/user-profile';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { UserState } from '@app/store/reducers/global/auth/auth.reducer';
import { takeUntil } from 'rxjs/operators';
import { ProfileModel } from '../store/model/profile.model';
import { CommonProfileComponent } from './common-profile-template';

export class EditProfileTemplate extends CommonProfileComponent {
  radixParseConverter: number = 10;
  constructor(
    protected dom: ManipulateDomService,
    protected model: ProfileModel,
    protected router: Router,
    protected modal: ModalService,
  ) {
    super(dom, model, router);
  }

  public buildUpdateCustomerProfileRequestTemplate(
    user: UserState,
  ): CustomerProfile {
    const customerProfile: CustomerProfile = JSON.parse(
      JSON.stringify(user.data),
    );
    customerProfile.phone = this.phoneDefaultValue;
    customerProfile.email = this.emailDefaultValue;
    customerProfile.financialInformation.assets = parseInt(
      customerProfile.financialInformation.assets,
      this.radixParseConverter,
    );
    customerProfile.financialInformation.expenses = parseInt(
      customerProfile.financialInformation.expenses,
      this.radixParseConverter,
    );
    customerProfile.financialInformation.income = parseInt(
      customerProfile.financialInformation.income,
      this.radixParseConverter,
    );
    customerProfile.financialInformation.liabilities = parseInt(
      customerProfile.financialInformation.liabilities,
      this.radixParseConverter,
    );
    customerProfile.financialInformation.otherIncome = parseInt(
      customerProfile.financialInformation.otherIncome,
      this.radixParseConverter,
    );
    customerProfile.financialInformation.otherOutcome = parseInt(
      customerProfile.financialInformation.otherOutcome,
      this.radixParseConverter,
    );
    customerProfile.financialInformation.outcome = parseInt(
      customerProfile.financialInformation.outcome,
      this.radixParseConverter,
    );
    customerProfile.employmentData.salary = parseInt(
      customerProfile.employmentData.salary,
      this.radixParseConverter,
    );
    customerProfile.personalData.numberOfChildren = parseInt(
      customerProfile.personalData.numberOfChildren,
      this.radixParseConverter,
    );
    customerProfile.personalData.peopleInChargeOf = parseInt(
      customerProfile.personalData.peopleInChargeOf,
      this.radixParseConverter,
    );
    return customerProfile;
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modal._dialogComponentRef,
      )
    ) {
      const component = this.modal._dialogComponentRef.instance.componentRef
        .instance;

      component.title = 'RECHARGE.MODAL.TITLE';
      component.img = '/delete.png';
      component.btnCancel = 'RECHARGE.MODAL.NO';
      component.btnAgree = 'RECHARGE.MODAL.YES';

      component.actionCancel
        .pipe(takeUntil(this.destroy$))
        .subscribe((_) => this.modal.close());
      component.actionAgree.pipe(takeUntil(this.destroy$)).subscribe((_) => {
        this.modal.close();
        this.back();
      });
    }
  }

  public openAlert(): void {
    this.modal.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }
}
