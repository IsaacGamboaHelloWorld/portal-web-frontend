import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { PayStackModelMock } from '../../../../test-helpers/mocks/models/payStack.model.mocks';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { PayStackComponent } from './pay-stack.component';
import { PayStackModel } from './store/model/pay-stack.model';

describe('PaymentTaxesComponent PayStack', () => {
  let component: PayStackComponent;
  let fixture: ComponentFixture<PayStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [PayStackComponent],
      providers: [
        ManipulateDomService,
        {
          provide: PayStackModel,
          useClass: PayStackModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayStackComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
