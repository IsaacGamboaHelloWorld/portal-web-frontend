import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CustomerProfileEmail,
  CustomerProfilePhone,
} from '@app/core/models/user/user-profile';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { CatalogItemDetail } from '@app/modules/profile/entities/load-catalog';
import { ProfileModel } from '@app/modules/profile/store/model/profile.model';
import { EditProfileTemplate } from '@app/modules/profile/util/edit-profile-template';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-contact-data',
  templateUrl: './edit-contact-data.component.html',
  styleUrls: ['./edit-contact-data.component.sass'],
})
export class EditContactDataComponent extends EditProfileTemplate
  implements OnInit {
  public formData: FormGroup;
  public emailTypeDefaultValue: CatalogItemDetail;
  public subject$: Observable<string | null> = new Subject<string | null>();
  public phoneTypeElements$: Observable<CatalogItemDetail[]> = new Observable<
    CatalogItemDetail[]
  >();
  public phoneCountryElements$: Observable<
    CatalogItemDetail[]
  > = new Observable<CatalogItemDetail[]>();
  public emailTypeElements$: Observable<CatalogItemDetail[]> = new Observable<
    CatalogItemDetail[]
  >();

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
    this.emailTypeElements$ = combineLatest(this.subject$, this.catalogs$).pipe(
      map(([subject, catalogs]) =>
        this.searchByCatalogAndTerm(subject, catalogs, 'emailType', 'longName'),
      ),
    );

    combineLatest(this.user$, this.catalogs$).subscribe(
      ([userState, catalogs]) => {
        const isParentOk: boolean = !!userState && !!userState.data;
        if (isParentOk) {
          this.setupInitialContactData(userState);
          if (!!this.emailDefaultValue) {
            this.emailTypeDefaultValue = this.searchByCatalogAndCode(
              this.emailDefaultValue.emailType,
              catalogs,
              'emailType',
              'code',
            );
          }
          this.formData = new FormGroup({
            phoneType: new FormControl('12'),
            phoneCountry: new FormControl('COL'),
            phone: new FormControl(
              !!this.phoneDefaultValue &&
              '12' === this.phoneDefaultValue.phoneType
                ? this.phoneDefaultValue.phone.replace(/[^0-9]+/g, '')
                : null,
              [Validators.required],
            ),
            emailType: new FormControl(this.emailTypeDefaultValue, [
              Validators.required,
            ]),
            email: new FormControl(
              !!this.emailDefaultValue
                ? this.emailDefaultValue.emailAddress
                : null,
              [Validators.required],
            ),
          });
        }
      },
    );
  }

  submitData(): void {
    this.user$
      .subscribe((user) => {
        const customerProfile = this.buildUpdateCustomerProfileRequestTemplate(
          user,
        );
        const data: any = this.formData.value;
        data.emailType = this.extractValueIfParentNotNull(
          data.emailType,
          'code',
        );
        const phone: CustomerProfilePhone = {
          phoneType: data.phoneType,
          phone: data.phone,
          countryCode: data.phoneCountry,
        };
        const email: CustomerProfileEmail = {
          emailType: data.emailType,
          emailAddress: data.email,
        };

        customerProfile.phone = phone;
        customerProfile.email = email;
        this.model.updateProfile(customerProfile);
      })
      .unsubscribe();
  }
}
