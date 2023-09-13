import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ApplicationModelMock } from '../../../../../../../../test-helpers/mocks/models/application.model.mock';
import { PaymentFreeDestinationModelMock } from '../../../../../../../../test-helpers/mocks/models/payment-free-destination.model..mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';

import { StepTwoComponent } from './step-two.component';

describe('Payment FD StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepTwoComponent],
      providers: [
        ManipulateDomService,
        {
          provide: PaymentFreeDestinationModel,
          useClass: PaymentFreeDestinationModelMock,
        },
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
