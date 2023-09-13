import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '@app/core/models/products/product';
import { Observable } from 'rxjs';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';
import { BlockProductsModelMock } from '../../store/model/mock/block-products.model.mock';
import { AccountsListBlockedComponent } from './accounts-list-blocked.component';

describe('AccountsListBlockedComponent', () => {
  let component: AccountsListBlockedComponent;
  let fixture: ComponentFixture<AccountsListBlockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [AccountsListBlockedComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: BlockedProductsModel,
          useClass: BlockProductsModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsListBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retryLoadAccountList', () => {
    component.loading = false;
    component.retryLoadAccountList();
    expect(component.loading).toBeTruthy();
  });

  it('depositAccounts$', () => {
    const model = TestBed.get(BlockedProductsModel);
    const mock = model.products$ as Observable<Product[]>;
    const result = component.depositAccounts$.toPromise();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mock.toPromise()));
  });

  it('currentAccounts$', () => {
    const model = TestBed.get(BlockedProductsModel);
    const mock = model.products$ as Observable<Product[]>;
    const result = component.currentAccounts$.toPromise();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mock.toPromise()));
  });
});
