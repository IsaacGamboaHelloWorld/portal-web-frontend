import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentTaxesModelMock } from '../../../../test-helpers/mocks/models/paymentTaxes.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { PaymentTaxesComponent } from './payment-taxes.component';
import { PaymentTaxesModel } from './store/model/payment-taxes.model';

describe('PaymentTaxesComponent', () => {
  let component: PaymentTaxesComponent;
  let fixture: ComponentFixture<PaymentTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [PaymentTaxesComponent],
      providers: [
        ManipulateDomService,
        {
          provide: PaymentTaxesModel,
          useClass: PaymentTaxesModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTaxesComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
