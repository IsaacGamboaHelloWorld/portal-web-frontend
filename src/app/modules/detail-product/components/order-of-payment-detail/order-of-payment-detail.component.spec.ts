import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DetailProductModelMock } from '../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DetailProductModel } from '../../detail-product.model';
import { StatusProductPipe } from '../../pipes/status-product/status-product.pipe';
import { OrderOfPaymentDetailComponent } from './order-of-payment-detail.component';

describe('OrderOfPaymentDetailComponent', () => {
  let component: OrderOfPaymentDetailComponent;
  let fixture: ComponentFixture<OrderOfPaymentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderOfPaymentDetailComponent,
        StatusProductPipe,
        RemoveValuePipe,
      ],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: DetailProductModel,
          useClass: DetailProductModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOfPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
