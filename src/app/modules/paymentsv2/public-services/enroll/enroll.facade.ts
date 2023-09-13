import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../../store/actions/global/notification/notification.action';
import { ApplicationState } from '../../../../store/state/application.state';
import { IActiveCompanySave, ICompany } from './entities/enroll';
import {
  EnrollLoadAction,
  EnrollResetAction,
} from './store/actions/save-agreement.action';
import { SearchCompanyLoadAction } from './store/actions/search-companies.action';
import {
  CompanyActiveResetAction,
  CompanyActiveSuccessAction,
} from './store/actions/select-active-company.action';
import { ISavedAgreement } from './store/reducers/save-agreement.reducer';
import { ICompaniesSearch } from './store/reducers/search-companies.reducer';
import { IActiveCompany } from './store/reducers/select-active-company.reducer';
import {
  selectActiveCompany,
  selectAllCompanies,
  selectSavedAgreement,
} from './store/selectors/enroll-services.selector';

@Injectable()
export class EnrollFacade {
  constructor(private store: Store<ApplicationState>) {}

  public companyList$: Observable<ICompaniesSearch> = this.store.pipe(
    select(selectAllCompanies),
  );

  public companyActive$: Observable<IActiveCompany> = this.store.pipe(
    select(selectActiveCompany),
  );

  public serviceAdded$: Observable<ISavedAgreement> = this.store.pipe(
    select(selectSavedAgreement),
  );

  public searchData(data: string): void {
    this.store.dispatch(SearchCompanyLoadAction(data));
  }

  public fetchCompanyActive(company: ICompany): void {
    this.store.dispatch(CompanyActiveSuccessAction(company));
  }

  public clearCompanyActive(): void {
    this.store.dispatch(CompanyActiveResetAction());
  }

  public fetchNewService(_data: IActiveCompanySave): void {
    this.store.dispatch(EnrollLoadAction(_data));
  }

  public clearServiceSaved(): void {
    this.store.dispatch(EnrollResetAction());
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(message, autoClosed, typeNotification),
    );
  }
}
