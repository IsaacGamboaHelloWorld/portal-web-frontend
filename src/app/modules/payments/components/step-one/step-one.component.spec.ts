import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentModel } from '../../payment.model';
import { StepOneComponent } from './step-one.component';

describe('StepOneComponent', () => {
  let component: StepOneComponent;
  let fixture: ComponentFixture<StepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepOneComponent],
      imports: [TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneComponent);
    component = fixture.componentInstance;
    spyOn(component, 'populateOrigin').and.callFake(() => {});
    spyOn(component, 'submitForm').and.callFake(() => {});
    spyOn(component, 'fetchBanks').and.callFake(() => {});
    spyOn(component, 'fetchBankLoans').and.callFake(() => {});
    spyOn(component, 'changeBank').and.callFake(() => {});
    spyOnProperty(component, 'isLoadingDestination$', 'get').and.returnValue(
      false,
    );
    spyOnProperty(component, 'isErrorDestination$', 'get').and.returnValue(
      false,
    );
    spyOnProperty(
      component,
      'isLoadingDestinationBills$',
      'get',
    ).and.returnValue(false);
    spyOnProperty(component, 'isErrorDestinationBills$', 'get').and.returnValue(
      false,
    );
    spyOnProperty(component, 'loans_banks$', 'get').and.returnValue({});

    spyOnProperty(
      component,
      'destinationProductsBills$',
      'get',
    ).and.returnValue({});
    spyOnProperty(component, 'paymentType', 'get').and.returnValue('');

    fixture.detectChanges();
  });

  it('should create', () => {
    component.populateOrigin();
    component.submitForm();
    component.changeBank();
    component.fetchBankLoans();
    component.fetchBanks();
    component.fetchBankLoans();
    component.validateAccountIdentifier();
    expect(component).toBeTruthy();
  });
});
