import { Injectable } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';

import { ICertificate } from '../../entities/documents';
import {
  CertificateFail,
  CertificateLoad,
  CertificateReset,
} from '../actions/certificate.actions';
import {
  selectCertificate,
  selectProducts,
} from '../selectors/documents.selectors';

@Injectable()
export class CertificateModel {
  constructor(private store: Store<ApplicationState>) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public stateCertificate$: Observable<ICertificate> = this.store.pipe(
    select(selectCertificate),
  );

  public creationFail(_data: string): void {
    this.store.dispatch(CertificateFail(_data));
  }

  public creationSucces(_data: object): void {
    this.store.dispatch(CertificateLoad(_data));
  }

  public reset(): void {
    this.store.dispatch(CertificateReset());
  }
}
