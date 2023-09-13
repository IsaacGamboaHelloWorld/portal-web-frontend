import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ProfileModel } from '@app/modules/profile/store/model/profile.model';
import { EditProfileTemplate } from '@app/modules/profile/util/edit-profile-template';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-edit-employment-data',
  templateUrl: './edit-employment-data.component.html',
  styleUrls: ['./edit-employment-data.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EditEmploymentDataComponent extends EditProfileTemplate
  implements OnInit {
  public formData: FormGroup;
  public maxDate: Date = new Date();
  yearRange: string =
    new Date().getFullYear() - 100 + ':' + new Date().getFullYear();
  public entryDateModel: Date;
  public endDateModel: Date;
  radixParseConverter: number = 10;

  constructor(
    protected dom: ManipulateDomService,
    protected model: ProfileModel,
    protected router: Router,
    protected modal: ModalService,
  ) {
    super(dom, model, router, modal);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this._initForm();
  }

  protected _initForm(): void {
    combineLatest(this.user$, this.catalogs$).subscribe(([userState]) => {
      const isParentOk: boolean = !!userState && !!userState.data;
      if (isParentOk) {
        this.setupInitialContactData(userState);
        if (!!userState.data.employmentData) {
          this.formData = new FormGroup({
            companyId: new FormControl(
              userState.data.employmentData.companyId,
              [Validators.required],
            ),
            salary: new FormControl(+userState.data.employmentData.salary, [
              Validators.required,
            ]),
          });
        }
      }
    });
  }

  submitData(): void {
    this.user$
      .subscribe((user) => {
        const customerProfile = this.buildUpdateCustomerProfileRequestTemplate(
          user,
        );
        const data: any = this.formData.value;
        customerProfile.employmentData = data;
        this.model.updateProfile(customerProfile);
      })
      .unsubscribe();
  }
}
