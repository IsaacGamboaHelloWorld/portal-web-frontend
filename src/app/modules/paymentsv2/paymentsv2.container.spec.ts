import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsV2ModelMock } from '../../../../test-helpers/mocks/data/paymentsV2.mock';

import { TestingModule } from '../../../../test-helpers/testing.module';
import { Paymentsv2Container } from './paymentsv2.container';
import { PublicServicesFacade } from './public-services/public-services.facade';
import { PublicServicesService } from './public-services/services/public-services.service';

describe('Paymentsv2Component', () => {
  let component: Paymentsv2Container;
  let fixture: ComponentFixture<Paymentsv2Container>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [Paymentsv2Container],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
        PublicServicesService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paymentsv2Container);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
