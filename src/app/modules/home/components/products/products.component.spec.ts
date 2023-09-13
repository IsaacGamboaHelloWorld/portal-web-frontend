import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { HomeModel } from '@modules/home/home.model';
import * as npm from '@root/package.json';
import { ProductsMock } from '../../../../../../test-helpers/mocks/data/products.mock';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProductAllMock } from './../../../../../../test-helpers/mocks/data/products-all.mock';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ProductsComponent],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    component.products = ProductsMock.DEPOSIT_ACCOUNT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be returned quantity of products', () => {
    expect(component.quantityProducts).toBe(3);
  });

  it('should be returned empty products', () => {
    component.products = null;
    expect(component.quantityProducts).toBe(0);
  });

  it('should be returned has products', () => {
    expect(component.hasProducts).toBeFalsy();
  });

  it('trackByFn', () => {
    const product = ProductAllMock.products.CERTIFIED_DEPOSIT_TERM[0];
    const result = component.trackByFn(0, product);
    expect(result).toEqual(undefined);
  });

  it('redirect', () => {
    const event = {
      product: ProductAllMock.products.CERTIFIED_DEPOSIT_TERM[0],
      url: `${npm.localhost}`,
    };

    const model = TestBed.get(HomeModel);
    const spySetProduct = spyOn(model, 'setProduct');

    component.redirect(event);

    expect(spySetProduct).toHaveBeenCalled();
  });
});
