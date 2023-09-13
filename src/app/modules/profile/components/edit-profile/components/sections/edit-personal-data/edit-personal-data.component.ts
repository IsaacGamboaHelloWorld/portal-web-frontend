import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { CatalogItemDetail } from '@app/modules/profile/entities/load-catalog';
import { ProfileModel } from '@app/modules/profile/store/model/profile.model';
import { EditProfileTemplate } from '@app/modules/profile/util/edit-profile-template';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EditPersonalDataComponent extends EditProfileTemplate
  implements OnInit {
  public formData: FormGroup;
  public genderSelected: string;
  public maritalStatusDefaultValue: CatalogItemDetail;
  public hobbyDefaultValue: CatalogItemDetail;
  public subject$: Observable<string | null> = new Subject<string | null>();
  public maritalStatusElements$: Observable<
    CatalogItemDetail[]
  > = new Observable<CatalogItemDetail[]>();
  public hobbyElements$: Observable<CatalogItemDetail[]> = new Observable<
    CatalogItemDetail[]
  >();
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
    this.maritalStatusElements$ = combineLatest(
      this.subject$,
      this.catalogs$,
    ).pipe(
      map(([maritalStatusSubject, catalogs]) =>
        this.searchByCatalogAndTerm(
          maritalStatusSubject,
          catalogs,
          'maritalStatus',
          'longName',
        ),
      ),
    );
    this.hobbyElements$ = combineLatest(this.subject$, this.catalogs$).pipe(
      map(([hobbySubject, catalogs]) =>
        this.searchByCatalogAndTerm(
          hobbySubject,
          catalogs,
          'hobby',
          'longName',
        ),
      ),
    );

    combineLatest(this.user$, this.catalogs$).subscribe(
      ([userState, catalogs]) => {
        const isParentOk: boolean = !!userState && !!userState.data;
        if (isParentOk) {
          this.setupInitialContactData(userState);
          if (!!userState.data.personalData) {
            this.genderSelected = userState.data.personalData.gender;
            this.maritalStatusDefaultValue = this.searchByCatalogAndCode(
              userState.data.personalData.maritalStatus,
              catalogs,
              'maritalStatus',
              'code',
            );
            this.hobbyDefaultValue = this.searchByCatalogAndCode(
              userState.data.personalData.hobby,
              catalogs,
              'hobby',
              'code',
            );

            this.formData = new FormGroup({
              gender: new FormControl(this.genderSelected, [
                Validators.required,
              ]),
              maritalStatus: new FormControl(this.maritalStatusDefaultValue, [
                Validators.required,
              ]),
              numberOfChildren: new FormControl(
                parseInt(
                  userState.data.personalData.numberOfChildren,
                  this.radixParseConverter,
                ),
                [Validators.required],
              ),
              peopleInChargeOf: new FormControl(
                parseInt(
                  userState.data.personalData.peopleInChargeOf,
                  this.radixParseConverter,
                ),
                [Validators.required],
              ),
              hobby: new FormControl(this.hobbyDefaultValue, [
                Validators.required,
              ]),
            });
          }
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
        data.hobby = this.extractValueIfParentNotNull(data.hobby, 'code');
        data.maritalStatus = this.extractValueIfParentNotNull(
          data.maritalStatus,
          'code',
        );
        customerProfile.personalData = {
          ...customerProfile.personalData,
          ...data,
        };
        this.model.updateProfile(customerProfile);
      })
      .unsubscribe();
  }
}
