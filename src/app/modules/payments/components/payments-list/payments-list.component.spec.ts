import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { PaymentModel } from '../../payment.model';
import { PaymentsListComponent } from './payments-list.component';

describe('PaymentsListComponent', () => {
  let component: PaymentsListComponent;
  let fixture: ComponentFixture<PaymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsListComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        ModalService,
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
