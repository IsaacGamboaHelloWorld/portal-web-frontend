import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeModel } from '@modules/home/home.model';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProductErrorComponent } from './product-error.component';

describe('ProductErrorComponent', () => {
  let component: ProductErrorComponent;
  let fixture: ComponentFixture<ProductErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ProductErrorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.loadProducts();
    expect(component).toBeTruthy();
  });
});
