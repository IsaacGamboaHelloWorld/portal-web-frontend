import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysPipe } from '@core/pipes/keys/keys.pipe';
import { HomePaymentContainer } from '@modules/payments/home-payments/home-payment.container';
import { HomePaymentsFacade } from '@modules/payments/home-payments/home-payments.facade';
import { HomePaymentsFacadeMock } from '../../../../../test-helpers/mocks/models/home-payments.facade.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../core/services/manipulate-dom/manipulate-dom.service';

describe('HomePaymentComponent', () => {
  let component: HomePaymentContainer;
  let fixture: ComponentFixture<HomePaymentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePaymentContainer, KeysPipe],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: HomePaymentsFacade,
          useClass: HomePaymentsFacadeMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePaymentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
