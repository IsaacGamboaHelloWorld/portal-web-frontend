import { OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ES } from '@app/core/constants/calendar';
import { Navigate } from '@app/core/constants/navigate';
import {
  CustomerProfileContactType,
  CustomerProfileEmail,
  CustomerProfilePhone,
} from '@app/core/models/user/user-profile';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import {
  CatalogItemDetail,
  ICustomerProfileCatalog,
} from '@app/modules/profile/entities/load-catalog';
import { ProfileModel } from '@app/modules/profile/store/model/profile.model';
import {
  extractCatalogItemDetailByCode,
  setDefaultValue,
} from '@app/modules/profile/util/catalog-field-extractor';
import { PROFILE_ROUTES } from '@app/modules/profile/util/routes';
import { UserInfoState } from '@app/store/reducers/global/user/user.reducer';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUpdateProfileResponse } from '../entities/update-profile-response';

export class CommonProfileComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<boolean> = new Subject<boolean>();

  public phoneDefaultValue: CustomerProfilePhone;
  public emailDefaultValue: CustomerProfileEmail;

  constructor(
    protected dom: ManipulateDomService,
    protected model: ProfileModel,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.dom.scrollTop();
    this.dom.removeClass('.headerTop', 'background-detail');
    this.dom.addClass('.headerTop', 'background-home');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get user$(): Observable<UserInfoState> {
    return this.model.userInfoCrm$;
  }

  get catalogs$(): Observable<ICustomerProfileCatalog> {
    return this.model.catalogs$;
  }

  get updateProfileResponse$(): Observable<IUpdateProfileResponse> {
    return this.model.updateProfileOperation$;
  }

  get es(): any {
    return ES;
  }

  get routes(): { [key: string]: string } {
    return PROFILE_ROUTES;
  }

  public extractCatalogItemDetailByCodeFromCatalogSet(
    catalogName: string,
    fieldName: string,
    value: any,
    defaultValue: any = '',
  ): Observable<CatalogItemDetail> {
    return this.model.catalogs$.pipe(
      map((catalogs: ICustomerProfileCatalog) => {
        return !!catalogs && !!catalogs.data
          ? extractCatalogItemDetailByCode(
              catalogs.data.catalogs,
              catalogName,
              fieldName,
              value,
              defaultValue,
            )
          : {};
      }),
    );
  }

  public setupValue(value: string, defaultValue: any): string {
    return setDefaultValue(value, defaultValue);
  }

  public searchByCatalogAndTerm(
    term: string | null,
    catalogInterface: ICustomerProfileCatalog,
    catalogName: string,
    fieldName: string,
  ): CatalogItemDetail[] {
    const searchTerm = term ? term : '';
    return !!catalogInterface && !!catalogInterface.data
      ? catalogInterface.data.catalogs[catalogName].filter((item) => {
          return (
            item[fieldName].toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1
          );
        })
      : undefined;
  }

  public searchByCatalogAndCode(
    code: string,
    catalogInterface: ICustomerProfileCatalog,
    catalogName: string,
    fieldName: string,
  ): CatalogItemDetail {
    return !!catalogInterface && !!catalogInterface.data
      ? catalogInterface.data.catalogs[catalogName].find((item) => {
          return item[fieldName] === code;
        })
      : undefined;
  }

  public getElementByRefId<T extends CustomerProfileContactType>(
    elements: T[],
    value: any,
  ): T {
    return elements.find(
      (element) => !!element.refId && element.refId === value,
    );
  }

  public setupInitialContactData(userState: UserInfoState): void {
    this.phoneDefaultValue = this.getElementByRefId(userState.data.phones, 'Y');
    this.emailDefaultValue = this.getElementByRefId(userState.data.emails, 'Y');
  }

  public extractValueIfParentNotNull(parent: any, fieldName: string): any {
    return !!parent && parent[fieldName] ? parent[fieldName] : parent;
  }

  public back(): void {
    this.router.navigate([Navigate.user_profile + '/' + PROFILE_ROUTES.view]);
  }
}
