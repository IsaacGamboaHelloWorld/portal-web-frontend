import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@core/constants/navigate';
import { ClassNotification } from '@core/constants/notification';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnrollFacade } from './enroll.facade';
import { IActiveCompanySave, ICompany } from './entities/enroll';
import { ISavedAgreement } from './store/reducers/save-agreement.reducer';
import { ICompaniesSearch } from './store/reducers/search-companies.reducer';
import { IActiveCompany } from './store/reducers/select-active-company.reducer';

@Component({
  selector: 'app-enroll-public-service',
  templateUrl: './enroll.container.html',
  styleUrls: ['./enroll.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EnrollPublicServiceContainer implements OnInit, OnDestroy {
  public emptyState: boolean = true;
  public textFilter: string = '';
  public formEnroll: FormGroup;
  public formAddService: FormGroup;
  public tempCompany: ICompany;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public stepOne: boolean = true;
  public stepTwo: boolean = true;
  public hideControls: boolean = false;

  constructor(
    private _facade: EnrollFacade,
    private dom: ManipulateDomService,
    private _router: Router,
    private _translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.savedAggrement$
      .pipe(takeUntil(this._destroy$))
      .subscribe((saved: ISavedAgreement) => {
        if (!!saved && !!saved.data) {
          if (saved.data.success) {
            this._savedSuccess();
          } else {
            this._savedError(saved.data.errorMessage);
          }
        } else if (saved.error) {
          this._savedError(saved.errorMessage);
        }
      });
  }

  private _savedSuccess(): void {
    this._facade.notificationOpen(
      this._translate.instant(
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.ENROLL.ENROLL_SUCCESS',
      ),
      true,
      ClassNotification.SUCCESS,
    );
    this._router.navigate([Navigate.paymentsv2services]);
  }

  private _savedError(message: string): void {
    this._facade.notificationOpen(message, true, ClassNotification.ERROR);
  }

  public ngOnDestroy(): void {
    this._facade.clearCompanyActive();
    this._facade.clearServiceSaved();
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public doClear(event: any): void {
    event.preventDefault();
    const el = document.querySelector('.entity-name');
    el.classList.remove('grayField');

    this.textFilter = '';
    this.emptyState = true;
    this.stepOne = true;
    this._facade.clearServiceSaved();
  }

  public onChange(event: any): void {
    if (this.textFilter === '') {
      this.emptyState = true;
    }
  }

  private _initForm(): void {
    this.formEnroll = new FormGroup({
      entity: new FormControl('', Validators.required),
    });
  }

  public onKeyUp(event: any): void {
    this.emptyState = this.textFilter === '';
    const el = document.querySelector('.entity-name');

    if (this.textFilter.length > 2) {
      this._facade.searchData(this.textFilter);
      el.classList.add('grayField');
    } else {
      el.classList.remove('grayField');
    }
  }

  public submitForm(): void {
    this._facade.fetchCompanyActive(this.formEnroll.controls.entity.value);
    this.stepOne = !this.stepTwo;
    this.textFilter = '';
    this.changeStepTwo();
  }

  public changeStepTwo(): void {
    this._initSecondForm();
    this.hideControls = true;
    const el = document.querySelector('.entity-name');
    el.classList.remove('grayField');
    el.classList.add('greenField');
  }

  public doRegister(): void {
    const newService: IActiveCompanySave = {
      company_code: this.tempCompany.organizationId,
      company_name: this.formAddService.controls.name_serv.value,
      billId: this.formAddService.controls.no_serv.value,
    };
    this._facade.fetchNewService(newService);
  }

  private _initSecondForm(): void {
    this.companyActive$
      .pipe(takeUntil(this._destroy$))
      .subscribe((companyActive) => {
        if (!!companyActive && !!companyActive.data) {
          this.tempCompany = companyActive.data;
          this.textFilter = companyActive.data.entityName;
        }
      });
    this.formAddService = new FormGroup({
      name_serv: new FormControl('', [Validators.required]),
      no_serv: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  public setClass(_id: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-container', 'active');
    this.dom.addClass('.type-company-' + _id, 'active');
  }

  get companies$(): Observable<ICompaniesSearch> {
    return this._facade.companyList$;
  }

  get companyActive$(): Observable<IActiveCompany> {
    return this._facade.companyActive$;
  }

  get savedAggrement$(): Observable<ISavedAgreement> {
    return this._facade.serviceAdded$;
  }

  get navigate(): INavigate {
    return Navigate;
  }
}
