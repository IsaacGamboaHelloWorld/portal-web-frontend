import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { CustomerProfile } from '@app/core/models/user/user-profile';
import { UserLoadAction } from '@app/store/actions/global/user/user.action';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICustomerProfileCatalog } from '../../entities/load-catalog';
import { IUpdateProfileResponse } from '../../entities/update-profile-response';
import {
  selectCatalogs,
  selectUpdateResponse,
} from '../../selectors/profile.selector';
import { CustomerProfileCatalogLoad } from '../actions/load-catalog.actions';
import { CustomerProfileUpdateLoad } from '../actions/update-profile.actions';

@Injectable()
export class ProfileModel extends ApplicationModel {
  constructor(protected store: Store<ApplicationState>) {
    super(store);
  }

  catalogs$: Observable<ICustomerProfileCatalog> = this.store.pipe(
    select(selectCatalogs),
  );

  updateProfileOperation$: Observable<IUpdateProfileResponse> = this.store.pipe(
    select(selectUpdateResponse),
  );

  public fetchUserData(): void {
    this.store.dispatch(new UserLoadAction());
  }

  public loadCatalogs(): void {
    this.store.dispatch(CustomerProfileCatalogLoad());
  }
  public updateProfile(updateProfileRequest: CustomerProfile): void {
    this.store.dispatch(CustomerProfileUpdateLoad(updateProfileRequest));
  }
}
