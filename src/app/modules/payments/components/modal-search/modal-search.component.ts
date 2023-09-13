import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { CompanyListInterface } from '@core/interfaces/paymentBills.interface';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ClassNotification } from '../../../../core/constants/notification';
import {
  CompanyInterface,
  IActiveCompanySave,
} from '../../../../core/interfaces/paymentBills.interface';
import { SavedAgreementState } from '../../../../store/reducers/models/payment/search-companies/save-agreement.reducer';
import { PaymentModel } from '../../payment.model';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalSearchComponent implements OnInit, OnDestroy {
  public emptyState: boolean = true;
  public textFilter: string = '';
  public formSearch: FormGroup;
  public formAddService: FormGroup;
  public amountCompanies: number = 0;
  public stepOne: boolean = true;
  public stepTwo: boolean = true;
  public tempCompany: CompanyInterface;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private model: PaymentModel,
    private modal: ModalService,
    private translate: TranslateService,
  ) {}

  public ngOnInit(): void {
    this._initForm();
  }

  public ngOnDestroy(): void {
    this.model.clearCompanyActive();
    this.model.clearServiceSaved();
    this.stepOne = true;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public doClear(event: any): void {
    event.preventDefault();
    this.textFilter = '';
    this.emptyState = true;
    this.stepOne = true;
    this.model.clearCompanyActive();
  }

  public onChange(event: any): void {
    if (this.textFilter === '') {
      this.emptyState = true;
    }
  }

  private _initForm(): void {
    this.formSearch = new FormGroup({
      entity: new FormControl('', [Validators.required]),
    });
  }

  public onKeyUp(event: any): void {
    this.emptyState = this.textFilter === '';
    if (this.textFilter.length > 2) {
      this.model.searchData(this.textFilter);
    }
  }

  public submitForm(): void {
    this.model.fetchCompanyActive(this.formSearch.controls.entity.value);
    this.stepOne = !this.stepTwo;
    this.textFilter = '';
    this.changeStepTwo();
  }

  public changeStepTwo(): void {
    this._initSecondForm();
  }

  public doRegister(): void {
    const newService: IActiveCompanySave = {
      company_code: this.tempCompany.organizationId,
      company_name: this.formAddService.controls.name_serv.value,
      billId: this.formAddService.controls.no_serv.value,
    };
    this.model.fetchNewService(newService);

    this.savedAggrement$
      .pipe(takeUntil(this.destroy$))
      .subscribe((returnedInfo) => {
        if (
          !isNullOrUndefined(returnedInfo.data) &&
          returnedInfo.data.approvalId
        ) {
          this.model.notificationOpen(
            this.translate.instant('PAYMENTS.POPUP_SEARCH.ADDED_SUCCESS'),
            true,
            ClassNotification.SUCCESS,
          );
          this.modal.close();
        }
      });
  }

  private _initSecondForm(): void {
    this.companyActive$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.tempCompany = data;
      this.textFilter = data.entityName;
    });
    this.formAddService = new FormGroup({
      name_serv: new FormControl('', [Validators.required]),
      no_serv: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  public doClose(): void {
    this.modal.close();
  }

  get companyList$(): Observable<CompanyListInterface> {
    return this.model.companyList$;
  }

  get companies$(): Observable<boolean> {
    return this.model.companies$;
  }

  get companyActive$(): Observable<CompanyInterface> {
    return this.model.companyActive$;
  }

  get savedAggrement$(): Observable<SavedAgreementState> {
    return this.model.serviceAdded$;
  }

  get savedLoadingAggrement$(): Observable<boolean> {
    return this.model.serviceAllLoading$;
  }

  get setCompanyAmount(): Observable<number> {
    return this.companyList$.pipe(
      take(1),
      map((data) => {
        return data.agreements.length;
      }),
    );
  }
}
