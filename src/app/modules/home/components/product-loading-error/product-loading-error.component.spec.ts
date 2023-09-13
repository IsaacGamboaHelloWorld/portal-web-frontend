import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAllMock } from './../../../../../../test-helpers/mocks/data/products-all.mock';

import { HomeModel } from '@modules/home/home.model';
import { FreeDestinationDetailMock } from '../../../../../../test-helpers/mocks/data/freeDestinations.mock';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProductLoadingErrorComponent } from './product-loading-error.component';

describe('ProductLoadingErrorComponent', () => {
  let component: ProductLoadingErrorComponent;
  let fixture: ComponentFixture<ProductLoadingErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ProductLoadingErrorComponent],
      providers: [
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLoadingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadProduct for detail product', () => {
    component.product = {
      ...ProductAllMock.productList[0],
      typeAccount: 'DEPOSIT_ACCOUNT',
      id: '500800459807',
    };

    const model = TestBed.get(HomeModel);
    const spy = spyOn(model, 'fetchDetailProduct');

    component.loadProduct();

    expect(spy).toHaveBeenCalledWith('DEPOSIT_ACCOUNT', '500800459807');
  });

  it('loadProduct for freeDestination', () => {
    component.product = {
      ...FreeDestinationDetailMock.freeDestinationCredit,
      accountInformation: {
        productType: 'FREE_DESTINATION',
      },
    };

    const model = TestBed.get(HomeModel);
    const spy = spyOn(model, 'fetchFreeDestiny');

    component.loadProduct();

    expect(spy).toHaveBeenCalled();
  });
});
