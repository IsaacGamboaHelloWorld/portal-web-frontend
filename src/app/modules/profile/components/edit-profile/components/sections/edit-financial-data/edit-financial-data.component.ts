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
  selector: 'app-edit-financial-data',
  templateUrl: './edit-financial-data.component.html',
  styleUrls: ['./edit-financial-data.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EditFinancialDataComponent extends EditProfileTemplate
  implements OnInit {
  public formData: FormGroup;
  public economicActivityDefaultValue: CatalogItemDetail;
  public subject$: Observable<string | null> = new Subject<string | null>();
  public economicActivityElements$: Observable<
    CatalogItemDetail[]
  > = new Observable<CatalogItemDetail[]>();
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
    this.economicActivityElements$ = combineLatest(
      this.subject$,
      this.catalogs$,
    ).pipe(
      map(([subject, catalogs]) =>
        this.searchByCatalogAndTerm(
          subject,
          catalogs,
          'economicActivityCode',
          'longName',
        ),
      ),
    );

    combineLatest(this.user$, this.catalogs$).subscribe(
      ([userState, catalogs]) => {
        const isParentOk: boolean = !!userState && !!userState.data;
        if (isParentOk) {
          this.setupInitialContactData(userState);
          if (!!userState.data.financialInformation) {
            this.economicActivityDefaultValue = this.searchByCatalogAndCode(
              userState.data.financialInformation.economicActivityCode,
              catalogs,
              'economicActivityCode',
              'shortName',
            );
            this.formData = new FormGroup({
              economicActivityCode: new FormControl(
                this.economicActivityDefaultValue,
                [Validators.required],
              ),
              income: new FormControl(
                +userState.data.financialInformation.income,
                [Validators.required],
              ),
              otherIncome: new FormControl(
                +userState.data.financialInformation.otherIncome,
                [Validators.required],
              ),
              otherOutcome: new FormControl(
                +userState.data.financialInformation.otherOutcome,
                [Validators.required],
              ),
              assets: new FormControl(
                userState.data.financialInformation.assets,
                [Validators.required],
              ),
              liabilities: new FormControl(
                userState.data.financialInformation.liabilities,
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
        data.economicActivityCode = this.extractValueIfParentNotNull(
          data.economicActivityCode,
          'shortName',
        );
        customerProfile.financialInformation = data;
        this.model.updateProfile(customerProfile);
      })
      .unsubscribe();
  }
}
