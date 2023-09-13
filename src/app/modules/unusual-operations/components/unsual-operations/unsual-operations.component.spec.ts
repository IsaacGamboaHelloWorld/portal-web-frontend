import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@app/core/pipes/credit-card-mask/credit-card-mask.pipe';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { OtpAthModel } from '@app/shared/otp-ath-wrapper/store';
import { ApplicationModelMock } from '@root/test-helpers/mocks/models/application.model.mock';
import { OtpAthModelMock } from '@root/test-helpers/mocks/models/otp-ath.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';

import { UnsualOperationsComponent } from './unsual-operations.component';

describe('UnsualOperationsComponent', () => {
  let component: UnsualOperationsComponent;
  let fixture: ComponentFixture<UnsualOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        UnsualOperationsComponent,
        TypeCreditCardPipe,
        RemoveValuePipe,
        CreditCardMaskPipe,
        CreditCardHiddenPipe,
      ],
      providers: [
        ManipulateDomService,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: OtpAthModel,
          useClass: OtpAthModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsualOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
