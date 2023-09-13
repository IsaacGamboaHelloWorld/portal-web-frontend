import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentTaxesModel } from '@app/modules/payment-taxes/store/model/payment-taxes.model';
import { OtpAthModel } from '@app/shared/otp-ath-wrapper/store';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { OtpAthModelMock } from '@root/test-helpers/mocks/models/otp-ath.model.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentTaxesModelMock } from '../../../../../../test-helpers/mocks/models/paymentTaxes.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [InfoComponent],
      providers: [
        WebAuthnService,
        ManipulateDomService,
        {
          provide: PaymentTaxesModel,
          useClass: PaymentTaxesModelMock,
        },
        {
          provide: OtpAthModel,
          useClass: OtpAthModelMock,
        },
        { provide: ApplicationModel, useClass: ApplicationModelMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
