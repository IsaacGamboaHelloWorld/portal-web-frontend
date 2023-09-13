import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { ApplicationModelMock } from '@root/test-helpers/mocks/models/application.model.mock';
import { PaymentTaxesModelMock } from '../../../../test-helpers/mocks/models/paymentTaxes.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { PaymentTaxesModel } from '../payment-taxes/store/model/payment-taxes.model';

import { BiometricComponent } from './biometric.component';

describe('BiometricComponent', () => {
  let component: BiometricComponent;
  let fixture: ComponentFixture<BiometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [BiometricComponent],
      providers: [
        WebAuthnService,
        ManipulateDomService,
        {
          provide: PaymentTaxesModel,
          useClass: PaymentTaxesModelMock,
        },
        { provide: ApplicationModel, useClass: ApplicationModelMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
