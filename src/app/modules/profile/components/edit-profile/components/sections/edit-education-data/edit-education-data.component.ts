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
  selector: 'app-edit-education-data',
  templateUrl: './edit-education-data.component.html',
  styleUrls: ['./edit-education-data.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EditEducationDataComponent extends EditProfileTemplate
  implements OnInit {
  public formData: FormGroup;
  public educationLevelDefaultValue: CatalogItemDetail;
  public educationDegreeDefaultValue: CatalogItemDetail;
  public subject$: Observable<string | null> = new Subject<string | null>();
  public educationLevelElements$: Observable<
    CatalogItemDetail[]
  > = new Observable<CatalogItemDetail[]>();
  public educationDegreeElements$: Observable<
    CatalogItemDetail[]
  > = new Observable<CatalogItemDetail[]>();

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
    this.educationLevelElements$ = combineLatest(
      this.subject$,
      this.catalogs$,
    ).pipe(
      map(([subject, catalogs]) =>
        this.searchByCatalogAndTerm(
          subject,
          catalogs,
          'educationLevelCode',
          'longName',
        ),
      ),
    );
    this.educationDegreeElements$ = combineLatest(
      this.subject$,
      this.catalogs$,
    ).pipe(
      map(([subject, catalogs]) =>
        this.searchByCatalogAndTerm(
          subject,
          catalogs,
          'degreeReceivedCode',
          'longName',
        ),
      ),
    );

    combineLatest(this.user$, this.catalogs$).subscribe(
      ([userState, catalogs]) => {
        const isParentOk: boolean = !!userState && !!userState.data;
        if (isParentOk) {
          this.setupInitialContactData(userState);
          if (!!userState.data.educationInfo) {
            this.educationLevelDefaultValue = this.searchByCatalogAndCode(
              userState.data.educationInfo.educationLevelCode,
              catalogs,
              'educationLevelCode',
              'code',
            );
            this.educationDegreeDefaultValue = this.searchByCatalogAndCode(
              userState.data.educationInfo.degreeReceivedCode,
              catalogs,
              'degreeReceivedCode',
              'code',
            );
            this.formData = new FormGroup({
              educationLevelCode: new FormControl(
                this.educationLevelDefaultValue,
                [Validators.required],
              ),
              degreeReceivedCode: new FormControl(
                this.educationDegreeDefaultValue,
                [Validators.required],
              ),
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
        data.educationLevelCode = this.extractValueIfParentNotNull(
          data.educationLevelCode,
          'code',
        );
        data.degreeReceivedCode = this.extractValueIfParentNotNull(
          data.degreeReceivedCode,
          'code',
        );
        customerProfile.educationInfo = data;
        this.model.updateProfile(customerProfile);
      })
      .unsubscribe();
  }
}
