import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PaymentTaxesModel } from '@app/modules/payment-taxes/store/model/payment-taxes.model';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentTaxesModelMock } from '../../../../../../test-helpers/mocks/models/paymentTaxes.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { NameComponent } from './name.component';

describe('NameComponent', () => {
  let component: NameComponent;
  let fixture: ComponentFixture<NameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [NameComponent],
      providers: [
        ManipulateDomService,
        WebAuthnService,
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
    fixture = TestBed.createComponent(NameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
